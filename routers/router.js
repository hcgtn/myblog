const Router = require('koa-router');
const router = new Router();
//拿到操作user的逻辑对象
const user = require('../control/user');
const article = require('../control/article');

//设计主页
router.get("/",user.keepLog,async (ctx)=>{	
	console.log("处理后session",ctx.session);
	console.log("处理后isNew",ctx.session.isNew);
	await ctx.render("index",{
		title:"主页",
		//session:{ isNew: false,role:0 }
		session:ctx.session
	});
});
// 登陆/注册
router.get(/^\/user\/(?=reg|login)/,async (ctx)=>{
	const loginShow = /login$/.test(ctx.path);
	const title = loginShow?"登陆":"注册";
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

//如果是export.router = router;就要用解构
module.exports = router