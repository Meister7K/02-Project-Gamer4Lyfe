
// select and set canvas                                                                                    //TODO Render array into block objects
                                                                                                            //          -create block class
                                                                                                            //TODO Create player functionality
                                                                                                            //           -create movement/collision/attack/interact/health
                                                                                                            //TODO implement phazer collision detect
                                                                                                            //TODO implement Enemies
                                                                                                            //TODO map change & saving
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 2000);
const CANVAS_HEIGHT = (canvas.height = 1900);


class Character{
    constructor(startX,startY,Sprite){
        this.x=startX;      //position 
        this.y=startY;
    
        this.Sprite=this.Sprite; // !load in sprite and all animations

        this.xVel=0
        this.yVel=0
        this.velocity=[this.xVel, this.yVel];

        this.draw()

    }
    update(x,y){

    }
    draw(){

    }
}


class Controller{
    constructor(aPlayer){
        //keyUp and keyDown
    }
}


class Level{
    constructor(imgUrl,colMap){

        this.imgUrl=imgUrl;
        this.X=0;
        this.Y=0;
        this.imgObj=this.renderImg();
        this.colMap=colMap

    }
    renderImg(){
        const backgroundImage=new Image()
        backgroundImage.src=this.imgUrl;
        console.log('bkg'+ backgroundImage);
        return backgroundImage;
       

    }
    draw(){
        ctx.drawImage(this.imgObj,this.X,this.Y)
        console.log('draw'+ this.imgObj);
    }
    // setXY(xChng,yChng){
    //     imgObj.x=xChng
    //     imgObj.y=yChng
    // }
    // readMatrix(x,y){
    //     thiscolMap.array.forEach((row, i) => {
    //         row.forEach((num, j)=>{
    //             if(num ===)

    //         })
            
    //     });
    // }
}



class Player extends Character{
    constructor(width, height){

    }
}

class Enemies extends Character{

}
function loadLevel(map/*,player,*/){
    map.imgObj.onload =()=>{
        map.draw()
    }
 // add background/map img on load then draw
    
}



//Active Code Below
const level1=new Level("../images/DungeonRoom2.png",collisions01)
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    loadLevel(level1)
}
animate()



