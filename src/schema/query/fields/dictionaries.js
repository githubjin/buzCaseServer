// @flow
import { GraphQLString } from "graphql";
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray
} from "graphql-relay";
import Parse from "parse/node";

import DictionaryType from "../../types/DictionaryType";
import QuyuType from "../../types/QuyuType";
import CategoryType from "../../types/CategoryType";
import EducationType from "../../types/EducationType";
import JobType from "../../types/JobType";
import GenderType from "../../types/GenderType";
import MarriageType from "../../types/MarriageType";

const Category = Parse.Object.extend("Category");
const Education = Parse.Object.extend("Education");
const Job = Parse.Object.extend("Job");
const Quyu = Parse.Object.extend("Quyu");
const Gender = Parse.Object.extend("Gender");
const Marriage = Parse.Object.extend("Marriage");

function dictionaryQueryField(
  type,
  description,
  parseObject,
  resolve,
  args = {}
) {
  var { connectionType: customConnection } = connectionDefinitions({
    name: type.name,
    nodeType: type
  });
  return {
    type: customConnection,
    description,
    // resolve: resolve || (() => {
    //   return new Parse.Query(parseObject).ascending('name').find();
    // }),
    args: { ...connectionArgs, ...args },
    resolve: (_: Object, args: Object) => {
      // console.log(args);
      return connectionFromPromisedArray(
        resolve
          ? resolve()
          : new Parse.Query(parseObject).ascending("order").find(),
        args
      );
    }
  };
}

function dictionaryPoolQueryField() {
  var { connectionType: customConnection } = connectionDefinitions({
    name: DictionaryType.name,
    nodeType: DictionaryType
  });
  return {
    type: customConnection,
    description: "数据字典汇总查询",
    args: { ...connectionArgs, code: { type: GraphQLString, require: true } },
    resolve: (_: Object, args: Object) =>
      connectionFromPromisedArray(
        new Parse.Query(Parse.Object.extend(args.code))
          .ascending("order")
          .find(),
        args
      )
  };
}

module.exports = {
  provinces: dictionaryQueryField(QuyuType, "区域", Quyu, () => {
    // console.log('invoked');
    return new Parse.Query(Quyu)
      .doesNotExist("parent")
      .ascending("code")
      .find();
  }),
  categories: dictionaryQueryField(CategoryType, "类型标签", Category),
  educations: dictionaryQueryField(EducationType, "教育层次", Education),
  jobs: dictionaryQueryField(JobType, "工作", Job),
  genders: dictionaryQueryField(GenderType, "性别", Gender),
  marriages: dictionaryQueryField(MarriageType, "婚姻状况", Marriage),
  dic: dictionaryPoolQueryField()
};
