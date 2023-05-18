//
// select and set canvas                 
//? Render array into block objects X
//          -create block class
//? Create player functionality
//           -create movement/collision/attack/interact/health
//TODO implement block types
//TODO implement phazer collision detect
//TODO implement Enemies
//TODO map change & saving
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");//
const CANVAS_WIDTH = (canvas.width = 3200);
const CANVAS_HEIGHT = (canvas.height = 1920);
const gravity = 1.5;






//collisions1[x][y] if=1 stop if 2 changelevel 3

class Block {
    
    constructor(x,y,type,size=64) {

        this.size = size;
        this.x=x*size;
        this.y=y*size;
        this.width=size;
        this.height=size;
        this.type = type;

    }

}

class Character {
    constructor(x, y, w, h /*,health, sprite*/) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.width = w;
        this.height = h;
       // this.health = health;
       //this.sprite = sprite;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.y += this.velocity.y;
        this.x += this.velocity.x;
        if (this.y + this.height + this.velocity.y <= CANVAS_HEIGHT) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}
class Player extends Character {
    constructor() {
        super(x, y, w, h, sprite="")
    }
}

class Enemy extends Character {
    constructor() {
        super(x, y, w, h, sprite)
    }

}

class Controller {
    constructor(aPlayer) {
        this.player = aPlayer
        this.right = false
        this.left = false
        this.interact = false
        this.renderController()
    }
    renderController() {
        window.addEventListener("keydown", ({ keyCode }) => {
            this.checkKeyDown(keyCode)
        });
        window.addEventListener("keyup", ({ keyCode }) => {
            this.checkKeyUp(keyCode)
        });


    }
    checkKeyDown(keyCode) {
        console.log(keyCode);
        switch (keyCode) {
            case 38 || 87:
                //!edit to if touching ground is true
                if (this.player.velocity.y === 0) {
                    this.player.velocity.y -= 20;
                }
                console.log("up");
                break;

            case 40 || 83:
                console.log("interact");
                this.interact = true //make interaction for opening doors
                this.updatePlayer();
                break;
            case 37 || 65:
                console.log("left");
                this.left = true;
                this.updatePlayer();
                break;
            case 39 || 68:
                console.log("right");
                this.right = true;
                this.updatePlayer();
                break;
            case 32:
                console.log("attack");
                break;
        }


    }
    checkKeyUp(keyCode) {
        switch (keyCode) {
            case 38 || 87:
                console.log("up");
                break;
            case 40 || 83:
                this.interact = false;
                this.updatePlayer();
                console.log("down");
                break;
            case 37 || 65:
                console.log("left");
                this.left = false;
                this.updatePlayer();
                break;
            case 39 || 68:
                console.log("right");
                this.right = false;
                this.updatePlayer();
                break;
            case 32:
                console.log("attack");
                break;
            case 44:
                console.log("pause");
        }
    }
    updatePlayer() {
        const ps = 10;

        if (this.right)
            this.player.velocity.x = ps;
        else if (this.left)
            this.player.velocity.x = -ps;
        else {
            this.player.velocity.x = 0;
        }
    }
}



//currentpos-startpos % 64      colmasppos[x][y]

class Level {
    constructor(imgUrl, colMap) {

        this.imgUrl = imgUrl;
        this.width = 3200
        this.height = 1920
        this.X = 0;
        this.Y = 0;
        this.imgObj = this.renderImg();
        this.colMap = colMap;
        this.blockMap=this.renderBlockMap()
    }
    
    draw() {
        ctx.drawImage(this.imgObj, this.X, this.Y)
        for( let i=0;i<this.blockMap.length;i++){
            
            ctx.fillStyle = "blue";
            ctx.fillRect(this.blockMap[i].x, this.blockMap[i].y, this.blockMap[i].width, this.blockMap[i].height);
        }
    
    }
    renderBlockMap() {
        let blockArray=[]        
        this.colMap.forEach((row, i) => {
            row.forEach((num, j) => {
                if(num===1 || num === 3 ){
                    let block=new Block(j,i,'sblock')
                    blockArray.push(block)
                }
                else if( num===2){
                    let block=new Block(j,i, 'eblock')
                    blockArray.push(block);
                }
                })
        })
        return blockArray;
    }
    renderImg() {
        const backgroundImage = new Image()
        backgroundImage.src = this.imgUrl;
        // this.blockMap=this.renderBlockMap()
        return backgroundImage;
    }
}



function loadLevel (map) {
    map.imgObj.onload = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        map.draw()
        console.log('map' + map)

    
    }
}  
    // add background/map img on load then draw
    




//Active Code Below

const level1 = new Level("../images/DungeonRoom2.png", collisions01)
const character1 = new Character(700,1000,16,32);
const controller= new Controller(character1)
console.log('char' + character1);


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    level1.draw()
    character1.update()
    //loadLevel(level1,character1)
    requestAnimationFrame(animate);
}
loadLevel(level1)//if statement needed for switch ing levels on reaching animate 
animate()



