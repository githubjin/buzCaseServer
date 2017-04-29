// @flow
import { connectionFromArraySlice, offsetToCursor } from "graphql-relay";

module.exports = function(dataPromise: Promise<*>, args: Object): any {
  return dataPromise.then(([count, nodes, pages]) => {
    console.log("nodes.length", nodes.length);
    let connection = connectionFromArraySlice(nodes, pages, {
      sliceStart: 0,
      arrayLength: count
    });
    let totalPage = Math.floor(
      count / pages.pageSize + (count % pages.pageSize > 0 ? 1 : 0)
    );
    connection.totalInfo = {
      total: count,
      currentPage: pages.page,
      pageSize: pages.pageSize,
      totalPage
    };
    connection.pageInfo = {
      // ...connection.pageInfo,
      startCursor: offsetToCursor((pages.page - 1) * pages.pageSize),
      endCursor: offsetToCursor(pages.page * pages.pageSize - 1),
      hasNextPage: pages.page < totalPage,
      hasPreviousPage: pages.page > 1
    };
    return connection;
  });
};
