// @flow

import { GraphQLString, GraphQLInt } from "graphql";
import _ from "lodash";
import {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor
} from "graphql-relay";
import Parse from "parse/node";
// import GenderType from "../types/GenderType";
import RootQueryType from "../query/RootQueryType";
import { getEdgeTypeByNodeName } from "../query/fields/dictionaries";
import DictionaryType from "../types/DictionaryType";
import { resolveUserFromRequest } from "../utils";

const User = Parse.Object.extend("User");
function createDictioaryMutation(parseObjectName: string) {
  return mutationWithClientMutationId({
    name: `${parseObjectName}Mutation`,
    inputFields: {
      name: {
        type: GraphQLString,
        description: "name and order add new record"
      },
      order: {
        type: GraphQLInt,
        description: "name and order add new record"
      },
      id: {
        type: GraphQLString,
        description: "record id, for delete record"
      }
    },
    outputFields: {
      newEdge: {
        type: getEdgeTypeByNodeName(DictionaryType.name),
        resolve: ({ node }) => {
          if (_.isEmpty(node)) {
            return null;
          }
          return {
            cursor: offsetToCursor(node.order),
            node
          };
        }
      },
      viewer: {
        type: RootQueryType,
        resolve: resolveUserFromRequest
      },
      distroyedId: {
        type: GraphQLString,
        resolve: ({ id }) => id
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
    mutateAndGetPayload: ({ name, order, id }, req) => {
      return new Promise((resolve, reject) => {
        var DicClass = Parse.Object.extend(parseObjectName);
        var record = new DicClass();
        // 新增
        if (!_.isEmpty(name) && _.isNumber(order)) {
          record.set("name", name);
          record.set("order", order);
          var user = new User();
          user.id = req.master.userId;
          record.set("owner", user);
          record.setACL(new Parse.ACL(user));
          record.save({}, { sessionToken: req.master.sessionToken }).then(
            node => {
              resolve({ node });
            },
            error => {
              resolve({ error });
            }
          );
        }
        //   删除
        if (!_.isEmpty(id)) {
          var recordId = fromGlobalId(id).id;
          record.id = recordId;
          record.destroy({ sessionToken: req.master.sessionToken }).then(
            node => {
              resolve({ id });
            },
            error => {
              resolve({ error });
            }
          );
        }
      });
    }
  });
}

module.exports = {
  GenderMutation: createDictioaryMutation("Gender"),
  CategoryMutation: createDictioaryMutation("Category"),
  EducationMutation: createDictioaryMutation("Education"),
  JobMutation: createDictioaryMutation("Job"),
  MarriageMutation: createDictioaryMutation("Marriage")
};
