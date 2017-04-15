// @flow
import { GraphQLString, GraphQLBoolean, GraphQLNonNull } from "graphql";
import {
  toGlobalId,
  connectionDefinitions,
  mutationWithClientMutationId,
  offsetToCursor
} from "graphql-relay";
import FeedbackType from "../types/FeedbackType";
import RootQueryType from "../query/RootQueryType";
import Parse from "parse/node";
import _ from "lodash";
import { ROOT_MASTER } from "../../constants";
import { getEdgeTypeByNodeName } from "../connection";

export default mutationWithClientMutationId({
  name: "AddFeedback",
  inputFields: {
    text: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isPublic: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  },
  outputFields: {
    newEdge: {
      type: getEdgeTypeByNodeName("Feedback"),
      resolve: ({ edge }) => {
        return {
          cursor: offsetToCursor(0),
          node: edge
        };
      }
    },
    master: {
      type: RootQueryType,
      resolve: () => ROOT_MASTER
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => {
        if (_.isEmpty(error)) {
          return null;
        }
        return JSON.stringify(error);
      }
    }
  },
  mutateAndGetPayload: ({ text, isPublic }, req) => {
    // console.log("req.master.sessionToken is : ", req.master.sessionToken);
    return new Promise((resolve, reject) => {
      const { userId, username, sessionToken } = req.master;
      var Feedback = Parse.Object.extend("Feedback");
      var User = Parse.Object.extend("User");
      var user = new User();
      user.id = userId;
      var feedback = new Feedback();
      feedback.set("text", text);
      feedback.set("creator", user);
      if (!isPublic) {
        feedback.setACL(new Parse.ACL(user));
      }
      feedback.set("username", username);
      feedback.set("isPublic", isPublic);
      feedback.save({}, { sessionToken }).then(
        obj => {
          resolve({ edge: obj });
        },
        error => {
          resolve({ error });
        }
      );
    });
  }
});
