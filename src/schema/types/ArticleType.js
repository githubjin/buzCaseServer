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
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';
import NoteType from './NoteType';
import EventType from './EventType';
import { nodeInterface } from './NodeType';
import { Date } from './CustomeScalarTypes';
import { findEventOrNoteByArticle } from '../../repo/queryParse';

var ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: '八字命理案例',
  fields: () => ({
    id: globalIdField('Article'),
    attachments: {
      type: new GraphQLList(GraphQLString),
      resolve: parent => parent.get('attachments'),
    },
    title: {
      type: GraphQLString,
      resolve: parent => parent.get('title'),
    },
    categories: {
      type: new GraphQLList(GraphQLString),
      resolve: parent => parent.get('categories'),
    },
    name: {
      type: GraphQLString,
      resolve: parent => parent.get('name'),
    },
    gender: {
      type: GraphQLString,
      resolve: parent => parent.get('gender'),
    },
    education: {
      type: GraphQLString,
      resolve: parent => parent.get('education'),
    },
    birthday: {
      type: GraphQLFloat,
      resolve: parent => parent.get('birthday'),
    },
    homePlace: {
      type: new GraphQLObjectType({
          name: "HomePlace",
          description: '出生地点省市县',
          fields: () => ({
            province: {
              type: GraphQLString,
              resolve: hp => hp.province,
            },
            city: {
              type: GraphQLString,
              resolve: hp => hp.city,
            },
            area: {
              type: GraphQLString,
              resolve: hp => hp.area,
            },
            address: {
              type: GraphQLString,
              resolve: hp => hp.address,
            }
          }),
      }),
      resolve: parent => parent.get('homePlace'),
    },
    jobs: {
      type: new GraphQLList(GraphQLString),
      resolve: parent => parent.get('jobs'),
    },
    marriage: {
      type: GraphQLString,
      resolve: parent => parent.get('marriage'),
    },
    children: {
      type: GraphQLString,
      resolve: parent => parent.get('children'),
    },
    events: {
      type: new GraphQLList(EventType),
      resolve: parent =>  findEventOrNoteByArticle('Event', parent),
    },
    knowledge: {
      type: GraphQLString,
      resolve: parent => parent.get('knowledge'),
    },
    notes: {
      type: new GraphQLList(NoteType),
      resolve: parent =>  findEventOrNoteByArticle('Note', parent),
    },
    createdAt: {
      type: Date,
      resolve: parent => parent.createdAt,
    },
  }),
  interfaces: [nodeInterface],
});

export default ArticleType;
