// @flow

import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import Parse from 'parse/node';

import { SaveArticleMutation } from './mutations';
import EightWordsQueryType from './query';

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    saveArticle: SaveArticleMutation,
  }),
});

export var Schema = new GraphQLSchema({
  query: EightWordsQueryType,
  mutation: mutationType,
});
