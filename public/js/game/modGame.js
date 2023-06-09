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

class Sprite{
    constructor(x,y,img){
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = img;

    }
}

class Block {

    constructor(x, y, type, size = 64) {

        this.size = size;
        this.x = x * size;
        this.y = y * size;
        this.width = size;
        this.height = size;
        this.type = type;

    }
    blockEvent() {
        if (this.type === "sblock") {
            //player stop
        }
        else if (this.type === "eblock") {
            //loadlevel2
        }
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
        super(x, y, w, h, sprite = "")
    }
}

class Enemy extends Character {
    constructor() {
        super(x, y, w, h, sprite)
    }

}

class Controller {
    constructor(aPlayer, colMap) {
        this.player = aPlayer
        this.right = false
        this.left = false
        this.interact = false
        this.colMap = colMap
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
        // console.log(keyCode);
        switch (keyCode) {
            case 38:
            case 87:
                //!edit to if touching ground is true
                if (this.player.velocity.y === 0) {
                    this.player.velocity.y -= 20;
                }
                // console.log("up");
                break;

            case 40:
            case 83:
                // console.log("interact");
                this.interact = true //make interaction for opening doors
                this.updatePlayer();
                break;
            case 37:
            case 65:

                this.left = true;
                this.updatePlayer();
                break;
            case 39: 
            case 68:

                this.right = true;
                this.updatePlayer();
                break;
            case 32:

                break;
        }


    }
    checkKeyUp(keyCode) {
        switch (keyCode) {
            case 38:
            case 87:
                // console.log("up");
                break;
            case 40: 
            case 83:
                this.interact = false;
                this.updatePlayer();
                // console.log("down");
                break;
            case 37:
            case 65:
                // console.log("left");
                this.left = false;
                this.updatePlayer();
                break;
            case 39:
            case 68:
                // console.log("right");
                this.right = false;
                this.updatePlayer();
                break;
            case 32:
                // console.log("attack");
                break;
            case 44:
            // console.log("pause");
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
    constructor(imgUrl, colMap, player) {
        this.player = player;
        this.imgUrl = imgUrl;
        this.width = 3200
        this.height = 1920
        this.X = 0;
        this.Y = 0;
        this.imgObj = this.renderImg();
        this.colMap = colMap;
        this.blockMap = this.renderCollisionBlockMap()
        this.eBlockMap = this.renderEventBlockMap()
    }

    draw() {
        ctx.drawImage(this.imgObj, this.X, this.Y)
        for (let i = 0; i < this.blockMap.length; i++) {

            ctx.fillStyle = "transparent";
            ctx.fillRect(this.blockMap[i].x, this.blockMap[i].y, this.blockMap[i].width, this.blockMap[i].height);
        }
        for (let i = 0; i < this.eBlockMap.length; i++) {

            ctx.fillStyle = "transparent";
            ctx.fillRect(this.eBlockMap[i].x, this.eBlockMap[i].y, this.eBlockMap[i].width, this.eBlockMap[i].height);
        }

    }
    renderCollisionBlockMap() {
        let blockArray = [];
        this.colMap.forEach((row, i) => {
            row.forEach((num, j) => {
                if (num === 1 || num === 3) {
                    let block = new Block(j, i, 'sblock')
                    blockArray.push(block)
                }

            })
        })
        return blockArray;
    }
    renderEventBlockMap() {
        let eBlockArray = [];
        this.colMap.forEach((row, i) => {
            row.forEach((num, j) => {

                if (num === 2) {
                    let block = new Block(j, i, 'eblock')
                    eBlockArray.push(block);
                }
            })
        })
        return eBlockArray;

    }
    renderImg() {
        const backgroundImage = new Image()
        backgroundImage.src = this.imgUrl;
        // this.blockMap=this.renderBlockMap()
        return backgroundImage;
    }
    detectCollision() {

        this.blockMap.forEach((boundary) => {

            if (
                this.player.y + this.player.height <= boundary.y &&
                this.player.y + this.player.height + this.player.velocity.y >= boundary.y &&
                this.player.x + this.player.width >= boundary.x &&
                this.player.x <= boundary.x + boundary.width
            ) {

                this.player.velocity.y = 0;
                boundary.blockEvent()
            }
            //bottom box
            if (this.player.velocity.y <= 0 &&
                this.player.y >= boundary.y + boundary.height &&
                this.player.y + this.player.velocity.y <=
                boundary.y + boundary.height &&
                this.player.x + this.player.width >= boundary.x &&
                this.player.x <= boundary.x + boundary.width &&
                this.player.y + this.player.height >= boundary.y
            ) {
                console.log("hitting the ceiling")
                this.player.y = boundary.y + boundary.height + 1;
                this.player.velocity.y = 0;
                boundary.blockEvent()
            }
            //!left player/ right box
            if (this.player.velocity.x < 0 &&
                this.player.x + this.player.velocity.x <= boundary.x + boundary.width &&
                this.player.x + this.player.width + this.player.velocity.x >= boundary.x &&
                this.player.y + this.player.height >= boundary.y &&
                this.player.y <= boundary.y + boundary.height
            ) {
                //console.log("cant go left")
                this.player.x = boundary.x + boundary.width + 1;
                this.player.velocity.x = 0;
                boundary.blockEvent()
            }

            // left box / right player
            if (this.player.velocity.x > 0 &&
                this.player.x + this.player.velocity.x + this.player.width >= boundary.x &&
                this.player.x + this.player.velocity.x <= boundary.x + boundary.width &&
                this.player.y + this.player.height >= boundary.y &&
                this.player.y <= boundary.y + boundary.height
            ) {
                console.log("cant go right")
                this.player.x = boundary.x - this.player.width - 1;
                this.player.velocity.x = 0;
                boundary.blockEvent()

            }


        })
    }
    detectEvents(){
        let playerArr=[]
        for(let i=0;i<this.player.height;i++){
            for(let j=0;j<this.player.width;j++){
                playerArr.push([this.player.x + j,this.player.y+ i])

                
            }
        }
        // console.log(playerArr);

    }


}



function loadLevel(map) {
    map.imgObj.onload = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        map.draw()
        console.log('map' + map)


    }
}
// add background/map img on load then draw





//Active Code Below
const character1 = new Character(70, 1600, 16, 32);
const level1 = new Level("../images/DungeonRoom2.png", collisions01, character1);
const controller = new Controller(character1, level1.blockMap);
console.log('char' + character1);


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    level1.draw()
    character1.update()
    level1.detectCollision()
    level1.detectEvents();
    //loadLevel(level1,character1)
    requestAnimationFrame(animate);
}
loadLevel(level1)//if statement needed for switch ing levels on reaching animate 
animate()



