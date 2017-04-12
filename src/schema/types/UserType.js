// Parse/eight-words-app/currentUser
// {"username":"1213","email":"1233@qq.com",
// "emailVerified":false,
// "createdAt":"2017-04-09T07:42:36.410Z",
// "sessionToken":"r:52926edf87e251649b255a3c5df27216",
// "updatedAt":"2017-04-09T07:42:36.410Z",
// "objectId":"YKyNrzxvz9","className":"_User"}

// Parse/eight-words-app/installationId
// b81f0ae7-9a5e-7521-9ffa-80fbabf4dda9
// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "./NodeType";

module.exports = new GraphQLObjectType({
  name: "User",
  description: "用户信息",
  fields: () => ({
    id: globalIdField("User"),
    username: {
      type: GraphQLString,
      resolve: source => source.get("username")
    },
    email: {
      type: GraphQLString,
      resolve: source => source.get("email")
    },
    sessionToken: {
      type: GraphQLString,
      resolve: source => source.get("sessionToken")
    },
    emailVerified: {
      type: GraphQLBoolean,
      resolve: source => source.get("emailVerified")
    }
  })
});
