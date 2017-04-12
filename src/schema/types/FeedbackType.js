// @flow
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
import {
  nodeInterface
} from './NodeType';
import {
  Date
} from './CustomeScalarTypes';

export default new GraphQLObjectType({
  name: "Feedback",
  description: "用户反馈",
  fields: {
    id: globalIdField('Feedback'),
    text: {
      type: GraphQLString,
      resolve: parent => parent.get('text'),
    },
    username: {
      type: GraphQLString,
      resolve: parent => parent.get('username'),
    },
    isPublic: {
      type: GraphQLBoolean,
      resolve: parent => parent.get('isPublic'),
    },
    createdAt: {
      type: Date
    }
  },
  interfaces: [nodeInterface],
});
