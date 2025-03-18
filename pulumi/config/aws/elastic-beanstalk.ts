import { ec2, elasticbeanstalk, iam, rds, s3, getRegion, docdb } from '@pulumi/aws';
import { ec2 as ec2x } from '@pulumi/awsx';
import { Output, OutputInstance, all } from '@pulumi/pulumi';

type TElbSetting = {
  name: string,
  namespace: string,
  resource?: string,
  value: string | Output<string> | Promise<string>
};

type TEnvironmentNames = 'production' | 'demo';

type TEnvironmentSettings = {
  autoscaling: TElbSetting[],
  scheduledActions: TElbSetting[]
};

type TEnvConfig = Record<TEnvironmentNames, TEnvironmentSettings>;

const defaultAz1 = new ec2.DefaultSubnet("default_az1", {
  availabilityZone: "us-east-1a",
  tags: {
      Name: "Default subnet for us-east-1a",
  },
});

const defaultAz2 = new ec2.DefaultSubnet("default_az2", {
  availabilityZone: "us-east-1b",
  tags: {
    Name: "Default subnet for us-east-1b",
  },
});

export const elb = (() => {

  const up = (
    appBucket: s3.BucketV2,
    appBucketObject: s3.BucketObjectv2,
    docdbCluster: docdb.Cluster,
    docdbInstance: docdb.ClusterInstance,
    certificateArn: OutputInstance<string> | null,
    envSecrets: Output<{[key: string]: Output<string>}>,
    instanceProfile: iam.InstanceProfile,
    docdbSecurityGroup: ec2.SecurityGroup,
    // vpc: ec2x.Vpc,
    vpc: ec2.DefaultVpc,
    prjName: (_: string) => string,
    envName: TEnvironmentNames,
  ) => {

    // Create an AWS Elastic Beanstalk app for a Dockerized Next application.
    const application = new elasticbeanstalk.Application(prjName('app'), {
      description: 'A web app running a Next in a Docker container (Monitor)',
    });

    // Create a new application version for the Docker application`
    const appVersion = new elasticbeanstalk.ApplicationVersion(prjName('app-version-6'), {
      application: application.name,
      bucket: appBucket.id,
      key: appBucketObject.id,
    });

    // This one uses elbv2 instead of elb when vpc is not a default one
    const sslSettings = certificateArn === null ? [  /* Once we fix the domain and the certification config this logic won't be neccesary */
      {
        namespace: 'aws:elbv2:listener:80',
        name: 'ListenerEnabled',
        value: 'true',
      }
    ] : [
      {
        namespace: 'aws:elbv2:listener:80',
        name: 'ListenerEnabled',
        value: 'false',
      },
      {
        namespace: 'aws:elb:loadbalancer',
        name: 'LoadBalancerHTTPSPort',
        value: '443',
      }, 
      {
        namespace: 'aws:elbv2:listener:443',
        name: 'Protocol',
        value: 'HTTPS',
      }, {
        namespace: 'aws:elbv2:listener:443',
        name: 'ListenerEnabled',
        value: 'true',
      }, {
        namespace: 'aws:elbv2:listener:443',
        name: 'SSLCertificateArns',
        value: certificateArn.apply(certId => certId || ''),
      }
    ]

    const envVars = [
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'MONGO_HOST',
        value: docdbInstance.endpoint.apply(value => value),
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'MONGO_PORT',
        value: '27017'
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'MONGO_USERNAME',
        value: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('DbUsername')])
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'MONGO_PASSWORD',
        value: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('DbPassword')])
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'ENV_COMMAND',
        value: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('EnvCommand')])
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'FLASK_SECRET_KEY',
        value: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('FlaskSecretKey')])
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'MONITOR_CLIENT_ID',
        value: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('MonitorClientId')])
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'MONITOR_SCOPE',
        value: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('MonitorScope')])
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'COGNITO_SERVER_METADATA_URL',
        value: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('CognitoServerMetadataUrl')])
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'LAST_PULUMI_UP',
        value: `${(new Date()).toISOString()}`,
      },
      {
        namespace: 'aws:elasticbeanstalk:application:environment',
        name: 'APP_ENV',
        value: "production",
      }
    ]

    const scalingSettings = [
      {
        namespace: 'aws:autoscaling:asg',
        name: 'Availability Zones',
        value: `Any 2`,
      }, {
        namespace: 'aws:autoscaling:asg',
        name: 'MinSize',
        value: '1',
      }, {
        namespace: 'aws:autoscaling:asg',
        name: 'MaxSize',
        value: '1',
      }, {
        namespace: 'aws:autoscaling:launchconfiguration',
        name: 'SecurityGroups',
        value: docdbSecurityGroup.id,
      }, {
        namespace: 'aws:autoscaling:launchconfiguration',
        name: 'InstanceType',
        value: 't2.medium'
      }, 
    ]

    const networkAndReportSettings = [
      {
        namespace: 'aws:elasticbeanstalk:environment',
        name: 'EnvironmentType',
        value: 'LoadBalanced'
      }, 
      {
        name: 'IamInstanceProfile',
        namespace: 'aws:autoscaling:launchconfiguration',
        value: instanceProfile.name,
      }, 
      {
        namespace: 'aws:elasticbeanstalk:healthreporting:system',
        name: 'SystemType',
        value: 'enhanced'
      }, 
      {
        namespace: 'aws:elasticbeanstalk:environment',
        name: 'LoadBalancerType',
        value: 'application',
      },
      // TODO: Check this when a non default VPC is used.
      //   {
      //   namespace: 'aws:ec2:vpc',
      //   name: 'VPCId',
      //   value: vpc.vpcId,
      // },
      {
        namespace: 'aws:ec2:vpc',
        name: 'VPCId',
        value: vpc.id,
      }, 
      {
        namespace: 'aws:ec2:vpc',
        name: 'AssociatePublicIpAddress',
        value: 'true'
      },
      // TODO: Check this when a non default VPC is used.
      //   namespace: 'aws:ec2:vpc',
      //   name: 'Subnets',
      //   value: vpc.publicSubnetIds.apply((t: string[]) => t.join(', ')),
      // },
      {
          namespace: 'aws:ec2:vpc',
          name: 'Subnets',
          value: all([defaultAz1.id, defaultAz2.id]).apply(ids => ids.join(',')),
      },
    ]

    // Create an AWS Elastic Beanstalk environment for a Dockerized Rails application.
    const environment = new elasticbeanstalk.Environment(prjName('env'), {
      application: application.name,
      version: appVersion,
      solutionStackName: '64bit Amazon Linux 2 v3.8.3 running Docker',
      settings: [
        ...networkAndReportSettings,
        ...scalingSettings,
        ...sslSettings,
        ...envVars,
      ],
    }, { dependsOn: [ vpc, appBucket, application, appVersion, docdbInstance, defaultAz1, defaultAz2 ], });

    return {
      application,
      appVersion,
      environment,
    }
  }

  return {
    up,
  }
})()
