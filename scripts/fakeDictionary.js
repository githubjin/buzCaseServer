var Parse = require('parse/node');

var APP_ID = process.env.APP_ID || 'eight-words-app';
var MASTER_KEY = process.env.MASTER_KEY || '8zwords';
var port = process.env.PORT || 1337;

Parse.initialize(APP_ID);
Parse.serverURL = "http://localhost:" + port + "/parse";
Parse.masterKey = MASTER_KEY;

var Category  = Parse.Object.extend('Category');
var Education = Parse.Object.extend('Education');
var Job = Parse.Object.extend('Job');
var Gender = Parse.Object.extend('Gender');
var Marriage = Parse.Object.extend('Marriage');

var map = {
  Category: Category,
  Education: Education,
  Job: Job,
  Gender: Gender,
  Marriage: Marriage,
}

function fake(type, name, hitRate, order) {
  var Obj = map[type];
  var category = new Obj();
  category.set("name", name);
  category.set("hitrate", hitRate);
  category.set("order", order);
  category.save().then(function(object) {
    console.log(type, name + " : the object was saved.");
  },
  function(error) {
    console.log(type, name + " : saving the object failed.", error);
  });
}

fake('Category', "全部", 1, 0);
fake('Category', "高官", 1, 1);
fake('Category', "牢狱", 1, 2);
fake('Category', "晚婚", 1, 3);
fake('Category', "晚育", 1, 4);

fake('Education', "全部", 1, 0);
fake('Education', "小学", 1, 1);
fake('Education', "初中", 1, 2);
fake('Education', "高中", 1, 3);
fake('Education', "大学", 1, 4);
fake('Education', "研究生", 1, 5);
fake('Education', "博士", 1, 6);

fake('Job', "全部", 1, 0);
fake('Job', "公务员", 1, 1);
fake('Job', "导演", 1, 2);
fake('Job', "演员", 1, 3);
fake('Job', "CEO", 1, 4);

fake('Gender', "全部", 1, 0);
fake('Gender', "男", 1, 2);
fake('Gender', "女", 1, 3);
fake('Gender', "其他", 1, 4);

fake('Marriage', "全部", 1, 0);
fake('Marriage', "已婚", 1, 1);
fake('Marriage', "未婚", 1, 2);
fake('Marriage', "离婚", 1, 3);
