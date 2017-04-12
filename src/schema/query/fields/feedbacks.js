// @flow
import {
  CustomConnectionArgs,
  CustomConnectionDifinition
} from "../../connection";
import { queryFeedback } from "../../../repo/queryParse";
import FeedbackType from "../../types/FeedbackType";
import customConnectionFromPromiseArray
  from "../customConnectionFromPromiseArray";

module.exports = {
  type: CustomConnectionDifinition({
    name: "Feedback",
    nodeType: FeedbackType
  }),
  description: "用户反馈列表分页查询",
  args: CustomConnectionArgs,
  resolve: (source: Object, args: Object, req: Object) => {
    // console.log(req.master.sessionToken);
    return customConnectionFromPromiseArray(
      queryFeedback({ ...args, sessionToken: req.master.sessionToken }),
      args
    );
  }
};
