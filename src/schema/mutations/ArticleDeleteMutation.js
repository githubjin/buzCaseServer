// @flow

import { GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import _ from "lodash";
import RootQueryType from "../query/RootQueryType";
import Parse from "parse/node";
import { resolveUserFromRequest } from "../utils";

const Article = Parse.Object.extend("Article");

module.exports = mutationWithClientMutationId({
  name: "ArticleDelete",
  description: "Article Delete by article id",
  inputFields: {
    id: {
      type: GraphQLString
    }
  },
  outputFields: {
    distroyedId: {
      type: GraphQLString,
      resolve: ({ id }) => id
    },
    viewer: {
      type: RootQueryType,
      resolve: resolveUserFromRequest
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => {
        if (_.isEmpty(error)) {
          return null;
        }
        return JSON.stringify(error);
      }
    }
  },
  mutateAndGetPayload: ({ id }, req) => {
    return new Promise((resolve, reject) => {
      var article = new Article();
      article.id = fromGlobalId(id).id;
      article.set("isvalid", false);
      article.save(null, { sessionToken: req.master.sessionToken }).then(
        obj => {
          resolve({ id });
        },
        error => {
          resolve({ error });
        }
      );
    });
  }
});
