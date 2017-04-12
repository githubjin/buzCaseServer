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
import { connectionDefinitions } from "graphql-relay";
import _ from "lodash";

import PageInfoType from "../types/PageInfoType";
import TotalFields from "./TotalFields";

const EdgeTypes = {};
export function getEdgeTypeByNodeName(nodeName: string) {
  return EdgeTypes[nodeName];
}
export default function ComtomConnectionDifinition(
  config: Object
): GraphQLObjectType {
  var nodeType = config.nodeType;
  var name = config.name || nodeType.name;
  var connectionFields = config.connectionFields || TotalFields;
  var {
    connectionType: customConnection,
    edgeType: GraphQLEdge
  } = connectionDefinitions({
    name: name || nodeType.name,
    nodeType,
    connectionFields
  });
  EdgeTypes[name] = GraphQLEdge;
  // var ArticleConnection = new GraphQLObjectType({
  //   name: `${name}Connection`,
  //   description,
  //   fields: {
  //     pageInfo: {
  //       type: PageInfoType,
  //       resolve: parent => {
  //         let total = parent[0];
  //         let { pageSize, page: currentPage } = parent[2];
  //         let totalPage = Math.floor((total / pageSize) + (total % pageSize > 0 ? 1 : 0));
  //         return {
  //           total, currentPage, pageSize, totalPage,
  //           hasNextPage: (currentPage < totalPage),
  //           hasPreviousPage: (currentPage > 1),
  //         }
  //       }
  //     },
  //     edges: {
  //       type: new GraphQLList(nodeType),
  //       resolve: parent => parent[1],
  //     }
  //   },
  // });
  // return ArticleConnection;
  return customConnection;
}
