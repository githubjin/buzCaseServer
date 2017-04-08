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

var CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "案例类型",
  fields: () => ({
    id: globalIdField('Category'),
    ...dictionaryFields,
  }),
  interfaces: [nodeInterface],
});

export default CategoryType;
