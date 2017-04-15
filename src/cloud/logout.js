// @flow
import Parse from "parse/node";

Parse.Cloud.define("logout", function(request, response) {
  var params = request.params;
  var sessionToken = params.sessionToken;
  new Parse.Query(Parse.Session)
    .equalTo("sessionToken", sessionToken)
    .find({ sessionToken, useMasterKey: true })
    .then(function(results) {
      if (results.length === 0) {
        throw new Error("No Sessioin combination found");
      }
      return results[0].destroy({ useMasterKey: true });
    })
    .then(
      function(session) {
        response.success(session);
      },
      function(error) {
        throw new Error(JSON.stringify(error));
      }
    );
});
