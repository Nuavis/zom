var rChar = function(uid){
    this.uid = uid || getUID();
    this.plane = new _.PlaneGeometry(30,40);
    this.material = new _.MeshBasicMaterial( {color: Math.random() * 0xFFFFFF } );
    this.mesh = new _.Mesh( this.plane , this.material);
    this.mesh.overdraw = true;
    this.rotation = this.r = this.mesh.rotation;
    this.position = this.p = this.mesh.position;
};
rChar.prototype = {
    add:function(){
        scene.add(this.mesh);   
    }
};