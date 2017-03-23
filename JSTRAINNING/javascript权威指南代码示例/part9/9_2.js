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
	
	function Range(from,to){
		this.from = from;
		this.to = to;
	}
	
	Range.prototype = {
		includes : function(x){
			return this.from <=  x  &&   x  <=  this.to;
		},
		foreach : function(f){
			for(var x = Math.ceil(this.from); x  <= this.to ; x++) f(x);
		},
		tostring : function(){
			return "(" + this.from + "..." + this.to + ")";
		}
	}
	
	var r = new Range(1,3);
	console.log(r.includes(2));
	r.foreach(function(x){
		console.log(x);
	})
	console.log(r.tostring());
