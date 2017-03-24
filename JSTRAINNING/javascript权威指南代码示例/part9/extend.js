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
module.exports = extend;