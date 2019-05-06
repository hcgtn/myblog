layui.use(['element', 'upload','layer'], function () {
	var upload = layui.upload,
	element = layui.element;
	const $ = layui.$;
    const layer = layui.layer;
	//执行实例
	var uploadInst = upload.render({
		elem: '#uploadHeadBt' //绑定元素
		,url: '/upload' //上传接口
		,size: 60 //限制文件大小，单位 KB
		,done: function (res) {
			//上传完毕回调
			layer.alert(res.message)
		}
		,error: function () {
			//请求异常回调
		}
	});
});