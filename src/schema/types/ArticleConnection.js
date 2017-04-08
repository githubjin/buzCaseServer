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

import PageInfoType from './PageInfoType';
import ArticleType from './ArticleType';

var ArticleConnection = new GraphQLObjectType({
  name: "ArticleConnection",
  description: "八字案例命苦列表信息",
  fields: {
    pageInfo: {
      type: PageInfoType,
      resolve: parent => {
        let total = parent[0];
        let { pageSize, page: currentPage } = parent[2];
        let totalPage = Math.floor((total / pageSize) + (total % pageSize > 0 ? 1 : 0));
        return {
          total, currentPage, pageSize, totalPage,
          hasNextPage: (currentPage < totalPage),
          hasPreviousPage: (currentPage > 1),
        }
      }
    },
    edges: {
      type: new GraphQLList(ArticleType),
      resolve: parent => parent[1],
    }
  },
});

export default ArticleConnection;
