// @flow
import { connectionFromArraySlice } from 'graphql-relay';

module.exports = function(dataPromise: Promise<*>, args: Object): any {
  return dataPromise.then(([count, nodes, pages]) => {
    let connection = connectionFromArraySlice(
        nodes,
        args,
        {
            sliceStart: 0,
            arrayLength: count
        }
    );
    let totalPage = Math.floor((count / args.pageSize) + (count % args.pageSize > 0 ? 1 : 0));
    connection.totalInfo = {
      total: count,
      currentPage: args.page,
      pageSize: args.pageSize,
      totalPage,
    };
    connection.pageInfo = {
      ...connection.pageInfo,
      hasNextPage: (args.page < totalPage),
      hasPreviousPage: (args.page > 1),
    }
    return connection;
  });
}
