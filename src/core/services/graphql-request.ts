import { GraphQLClient } from "graphql-request";
import { getSdk } from "@generated/sdk";

export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);

export const graphSDK = getSdk(graphqlClient);
