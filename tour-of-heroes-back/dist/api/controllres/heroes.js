"use strict";
require('../db');
const mongoose = require("mongoose");
const model = mongoose.model('Hero');
module.exports = {
    select: (req, res, _) => {
        model.findById(req.params.id).exec((err, hero) => {
            if (err) {
                res.status(404).json(err);
            }
            else if (hero) {
                res.status(200).json(hero);
            }
            else {
                res.status(404).json({ message: 'Not existing id' });
            }
        });
    },
    selectAll: (req, res, _) => {
        model.find().exec((err, heroes) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(200).json(heroes);
            }
        });
    },
    insert: (req, res, _) => {
        model.create({ name: req.body.name, age: req.body.age, class: req.body.class }, (err, hero) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(201).json(hero);
            }
        });
    },
    update: (req, res, _) => {
        model.findById(req.params.id).exec((err, hero) => {
            if (err) {
                res.status(404).json(err);
            }
            else if (hero) {
                hero.name = req.body.name;
                hero.age = req.body.age;
                hero.class = req.body.class;
                hero.save((nestedErr, newHero) => {
                    if (nestedErr) {
                        res.status(409).json(nestedErr);
                    }
                    else {
                        res.status(200).json(newHero);
                    }
                });
            }
            else {
                res.status(404).json({ message: 'Not existing id' });
            }
        });
    },
    delete: (req, res, _) => {
        model.findOneAndDelete({ _id: req.params.id }).exec((err, hero) => {
            if (err) {
                res.status(404).json(err);
            }
            else if (hero) {
                res.status(204).json(null);
            }
            else {
                res.status(404).json({ message: 'Not existing id' });
            }
        });
    }
};
