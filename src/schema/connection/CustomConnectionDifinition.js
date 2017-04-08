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

import PageInfoType from '../types/PageInfoType';

export default function ComtomConnectionDifinition(
  name: string,
  description: string,
  edgeType: GraphQLObjectType
): GraphQLObjectType {
  var ArticleConnection = new GraphQLObjectType({
    name: `${name}Connection`,
    description,
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
        type: new GraphQLList(edgeType),
        resolve: parent => parent[1],
      }
    },
  });
  return ArticleConnection;
}
