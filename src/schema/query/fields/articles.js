// @flow
import {
  CustomConnectionArgs,
  CustomConnectionDifinition
} from "../../connection";
import ArticleType from "../../types/ArticleType";
import customConnectionFromPromiseArray
  from "../customConnectionFromPromiseArray";
import { queryArticle } from "../../../repo/queryParse";
import { conditionArgs } from "../../types/queryArgs";

module.exports = {
  type: CustomConnectionDifinition({ name: "Article", nodeType: ArticleType }),
  description: "八字命理案例列表",
  args: { ...CustomConnectionArgs, ...conditionArgs },
  resolve: (source: Object, args: Object, req: Object) => {
    return customConnectionFromPromiseArray(
      queryArticle({ ...args, sessionToken: req.master.sessionToken }),
      args
    );
  }
};
