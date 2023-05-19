const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 2000);
  const CANVAS_HEIGHT = (canvas.height = 1900);

  const gravity = 1.5;


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
    async update() {
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

