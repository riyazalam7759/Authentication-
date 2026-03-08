const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');//to fetch data from client side
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const app = express();
require('dotenv').config();
require('./Models/db') 
app.use(cors());


const PORT = process.env.PORT || 8000;
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(bodyParser.json());

app.use('/auth',AuthRouter) //here we are using the AuthRouter for all the routes that start with /auth like /auth/login and /auth/signup
app.use('/products',ProductRouter) //here we are using the ProductRouter for all the routes that start with /products like /products/ and /products/:id

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
