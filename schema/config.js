//链接数据库 导出db Schema
const mongoose = require('mongoose');
//没有的话自己就创建了
const db = mongoose.createConnection('mongodb://localhost:27017/myblog',{useNewUrlParser:true});

//用原生的es6的promise 代替mongoose自生实现的promise
mongoose.Promise = global.Promise;

//把mongoose的schema导出来
const Schema = mongoose.Schema;

db.on("error",()=>{
	console.log("数据库连接失败");
});

db.on("open",()=>{
	console.log("mybloog 数据库连接成功");
});

module.exports = {
	db,
	Schema
}