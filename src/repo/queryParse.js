// @flow
import Parse from "parse/node";
import _ from "lodash";
import {cursorToOffset} from 'graphql-relay'
import { SORT_TYPE_ASC } from "../constants";
import type { Conditions, CommonArgsWithToken } from "./types";
import { addSortToQuery } from "./utils";

const ONE_DAY = 24 * 60 * 60 * 1000;

export function queryArticle({
  conditions,
  pageSize,
  page,
  sorters,
  first,
  after,
  sessionToken
}: CommonArgsWithToken) {
  var filters = conditions || {};
  const {
    education,
    categories,
    gender,
    birthday,
    homePlace,
    jobs,
    marriage,
    createOn,
    submit = true
  } = filters;
  const Article = Parse.Object.extend("Article");
  var query = new Parse.Query(Article);
  query.equalTo("isvalid", true);
  query.equalTo("submit", submit);
  if (!_.isEmpty(categories)) {
    query.containsAll("categories", categories);
  }
  if (!_.isEmpty(jobs)) {
    query.containsAll("jobs", jobs);
  }
  if (!_.isEmpty(gender)) {
    query.equalTo("gender", gender);
  }
  if (!_.isEmpty(education)) {
    query.equalTo("education", education);
  }
  if (!_.isEmpty(marriage)) {
    query.equalTo("marriage", marriage);
  }
  if (homePlace != null) {
    const { province, city, area } = homePlace;
    if (!_.isEmpty(province)) {
      query.equalTo("homePlace.province", province);
    }
    if (!_.isEmpty(city)) {
      query.equalTo("homePlace.city", city);
    }
    if (!_.isEmpty(area)) {
      query.equalTo("homePlace.area", area);
    }
  }
  // 这一天出生的人
  if (_.isNumber(birthday) && _.gt(birthday, 0)) {
    query.greaterThanOrEqualTo("birthday", new Date(birthday));
    query.lessThan("birthday", new Date(birthday + ONE_DAY));
  }
  // 这一天添加的案例
  if (_.isNumber(createOn) && _.gt(createOn, 0)) {
    query.greaterThanOrEqualTo("createdAt", new Date(createOn));
    query.lessThan("createdAt", new Date(createOn + ONE_DAY));
  }
  var skiper = 0;
  if(!page && !pageSize) {
    if(!_.isEmpty(after)) {
      skiper = cursorToOffset(after) + 1;
      pageSize = 10;
      let total = first + skiper;
      page = Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);
    } else if(first){
      pageSize = 10;
      page = Math.floor(first/pageSize) + (first%pageSize===0?0:1);
      skiper = (page - 1) * pageSize;
    }
  }else {
    skiper = (page - 1) * pageSize;
  }

  query.limit(pageSize);
  query.skip(skiper);
  if (sorters != null && !_.isEmpty(sorters)) {
    _.forEachRight(sorters, sorter => {
      if (sorter.dir === SORT_TYPE_ASC) {
        query.ascending(sorter.order);
      } else {
        query.descending(sorter.order);
      }
    });
  }
  return Promise.all([
    query.count({ sessionToken }),
    query.find({ sessionToken }),
    Promise.resolve({ page, pageSize })
  ]);
}

export function findEventOrNoteByArticle(
  type: string,
  parent: Object,
  sessionToken: string
) {
  var Obj = Parse.Object.extend(type);
  return new Parse.Query(Obj)
    .equalTo("isvalid", true)
    .equalTo("parent", parent)
    .find({ sessionToken });
}

export function queryFeedback(
  args: CommonArgsWithToken = { page: 1, pageSize: 10 }
): Promise<*> {
  let { page, pageSize, sorters, sessionToken } = args;
  var Feedback = Parse.Object.extend("Feedback");
  var query = new Parse.Query(Feedback);
  query.limit(pageSize);
  if (page > 1) {
    query.skip((page - 1) * pageSize);
  }
  query = addSortToQuery(query, sorters);
  // console.log("queryFeedback ", sessionToken);
  return Promise.all([
    query.count({ sessionToken }),
    query.find({ sessionToken }),
    Promise.resolve({ page, pageSize })
  ]);
}
