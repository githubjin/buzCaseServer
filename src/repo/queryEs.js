// @flow

import bodybuilder from "bodybuilder";
import client from "../esClient";

import {
  ARTICLE_INDEX,
  ARTICLE_TYPE,
  ARTICLE_INDEX_STANDARD,
  ARTICLE_INDEX_IK
} from "../constants";
import { autocomplete } from "./queryBuilder";

export function searchArticleByTitleOrName(
  titleOrName: string,
  username: string,
  size: number
): Promise<*> {
  var nameBody = autocomplete(username, "name", titleOrName, size);
  var titleBody = autocomplete(username, "title", titleOrName, size);
  // console.log(JSON.stringify(nameBody));
  // console.log(JSON.stringify(titleBody));
  return new Promise((resolve, reject) => {
    client.msearch(
      {
        body: [
          { index: ARTICLE_INDEX, type: ARTICLE_TYPE },
          nameBody,
          { index: ARTICLE_INDEX, type: ARTICLE_TYPE },
          titleBody
        ]
      },
      (error, response, status) => {
        if (error) {
          reject(error);
        } else {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.responses);
          }
        }
      }
    );
  });
}
