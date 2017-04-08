import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import graphQLHTTP from 'express-graphql';
import { Schema } from './schema/schema';
import Parse from 'parse/node';
// import cors from 'cors';

// var whitelist = ['http://localhost:3000/'];
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   }else{
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
const APP_ID = process.env.APP_ID || 'eight-words-app';
const MASTER_KEY = process.env.MASTER_KEY || '8zwords';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 1337;

Parse.initialize(APP_ID);
Parse.serverURL = `http://localhost:${port}/parse`;
Parse.masterKey = MASTER_KEY;
// Parse.Cloud.useMasterKey();

function getSchema() {
  if(!IS_DEVELOPMENT) {
    return  Schema;
  }
  delete require.cache[require.resolve('./schema/schema.js')];
  return require('./schema/schema.js').Schema;
}

if(!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://192.168.99.100:27017/dev',
  appId: APP_ID,
  masterKey: MASTER_KEY,
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse'
});

var app = express();

var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH || 'admin:admin';
if(IS_DEVELOPMENT) {
  let users;
  if(DASHBOARD_AUTH) {
    var [ user, pass ] = DASHBOARD_AUTH.split(':');
    users = [{user, pass}];
    console.log(users);
  }
  app.use('/dashboard', ParseDashboard({
    apps: [{
      serverURL: '/parse',
      appId: APP_ID,
      masterKey: MASTER_KEY,
      appName: '8zwords',
    }],
    users,
  }, IS_DEVELOPMENT));
}

app.use(
  '/graphql',
  graphQLHTTP((request, response) => {
    return {
      graphiql:IS_DEVELOPMENT,
      pretty: IS_DEVELOPMENT,
      schema: getSchema(),
      rootValue: Math.random(),
    };
  })
);

var httpServer = require('http').createServer(app);
httpServer.listen(port, () => {
  console.log(`parse server running on port ${port}`);
});
