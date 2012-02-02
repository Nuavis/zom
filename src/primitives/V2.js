var V2 = function(x,y){
    this.set(x || 0, y || 0);
}
V2.prototype = {
	set:function(x,y){
		this.x = x;
		this.y = y;
		return this;
	},
	copy:function(){
		return new V2(this.x,this.y);
	},
    dot:function(v2){
        this.x *= v2.x;
        this.y *= v2.y;
        return this;
    },
    sub:function(v2){
        this.x -= v2.x;
        this.y -= v2.y;
        return this;
    },
    add:function(v2){
        this.x += v2.x;
        this.y += v2.y;
        return this;
    },
    recp:function(){
        this.x = 1/this.x;
        this.y = 1/this.y;
        return this;
    },
    mult:function(x){
        this.x *= x;
        this.y *= x;
        return this;
    }
};