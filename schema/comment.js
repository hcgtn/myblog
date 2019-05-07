const { Schema } = require('./config');
const ObjectId = Schema.Types.ObjectId;
const CommentSchema = new Schema({
	//头像 用户名
	//文章
	//内容
	content:String,
	//关联用户表
	from:{
		type:ObjectId,
		ref:"users"
	},
	//关联到article 表--集合
	article:{
		type:ObjectId,
		ref:"articles"
	}
},{versionKey: false, 
	timestamps: {
		createdAt: "created"//拿到的是UTC格式时间
	}
});

module.exports = CommentSchema;