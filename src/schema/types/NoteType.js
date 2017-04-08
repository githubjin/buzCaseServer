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
  name: 'Note',
  description: '案例后续追加的分析',
  fields: () => ({
    id: globalIdField("Note"),
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
