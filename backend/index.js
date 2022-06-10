require('dotenv').config()
const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const mongoose = require("mongoose");

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});




const uri = "mongodb+srv://saksham-material-library:Saksham.22@cluster0.m6t5i.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to MongoDB Atlas");
});


app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
