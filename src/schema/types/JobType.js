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

var JobType = new GraphQLObjectType({
  name: "Job",
  description: "工作类型",
  fields: () => ({
    id: globalIdField('Job'),
    ...dictionaryFields,
  }),
  interfaces: [nodeInterface],
});

export default JobType;
