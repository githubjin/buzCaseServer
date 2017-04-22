// @flow
import { GraphQLObjectType } from "graphql";
import Parse from "parse/node";

import RootQueryType from "./RootQueryType";
import masterResolve from "./masterResolve";
import { nodeField } from "../types/NodeType";

// 查询
var EightWordsQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: nodeField,
    viewer: {
      type: RootQueryType,
      description: "大师",
      resolve: masterResolve
    }
  })
});

export default EightWordsQueryType;
