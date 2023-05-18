console.log(collisions);
//! verify load first
addEventListener("load", function () {
  //! const

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  console.log(ctx);
  const CANVAS_WIDTH = (canvas.width = 2000);
  const CANVAS_HEIGHT = (canvas.height = 1900);

  const gravity = 1.5;


  //! background
  const backgroundImage = new Image();
  backgroundImage.src = "../images/DungeonRoom2.png";
  let backgroundX = 0;
  let backgroundY = 0
  backgroundImage.onload = ()=>{
    ctx.drawImage(backgroundImage,backgroundX,backgroundY,)
  }
  


  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += 50) {
    collisionsMap.push(collisions.slice(i, 50 + i));
  }
  console.log(collisionsMap);

  class Boundary {
    static width = 64;
    static height = 64;
    constructor({ position }) {
      this.position = position;
      this.width = 64;
      this.height = 64;
    }
    draw() {
      ctx.fillStyle = "transparent";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  class EventFrame {
    static width = 64;
    static height = 64;
    constructor({ position }) {
      this.position = position;
      this.width = 64;
      this.height = 64;
    }
  }

  const boundaries = [];
  const eventFrames = [];

  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol == 38 || symbol == 1610612774 || symbol == 3221225510)
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
          })
        );
          if(symbol == 2)
          eventFrames.push(
            new EventFrame({
                position: {
                    x: j * EventFrame.width,
                    y: i * EventFrame.height,
                },
            })
          )
    });
  });

  console.log(boundaries);
  // class Background {
  //   constructor({ x, y, image }) {
  //     this.position = {
  //       x,
  //       y,
  //     };
  //     this.image = image;
  //     this.width = 200;
  //     this.height = 20;
  //   }
  //   draw() {
  //     ctx.fillStyle = "blue";
  //     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  //   }
  // }

  //! character
  
  
  
  
  class Player {
    constructor() {
      this.position = {
        x: 85,
        y: 1800,
      };
      this.velocity = {
        x: 0,
        y: 0,
      };

      this.width = 16;
      this.height = 32;
    }
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
      this.draw();
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;
      if (this.position.y + this.height + this.velocity.y <= CANVAS_HEIGHT) {
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
    }
  }

  const player = new Player();

  // ! movement
  const keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };

  window.addEventListener("keydown", ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
      case 38 || 87:
        //!edit to if touching ground is true
        if (player.velocity.y === 0) {
          player.velocity.y -= 20;
        }
        console.log("up");
        break;

      case 40 || 83:
        console.log("interact");
        interact = true //make interaction for opening doors
        break;
      case 37 || 65:
        console.log("left");
        keys.left.pressed = true;
        break;
      case 39 || 68:
        console.log("right");
        keys.right.pressed = true;
        break;
      case 32:
        console.log("attack");
        break;
    }
  });

  window.addEventListener("keyup", ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
      case 38 || 87:
        console.log("up");
        break;

      case 40 || 83:
        console.log("down");
        break;
      case 37 || 65:
        console.log("left");
        keys.left.pressed = false;
        break;
      case 39 || 68:
        console.log("right");
        keys.right.pressed = false;
        break;
      case 32:
        console.log("attack");
        break;
      case 44:
        console.log("pause");
    }
  });

  const moveables = [backgroundImage, boundaries];

  // ! Game animate
  function animate() {
    requestAnimationFrame(animate);
    // ctx.fillStyle = "white";
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundImage, backgroundX, backgroundY);

    boundaries.forEach((boundary) => {
      boundary.draw();
    });

    player.update();
  
    // ! movement rules
    const playerSpeed = 10
    
    if (keys.right.pressed && player.position.x < 300) {
      player.velocity.x = playerSpeed;
    } else if (keys.left.pressed && player.position.x > 300) {
      player.velocity.x = -playerSpeed;
    } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
        backgroundX -= playerSpeed;
        boundaries.forEach((boundary) => {
          boundary.position.x -= playerSpeed;
        });
      } else if (keys.left.pressed) {
        backgroundX += playerSpeed;
        boundaries.forEach((boundary) => {
          boundary.position.x += playerSpeed;
        });
      }

    //   backgroundY -= player.position.y;
    //   boundaries.forEach((boundary)=>{
    //     boundary.position.y -= player.position.y
    //   })
    }
    // !collision
    boundaries.forEach((boundary) => {
      //top
      if (
        player.position.y + player.height <= boundary.position.y &&
        player.position.y + player.height + player.velocity.y >=
          boundary.position.y &&
        player.position.x + player.width >= boundary.position.x &&
        player.position.x <= boundary.position.x + boundary.width
      ) {
        player.velocity.y = 0;
      }
      //bottom
      if (
        player.position.y >= boundary.position.y + boundary.height &&
        player.position.y + player.velocity.y <=
          boundary.position.y + boundary.height &&
        player.position.x + player.width >= boundary.position.x &&
        player.position.x <= boundary.position.x + boundary.width &&
        player.position.y + player.height >= boundary.position.y
      ) {
        player.velocity.y = 0;
      }
      //!left
      if (
        player.position.x + player.velocity.x <= boundary.position.x + boundary.width &&
        player.position.x + player.width + player.velocity.x >= boundary.position.x &&
        player.position.y + player.height >= boundary.position.y &&
        player.position.y <= boundary.position.y + boundary.height
      ) {
        player.position.x = boundary.position.x + boundary.width;
        player.velocity.x = 0;
        
      }
      
      // !right
      else if (
        player.position.x + player.velocity.x + player.width >= boundary.position.x &&
        player.position.x + player.velocity.x <= boundary.position.x + boundary.width &&
        player.position.y + player.height >= boundary.position.y &&
        player.position.y <= boundary.position.y + boundary.height
      ) {
        player.position.x = boundary.position.x - player.width;
        player.velocity.x = 0;
        
      }
    });
  }

  animate();
});