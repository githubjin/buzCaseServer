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

// 查询结果统计信息等
const PageInfoType = new GraphQLObjectType({
  name: "CustomPageInfo",
  description: "分页统计信息",
  fields: {
    total: {
      type: GraphQLInt,
    },
    totalPage: {
      type: GraphQLInt,
    },
    currentPage: {
      type: GraphQLInt,
    },
    pageSize: {
      type: GraphQLInt,
    },
    hasNextPage: {
      type: GraphQLBoolean,
    },
    hasPreviousPage: {
      type: GraphQLBoolean,
    },
  }
});

export default PageInfoType;
