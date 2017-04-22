// @flow
import Parse from "parse/node";
import _ from "lodash";

const sessionTokenKey = "sessionToken";
import { resolveUserFromRequest } from "../utils";

//  sessionToken: master.a,
//     userId: master.b,
//     username: master.c,
//     email: master.email,
//     emailVerified: master.emailVerified
module.exports = (source: Object, args: Object, req: Object, ast: Object) => {
  var { user } = source;
  if (_.isEmpty(user)) {
    return resolveUserFromRequest(source, args, req);
  } else {
    return user;
  }
};
