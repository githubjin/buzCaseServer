// @flow

import {
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} from "graphql";

// 修改案例字段，增删事件、备注需要的字段

module.exports = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
    description: "Article Global ID"
  },
  // 修改案例字段内容
  keys: {
    type: new GraphQLList(GraphQLString),
    description: "Article fields"
  },
  values: {
    type: new GraphQLList(GraphQLString),
    description: "Article fields values"
  },
  // 删减事件或备注
  subEvents: {
    type: new GraphQLList(GraphQLString),
    description: "deleted event ids"
  },
  subNotes: {
    type: new GraphQLList(GraphQLString),
    description: "deleted note ids"
  },
  // 增加事件或备注
  addEvents: {
    type: new GraphQLList(GraphQLString),
    description: "added event contents"
  },
  addNotes: {
    type: new GraphQLList(GraphQLString),
    description: "added note values"
  },
  noteIndex: {
    type: GraphQLInt,
    description: "for add notes, to caculate cursor for new edge"
  },
  // 更新事件或备注
  noteIds: {
    type: new GraphQLList(GraphQLString),
    description: "updated note ids"
  },
  noteValues: {
    type: new GraphQLList(GraphQLString),
    description: "updated note values"
  },
  eventIds: {
    type: new GraphQLList(GraphQLString),
    description: "updated event ids"
  },
  eventValues: {
    type: new GraphQLList(GraphQLString),
    description: "updated event values"
  },
  submit: {
    type: GraphQLBoolean,
    description: "是否是提交操作"
  }
};
