layui.use(['jquery','laypage','element'], function(){
	var element = layui.element,
		laypage = layui.laypage,
		$ = layui.$; //重点处,layui内部使用jquery
	//执行一个laypage实例
	laypage.render({
		elem: 'laypage'
		,count: $("#laypage").data("maxnum") //数据总数，从服务端得到
		,limit: 5//每页显示数
		,groups: 5//页码个数
		,curr: location.pathname.replace("/page/", "")//起始页设置
		,jump: function(obj, first){
			//obj包含了当前分页的所有参数，比如：
			// console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
			// console.log(obj.limit); //得到每页显示的条数
			// console.log(location.pathname);
			$("#laypage a").each((i,v)=>{
				let pageValue = `/page/${$(v).data("page")}`
				v.href = pageValue;//设置每个页码的跳转地址
			});
			
			//首次不执行
			/*f(!first){
				console.log($("#laypage").data("maxnum"));
			}*/
		}
	});
});