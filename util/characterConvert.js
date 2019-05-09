//utf-8字符串转成base64
exports.utf8_base64 = function(str_utf8){
	return new Buffer(str_utf8).toString('base64');
};

//base64字符串转成utf-8
exports.base64_utf8 = function(str_base64){
	return new Buffer(str_base64, 'base64').toString();
};
