// @flow
import { GraphQLString, GraphQLList } from "graphql";
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray
} from "graphql-relay";
import Parse from "parse/node";
import QuyuType from "../../types/QuyuType";
const Quyu = Parse.Object.extend("Quyu");

module.exports = {
  type: new GraphQLList(QuyuType),
  description: "获取市县区级列表",
  args: {
    code: {
      type: GraphQLString
    }
  },
  resolve: (source: Object, args: Object, req: Object) => {
    var Quyu = Parse.Object.extend("Quyu");
    var query = new Parse.Query(Quyu);
    if (!args.code) {
      return [];
    }
    return query.equalTo("parent", args.code).find();
    // .find({ sessionToken: req.mster.sessionToken });
  }
};
