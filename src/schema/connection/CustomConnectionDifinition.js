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
import {
  connectionDefinitions,
  offsetToCursor,
  cursorToOffset
} from "graphql-relay";
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
    connectionFields,
    resolveCursor: (source, orignalArgs, req, ast) => {
      var args = getArgsFromAst(ast);
      var { cursor } = source;
      if (!_.isEmpty(args) && args.page && args.pageSize) {
        var offset = cursorToOffset(cursor);
        var { page, pageSize } = args;
        var startOffset = (page - 1) * pageSize;
        return offsetToCursor(startOffset + offset);
      }
      return cursor;
    }
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

function getArgsFromAst(ast: Object): Object {
  var args = {};
  try {
    // console.log(JSON.stringify(ast));
    var _arguments =
      ast.operation.selectionSet.selections[0].selectionSet.selections[0]
        .arguments;
    if (!_.isEmpty(_arguments)) {
      _arguments.forEach(arg => {
        args[arg.name.value] = arg.value.value;
      });
    } else {
      if (!_.isEmpty(ast.variableValues)) {
        args = ast.variableValues;
      }
    }
  } catch (error) {
    console.log("ResolveCursor : get args from ast error: ", error);
  }
  return args;
}
