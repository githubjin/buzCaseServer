// 省市县数据来源http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/

var Parse = require('parse/node');
var readline = require('linebyline');
var _ = require('lodash');

var APP_ID = process.env.APP_ID || 'eight-words-app';
var MASTER_KEY = process.env.MASTER_KEY || '8zwords';
var port = process.env.PORT || 1337;

Parse.initialize(APP_ID);
Parse.serverURL = "http://localhost:" + port + "/parse";
Parse.masterKey = MASTER_KEY;

var firstLevelCode,
    secondLevelCode,
    currentLevel = 1;

var rl = readline('./scripts/SSX.txt');
rl.on('line', function(line, lineCount, byteCount) {
  setCurrentLevel(line);
  var words = setXLevelCodeAndGetWords(line);
  save(words);
})
.on('error', function(e) {
  console.log(e);
});

function save(words) {
  var Quyu = Parse.Object.extend("Quyu");
  var quyu = new Quyu();

  quyu.set("code", words[0]);
  quyu.set("name", words[1]);
  quyu.set("level", currentLevel);
  if(currentLevel > 1) {
    quyu.set("parent", currentLevel == 2 ? firstLevelCode : secondLevelCode);
  }
  quyu.set("hitrate", 0);
  quyu.set("order", parseInt(words[0]));
  quyu.set("isLeaf", (currentLevel === 3));

  quyu.save().then(function(object) {
    console.log(words[0] + " : the object was saved.");
  },
  function(error) {
    console.log(words[0] + " : saving the object failed.", error);
  });
}

function setXLevelCodeAndGetWords(line) {
  var words = _.words(line);
  if(currentLevel === 1) {
    firstLevelCode = words[0];
  }
  if(currentLevel === 2) {
    secondLevelCode = words[0];
  }
  return words;
}
function setCurrentLevel(line) {
  if(_.startsWith(line, '　　')) {
    currentLevel = 3;
  } else if(_.startsWith(line, '　')) {
    currentLevel = 2;
  } else {
    currentLevel = 1;
  }
}
