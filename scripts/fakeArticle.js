var faker = require('faker');
var Parse = require('parse/node');

var APP_ID = process.env.APP_ID || 'eight-words-app';
var MASTER_KEY = process.env.MASTER_KEY || '8zwords';
var port = process.env.PORT || 1337;

Parse.initialize(APP_ID);
Parse.serverURL = "http://localhost:" + port + "/parse";
Parse.masterKey = MASTER_KEY;

faker.locale = "zh_CN";

const Article = Parse.Object.extend("Article");
const Event = Parse.Object.extend("Event");
const Note = Parse.Object.extend("Note");

function fake(t) {
  for (var i = 0; i <= t; i++) {
    var article = new Article();
    var attachments = fakeAttachments();
    article.set("attachments", fakeAttachments());
    article.set("title", faker.lorem.words());
    article.set("categories", getCategory());
    article.set("name", faker.name.findName());
    article.set("gender", getGender());
    article.set("education", getEducation());
    article.set("birthday", faker.date.past());
    article.set("homePlace", {
      province: faker.address.state(),
      city: faker.address.city(),
      area: faker.address.county()
    });
    article.set("jobs", getJobs());
    article.set("isvalid", true);
    article.set("marriage", getMarriage());
    article.set("children", faker.lorem.sentences());
    article.set("knowledge", faker.lorem.paragraph());
    article.save().then(function(object) {
      console.log(object.id, object.name + " : the object was saved.");
      fakeEvent(object);
      fakeNote(object);
    },
    function(error) {
      console.log(" : saving the object failed.", error);
    });
  }
}

function fakeEvent(article) {
    var times = Math.floor(Math.random() * 5) + 1;
    console.log('event time', times);
    for (var i = 0; i < times; i++) {
      console.log('event ' + i);
      var event = new Event();
      event.set("text", faker.lorem.sentences());
      event.set("parent", article);
      event.save().then(function(object) {
        console.log(article.id + ' : Event saved ');
      },
      function(error) {
        console.log(article.id + ' : Event saved error ', error);
      });
    }
}

function fakeNote(article) {
  var times = Math.floor(Math.random() * 5) + 1;
  console.log('note time', times);
  for (var i = 0; i < times; i++) {
    console.log('note ' + i);
    var note = new Note();
    note.set("text", faker.lorem.sentences());
    note.set("parent", article);
    note.save().then(function(object) {
      console.log(article.id + ' : Note saved ');
    },
    function(error) {
      console.log(article.id + ' : Note saved error ', error);
    });
  }
}

function fakeBool() {
  var index = Math.floor(Math.random(100) * 100);
  return index % 2 === 1;
}

function fakeAttachments() {
  var times = Math.floor(Math.random(10)*5)+1;
  var arr = [];
  for (var i = 0; i < times; i++) {
    arr.push(faker.random.image());
  }
  return arr;
}

function getCategory() {
  var arr = [["高官"],["高官", "牢狱"],["牢狱"],["晚婚"],["晚育"],["高官", "晚育"],
              ["高官", "牢狱",  "晚育"],["牢狱", "晚婚", "晚育"],["晚婚", "晚育"]];
  var index = Math.floor(Math.random(10) * arr.length);
  return arr[index];
}

function getJobs() {
  var arr = ["公务员", "导演", "演员", "CEO", "公务员", "全职太太", "自由职业者"];
  var index1 = Math.floor(Math.random(10) * arr.length);
  var index2 = Math.floor(Math.random(10) * arr.length);
  var index3 = Math.floor(Math.random(10) * arr.length);
  var finArr = [arr[index1]];
  if(finArr.indexOf(arr[index2]) === -1) {
    finArr.push(arr[index2]);
  }
  if(finArr.indexOf(arr[index3]) === -1) {
    finArr.push(arr[index3]);
  }
  return finArr;
}

function getMarriage() {
  var arr = ["未婚", "已婚", "离婚"];
  var index = Math.floor(Math.random(10) * arr.length);
  return arr[index];
}

function getGender() {
  var arr = ["男", "女"];
  var index = Math.floor(Math.random(10) * arr.length);
  return arr[index];
}
function getEducation() {
  var arr = ["小学", "初中", "高中", "大学", "研究生", "博士", "博士后"];
  var index = Math.floor(Math.random(10) * arr.length);
  return arr[index];
}

fake(200);

//
//
//
//
//
//
//
//
//
// events
//
// notes
