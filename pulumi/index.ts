import { prjName } from './config/utils';
import { elbUp, iamUp, s3Up, smUp, vpcUp, docdbUp, acmUp } from './config/aws';

export const appDir = "./app-monitor.zip";

export const {vpc, docdbSecurityGroup}= vpcUp(prjName);

export const { instanceProfileRole, instanceProfile } = iamUp(prjName);

export const { envSecrets } = smUp(prjName)

// export const { certificateArn } = acmUp('monitor.ssindex.com');

const certificateArn = null;

export const { appBucket, appBucketObject } = s3Up(prjName, appDir);

export const { docdbCluster, docdbInstance } = docdbUp(prjName, docdbSecurityGroup);

export const { application , appVersion, environment } = elbUp(
    appBucket,
    appBucketObject,
    docdbCluster,
    docdbInstance,
    certificateArn,
    envSecrets,
    instanceProfile,
    docdbSecurityGroup,
    vpc,
    prjName,
    'production'
);