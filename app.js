const Koa = require('koa');
const static = require('koa-static');
const views = require('koa-views');
const router = require('./routers/router');//需要路由
const logger = require('koa-logger');//查看日志模块
const { join } = require('path');

// 实例化框架
const app = new Koa;
// 注册日志
app.use(logger());
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



