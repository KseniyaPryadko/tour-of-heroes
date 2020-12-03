"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const URL = "mongodb+srv://admin:admin@heroes.msjbl.mongodb.net/Heroes?retryWrites=true&w=majority";
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
function shutdown(msg, callback) {
    mongoose.connection.close(() => callback());
}
process.on('SIGINT', () => {
    shutdown('Application exit', () => process.exit(0));
});
process.once('SIGUSR2', () => {
    shutdown('Nodemon restart', () => process.kill(process.pid, 'SIGUSR2'));
});
require('./models/heroes');
