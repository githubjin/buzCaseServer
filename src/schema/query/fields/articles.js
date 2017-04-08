// @flow
import {
  GraphQLInputObjectType,
} from 'graphql';
import ArticleConnection from '../../types/ArticleConnection';
import { pageArgs, sorterArgs, conditionArgs } from '../../types/queryArgs';
import { queryArticle } from '../../../repo/queryParse';

module.exports = {
  type: ArticleConnection,
  description: "八字命理案例列表",
  args: {
    filter: {
      type: new GraphQLInputObjectType({
        name: "articleFilterInput",
        description: "案例查询条件",
        fields: {
          ...pageArgs, ...sorterArgs, ...conditionArgs
        }
      })
    }
  },
  resolve: (source: Object, args: Object) => {
    // console.log(args);
    return queryArticle(args);
  }
};
