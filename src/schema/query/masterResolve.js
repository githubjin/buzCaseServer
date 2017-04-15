// @flow
import Parse from "parse/node";
import _ from "lodash";

import { ROOT_MASTER } from "../../constants";
const sessionTokenKey = "sessionToken";

function mergeMaster(user) {
  // console.log(user.id, user.get("username"));
  return {
    id: ROOT_MASTER.id,
    username: user.get("username"),
    email: user.get("email"),
    sessionToken: user.get("sessionToken"),
    emailVerified: user.get("emailVerified"),
    userId: user.id
  };
}

module.exports = (
  source: Object,
  args: Object,
  context: Object,
  ast: Object
) => {
  var { user } = source;
  if (_.isEmpty(user)) {
    // // normal request with sessionToken
    // var authToken = context.sessionToken;
    // console.log(`master resolve sessionToken is ${authToken}`);
    // if (_.isEmpty(authToken)) {
    //   return ROOT_MASTER;
    // }
    // return new Promise((resolve, reject) => {
    //   var Session = Parse.Object.extend("Session");
    //   var query = new Parse.Query(Session);
    //   // must use masterKey
    //   // query.equalTo("sessionToken", authToken);
    //   query.find().then(
    //     session => {
    //       console.log("sessioin", session);
    //       if (session) {
    //         resolve(mergeMaster(session[0].get("user")));
    //       }
    //       resolve(ROOT_MASTER);
    //     },
    //     error => {
    //       console.log("sessioin", error);
    //       reject(error);
    //     }
    //   );
    // });
    return ROOT_MASTER;
  } else {
    // signup or signin
    // console.log(`signup or signin ${user.get("username")}`);
    return mergeMaster(user);
  }
};
