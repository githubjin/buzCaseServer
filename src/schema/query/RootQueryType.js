// @flow
import {
  articles,
  feedbacks,
  dictionaries,
  subQuyu,
  autocomplete
} from "./fields";
import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import { globalIdField, fromGlobalId } from "graphql-relay";
import _ from "lodash";
import { nodeInterface } from "../types/NodeType";
import { sign } from "../../jwt";
// import { nodeField } from "../types/NodeType";

module.exports = new GraphQLObjectType({
  name: "User",
  description: "案例记录人(大师)",
  fields: {
    // node: nodeField, // 必须添加在Query根节点下
    id: globalIdField("User"),
    username: {
      type: GraphQLString,
      resolve: source => source.username || source.get("username")
    },
    email: {
      type: GraphQLString,
      resolve: source => source.email || source.get("username")
    },
    sessionToken: {
      type: GraphQLString,
      resolve: user => {
        console.log(JSON.stringify(user));
        var tokens = sign({
          a: user.sessionToken ? user.sessionToken : user.get("sessionToken"),
          b: user.id,
          c: user.username ? user.username : user.get("username"),
          email: user.email ? user.email : user.get("email"),
          emailVerified: _.isBoolean(user.emailVerified)
            ? user.emailVerified
            : user.get("emailVerified")
        });
        return tokens;
      }
    },
    emailVerified: {
      type: GraphQLBoolean,
      resolve: source =>
        (_.isBoolean(source.emailVerified)
          ? source.emailVerified
          : source.get("emailVerified"))
    },
    articles,
    feedbacks,
    ...dictionaries,
    subQuyu,
    autocomplete
  },
  interfaces: [nodeInterface]
});
