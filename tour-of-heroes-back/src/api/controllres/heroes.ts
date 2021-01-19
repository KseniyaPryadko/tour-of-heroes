require('../db');

import mongoose = require('mongoose');

import { Request, Response, NextFunction } from 'express';
import { HeroDocument } from '../../types/hero';
import { ServerError } from '../../types/error';
import e = require('express');

const model = mongoose.model('Hero');

export = {
    select: (req: Request, res: Response, _: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, hero: HeroDocument) => {
            if (err) {
                res.status(404).json(err);
            } else if (hero) {
                res.status(200).json(hero);
            } else {
                res.status(404).json({ message: 'Not existing id'});
            }
        });
    },

    selectAll: (req: Request, res: Response, _: NextFunction) => {
        model.find().exec((err: ServerError, heroes: HeroDocument[]) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(heroes);
            }
        });
    },

    insert: (req: Request, res: Response, _: NextFunction) => {
        model.create({ name: req.body.name, age: req.body.age, class: req.body.class }, (err: ServerError, hero: HeroDocument) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(hero);
            }
        });
    },
    
    update: (req: Request, res: Response, _: NextFunction) => {
        model.findById(req.params.id).exec((err: ServerError, hero: HeroDocument) => {
            if (err) {
                res.status(404).json(err);
            } else if (hero) {
                hero.name = req.body.name;
                hero.age = req.body.age;
                hero.class = req.body.class;
                hero.save((nestedErr: ServerError, newHero: HeroDocument) => {
                    if (nestedErr) {
                        res.status(409).json(nestedErr);
                    } else {
                        res.status(200).json(newHero);
                    } 
                });
            } else {
                res.status(404).json({ message: 'Not existing id'})
            }
        });
    },

    delete: (req: Request, res: Response, _: NextFunction) => {
        model.findOneAndDelete({ _id: req.params.id }).exec((err: ServerError, hero: HeroDocument) => {
            if (err) {
                res.status(404).json(err);
            } else if (hero) {
                res.status(204).json(null);
            } else {
                res.status(404).json({ message: 'Not existing id' });
            }
        });
    }
};
