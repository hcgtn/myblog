layui.use(['element', 'table'], function () {
	var table = layui.table,
	element = layui.element;
	const $ = layui.$;
	/*Powershell=>live-server
	http://127.0.0.1:8080/new 1.htmls*/
	//第一个实例
	table.render({
		elem: '#LAY_mySendCard',
		height: 312,
		url: 'http://localhost/interfaceTest/myblog/getUserList.php' //数据接口
	,
		page: true //开启分页
	,
		cols: [[//表头
				{
					field: 'id',
					title: 'ID',
					width: 80,
					sort: true,
					align: 'center',
					fixed: 'left'
				}, {
					field: 'userName',
					title: '用户名',
					align: 'center'
				}, {
					field: 'role',
					title: '权限',
					align: 'center',
				}, {
					field: 'articleNum',
					title: '文章数量',
					width: 200,
					align: 'center',
					sort: true
				}, {
					field: 'commentNum',
					title: '评论数量',
					width: 200,
					align: 'center',
					sort: true
				},{
					fixed: 'right',
					title: '操作',
					width: 150,
					align: 'center',
					toolbar: '#barDemo'
				}
			]]
	});
	table.on('tool(userView)', function (obj) { 
		var data = obj.data; 
		var layEvent = obj.event; 
		var tr = obj.tr; 
		const id = data.id;
		if (layEvent === 'detail') {
			//do somehing
		} else if (layEvent === 'del') {
			layer.confirm('真的删除行么', function(index){
				obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
				layer.close(index);
					//向服务端发送删除指令
				 $.ajax({
					 method: "delete",
					 url: "/user/" + id,
					 data: {
						// 发送文章id值，减少后台查询
						 id
					 },
					 success(res){
						if(res.state){
							layer.msg(res.message, {
								anim: 1,
								time: 800
							}, () => location.reload());
						}else{
							console.error(res.message)
						};
					 }
				 });		
			});
		} else if (layEvent === 'edit') { 
			obj.update({
				username: '123',
				title: 'xxx'
			});
		};
	});
});