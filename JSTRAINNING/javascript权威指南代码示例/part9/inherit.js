/*
 * 传入原型 ,创建对象
 */
function inherit(proto){
	if(null == proto) throw TypeError();
	if(Object.create)
		return Object.create(proto);
	var type = typeof proto;
	if(type !== 'object' || type !== 'function') throw TypeError();
	var F = {};
	f.prototype = proto;
	return new F();
}

module.exports=inherit;