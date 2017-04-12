// @flow
import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import _ from "lodash";
import Parse from "parse/node";
import RootQueryType from "../query/RootQueryType";
import masterResolve from "../query/masterResolve";

export default mutationWithClientMutationId({
  name: "SignUp",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => {
        if (_.isEmpty(error)) {
          return null;
        }
        return JSON.stringify(error);
      }
    },
    master: {
      type: RootQueryType,
      resolve: masterResolve
    }
  },
  mutateAndGetPayload: ({ username, password, email }) => {
    return new Promise((resolve, reject) => {
      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.set("emailVerified", false);
      user.signUp(null, {
        success: user => {
          resolve({ user });
        },
        error: (user, error) => {
          resolve({ error });
        }
      });
    });
  }
});
