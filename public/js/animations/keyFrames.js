const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 480;
const fighterImg = new Image()
fighterImg.src="../../images/fighter.png" //1152 by 1024
fighterImg.spriteWidth=64
fighterImg.spriteHeight=64
let gameFrame = 0;
let staggerFrames = 3
fighterImg.spriteAnimations=[];
fighterImg.animationStates=[
    {
        name:'flyBackwards',
        xStart:0,
        yStart:0,
        frames:3,
        loop: false
    },
    {
        name:'flyUp',
        xStart:3,
        yStart:0,
        frames:5,
        loop: false
    },
    {
        name:'land',
        xStart:8,
        yStart:0,
        frames:9,
        loop: false
    },
    {
        name:'flyForward',
        xStart:0,
        yStart:1,
        frames:3,
        loop: false
    },
    {
        name:'punch',
        xStart:0,
        yStart:2,
        frames:8,
        loop: true
    },
    {
        name:'kick',
        xStart:8,
        yStart:2,
        frames:6,
        loop: true
    },
    {
        name:'smackDown',
        xStart:14,
        yStart:2,
        frames:3,
        loop: false
    },
    {
        name:'blockBreak',
        xStart:0,
        yStart:3,
        frames:2,
        loop: false
    },
    {
        name:'getHit',
        xStart:3,
        yStart:3,
        frames:3,
        loop: false
    },
    {
        name:'dead',
        xStart:7,
        yStart:3,
        frames:1,
        loop: false
    },
    {
        name:'defeat',
        xStart:9,
        yStart:3,
        frames:2,
        loop: false
    },
    {
        name:'flyingPunch',
        xStart:12,
        yStart:2,
        frames:2,
        loop: false
    },
    {
        name:'grab',
        xStart:0,
        yStart:4,
        frames:4,
        loop: true
    },
    {
        name:'bigBlast',
        xStart:5,
        yStart:4,
        frames:3,
        loop: false
    },
    {
        name:'smallBlast',
        xStart:9,
        yStart:4,
        frames:4,
        loop: false
    },
    {
        name:'throw',
        xStart:4,
        yStart:6,
        frames:2,
        loop: false
    },
    
];



function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    //ctx.drawImage(image,srcX,srcY,srcWid,srcHi, destX, destY, destWid, destHi)            full version
    
    ctx.drawImage(fighterImg, fighterImg.spriteWidth*frame, 0, fighterImg.spriteWidth, fighterImg.spriteHeight, 0, 0, fighterImg.spriteWidth*5, fighterImg.spriteHeight*5)
    if(gameFrame%10===0){
        if (frame < 16)
            frame++
        else
            frame = 0
    }
    gameFrame++;
        


    requestAnimationFrame(animate);
};
// animate();
function addAllFrameLocations(character){
    for(let i=0;i<character.animationStates.length;i++){
        x=character.animationStates[i].xStart;
        y=character.animationStates[i].yStart;
        frames=character.animationStates[i].frames;
        let loc=[];
        for(j=0;j<frames;j++){
            loc.push([(x+j)*character.spriteWidth, y*character.spriteHeight])
        }
        character.animationStates[i].loc=loc;
        
    }
    //character.animationStates=changeObjFormat(character)
    
}
function changeObjFormat(character){
    newObj={}
    for(let i=0;i<character.animationStates.length;i++){
        

    }
    return newObj
}

function printAnimationFile(character){
    addAllFrameLocations(character)
    //console.log(character.animationStates);
    const data= JSON.stringify(character.animationStates)
    console.log(data);
}
printAnimationFile(fighterImg);

