import { ec2, docdb as aws_docdb } from '@pulumi/aws';
import { Output } from '@pulumi/pulumi';
import { envSecrets } from '../..';

export const docdb = (() => {

  const up = (
    prjName: (_: string) => string,
    docdbSecurityGroup: ec2.SecurityGroup
    // dbSubnets: aws_docdb.SubnetGroup,
    // envSecrets: Output<{[key: string]: Output<string>}>,
  ) => {
    // Create Amazon Aurora Serverless V2 compatible PostgreSQL cluster.
    const auroraEngine = 'aurora-postgresql';
    const docdbCluster: aws_docdb.Cluster = new aws_docdb.Cluster(
      prjName(
        'docdb-cluster'
      ), {
        clusterIdentifier: prjName('docdb-cluster'),
        // engine: auroraEngine,
        // engineMode: 'provisioned',
        // engineVersion: '15.2',
        masterUsername: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('DbUsername')]),
        masterPassword: envSecrets.apply((secrets: {[key: string]: Output<string>}) => secrets[prjName('DbPassword')]),
        skipFinalSnapshot: true,
      //     backupRetentionPeriod: 5,
      //     preferredBackupWindow: "07:00-09:00",
      //   serverlessv2ScalingConfiguration: {
      //     maxCapacity: 5,
      //     minCapacity: 1,
      // },
        vpcSecurityGroupIds: [docdbSecurityGroup.id],
        // dbSubnetGroupName: dbSubnets.id,
      }
    );

    const docdbInstance = new aws_docdb.ClusterInstance(
      prjName(
        'docdb-instance'
      ), {
        clusterIdentifier: docdbCluster.id,
        instanceClass: 'db.t3.medium',
        // engine: auroraEngine,
        // engineVersion: auroraCluster.engineVersion,
        // publiclyAccessible: true,
      }, {
        dependsOn: [ docdbCluster ],
      }
    );

    return {
      docdbCluster,
      docdbInstance,
    }
  }

  return {
    up,
  }
})()