// @flow
import Parse from 'parse/node';
import type { Sorter } from './types';
import _ from 'lodash';
import {
  SORT_TYPE_ASC ,
} from '../constants';

export function addSortToQuery(query: Parse.Query, sorters: Array<Sorter>): Parse.Query {
  if(sorters != null && !_.isEmpty(sorters)) {
    _.forEachRight(sorters, sorter => {
      if(sorter.dir === SORT_TYPE_ASC) {
        query.ascending(sorter.order);
      } else {
        query.descending(sorter.order);
      }
    });
  }
  return query;
}
