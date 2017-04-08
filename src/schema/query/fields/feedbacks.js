// @flow
import {
  CustomConnectionArgs,
  CustomConnectionDifinition
} from '../../connection';
import { queryFeedback } from '../../../repo/queryParse';
import FeedbackType from '../../types/FeedbackType';

module.exports = {
  type: CustomConnectionDifinition("Feedback", "用户反馈列表", FeedbackType),
  description: "用户反馈列表分页查询",
  args: CustomConnectionArgs,
  resolve: (source: Object, args: Object) => {
    return queryFeedback(args);
  }
};
