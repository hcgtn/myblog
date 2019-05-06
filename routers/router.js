const Router = require('koa-router');
const router = new Router();

//设计主页
router.get("/",async (ctx)=>{
	await ctx.render("index",{
		title:"主页",
		session:{ isNew: false,role:0 }
	});
});
// 登陆/注册
router.get(/^\/user\/(?=reg|login)/,async (ctx)=>{
	const loginShow = /login$/.test(ctx.path);
	console.log(ctx.path);
	const title = loginShow?"登陆":"注册";
	await ctx.render("login_reg",{title,loginShow});
	
});


//如果是export.router = router;就要用解构
module.exports = router