const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { port } = require('./config/config');

const app = express();

const db = require('./config/database')();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${__dirname}/public`));

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,PUT,DELETE,OPTIONS"
    )
    next();
})

const postRouter = require('./routes/posts');

app.use('/api/posts', postRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});