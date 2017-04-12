// @flow
import {
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

module.exports = {
  totalInfo: {
    type: new GraphQLObjectType({
      name: "TotalInfo",
      description: "数据的统计信息",
      fields: {
        total: {
          type: GraphQLInt,
          description: "数据总数",
        },
        totalPage: {
          type: GraphQLInt,
          description: "数据总页",
        },
        currentPage: {
          type: GraphQLInt,
          description: "当前页码",
        },
        pageSize: {
          type: GraphQLInt,
          description: "每页数据数量",
        },
      },
    })
  }
};
