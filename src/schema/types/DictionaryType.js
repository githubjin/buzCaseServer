// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
import {
  dictionaryFields
} from './fragments';
import {
  nodeInterface
} from './NodeType';

var DictionaryType = new GraphQLObjectType({
  name: "Dictionary",
  description: "通用数据字典",
  fields: () => ({
    id: globalIdField('Education'),
    ...dictionaryFields,
  }),
  args: {
    code: { type: GraphQLString }
  },
  interfaces: [nodeInterface],
});

export default DictionaryType;
