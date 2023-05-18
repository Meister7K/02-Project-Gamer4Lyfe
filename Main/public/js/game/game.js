// ! IMPORTS 



addEventListener("load", function () {
// ! CLASSES
    class Player {
        constructor(playerImage, health, x, y, w, h, attack){
            this.playerImage = playerImage;
            this.health = health;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.attack = attack;
        }
    };

    class Enemy {
        constructor(enemyImage, health, x, y, w, h, attack){
            this.enemyImage = enemyImage;
            this.health = health;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.attack = attack;
        }
    }

    class Game {
        constructor(){
            this.map = [];
            this.enemies = [];
            this.canvas = null;
            this.context = null;

        }
    }
// ! RESET 
    Game.prototype.reset = ()=>{
        this.map = [];
        this.enemies = [];
    }

// ! CONSTANTS

    let score = 0;
    const COL = 50;
    const ROW = 30;
    const TILE = 64;

//! DOM 
    function setDOM(){
        let container = document.getElementById('container');
        let canvas = document.createElement('canvas');
        canvas.id = 'hud';

        let labels = ['health', 'score'];

        canvas.height = ROWS * TILE;
        canvas.width = COLS * TILE;
        container.appendChild(canvas);
    }

// ! MAPS
    let currentMap = maps[0];

    const maps = [];

//! ANIMATE Game Function

function animateGame(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawMap();

    drawPlayer();

    drawEnemies();


    requestAnimationFrame(animateGame);
}

function drawMap(){

}

function drawPlayer(){

}

function drawEnemies(){

}

function interact(){
    if( currentMap === maps[0]){
        
    }
}

});
