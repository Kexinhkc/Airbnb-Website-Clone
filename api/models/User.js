const mongoose = require('mongoose');
const { Schema } = mongoose; //Extract the schema object from the mongoose module and use a var called "schema" to hold the reference to the object

const UserSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password:String,
});


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;