// @flow
import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

var AutoCompleteRecord = new GraphQLObjectType({
  name: "AutoCompleteRecord",
  description: "Header搜索结果记录",
  fields: () => ({
    article: {
      type: GraphQLString,
      resolve: parent => parent.article
    },
    name: {
      type: GraphQLString,
      resolve: parent => parent.name
    },
    title: {
      type: GraphQLString,
      resolve: parent => parent.title
    },
    highlight: {
      type: GraphQLString,
      resolve: parent => parent.highlight
    },
    createdAt: {
      type: GraphQLString,
      resolve: parent => parent.createdAt
    }
  })
});

var AutoCompleteDatasource = new GraphQLObjectType({
  name: "AutoCompleteDatasource",
  description: "Header搜索结果集合",
  fields: () => ({
    names: {
      type: new GraphQLList(AutoCompleteRecord),
      resolve: source => source.names
    },
    titles: {
      type: new GraphQLList(AutoCompleteRecord),
      resolve: source => source.titles
    }
  })
});

export default AutoCompleteDatasource;
