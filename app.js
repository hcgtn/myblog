const Koa = require('koa');
const static = require('koa-static');
const views = require('koa-views');
const router = require('./routers/router');//需要路由
const logger = require('koa-logger');//查看日志模块
const body = require('koa-body');
const { join } = require('path');
const session = require('koa-session');

// 实例化框架
const app = new Koa;
//设置session与cookie的通信密钥
app.keys = ["陈裕超个人博客"];
//session 的配置对象
const CONFIG = {
	key:"Sid",
	maxAge:36e5,
	overwrite:true,
	httpOnly:true,
	signed:true,
	rolling:true
};
// 注册日志
app.use(logger());
//注册 session
app.use(session(CONFIG,app));//这里必须手动把app传入，这样session的配置就完成了

//配置koa-body 处理post请求数据
app.use(body());
// 配置静态资源目录
app.use(static(join(__dirname,"public")));
// 配置视图模板
app.use(views(join(__dirname,"views"),{
	extension:"pug"
}));
// 注册路由信息
app.use(router.routes()).use(router.allowedMethods());



app.listen(3000,()=>{
	console.log("服务启动成功，监听3000端口");
});

//创建管理员用户，若管理员已经存在，则返回
{
	//admin admin
	const {db} = require('./schema/config');
	const UserSchema = require('./schema/user');
	const encrypt = require('./util/encrypt');
	const User = db.model("users",UserSchema);
	
	User
		.find({username:"admin"})
		.then(data => {
			if(data.length === 0){
				//管理员不存在，创建
				new User({
					username:"admin",
					password:encrypt("admin"),
					role:666
				})
				.save()
				.then(data=>{
					console.log("管理员用户名->admin,密码->admin");
				})
				.catch(err => {
					console.log("管理员账号检测失败");
				});
			}else{
				//控制台输出
				console.log("管理员用户名->admin,密码->admin");
			};
		});
}


