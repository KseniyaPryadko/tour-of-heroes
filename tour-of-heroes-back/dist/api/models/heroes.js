"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    class: {
        type: String,
        required: true
    }
});
mongoose.model('Hero', heroSchema, 'Hero');
