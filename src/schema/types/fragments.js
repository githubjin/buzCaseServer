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

const dictionaryFields = {
  name: {
    type: GraphQLString,
    resolve: (obj: Object) => obj.get('name'),
  },
  hitrate: {
    type: GraphQLFloat,
    resolve: (obj: Object) => obj.get('hitrate'),
  },
  order: {
    type: GraphQLInt,
    resolve: (obj: Object) => obj.get('order'),
  }
};

export {
  dictionaryFields
};
