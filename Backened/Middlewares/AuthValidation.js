
const Joi = require('joi');

const signupValidation = (req, res, next)=>{
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(30).required(),
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().min(4).max(50).required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request",error})
    }
    next();
}

const loginValidation = (req, res, next)=>{
    const schema = Joi.object({
        
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().min(4).max(50).required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request",error})
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}