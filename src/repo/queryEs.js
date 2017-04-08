// @flow

import bodybuilder from 'bodybuilder';
import client from '../esClient';

const INDEX_NAME = "buscase";
const TYPE_NAME = "article";

export function searchArticleByTitleOrName(titleOrName: string) {
  var nameBody = bodybuilder()
                .query('match', 'name', titleOrName)
                .size(3)
                .build();
  var titleBody = bodybuilder()
                .query('match', 'title', titleOrName)
                .size(3)
                .build();
  client.msearch({
    body: [
      { index: INDEX_NAME, type: TYPE_NAME },
      nameBody,
      { index: INDEX_NAME, type: TYPE_NAME },
      titleBody
    ]
  }, (...args) => {
    console.log("msearch is done ! ", args.length);
    console.log(args);
    // 具体返回什么数据格式还不确定
  });
}
