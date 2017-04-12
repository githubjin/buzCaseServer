// @flow

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { toGlobalId, fromGlobalId } from "graphql-relay";

const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value: number) {
      return new Date(value); // value from the client
    },
    serialize(value: Date) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  UserID: new GraphQLScalarType({
    name: "UserID",
    description: "User id code and decode",
    parseValue(value: string) {
      return fromGlobalId(value).id;
    },
    serialize(value: string) {
      return toGlobalId("cangtiandadi", value);
    },
    parseLiteral(ast: any) {
      return ast.value;
    }
  })
};

module.exports = resolverMap;
