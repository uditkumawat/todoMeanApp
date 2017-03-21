"use strict";

let express = require('express');

let app = express();

let mongoose = require('mongoose');

let morgan = require('morgan');

let bodyParser = require('body-parser');

let methodOverride = require('method-override');

let CONFIG = require('./config');
let Model = require('./models');

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


app.get('*',(req,res)=>{
   res.sendFile('./public/index.html');
});

app.get('/',(req,res)=>{
    console.log("welcome");

    res.send();
});


app.get('/api/todos',(req,res)=>{

    Model.TODO.find((err,todos)=>{

        if(err)
            res.send(err);
        else
            res.json(todos);
    });
});

app.post('/api/todos',(req,res)=>{

    Model.TODO.create({
        text : req.body.text,
        done : false
    },(err,todo)=>{

        if(err)
            res.send(err);
        else{

            Model.TODO.find((err, todos)=> {
                if (err)
                    res.send(err);
                else
                    res.json(todos);
            });
        }
    });
});

app.delete('/api/todos/:todo_id', (req, res)=> {

    Model.TODO.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Model.TODO.find((err, todos) =>{
            if (err)
                res.send(err)
            else
                res.json(todos);
        });
    });
});

app.listen(8080);

console.log("App listening on port 8080");