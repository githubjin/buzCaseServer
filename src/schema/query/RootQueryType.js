// @flow
import { articles, feedbacks, dictionaries, subQuyu } from "./fields";
import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import { globalIdField, fromGlobalId } from "graphql-relay";
import { nodeInterface } from "../types/NodeType";
import { sign } from "../../jwt";
// import { nodeField } from "../types/NodeType";

module.exports = new GraphQLObjectType({
  name: "MasterType",
  description: "案例记录人(大师)",
  fields: {
    // node: nodeField, // 必须添加在Query根节点下
    id: globalIdField("Master"),
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    sessionToken: {
      type: GraphQLString,
      resolve: user => {
        var tokens = sign({
          a: user.sessionToken,
          b: user.userId,
          c: user.username,
          email: user.email,
          emailVerified: user.emailVerified
        });
        return tokens;
      }
    },
    emailVerified: {
      type: GraphQLBoolean
    },
    articles,
    feedbacks,
    ...dictionaries,
    subQuyu
  },
  interfaces: [nodeInterface]
});
