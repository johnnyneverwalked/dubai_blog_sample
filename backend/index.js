// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const express = require('express');
const cors = require("cors");
const jsonParser = require("body-parser").json()
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');
require("dotenv").config({path: path.join(__dirname + "/../.env")});

const auth = require("./routes/auth");
const landmarkRoutes = require("./routes/landmarkRoutes");

const databaseUri = process.env.DB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:5000/parse',  // Don't forget to change to https if needed
});

const dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.SERVER_URL || 'http://localhost:5000',
      "appId": process.env.APP_ID || 'myAppId',
      "masterKey": process.env.MASTER_KEY || '',
      "appName": process.env.APP_NAME || "MyApp",
      "primaryBackgroundColor": "#ac1aa5",
      "secondaryBackgroundColor": "#1b65d4"
    }
  ],
  "users": [
    {
      "user": process.env.APP_USER || "admin",
      "pass": process.env.APP_PASS || "admin"
    }
  ]
});

const app = express();
app.use(jsonParser);
app.use(cors({origin: "*"}));
// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// make auth routes available at /auth
app.use("/auth", auth.router)

// make Landmark CRUD routes available at /landmarks
app.use("/landmarks", landmarkRoutes)

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Deployment works');
});

// Create link to Angular build directory
var distDir = path.join(__dirname + "/../dist/");
app.use(express.static(distDir));


const port = process.env.SERVER_PORT || 5000;
const httpServer = require('https').createServer(app);
// httpServer.listen(port, function() {
//     console.log('parse-server-example running on port ' + port + '.');
// });

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
