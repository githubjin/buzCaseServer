// @flow
import { articles,feedbacks } from './fields';
import { GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';

module.exports = new GraphQLObjectType({
  name: "MasterType",
  description: "案例记录人(大师)",
  fields: {
    id: globalIdField('Master'),
    articles,
    feedbacks,
  },
});
