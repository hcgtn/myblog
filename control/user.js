const { db } = require("../schema/config");
const UserSchema = require("../schema/user");
const encrypt = require("../util/encrypt");
//通过 db 对象操作user数据库的模型对象
const User = db.model("users",UserSchema);//自己变为复数，没有的话自己就创建了

//用户注册处理
exports.reg = async (ctx)=>{
	//console.log("这是处理注册的中间件");
	const user = ctx.request.body;
	const username = user.username;
	const password = user.password;
	//注册时干什么，以下操作假设格式符合
	//1.去数据库user 查询当前username石佛存在
	await new Promise((resolve,reject)=>{
		// 去 users 数据库查询
		User.find({username},(err,data)=>{
			if(err)return reject(err);
			//数据库查询没出错，还有可能没数据
			if(data.length!==0){
				//查询到数据 --> 用户名已存在
				return resolve("");//什么都不做就可以了
			};
			//用户名不存在->需要存到数据库->先encrypt模块加密
			const _user = new User({
				username,
				password:encrypt(password)
			});
			_user.save((err,data)=>{
				if(err){
					reject(err);
				}else{
					resolve(data);
				};
			});
		});
	})
	.then(async data=>{
		if(data){
			//注册成功
			await ctx.render("isOK",{
				status:"注册成功"
			});
		}else{
			//用户名已存在
			await ctx.render("isOK",{
				status:"用户名已存在"
			});
		};
	})
	.catch(async err=>{
		await ctx.render("isOK",{
			status:"注册失败，请重试"
		});
	});
};

//用户登陆处理
exports.login = async (ctx)=>{
	const user = ctx.request.body;
	const username = user.username;
	const password = user.password;
	await new Promise((resolve,reject)=>{
		User.find({username},(err,data)=>{
			if(err)return reject(err);
			if(data.length === 0)return reject("用户不存在");
			if(data[0].password === encrypt(password)){
				return resolve(data);
			};
			resolve("");
		});
	})
	.then(async data=>{
		if(!data){
			await ctx.render("isOK",{
				status:"密码不正确，登陆失败"
			});
		};
		// 让用户在他的cookie里设置username password,加密后的密码，权限
		ctx.cookies.set("username",username,{
			domain:"localhost",
			path:"/",
			maxAge:36e5,
			httpOnly:true,
			overwrite:false,
			//signed:true   //默认true
		});
		 //用户在数据库的_id值
		ctx.cookies.set("uid",data[0]._id,{
			domain:"localhost",
			path:"/",
			maxAge:36e5,
			httpOnly:true,//true 		不让客户端访问这个cookie
			overwrite:false,
			//signed:true  //默认true 客户端可以看到签名sig
		});	
		//设置完cookie就要设置session了，于cookie一样
		ctx.session = {
			username,
			uid:data[0]._id
		};
		await ctx.render("isOK",{
			status:"登陆成功"
		});
	})
	.catch(async err=>{
		await ctx.render("isOK",{
			status:"登陆失败"
		});
	});
};

//保持用户的状态
exports.keepLog = async (ctx,next) =>{
	console.log("初始session",ctx.session);
	console.log("初始isNew",ctx.session.isNew);
	if(ctx.session.isNew){
		if(ctx.cookies.get("username")){
			ctx.session= {
				username:ctx.cookies.get("username"),
				uid:ctx.cookies.get("uid")
			};
		};
	};
	await next();
}

//用户退出中间件
exports.logout = async (ctx) =>{
	ctx.session = null;
	ctx.cookies.set("username",null,{
		maxAge:0
	});
	ctx.cookies.set("uid",null,{
		maxAge:0
	});
	// 在后台重定向
	ctx.redirect("/");
};