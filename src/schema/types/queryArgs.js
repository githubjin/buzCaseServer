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
  GraphQLInputObjectType
} from "graphql";

import { HomePlaceArgsType } from "./commonTypes";

// 查询条件
export const pageArgs = {
  pageSize: {
    type: GraphQLInt
  },
  page: {
    type: GraphQLInt
  }
};
export const sorterArgs = {
  sorters: {
    type: new GraphQLList(
      new GraphQLInputObjectType({
        name: "QuerySorter",
        description: "排序方式",
        fields: {
          order: {
            type: GraphQLString
          },
          dir: {
            type: GraphQLString
          }
        }
      })
    )
  }
};
export const conditionArgs = {
  conditions: {
    type: new GraphQLInputObjectType({
      name: "ArticleFilters",
      description: "案例查询条件",
      fields: {
        categories: {
          type: new GraphQLList(GraphQLString)
        },
        gender: {
          type: GraphQLString
        },
        submit: {
          type: GraphQLBoolean
        },
        education: {
          type: GraphQLString
        },
        birthday: {
          type: GraphQLFloat
        },
        homePlace: {
          type: HomePlaceArgsType
        },
        jobs: {
          type: new GraphQLList(GraphQLString)
        },
        marriage: {
          type: GraphQLString
        },
        createOn: {
          type: GraphQLFloat
        }
      }
    })
  }
};
