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
		const content = layedit.getText(index).trim();
		if(content.length === 0){
			layer.msg('评论不能为空');
			return false;
		};
		const commitData = {
			content,
			article:$(".art-title").data("artid")
		};
		$.post("/comment",commitData,(data)=>{
			layer.msg(data.msg, {
					icon: 1,
					time: 1000 //2秒关闭（如果不配置，默认是3秒）
				}, function(){
					if(data.status === 1){
						//评论成功就重载页面
						window.location.reload();
					};
			});
		});
		return false;
	});
});