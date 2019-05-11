layui.use(['element','table'], function(){
	var table = layui.table;
	const $ = layui.$;

	/*Powershell=>live-server
	http://127.0.0.1:8080/new 1.htmls*/
	//第一个实例
	table.render({
		elem: '#LAY_mySendCard'
		,height: 312
		,url: 'http://localhost/interfaceTest/myblog/getArticleList.php'//数据接口
		,page: true //开启分页
		,cols: [[ //表头
			{field: 'id', title: 'ID', width:80, sort: true, align:'center',fixed: 'left'}
			,{field: 'article', title: '文章'}
			,{field: 'classification', title: '分类', width:150,align:'center',}
			,{field: 'comments', title: '评论述',width:150,align:'center', sort: true}
			,{fixed: 'right', title: '操作',width:150, align:'center', toolbar: '#barDemo'}
		]]
	});
	//监听工具条
		table.on('tool(articleView)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		var tr = obj.tr; //获得当前行 tr 的DOM对象
		const id = data.id;
		if(layEvent === 'detail'){ //查看
			//do somehing
		} else if(layEvent === 'del'){ //删除
			layer.confirm('真的删除行么', function(index){
			obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
			layer.close(index);
			 $.ajax({
				 method: "delete",
				 url: "/article/" + id,
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
		} else if(layEvent === 'edit'){ //编辑
			//do something
			//同步更新缓存对应的值
			obj.update({
				username: '123'
				,title: 'xxx'
			});
		}
	});
});