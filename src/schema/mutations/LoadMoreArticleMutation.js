// @flow
import {
  toGlobalId,
  connectionDefinitions,
  mutationWithClientMutationId,
  offsetToCursor
} from "graphql-relay";
import _ from 'lodash';
import { GraphQLList, GraphQLString, GraphQLObjectType
  , GraphQLInt } from "graphql";
import {
  CustomConnectionArgs,
  CustomConnectionDifinition,
  getEdgeTypeByNodeName
} from "../connection";
import RootQueryType from "../query/RootQueryType";
import { resolveUserFromRequest } from "../utils";
import customConnectionFromPromiseArray
  from "../query/customConnectionFromPromiseArray";
import { queryArticle } from "../../repo/queryParse";
import { conditionArgs } from "../types/queryArgs";

export default mutationWithClientMutationId({
  name: "LoadMoreArticle",
  inputFields: {
    ...CustomConnectionArgs,
    ...conditionArgs
  },
  outputFields: {
    newEdges: {
      type: new GraphQLList(getEdgeTypeByNodeName("Article")),
      resolve: ({ edges }) => edges
    },
    pagination: {
      type: new GraphQLObjectType({
        name: "Pagination",
        description: "分页信息",
        fields: {
          total: {
            type: GraphQLInt
          },
          currentPage: {
            type: GraphQLInt
          },
          totalPage: {
            type: GraphQLInt
          },
          pageSize: {
            type: GraphQLInt
          }
        }
      }),
      resolve: ({ totalInfo }) => totalInfo
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => {
        if (_.isEmpty(error)) {
          return null;
        }
        return JSON.stringify(error);
      }
    },
    viewer: {
      type: RootQueryType,
      resolve: resolveUserFromRequest
    },
  },
  mutateAndGetPayload: (args, req) => {
    return new Promise((resolve, reject) => {
      customConnectionFromPromiseArray(
        queryArticle({ ...args, sessionToken: req.master.sessionToken }),
        args
      ).then(connections => {
        resolve(connections);
      }).catch(error => {
        reject(error);
      });
    });
  }
})
