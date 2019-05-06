layui.use(['layedit','form','element'], function(){
	var layedit = layui.layedit
	,form = layui.form
	,element = layui.element;
	const $ = layui.$
	const index = layedit.build('L_content', {
		tool: [],
		height: 160
      });
	form.on('submit(*)', function(data){
		const {daPages,jid} = data.field;
		if(layedit.getText(index).trim().length === 0)return layer.msg("评论内容不能为空");
		const content = layedit.getText(index);
		$.post("/comment",content,(data)=>{
			layer.msg('发表成功', {
					icon: 1,
					time: 1000 //2秒关闭（如果不配置，默认是3秒）
				}, function(){
					if(data.status === 1){
						// 评论成功就重载页面
						window.location.reload();
					};
			});  
		});
	});
});