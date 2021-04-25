/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
require('dotenv').config()
const express = require('express');
const path = require('path');
const ejsLocals = require('ejs-locals');
const controllers = require('./controllersRegistry.js');

const app = express();
const port = process.env.PORT || 3000;
const templates = path.resolve(__dirname, 'templates');
const expressStatic = express.static('static');
const expressCSS = express.static('css');

app.engine('ejs', ejsLocals);
app.set('view engine', 'ejs');

Object.keys(controllers).forEach((name) => {
    const config = controllers[name];
    const controller = require(config.path);

    controller.set('views', templates);
    controller.use('/static', expressStatic);
    controller.use('/css', expressCSS);

    app.use(config.prefix || `/${name}`, controller);
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`The app listening at http://localhost:${port}`);
});
