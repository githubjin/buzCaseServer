// @flow

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import Parse from "parse/node";

import {
  SaveArticleMutation,
  AddFeedbackMutation,
  SignUpMutation,
  SignInMutation,
  DictionaryMutations
} from "./mutations";
import EightWordsQueryType from "./query";

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    saveArticle: SaveArticleMutation,
    addFeedback: AddFeedbackMutation,
    signUp: SignUpMutation,
    signIn: SignInMutation,
    ...DictionaryMutations
  })
});

export var Schema = new GraphQLSchema({
  query: EightWordsQueryType,
  mutation: mutationType
});
