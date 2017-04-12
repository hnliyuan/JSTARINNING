var inherit = require("./inherit.js");
var extend = require("./extend.js");
var Set = require("./Set.js");
/**
 * 一个简单的方法创建子类
 */
function defineSubclass(superclass,
						constructor,
						methods,
						statics){
	constructor.prototype = inherit(superclass.prototype);
	constructor.prototype.constructor = constructor;
	if (methods) extend(constructor.prototype, methods);
	if (statics) extend(constructor, statics);
	//返回这个类
	return constructor;
}

/**
 * 给Function加上通用子类构造器
 * @param {Object} constructor
 * @param {Object} methods
 * @param {Object} statics
 */
Function.prototype.extend = function(constructor, methods, statics){
	return defineSubclass(this,constructor,methods,statdics);
}

/**
 * 定义一个子类
 */

function SingletonSet(member){
	this.member = member;
}
SingletonSet.prototype = inherit(Set.prototype);

extend(SingletonSet.prototype,{
	constructor : SingletonSet,
	add : function(){ throw "read-only Set";},
	remove : function(){ throw "read-only Set";},
	size : function(){ return 1;},
	foreach : function(f,context){ f.call(context,this.member);},
	contains : function(x){ return x === this.member;}
})

var a = new Set();

console.log(a.size());


