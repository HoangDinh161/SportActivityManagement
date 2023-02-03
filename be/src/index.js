const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');

const route = require('./routes')
const port = 3030
const UserController = require('./app/controller/UserController')
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.get('/api/show', UserController.showInfo)
app.post('/api/create', UserController.create)
app.use(morgan('combined'));

route(app);
const db = require('./config/db');
//Connect DB
db.connect();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})