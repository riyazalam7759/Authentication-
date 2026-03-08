//we will make schema for user and export it to use in other files
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});
const UserModel = mongoose.model('users',userSchema) //here users is the name of collection in mongoDB and userSchema is the schema we created above
module.exports = UserModel; //we will export this model to use in other files like routes and controllers