const { db } = require("../schema/config");
const ArticleSchema = require("../schema/article");
const Article = db.model("articles",ArticleSchema);

const UserSchema = require("../schema/user");
const User = db.model("users",UserSchema);

const CommentSchema = require("../schema/comment");
const Comment = db.model("commnets",CommentSchema);

const fs = require('fs');
const { join } = require('path');

exports.index = async ctx => {
	if(ctx.session.isNew){
		// 没有登陆
		ctx.status = 404;
		return await ctx.render("404",{title:"404"});
	};
	const id = ctx.params.id;
	const arr = fs.readdirSync(join(__dirname,"../views/admin"));
	let flag = false;
	arr.forEach(v =>  {
		const name = v.replace(/^(admin\-)|(\.pug)$/g,"");
		if(name === id){
			flag = true;
		};
	});
	if(flag){
		console.log(ctx.session);
		await ctx.render("./admin/admin-"+id,{
			session:ctx.session
		});
	}else{
		ctx.status = 404;
		await ctx.render("404",{title:"404"});
	};	
};

