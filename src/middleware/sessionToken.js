/**
 *  session-token
 */

import { verify } from "../jwt";

module.exports = function(req: Object, res: Object, next: any) {
  Object.defineProperty(req, "master", {
    configurable: true,
    enumerable: true,
    get: getAuthorization
  });

  function getAuthorization() {
    var { headers: { authorization } } = req;
    // console.log(`authorization middleware is get : ${authorization}`);
    if (!authorization) {
      return null;
    } else {
      // { sessionToken: user.sessionToken, userId: user.id }
      // start with "Bearer "
      var master = verify(authorization.substr(7));
      // console.log(master);
      return {
        sessionToken: master.a,
        userId: master.b,
        username: master.c,
        email: master.email,
        emailVerified: master.emailVerified
      };
    }
  }

  next();
};
