// @flow
import Parse from 'parse/node';
import _ from 'lodash';
import {
  SORT_TYPE_ASC ,
} from '../constants';
import type { ConditionsWrap, CommonArgs } from './types';
import { addSortToQuery } from './utils';

const ONE_DAY = 24 * 60 * 60 * 1000;

export function queryArticle({filter: {education, pageSize, page, sorters, categories, gender,
  birthday, homePlace, jobs, marriage, createOn}}: ConditionsWrap) {
  const Article  = Parse.Object.extend('Article');
  var query = new Parse.Query(Article);
  query.equalTo("isvalid", true);
  if(!_.isEmpty(categories)) {
    query.containsAll("categories", categories);
  }
  if(!_.isEmpty(jobs)) {
    query.containsAll("jobs", jobs);
  }
  if(!_.isEmpty(gender)) {
    query.equalTo("gender", gender);
  }
  if(!_.isEmpty(education)) {
    query.equalTo("education", education);
  }
  if(!_.isEmpty(marriage)) {
    query.equalTo("marriage", marriage);
  }
  if(homePlace !=null) {
    const { province, city, area } = homePlace;
    if(!_.isEmpty(province)) {
        query.equalTo("homePlace.province", province);
    }
    if(!_.isEmpty(city)) {
        query.equalTo("homePlace.city", city);
    }
    if(!_.isEmpty(area)) {
        query.equalTo("homePlace.area", area);
    }
  }
  // 这一天出生的人
  if(_.isNumber(birthday) && _.gt(birthday, 0)) {
    query.greaterThanOrEqualTo("birthday", new Date(birthday));
    query.lessThan("birthday", new Date(birthday + ONE_DAY));
  }
  // 这一天添加的案例
  if(_.isNumber(createOn) && _.gt(createOn, 0)) {
    query.greaterThanOrEqualTo("createdAt", new Date(createOn));
    query.lessThan("createdAt", new Date(createOn + ONE_DAY));
  }
  query.limit(pageSize);
  if(page > 1) {
    query.skip(((page - 1) * pageSize));
  }
  if(sorters != null && !_.isEmpty(sorters)) {
    _.forEachRight(sorters, sorter => {
      if(sorter.dir === SORT_TYPE_ASC) {
        query.ascending(sorter.order);
      } else {
        query.descending(sorter.order);
      }
    });
  }
  return Promise.all([
    query.count(),
    query.find(),
    Promise.resolve({ page, pageSize })
  ]);
}

export function findEventOrNoteByArticle(type: string, parent: Object) {
  var Obj = Parse.Object.extend(type);
  return new Parse.Query(Obj).equalTo("parent", parent).find();
}

export function queryFeedback(args: CommonArgs = {page: 1, pageSize: 10}): Promise<*> {
  let { page, pageSize, sorters } = args;
  var Feedback = Parse.Object.extend('Feedback');
  var query = new Parse.Query(Feedback);
  query.limit(pageSize);
  if(page > 1) {
    query.skip(((page - 1) * pageSize));
  }
  query = addSortToQuery(query, sorters);
  return Promise.all([
    query.count(),
    query.find(),
    Promise.resolve({page, pageSize})
  ]);
}
