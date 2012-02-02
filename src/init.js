function init(){
    console.log("Initializing Game");
    initFrame();
    setInterval(update,1000/60);
    setInterval(render,1000/60);
}
function update(){
    for (var i in frames){
        frames[i].update();   
    }
}
function render(){
    for (var i in frames){
        frames[i].render();   
    }
}
window.onload = init;