// @flow
import { GraphQLString } from "graphql";
import { connectionArgs } from "graphql-relay";
import { pageArgs, sorterArgs } from "../types/queryArgs";

export default {
  ...pageArgs,
  ...sorterArgs,
  ...connectionArgs,
  find: {
    type: GraphQLString,
    description: "find by node id"
  }
};
