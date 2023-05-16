//! wait to load 
addEventListener("load", function () {
    //! canvas consts
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    //console.log(ctx);
    const CANVAS_WIDTH = (canvas.width = innerWidth);
    const CANVAS_HEIGHT = (canvas.height = innerHeight);

    const gravity = 1;

      //! character
  class Player {
    constructor() {
      this.position = {
        x: 100,
        y: 100,
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

  // ! Platforms
  class Platform {
    constructor({ x, y }) {
      this.position = {
        x,
        y,
      };
      (this.width = 200), (this.height = 20);
    }
    draw() {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  const platforms = [
    new Platform({ x: 800, y: 400 }),
    new Platform({ x: 500, y: 700 }),
  ];

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
        if (player.velocity.y === 0) {
          player.velocity.y -= 20;
        }
        console.log("up");
        break;

      case 40 || 83:
        console.log("down");
        //player.velocity.y += 20
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
    }
  });
    
  // ! Game animate
  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    player.update();
    platforms.forEach((platform) => {
      platform.draw();
    });
    //platform.draw();
    // ! movement rules
    if (keys.right.pressed && player.position.x < 700) {
      player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 5) {
      player.velocity.x = -5;
    } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
        platforms.forEach((platform) => {
          platform.position.x -= 5;
        });
      } else if (keys.left.pressed) {
        platforms.forEach((platform) => {
          platform.position.x += 5;
        });
      }
    }
    // !collision
    platforms.forEach((platform) => {
      if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >=
          platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0;
      }
    });
  }
  animate();




});