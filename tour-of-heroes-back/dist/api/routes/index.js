"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const heroes_1 = __importDefault(require("../controllres/heroes"));
const router = express_1.Router();
router.get('/heroes', heroes_1.default.selectAll);
router.get('/heroes/:id', heroes_1.default.select);
router.post('/heroes', heroes_1.default.insert);
router.put('/heroes/:id', heroes_1.default.update);
router.delete('/heroes/:id', heroes_1.default.delete);
module.exports = router;
