layui.use(['form','element','jquery'], function(){
	var form = layui.form
	,element = layui.element
	,$ = layui.$;
	form.on('submit(login)', function(data){
		//layer.msg(JSON.stringify(data.field));
		//return false;
	});
	form.on('submit(reg)', function(data){
		//layer.msg(JSON.stringify(data.field));
		//return false;
	});
	$("#regRepass").on("blur", function(){
		const pwd = $("#regPass").val();
		if($("#regRepass").val() !== pwd){
			layer.msg("两次密码不一致")
			$(this).val("");
		};
	})
});