// @flow
import Parse from "parse/node";

type Master = { userId: string, sessionToken: string };

module.exports = function({ userId, sessionToken }: Master) {
  var User = Parse.Object.extend("User");
  var query = new Parse.Query(User);
  return new Promise((resolve, reject) => {
    query.get(userId, { sessionToken }).then(
      user => {
        resolve(user);
      },
      error => {
        reject(error);
      }
    );
  });
};
