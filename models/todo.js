"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TodoSchema = new Schema({

    text : {type:String,default:null},
    done : {type:Boolean,default:false}

});

module.exports = mongoose.model('Todo',TodoSchema,'todo');