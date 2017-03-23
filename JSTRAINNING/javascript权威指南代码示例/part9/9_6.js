function a (){
	this.a = 1;
	this.b = 2;
}

function b (){
	a.call(this);
	this.c = 3;
}

var A = new b();

console.log(A.a);
