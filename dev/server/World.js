var GSZ = 4096;
var GSZ2 = GSZ/2;
var V3 = function(x,y,z){
      this.set(x||0,y||0,z||0);
};
V3.prototype = {
    set:function(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
};
var Node = function(v3){
    this.position = v3;  
};
Node.prototype = {
    toData:function(){
        return b64.mto([this.position.x+GSZ2,this.position.y+GSZ2,this.position.z+GSZ2],2);
    }
};

var GameObject = exports.GameObject = function(uid){
    this.uid = uid;
};
GameObject.prototype = {
    makeNode:function(v3){
        this.node = new Node(v3 || new V3());
    },
    makeClient:function(client){
        this.client = client;
        this.ut = 0;
    }
};
var gobs,players;
function init(){
    gobs = {};
    gobs.player = players = {};
};
function addPlayer(client){
    var p = players[client.uid] = new GameObject(client.uid);
    p.makeNode();
    p.makeClient(client);
    return p;
}
function addObject(ob){
  return objects[ob.uid] = new GameObject(ob.uid);
}
function step(t){
  for (var i in objects.test){
        if (objects.test[i].x > GSZ2){
            objects.test[i].x = -GSZ2;
        }else{
            objects.test[i].x += 2;   
        }
  }
}