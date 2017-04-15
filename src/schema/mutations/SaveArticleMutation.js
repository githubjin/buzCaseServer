// @flow
import Parse from "parse/node";
import {
  fromGlobalId,
  mutationWithClientMutationId,
  connectionFromArray,
  toGlobalId
} from "graphql-relay";
import _ from "lodash";
import { GraphQLList, GraphQLString } from "graphql";

import SaveArticleMutationArgsTypes
  from "../types/SaveArticleMutationArgsTypes";
import FlatArticleMutationArgs from "../types/FlatArticleMutationArgs";
import ArticleType, { getEventOrNoteEdgeType } from "../types/ArticleType";

type Args = {
  id: string,
  keys: string[],
  values: string[],
  subEvents: string[],
  subNotes: string[],
  addEvents: string[],
  addNotes: string[],
  noteIds: string[],
  noteValues: string[],
  eventIds: string[],
  eventValues: string[],
  submit: boolean
};
type Response = [[Object, Object[], Object[]], Object[], Object[], Object[], Object[]];

const Article = Parse.Object.extend("Article");
const User = Parse.Object.extend("User");

// string parse to string or array or object
function getTureValue(
  values: string
): string | string[] | Object | Date | null {
  if (_.isEmpty(values)) {
    return null;
  }
  // console.log(values, typeof values);
  if (
    (_.startsWith(values, "[") && _.endsWith(values, "]")) ||
    (_.startsWith(values, "{") && _.endsWith(values, "}"))
  ) {
    return JSON.parse(values);
  }
  if (_.startsWith(values, "Date:")) {
    return new Date(parseInt(values.substr(5)));
  }
  return values;
}

const SaveArticleMutation = mutationWithClientMutationId({
  name: "ArticleMutation",
  inputFields: {
    ...FlatArticleMutationArgs
  },
  outputFields: {
    keys: {
      type: new GraphQLList(GraphQLString),
      resolve: source => {
        // console.log(JSON.stringify(source[5]));
        return source[5].keys;
      }
    },
    eventKey2Ids: {
      type: new GraphQLList(GraphQLString),
      resolve: source => {
        return source[0][1].map(
          event => `${event.get("key")}::${toGlobalId("Event", event.id)}`
        );
      }
    },
    article: {
      type: ArticleType,
      resolve: (source: Response) => {
        // console.log(source[0][0]);
        return source[0][0];
      }
    },
    newEvents: {
      type: new GraphQLList(getEventOrNoteEdgeType("Event")),
      resolve: (source: Response, args) => {
        return connectionFromArray(source[0][1], args).edges;
      }
    },
    newNotes: {
      type: new GraphQLList(getEventOrNoteEdgeType("Note")),
      resolve: (source: Response, args) => {
        return connectionFromArray(source[0][2], args).edges;
      }
    },
    subEvents: {
      type: new GraphQLList(getEventOrNoteEdgeType("Event")),
      resolve: (source: Response, args) => {
        return connectionFromArray(source[1], args).edges;
      }
    },
    subNotes: {
      type: new GraphQLList(getEventOrNoteEdgeType("Note")),
      resolve: (source: Response, args) => {
        // console.log(source[2]);
        return connectionFromArray(source[2], args).edges;
      }
    },
    updatedEvents: {
      type: new GraphQLList(getEventOrNoteEdgeType("Event")),
      resolve: (source: Response, args) => {
        return connectionFromArray(source[3], args).edges;
      }
    },
    updatedNotes: {
      type: new GraphQLList(getEventOrNoteEdgeType("Note")),
      resolve: (source: Response, args) => {
        // console.log(source);
        return connectionFromArray(source[4], args).edges;
      }
    }
  },
  mutateAndGetPayload: (
    {
      id = "new",
      keys,
      values,
      subEvents,
      subNotes,
      addEvents,
      addNotes,
      noteIds,
      noteValues,
      eventIds,
      eventValues,
      submit = false
    }: Args,
    req
  ) => {
    // console.log("req.master.sessionToken is : ", req.master.sessionToken, 1);
    var Article = Parse.Object.extend("Article");
    return Promise.all([
      updateArticleAddEN(id, submit, keys, values, addEvents, addNotes, req),
      subEventOrNote("Event", subEvents, req),
      subEventOrNote("Note", subNotes, req),
      updateEventOrNote("Event", eventIds, eventValues, req),
      updateEventOrNote("Note", noteIds, noteValues, req),
      { keys }
    ]);
  }
});
function updateEventOrNote(
  type: string,
  ids: string[],
  texts: string[],
  req: Object
): Promise<*> {
  // console.log("req.master.sessionToken is : ", req.master.sessionToken, 4);
  if (_.isEmpty(ids) || _.isEmpty(texts) || ids.length !== texts.length) {
    return Promise.resolve([]);
  }
  var ClassType = Parse.Object.extend(type);
  return Promise.all(
    ids.map((id, index) => {
      var objId = fromGlobalId(id).id;
      var obj = new ClassType();
      obj.id = objId;
      obj.set("text", texts[index]);
      return obj.save({}, { sessionToken: req.master.sessionToken });
    })
  );
}

function subEventOrNote(
  type: string,
  subEventsOrNotes: string[],
  req: Object
): Promise<*> {
  // console.log("req.master.sessionToken is : ", req.master.sessionToken, 3);
  if (_.isEmpty(subEventsOrNotes)) {
    return Promise.resolve([]);
  }
  var EventOrNote = Parse.Object.extend(type);
  return Promise.all(
    subEventsOrNotes.map(id => {
      var obj = new EventOrNote();
      const objId = fromGlobalId(id).id;
      // console.log(objId);
      obj.id = objId;
      obj.set("isvalid", false);
      return obj.save({}, { sessionToken: req.master.sessionToken });
    })
  );
}
// 修改article 和 添加 event 后 note
function updateArticleAddEN(
  id,
  submit,
  keys,
  values,
  addEvent,
  addNote,
  req
): Promise<*> {
  // console.log("req.master.sessionToken is : ", req.master.sessionToken, 2);
  if (
    !submit &&
    _.isEmpty(keys) &&
    _.isEmpty(values) &&
    _.isEmpty(addEvent) &&
    _.isEmpty(addNote)
  ) {
    var articleOnlyId = new Article();
    articleOnlyId.id = fromGlobalId(id).id;
    return Promise.resolve([articleOnlyId, [], []]);
  }
  return new Promise((resolve, reject) => {
    var article;
    if (id === "new") {
      article = new Article();
      article.set("submit", submit);
      var user = new User();
      user.id = req.master.userId;
      article.set("owner", user);
      article.setACL(new Parse.ACL(user));
      article
        .save({}, { sessionToken: req.master.sessionToken })
        .then(obj => resolve(obj), error => reject(error));
    } else {
      const articleId = fromGlobalId(id).id;
      var query = new Parse.Query(Article);
      query
        .get(articleId, { sessionToken: req.master.sessionToken })
        .then((obj: any) => resolve(obj), error => reject(error));
    }
  }).then(_article => {
    _article.set("submit", submit);
    _article.set("isvalid", true);
    // fill _Article fields values
    if (
      !_.isEmpty(keys) && !_.isEmpty(values) && keys.length === values.length
    ) {
      keys.forEach((key, index) => {
        _article.set(key, getTureValue(values[index]));
      });
    }
    var promiseArr = [];
    // save _article
    promiseArr.push(
      _article.save({}, { sessionToken: req.master.sessionToken })
    );
    // save events
    promiseArr.push(addEventOrNote("Event", _article, addEvent, req));
    // save notes
    promiseArr.push(addEventOrNote("Note", _article, addNote, req));
    return Promise.all(promiseArr);
  });
}
// 添加案例重大事件或备注
function addEventOrNote(type, article, eventOrNoteValues, req): Promise<*> {
  if (_.isEmpty(eventOrNoteValues)) {
    return Promise.resolve([]);
  }
  var EventOrNote = Parse.Object.extend(type);
  var promiseArr = [];
  eventOrNoteValues.forEach(content => {
    var eventOrNote = new EventOrNote();
    eventOrNote.set("parent", article);
    var keyAndContent = splitKeyAndContent(content);
    if (_.isArray(keyAndContent)) {
      // for client remove or update opration
      eventOrNote.set("key", keyAndContent[0]);
      eventOrNote.set("text", keyAndContent[1]);
    } else {
      eventOrNote.set("text", content);
    }
    eventOrNote.set("isvalid", true);
    var user = new User();
    user.id = req.master.userId;
    eventOrNote.set("owner", user);
    eventOrNote.setACL(new Parse.ACL(user));
    promiseArr.push(
      eventOrNote.save({}, { sessionToken: req.master.sessionToken })
    );
  });
  return Promise.all(promiseArr);
}

function splitKeyAndContent(text: string): string | string[] {
  var arr = text.split("::");
  if (arr.length === 2) {
    return arr;
  }
  return text;
}

export default SaveArticleMutation;
