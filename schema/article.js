const { Schema } = require('./config');

const ArticleSchema = new Schema({
	title:String,
	author:String,
	content:String,
	tips:String
},{versionKey: false, 
	timestamps: {
		createdAt: "created"
	}
});

module.exports = ArticleSchema;