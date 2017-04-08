// @flow
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';
import {
  toGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay';
import FeedbackType from '../types/FeedbackType';
import RootQueryType from '../query/RootQueryType';

export default mutationWithClientMutationId({
  name: "AddFeedback",
  inputFields: {
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isPublic: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
  outputFields: {
    newEdge: {
      type: FeedbackType,
      resolve: (edge) => {
        return edge;
      },
    },
    feedbacks: {

    }
  },
  mutateAndGetPayload: ({text, isPublic}) => {

  },
});
