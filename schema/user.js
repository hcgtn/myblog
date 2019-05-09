const { Schema } = require('./config');

const UserSchema = new Schema({
	username:String,
	role:{
		type:String,
		default:1
	},
	avatar:{type:String,default:"/avatar/default.png"},
	password:String,
	commentNum:{type:Number,default:0},
	articleNum:{type:Number,default:0}
},{versionKey:false});

module.exports = UserSchema