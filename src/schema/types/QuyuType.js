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
import Parse from 'parse/node';
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

const Quyu = Parse.Object.extend('Quyu');

var QuyuType = new GraphQLObjectType({
  name: "Quyu",
  description: "省市县区域信息",
  fields: () => ({
    id: globalIdField('Quyu'),
    ...dictionaryFields,
    isLeaf: {
      type: GraphQLBoolean,
      resolve: obj => obj.get("isLeaf"),
    },
    parent: {
      type: GraphQLString,
      resolve: obj => obj.get("parent"),
    },
    code: {
      type: GraphQLString,
      resolve: obj => obj.get("code"),
    },
    level: {
      type: GraphQLInt,
      resolve: obj => obj.get("level"),
    },
    children: {
      type: new GraphQLList(QuyuType),
      args: {
        code: { type: GraphQLString },
        all: { type: GraphQLBoolean },
      },
      resolve: (quyu, args) => {
        // console.log(args,quyu.get('isLeaf'));
        let { code, all=true } = args;
        if(quyu.get('isLeaf')) {
          return null;
        } else {
          if(all || code === quyu.get('code')) {
              return new Parse.Query(Quyu).equalTo('parent', quyu.get('code')).find();
          } else {
            return null;
          }
        }
      },
    }
  }),
  interfaces: [nodeInterface],
});

export default QuyuType;
