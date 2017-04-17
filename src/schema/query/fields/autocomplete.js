// @flow
import AutoCompleteDatasource from "../../types/AutoCompleteDatasource";
import { GraphQLString, GraphQLNonNull, GraphQLInt } from "graphql";
import { searchArticleByTitleOrName } from "../../../repo/queryEs";
import _ from "lodash";
import { toGlobalId } from "graphql-relay";
module.exports = {
  type: AutoCompleteDatasource,
  description: "Header 搜索查询",
  args: {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (source: Object, args: Object, req: Object) => {
    var currentUsername = req.master.username;
    return new Promise((resolve, reject) => {
      searchArticleByTitleOrName(args.token, currentUsername, args.size)
        .then(responses => {
          if (_.isArray(responses) && responses.length === 0) {
            resolve({ names: [], titles: [] });
          } else {
            var names = mapResponse(responses, 0);
            var titles = mapResponse(responses, 1);
            resolve({ names, titles });
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
};

function mapResponse(responses: Array<Object>, index: number): Array<Object> {
  //   console.log(JSON.stringify(responses[index].aggregations.dedup.buckets));
  return responses[index].aggregations.dedup.buckets.map(bucket => {
    var { highlight, _source: source } = bucket.dedup_docs.hits.hits[0];
    // console.log("source.createdAt", source.createdAt, typeof source.createdAt);
    return {
      article: toGlobalId("Article", source.id),
      name: highlight.name ? highlight.name[0] : source.name,
      title: highlight.title ? highlight.title[0] : source.title,
      highlight: highlight.name ? highlight.name[0] : highlight.title[0],
      // name: source.name,
      // title: source.title,
      // highlight: index ? source.name : source.title,
      createdAt: source.createdAt
    };
  });
}
