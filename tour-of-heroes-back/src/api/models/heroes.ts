import mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

mongoose.model('Hero', heroSchema, 'Hero');
