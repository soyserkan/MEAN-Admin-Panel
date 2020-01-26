const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config/config');

const app = express();

const db = require('./config/database')();

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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