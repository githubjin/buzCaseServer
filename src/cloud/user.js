// @flow
import path from "path";
import Parse from "parse/node";
import _ from "lodash";
import dictioinaryInitialData from "../initialData/dictionary";

const User = Parse.Object.extend("User");
const Category = Parse.Object.extend("Category");
const Education = Parse.Object.extend("Education");
const Job = Parse.Object.extend("Job");
const Gender = Parse.Object.extend("Gender");
const Marriage = Parse.Object.extend("Marriage");

function save(user: Object, datas: Object[], Claxx: any): void {
  datas.forEach(node => {
    var newRecord = new Claxx();
    newRecord.set("name", node.name);
    newRecord.set("order", node.order);
    newRecord.set("owner", user);
    newRecord.save(null, { useMasterKey: true });
  });
}

Parse.Cloud.afterSave(Parse.User, function(request) {
  var user = new User();
  user.id = request.object.id;
  save(user, dictioinaryInitialData.Category, Category);
  save(user, dictioinaryInitialData.Education, Education);
  save(user, dictioinaryInitialData.Job, Job);
  save(user, dictioinaryInitialData.Gender, Gender);
  save(user, dictioinaryInitialData.Marriage, Marriage);
});
