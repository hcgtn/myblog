const { Schema } = require('./config');
const ObjectId = Schema.Types.ObjectId;
const ArticleSchema = new Schema({
	title:String,
	author:{
		type:ObjectId,
		ref:"users"
	},
	content:String,
	tips:String,
	commentNum:Number
},{versionKey: false, 
	timestamps: {
		createdAt: "created"//拿到的是UTC格式时间
	}
});

module.exports = ArticleSchema;