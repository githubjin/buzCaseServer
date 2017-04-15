import { GraphQLString, GraphQLInt, GraphQLNonNull } from "graphql";
import {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor
} from "graphql-relay";
import Parse from "parse/node";
import RootQueryType from "../query/RootQueryType";
import { ROOT_MASTER } from "../../constants";
var Article = Parse.Object.extend("Article");
module.exports = mutationWithClientMutationId({
  name: "DraftMutation",
  inputFields: {
    order: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "index in drafts"
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "article id"
    }
  },
  outputFields: {
    master: {
      type: RootQueryType,
      resolve: () => ROOT_MASTER
    },
    distroyedId: {
      type: GraphQLString,
      resolve: ({ id }) => id
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
  mutateAndGetPayload: ({ order, id }, req) => {
    var crticleId = fromGlobalId(id).id;
    var article = new Article();
    article.id = crticleId;
    return new Promise((resolve, reject) => {
      article
        .destroy({ sessionToken: req.master.sessionToken })
        .then(deleted => {
          resolve({ id });
        })
        .catch(error => {
          resolve({ error });
        });
    });
  }
});
