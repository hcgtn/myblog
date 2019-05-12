const { db } = require("../schema/config");
const ArticleSchema = require("../schema/article");
const Article = db.model("articles",ArticleSchema);

const UserSchema = require("../schema/user");
const User = db.model("users",UserSchema);

const CommentSchema = require("../schema/comment");
const Comment = db.model("comments",CommentSchema);

exports.save = async ctx => {
	let message = {
		status:0,
		msg:"登陆才能发表"
	};
	
	//验证用户是否登陆
	if(ctx.session.isNew)return ctx.body = message;
	//已经登陆了
	const data = ctx.request.body;
	//添加一个from属性
	data.from = ctx.session.uid;
	const _comment =new Comment(data);
	await _comment
		.save()
		.then(data=>{
			message = {
				status:1,
				msg:"评论成功"
			};
			Article
				.update(
					{_id:data.article},
					{$inc:{commentNum:1}}
					,err=>{
						console.log("更新成功");
					});
			//更新用户评论计数
			User.update({_id:data.from},{$inc:{commentNum:1}},err => {
				if(err)return console.log(err);
			});
		})
		.catch(err => {
			message = {
				status:0,
				msg:err
			}
		});
	ctx.body = message;
};

exports.comList = async ctx => {
	const uid = ctx.session.uid;
	const data = await Comment.find({from:uid}).populate("article","title");
	ctx.body = {
		code:0,
		count:data.length,
		data
	};
}
//删除操作
exports.del = async ctx=> {
	const commentId = ctx.params.id;
	const articleId = ctx.params.articleId;
	//5cd405cbb2aae106c40eb5d0
	console.log("articleId:",articleId);
	const uid = ctx.session.uid;

	let isOk = true;
	//文章计数器-1
	await Article.updateOne({_id:articleId},{$inc:{commentNum:-1}});
	await User.updateOne({_id:uid},{$inc:{commentNum:-1}});
	//删除评论
	await Comment.deleteOne({_id:commentId},err=>{
		if(err)isOk = false;
	});
	if(isOk){
		ctx.body = {
			status:1,
			message:"删除成功"
		}
	};
};
