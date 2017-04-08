// @flow
import Parse from 'parse/node';
import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import SaveArticleMutationArgsTypes from '../types/SaveArticleMutationArgsTypes'
import ArticleType from '../types/ArticleType'

const Article  = Parse.Object.extend('Article');

const SaveArticleMutation = mutationWithClientMutationId({
  name: "SaveArticle",
  inputFields: {
    ...SaveArticleMutationArgsTypes
  },
  outputFields: {
    newArticle: {
      type: ArticleType,
      resolve: ({ id }) => {
        return new Parse.Query(Article).get(id);
      }
    }
  },
  mutateAndGetPayload: ({ id }) => {
    const articleId = fromGlobalId(id).id;
    return { id: articleId };
  },
});

export default SaveArticleMutation;
