layui.use(['layedit','form','element'], function(){
	var layedit = layui.layedit
	,form = layui.form
	,element = layui.element;
	const $ = layui.$
	const index = layedit.build('L_content', {
        hideTool: [
          'image' //插入图片
        ]
      }); //建立编辑器
	$(".layui-unselect.layui-layedit-tool").hide()
	//监听提交
	form.on('submit(*)', function(data){
		const {tips,title} = data.field;
		if(layedit.getText(index).trim().length === 0){
			layer.msg('亲输入内容');
			return false;
		} 
		const result = {
			tips,
			title,
			content:layedit.getText(index)
		};
		$.post("/article",result,(msg)=>{
			if(msg.status){
				layer.alert('发表成功',(res)=>{
					location.href = '/';
				});
			}else{
				layer.alert(`发表失败，失败信息：${msg.msg}`);
			};	
		});
		return false;//防止from标签本身的action
	});
});