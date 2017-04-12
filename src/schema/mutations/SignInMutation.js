// @flow
import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import _ from "lodash";
import Parse from "parse/node";
import RootQueryType from "../query/RootQueryType";
import masterResolve from "../query/masterResolve";

export default mutationWithClientMutationId({
  name: "SignIn",
  inputFields: {
    username: {
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
  mutateAndGetPayload: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      Parse.User.logIn(username, password, {
        success: function(user) {
          resolve({ user });
        },
        error: function(user, error) {
          resolve({ error });
        }
      });
    });
  }
});
