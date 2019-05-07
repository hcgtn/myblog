const { db } = require("../schema/config");
const ArticleSchema = require("../schema/article");
const Article = db.model("articles",ArticleSchema);

// 返回文章发表页
exports.addPage = async (ctx)=>{
	await ctx.render("add-article",{
		title:"文章发表页",
		session:ctx.session
	});
};

// 文章得发表 （保存到数据库）
exports.add= async ctx=>{
	if(ctx.session.isNew){
		return ctx.body = {
			msg:"用户未登录",
			status:0
		};
	};
	
	//用户登陆情况下，post发过来数据
	const data = ctx.request.body;
	data.author = ctx.session.uid;
	console.log("提交数据：",data);
	await new Promise((resolve,reject)=>{
		new Article(data).save((err,data)=>{
			if(err)return reject(err);
			resolve(data);	
		});
	})
	.then(data=>{
		ctx.body={
			msg:"发表成功",
			status:1
		};
	})
	.catch(err=>{
		ctx.body = {
			msg:"发表失败",
			status:0
		};
	});
}

//分页查找
exports.getList = async ctx=>{
	console.log("处理后session",ctx.session);
	console.log("处理后isNew",ctx.session.isNew);
	console.log("处理后avatar",ctx.session.avatar);
	//查询每篇文章对应作者的头像
	//id ctx.params.id
	let page = ctx.params.id || 1;
	page--;
	
	const maxNum = await Article.estimatedDocumentCount((err,num)=>err?console.log(err):num);

	const artList = await Article
		.find()
		.sort('-created')
		.skip(5 * page)
		.limit(5)
		.populate({
			path:"author",
			select:"username _id avatar"
		})
		.then(data=>data)
		.catch(err=>console.log(err));	
		
	await ctx.render("index",{
		title:"主页",
		session:ctx.session,
		artList,
		maxNum
	});
}


