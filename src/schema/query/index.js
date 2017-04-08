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
  globalIdField,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
} from 'graphql-relay';
import Parse from 'parse/node';

import DictionaryType from '../types/DictionaryType';
import QuyuType from '../types/QuyuType';
import CategoryType from '../types/CategoryType';
import EducationType from '../types/EducationType';
import JobType from '../types/JobType';
import GenderType from '../types/GenderType';
import MarriageType from '../types/MarriageType';
import ArticleConnection from '../types/ArticleConnection';
import FeedbackType from '../types/FeedbackType';
import { nodeField } from '../types/NodeType';
import { pageArgs, sorterArgs, conditionArgs } from '../types/queryArgs';

import { queryArticle, queryFeedback } from '../../repo/queryParse';
import RootQueryType from './RootQueryType';
import {
  CustomConnectionArgs,
  CustomConnectionDifinition
} from '../connection';

const Category  = Parse.Object.extend('Category');
const Education = Parse.Object.extend('Education');
const Job = Parse.Object.extend('Job');
const Quyu = Parse.Object.extend('Quyu');
const Gender = Parse.Object.extend('Gender');
const Marriage = Parse.Object.extend('Marriage');

function dictionaryPoolQueryField() {
  var {connectionType: customConnection} =
      connectionDefinitions({name: DictionaryType.name, nodeType: DictionaryType});
      return {
        type: customConnection,
        description: "数据字典汇总查询",
        args: {...connectionArgs, code: {type: GraphQLString, require: true}},
        resolve: (_, args) => connectionFromPromisedArray(new Parse.Query(Parse.Object.extend(args.code)).ascending('order').find(), args),
      }
}
function dictionaryQueryField(type, description, parseObject, resolve, args={}) {
  var {connectionType: customConnection} =
      connectionDefinitions({name: type.name, nodeType: type});
  return {
    type: customConnection,
    description,
    // resolve: resolve || (() => {
    //   return new Parse.Query(parseObject).ascending('name').find();
    // }),
    args: { ...connectionArgs, ...args },
    resolve: (_, args) => {
      // console.log(args);
      return connectionFromPromisedArray((resolve ? resolve() : new Parse.Query(parseObject).ascending('order').find()), args)
    },
  }
}
// 查询
var EightWordsQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: nodeField,
    master: {
      type: RootQueryType,
      description: "大师",
      resolve: () => ({ master: "大师", id: "007" }),
    },
    provinces: dictionaryQueryField(QuyuType, "区域", Quyu, () => {
      // console.log('invoked');
      return new Parse.Query(Quyu)
                  .doesNotExist('parent')
                  .ascending('code')
                  .find();
    }),
    categories: dictionaryQueryField(CategoryType, "类型标签", Category),
    educations: dictionaryQueryField(EducationType, "教育层次", Education),
    jobs: dictionaryQueryField(JobType, "工作", Job),
    genders: dictionaryQueryField(GenderType, "性别", Gender),
    marriages: dictionaryQueryField(MarriageType, "婚姻状况", Marriage),
    dic: dictionaryPoolQueryField(),
  }),
});

export default EightWordsQueryType;
