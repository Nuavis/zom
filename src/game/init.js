var stats, camera, scene, renderer, _;
var rob = {};
var my,hero;

var D2R = Math.PI/180;
function initGame(){
       lg("Starting Game");
       
       _ = THREE;
       
       scene = new _.Scene();
       
       camera = new _.PerspectiveCamera(35,window.innerWidth / window.innerHeight,.25,2000);
       camera.position.y = 300;
       camera.position.z = 450;
       camera.rotation.x = -35 * D2R;
       scene.add(camera);
       
       var materials = [];
       for (var i = 0;i<6;i++){
            materials.push( new _.MeshBasicMaterial( {color: Math.random() * 0xFFFFFF } ));   
       }
       hero = addChar();
       
       for (i = 0;i<100;i++){
            var a = addChar();
            a.p.x = Math.random()*4000-2000;
            a.p.z = Math.random()*4000-2000;
       }
       
       my = {
               speed:new V3(),
               position:hero.position,
               maxspeed:new V3(2,0,2),
               fric:new V3(1.2,1.2,1.2)
       };
       
       
        document.body.innerHTML = "";
        document.body.style.borderSpacing = "0px";
        document.body.style.margin = "0px";
        document.body.style.padding = "0px";
        document.body.style.overflow = "hidden";
       
       renderer = new _.WebGLRenderer();
       if (!renderer){
               renderer = new _.CanvasRenderer();
       }
       renderer.setSize(window.innerWidth,window.innerHeight);
       document.body.appendChild(renderer.domElement);
       
       stats = new Stats();
       stats.domElement.style.position = 'absolute';
       stats.domElement.style.top = "0px";
       document.body.appendChild(stats.domElement);
       
       gameRender();
       setTimeout(gameLogic,1000/60);
}
function gameRender(){
    
    requestAnimationFrame(gameRender);
    
    renderer.render(scene,camera);
    
    stats.update();
    
}
function gameLogic(){
    setTimeout(gameLogic,1000/60);
    
    //Hero Movement
    my.speed.x += (getKey("d") - getKey("a"))*my.maxspeed.x;
    my.speed.z += (getKey("s") - getKey("w"))*my.maxspeed.z;
    
    my.speed.divideSelf(my.fric);
    
    my.position.addSelf(my.speed);
    
    camera.position.x -= (camera.position.x - (my.position.x))/10;
    camera.position.y -= (camera.position.y - (my.position.y + 300))/10;
    camera.position.z -= (camera.position.z - (my.position.z + 450))/10;
    
}
function addChar(name){
    var char = new rChar(name);
    char.add();
    return char;
}
var lastUID = 0;
function getUID(){
       return "_" + (lastUID = lastUID+1);
}