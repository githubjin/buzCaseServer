// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLInputObjectType,
} from 'graphql';
import {
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';
import {
  dictionaryFields
} from './fragments';
import {
  nodeInterface
} from './NodeType';

var MarriageType = new GraphQLObjectType({
  name: "Marriage",
  description: "婚姻情况",
  fields: () => ({
    id: globalIdField('Marriage'),
    ...dictionaryFields,
  }),
  interfaces: [nodeInterface],
});

export default MarriageType;
