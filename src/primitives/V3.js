var V3 = function(x,y,z){
    this.set(x || 0, y || 0,z || 0);
}
V3.prototype = {
    set:function(x,y,z){
		this.x = x;
		this.y = y;
        this.z = z;
		return this;
	},
	copy:function(){
		return new V3(this.x,this.y,this.z);
	},
    dot:function(v3){
        this.x *= v3.x;
        this.y *= v3.y;
        this.z *= v3.z;
        return this;
    },
    sub:function(v3){
        this.x -= v3.x;
        this.y -= v3.y;
        this.z -= v3.z;
        return this;
    },
    add:function(v3){
        this.x += v3.x;
        this.y += v3.y;
        this.z += v3.z;
        return this;
    },
    recp:function(){
        this.x = 1/this.x;
        this.y = 1/this.y;
        this.z = 1/this.z;
        return this;
    },
    mult:function(x){
        this.x *= x;
        this.y *= x;
        this.z *= x;
        return this;
    }
};