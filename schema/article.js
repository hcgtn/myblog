const { Schema } = require('./config');

const ArticleSchema = new Schema({
	title:String,
	author:String,
	content:String
},{versionKey:false});

module.exports = ArticleSchema;