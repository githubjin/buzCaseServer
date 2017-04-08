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

var GenderType = new GraphQLObjectType({
  name: "Gender",
  description: "性别",
  fields: () => ({
    id: globalIdField('Gender'),
    ...dictionaryFields,
  }),
  interfaces: [nodeInterface],
});

export default GenderType;
