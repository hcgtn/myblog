const { Schema } = require('./config');

const UserSchema = new Schema({
	username:String,
	avatar:{type:String,default:"/avatar/default.png"},
	password:String
},{versionKey:false});

module.exports = UserSchema