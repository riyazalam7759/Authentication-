const { signup, login }= require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const router = require('express').Router();

router.post('/login',loginValidation, login)

router.post('/signup',signupValidation, signup) //here we are using the signupValidation middleware to validate the data before calling the signup controller function

module.exports = router;