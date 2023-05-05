const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const port = 3030;

const app = express();
const route = require('./routes');
app.use(cors());
dotenv.config();
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan('combined'));
// app.get('/show', function (req, res, next) {
//     res.send('...');
// });
route(app);
const db = require('./config/db');

//Connect DB
db.connect();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
