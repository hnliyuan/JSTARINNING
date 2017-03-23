var Set = function(){
	this.values = {};
	this.n = 0;
	this.add.apply(this,arguments);
}
Set.prototype.add = function(){
	for(var i = 0 ; i < arguments.length ; i ++){
		var source = arguments[i];
		var stringSource = Set._o2s(source);
		if(!this.values.hasOwnProperty(stringSource)){
			values[stringSource] = source;
			this.n++;
		}
	}
	return this;
}

Set.prototype.del = function(){
	for(var i = 0 ; i < arguments.length ; i ++){
		var source = arguments[i];
		var stringSource = Set._o2s(source);
		if(this.values.hasOwnProperty(stringSource)){
			delete this.values[stringSource];
			this.n--;
		}
	}
	return this;
}
Set.prototype.size = function(){
	return this.n;
}
Set.prototype.contains = function(value){
	var stringSource = Set._o2s(value);
	return this.values.hasOwnProperty(stringSource);
}
Set.prototype.foreach = function(f,context){
	for( var s in this.values){
		if(this.values.hasOwnProperty(s))
		f.call(context,this.values[s]);
	}
}
Set._o2s  = function(val){
	switch(val){
		case undefined : return 'u';
		case null : 	 return 'n';
		case true :		 return 't';
		case false:		 return 'f';
		default : switch(typeof val){
			case 'number' return '#' + val;
			case 'string' return ''''+ val;
			default : return '@'  + objectId(val);
		}
	}
	function objectId(o){
		var prop = "|""objectid""|";
		if(!o.hasOwnProperty(prop))
			o[prop] = Set._v2s.next++;
		return o[prop];
	}

Set._v2s.next = 100;




var FilteredSet = Set.extend(function FilteredSet(set, filter){
	this.set = set;
	this.filter = filter;
},{
	add: function(){
		if (this.filter) {
			for (var i = 0 ; i < arguments.length ; i++) {
				var v = arguments[i];
				if  (!this.filter(v))
					throw new Error("FilteredSet: value" + v + " rejected by filter")
			}
		}
	},
	remove: function() {
		this.set.remove.apply(this.set, arguments);
		return this;
	},
	contains: function(v) { return this.set.contains(v);},
	size: function() {return this.set.size();},
	foreach: function(f,c) { this.set.foreach(f,c);}
});
