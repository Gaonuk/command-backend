/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    CommandDatabase: {
      clusterArn: string
      database: string
      secretArn: string
      type: "sst.aws.Postgres"
    }
    MyApi: {
      type: "sst.aws.ApiGatewayV2"
      url: string
    }
  }
}
export {}