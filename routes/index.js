"use strict";

let Model = require('../models');

module.exports = function(app) {

    app.get('*', (req, res)=> {
        res.sendFile('./public/index.html');
    });

    app.get('/', (req, res)=> {
        console.log("welcome");

        res.send();
    });


    app.get('/api/todos', (req, res)=> {

        Model.TODO.find((err, todos)=> {

            if (err)
                res.send(err);
            else
                res.json(todos);
        });
    });

    app.post('/api/todos', (req, res)=> {

        Model.TODO.create({
            text: req.body.text,
            done: false
        }, (err, todo)=> {

            if (err)
                res.send(err);
            else {

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
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Model.TODO.find((err, todos) => {
                if (err)
                    res.send(err)
                else
                    res.json(todos);
            });
        });
    });
}