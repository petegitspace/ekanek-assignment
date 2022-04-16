const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const downloadRoutes = require('./api/routes/downloads');
const userRoutes = require('./api/routes/users');

const multer = require('multer');
const cors = require('cors');

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
//Add the client URL to the CORS policy
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/downloads', downloadRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    if(error instanceof multer.MulterError){
        error.status = 400;
        res.send({
            error: {
                message: error.code
            }
        });
    }else if(error){
        if(error.message === "FILE_MISSING"){
            res.status = 400;
            res.send({
                error: {
                    message: error.code
                }
            });
        }
    }else{
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    }
    
});

module.exports = app;