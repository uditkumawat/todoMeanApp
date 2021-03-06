"use strict";

let express = require('express');

let app = express();

let mongoose = require('mongoose');

let morgan = require('morgan');

let bodyParser = require('body-parser');

let methodOverride = require('method-override');

let CONFIG = require('./config');



mongoose.connect(CONFIG.DB_CONFIG.dbConfig.URI,(err)=>{
    if(err)
        console.log(err);
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./routes')(app);

app.listen(CONFIG.SERVER_CONFIG.PORT);

console.log("App listening on port 8080");