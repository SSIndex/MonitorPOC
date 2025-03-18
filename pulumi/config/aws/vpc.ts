import { docdb, ec2, rds } from '@pulumi/aws';
import { ec2 as ec2x } from '@pulumi/awsx';

export const vpc = (() => {

  // const up = (prjName: (_: string) => string, Vpc: ec2x.Vpc | null) => {
    const up = (prjName: (_: string) => string) => {

    const vpc = new ec2.DefaultVpc("default", {
      tags: {
          Name: "Default VPC",
      },
  });

    // Security groups and Private subnets setups for DocumentDB
    const docdbSecurityGroup = new ec2.SecurityGroup("docdbSecurityGroup", {
      description: "Allow inbound traffic to DocumentDB",
      vpcId: vpc.id,
      ingress: [
          { description: "Allow SSH access", protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
          { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: [vpc.cidrBlock] }, // Allow HTTP
          { protocol: "tcp", fromPort: 3003, toPort: 3003, cidrBlocks: [vpc.cidrBlock] }, // Allow Next App
          { protocol: "tcp", fromPort: 27017, toPort: 27017, cidrBlocks: [vpc.cidrBlock] }, // Allow MongoDB/DocDB ports
      ],
      egress: [
          {
              description: "Allow all outbound traffic",
              fromPort: 0,
              toPort: 0,
              protocol: "-1",
              cidrBlocks: ["0.0.0.0/0"],
              ipv6CidrBlocks: ["::/0"],
          },
      ],
  });
    
    // TODO: CHECK THIS
    // const dbSubnets = new docdb.SubnetGroup(prjName('db-subnets'), {
    //   subnetIds: vpc.publicSubnetIds,
    // });

    return {
      vpc,
      docdbSecurityGroup,
      // dbSubnets,
    }
  }

  return {
    up,
  }
})()
