const Router = require('koa-router');
const router = new Router();
//拿到操作user的逻辑对象
const user = require('../control/user');
const article = require('../control/article');
const comment = require('../control/comment');
const admin = require('../control/admin');
const upload = require('../util/upload');

//设计主页
router.get("/",user.keepLog,article.getList);
// 登陆/注册
router.get(/^\/user\/(?=reg|login)/,async (ctx)=>{
	const loginShow = /login$/.test(ctx.path);
	const title = loginShow?"登陆":"注册";
	
	console.log(ctx);
	await ctx.render("login_reg",{title,loginShow});
});
//处理用户登陆的post
router.post("/user/login",user.login);
//注册用户
router.post("/user/reg",user.reg);
//用户退出
router.get("/user/logout",user.logout);
//文章发表页面
router.get("/article",user.keepLog,article.addPage);
//文章发表
router.post("/article",user.keepLog,article.add);
// 文章列表分页 路由
router.get("/page/:id", article.getList)
// 文章详情页
router.get("/article/:id",user.keepLog,article.details);
// 评论提交
router.post("/comment",user.keepLog,comment.save); 
//文章 评论 头像上传
router.get("/admin/:id",user.keepLog,admin.index);
//头像上传功能
router.post("/upload",user.keepLog,upload.single("file"),user.upload);
//评论管理
router.get("/user/comments",user.keepLog,comment.comList);
//评论删除
router.del("/comment/:id/:articleId",user.keepLog,comment.del);

//404
router.get("*",async ctx => {
	await ctx.render("404",{
		title:"404"
	});
});



//如果是export.router = router;就要用解构
module.exports = router