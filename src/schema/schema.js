// @flow

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import Parse from "parse/node";

import {
  SaveArticleMutation,
  AddFeedbackMutation,
  SignUpMutation,
  SignInMutation,
  DictionaryMutations,
  DraftMutation
} from "./mutations";
import EightWordsQueryType from "./query";

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    saveArticle: SaveArticleMutation,
    addFeedback: AddFeedbackMutation,
    signUp: SignUpMutation,
    signIn: SignInMutation,
    ...DictionaryMutations,
    DraftMutation
  })
});

export var Schema = new GraphQLSchema({
  query: EightWordsQueryType,
  mutation: mutationType
});
