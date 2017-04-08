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
  GraphQLInputObjectType,
} from 'graphql';

import {
  HomePlaceArgsType
} from './commonTypes';

function getEventOrNoteInputType(name, title) {
  return new GraphQLInputObjectType({
    name: `${name}MutationInput`,
    description: `案例${title}变动信息`,
    fields: () => ({
      sub: {
        type: new GraphQLList(GraphQLID),
      },
      add: {
        type: new GraphQLList(GraphQLString),
      },
      update: {
        type: new GraphQLList(new GraphQLInputObjectType({
          name: `${name}UpdateInput`,
          description: `${title}修改的内容`,
          fields: () => ({
            id: {
              type: GraphQLID,
            },
            text: {
              type: GraphQLString
            }
          }),
        })),
      }
    }),
  })
}

export default {
  id: { type: GraphQLID },
  attachments: {
    type: new GraphQLList(GraphQLString),
  },
  title: {
    type: GraphQLString,
  },
  categories: {
    type: new GraphQLList(GraphQLString),
  },
  name: {
    type: GraphQLString,
  },
  gender: {
    type: GraphQLString,
  },
  birthday: {
    type: GraphQLFloat,
  },
  homePlace: {
    type: HomePlaceArgsType,
  },
  jobs: {
    type: new GraphQLList(GraphQLString),
  },
  marriage: {
    type: GraphQLString,
  },
  children: {
    type: GraphQLString,
  },
  events: {
    type: getEventOrNoteInputType('Event', "大事件"),
  },
  knowledge: {
    type: GraphQLString,
  },
  notes: {
    type: getEventOrNoteInputType('Note', "备注"),
  }
}
