layui.use(['element', 'table'], function () {
	var table = layui.table;
	const $ = layui.$;
	/*Powershell=>live-server
	http://127.0.0.1:8080/new 1.htmls*/
	//第一个实例
	table.render({
		elem: '#LAY_mySendCard',
		height: 312,
		//url: 'http://localhost/interfaceTest/myblog/getCommentList.php' //数据接口
		url:'/user/comments'
	,
		page: true //开启分页
	,
		cols: [[//表头
				{
					field: 'article',
					title: '被评文章',
					templet: function(d){
						return d.article.title;
					}
				}, {
					field: 'content',
					title: '评论内容',
					align: 'center',
				}, {
					field: 'created',
					title: '评论时间',
					templet: function(d){
						return (new Date(d.created)).toLocaleString();
					},
					width: 200,
					align: 'center',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 150,
					align: 'center',
					toolbar: '#barDemo'
				}
			]]
	});
	table.on('tool(commentView)', function (obj) { 
		var data = obj.data; 
		var layEvent = obj.event; 
		var tr = obj.tr; 
		const commentId = data._id;
		const articleId = data.article._id;
		console.log(articleId);
		if (layEvent === 'detail') {
			//do somehing
		} else if (layEvent === 'del') {
			layer.confirm('真的删除行么', function(index){
				obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
				layer.close(index);
					//向服务端发送删除指令
				 $.ajax({
					 method: "delete",
					 url: "/comment/" + commentId + "/"+ articleId,
					 data: {
						// 发送文章id值，减少后台查询
						articleId
					 },
					 success(res){
						if(res.status){
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