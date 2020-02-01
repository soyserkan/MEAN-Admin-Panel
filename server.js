const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config/config');

const app = express();

require('./config/database')();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${__dirname}/public`));

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,PUT,DELETE,OPTIONS"
    )
    next();
})

const postRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});