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

import { HomePlaceArgsType } from './commonTypes';

// 查询条件
export const pageArgs = {
  pageSize: {
    type: GraphQLInt,
  },
  page: {
    type: GraphQLInt,
  },
};
export const sorterArgs = {
  sorters: {
    type: new GraphQLList(new GraphQLInputObjectType({
      name: "QuerySorter",
      description: '排序方式',
      fields: {
        order: {
          type: GraphQLString,
        },
        dir: {
          type: GraphQLString,
        },
      },
    })),
  }
};
export const conditionArgs = {
    categories: {
      type: new GraphQLList(GraphQLString),
    },
    gender: {
      type: GraphQLString,
    },
    education: {
      type: GraphQLString,
    },
    birthday: {
      type: GraphQLFloat,
    },
    homePlace: {
      type: HomePlaceArgsType,
    },
    jobs: {
      type: new GraphQLList(GraphQLString),
    },
    marriage: {
      type: GraphQLString,
    },
    createOn: {
      type: GraphQLFloat,
    },
};
