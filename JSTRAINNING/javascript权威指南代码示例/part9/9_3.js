var extend = (function(){
	for(var p in {toString:null}){
		//如果可以检测 到toString
		return function extend(a){
			for(var i = 1 ; i <arguments.length ; i ++){
				var source = arguments[i];
				for(var prop in source){
					a[prop] = source[prop];
				}
			}
			return a ;
		}
	}
}())

function defineClass(construct,methods,statics){
	if(methods) extend(construct.prototype,methods);
	if(statics) extend(construct,statics);
	return construct;
}

var SimpleRange = 
	defineClass(function(f,t){this.from=f,this.to = t},{
		includes : function(x){
			return this.from <=  x  &&   x  <=  this.to;
		},
		toString : function(){
			return "(" + this.from + "..." + this.to + ")";
		}
	},{upto:function(t){return new SimpleRange(0,t)}});

var r = new SimpleRange(1,3);
console.log(r.includes(2));
console.log(r);
