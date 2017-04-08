// @flow
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import {
  nodeInterface
} from './NodeType';

import { Date } from './CustomeScalarTypes';

var NoteType = new GraphQLObjectType({
  name: 'Event',
  description: '案例人的重要事件',
  fields: () => ({
    id: globalIdField("Event"),
    text: {
      type: GraphQLString,
      resolve: parent => parent.get('text'),
    },
    createdAt: {
      type: Date,
      resolve: parent => parent.createdAt,
    },
  }),
  interfaces: [nodeInterface],
});

export default NoteType;
