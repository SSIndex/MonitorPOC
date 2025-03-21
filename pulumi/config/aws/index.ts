import { elb } from './elastic-beanstalk';
import { iam } from './iam';
import { s3 }  from './s3';
import { sm }  from './secrets-manager';
import { vpc } from './vpc';
import { docdb } from './docdb';
import { acm } from './acm';

export const elbUp = elb.up;
export const iamUp = iam.up;
export const s3Up  =  s3.up;
export const smUp  =  sm.up;
export const vpcUp = vpc.up;
export const docdbUp = docdb.up;
export const acmUp = acm.up;
