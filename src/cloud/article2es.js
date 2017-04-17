// @flow
import Parse from "parse/node";
import moment from "moment";
import client from "../esClient";
import {
  ARTICLE_TYPE,
  ARTICLE_INDEX_STANDARD,
  ARTICLE_INDEX_IK
} from "../constants";

Parse.Cloud.beforeSave("Article", function(request, response) {
  var submit = request.object.get("submit");
  if (submit) {
    var name = request.object.get("name");
    var title = request.object.get("title");
    var articleId = request.object.id;
    var owner = request.object.get("owner");
    owner.fetch({
      useMasterKey: true,
      success: function(user) {
        var username = user.get("username");
        saveArticle2Es(
          ARTICLE_INDEX_STANDARD,
          articleId,
          title,
          name,
          username
        );
        saveArticle2Es(ARTICLE_INDEX_IK, articleId, title, name, username);
      },
      error: function(gameScore, error) {
        console.log("fetch user error", JSON.stringify(error));
      }
    });
  }
  response.success();
});
function callback(error, response) {
  if (error) {
    console.log("Save Article to es error : ", JSON.stringify(error));
    console.log("Save Article to es response : ", JSON.stringify(response));
  }
}
function saveArticle2Es(
  index: string,
  articleId: string,
  title: string,
  name: string,
  username: string
) {
  isExists(index, articleId)
    .then(isExists => {
      if (isExists === true) {
        update(index, articleId, title, name, username);
      } else {
        create(index, articleId, title, name, username);
      }
    })
    .catch(error => {
      console.log("check article indexed before failed", error);
    });
}
function create(
  index: string,
  articleId: string,
  title: string,
  name: string,
  username: string
) {
  client.create(
    {
      index: index,
      type: ARTICLE_TYPE,
      id: articleId,
      body: {
        id: articleId,
        title,
        name,
        user: username,
        createdAt: moment().format("YYYY-MM-DD hh:mm")
      }
    },
    callback
  );
}
function update(
  index: string,
  articleId: string,
  title: string,
  name: string,
  username: string
) {
  client.update(
    {
      index: index,
      type: ARTICLE_TYPE,
      id: articleId,
      body: {
        doc: {
          id: articleId,
          title,
          name,
          user: username,
          createdAt: moment().format("YYYY-MM-DD hh:mm")
        }
      }
    },
    callback
  );
}
function isExists(index: string, articleId: string) {
  return new Promise((resolve, reject) => {
    client.exists(
      {
        index: index,
        type: ARTICLE_TYPE,
        id: articleId
      },
      function(error, exists) {
        if (!error) {
          resolve(exists);
        } else {
          reject(error);
        }
      }
    );
  });
}
