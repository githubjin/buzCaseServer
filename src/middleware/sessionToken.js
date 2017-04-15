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
      // {"a":"r:551adab952ba266d559b7325b06b75b7","b":"XLORYaOJTp","c":"Xiao","email":"000@qq.com","emailVerified":false,"iat":1492248866}
      // return {
      //   sessionToken: "r:551adab952ba266d559b7325b06b75b7",
      //   userId: "XLORYaOJTp",
      //   username: "Xiao",
      //   email: "000@qq.com",
      //   emailVerified: false,
      //   iat: 1492248866
      // };
    } else {
      // { sessionToken: user.sessionToken, userId: user.id }
      // start with "Bearer "
      var master = verify(authorization.substr(7));
      // console.log(JSON.stringify(master));
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
