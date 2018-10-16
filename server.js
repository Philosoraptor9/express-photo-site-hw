const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');

require('./db/db');

app.use(morgan('short'));
app.use(methodOverride('_method'));
app.use(bodyParser({urlencoded: true, extended: false}));

const userController = require('./controllers/user');

app.use('/users', userController);

app.get('/', (req, res)=>{
    res.render('users/index.ejs');
});


const port = 3000;

app.listen(port, ()=>{
    console.log(`Up and running on ${port}`);
});