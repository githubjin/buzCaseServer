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

var EducationType = new GraphQLObjectType({
  name: "Education",
  description: "最高教育层次",
  fields: () => ({
    id: globalIdField('Education'),
    ...dictionaryFields,
  }),
  interfaces: [nodeInterface],
});

export default EducationType;
