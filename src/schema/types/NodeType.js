// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLInputObjectType
} from "graphql";
import Parse from "parse/node";
import {
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from "graphql-relay";
import { ROOT_MASTER } from "../../constants";

const Article = Parse.Object.extend("Article");
const Category = Parse.Object.extend("Category");
const Education = Parse.Object.extend("Education");
const Job = Parse.Object.extend("Job");
const Quyu = Parse.Object.extend("Quyu");
const Gender = Parse.Object.extend("Gender");
const Marriage = Parse.Object.extend("Marriage");
const Note = Parse.Object.extend("Note");
const Event = Parse.Object.extend("Event");
const Feedback = Parse.Object.extend("Feedback");
const User = Parse.Object.extend("User");

function findObjectByGlobalId(globalId, req) {
  if (globalId === "new") {
    return null;
  }
  const { type, id } = fromGlobalId(globalId);
  if (type === "Master") {
    return ROOT_MASTER;
  }
  const Ent = {
    Article,
    Category,
    Education,
    Job,
    Quyu,
    Gender,
    Marriage,
    Note,
    Event,
    Feedback,
    User
  }[type];
  var result = new Parse.Query(Ent).get(id, {
    sessionToken: req.master.sessionToken
  });
  return result;
}

function objectToGraphQLType(obj) {
  switch (obj.className) {
    case "Article":
      return require("./ArticleType").default;
    case "Category":
      return require("./CategoryType").default;
    case "Education":
      return require("./EducationType").default;
    case "Job":
      return require("./JobType").default;
    case "Quyu":
      return require("./QuyuType").default;
    case "Gender":
      return require("./GenderType").default;
    case "Marriage":
      return require("./MarriageType").default;
    case "Note":
      return require("./NoteType").default;
    case "Event":
      return require("./EventType").default;
    case "Feedback":
      return require("./FeedbackType").default;
    case "Master":
      return require("../query/RootQueryType");
    case "User":
      return require("./UserType");
    default:
      return null;
  }
}

var { nodeInterface, nodeField } = nodeDefinitions(
  findObjectByGlobalId,
  objectToGraphQLType
);
module.exports = {
  nodeInterface,
  nodeField
};
