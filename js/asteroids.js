class Asteroid {
    constructor({ position, velocity, radius}) {
        this.pos = position;
        this.vel = velocity;
        this.radius = radius;
        this.maxRadius = radius;
        this.killed = false;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath()
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

    updt() {
        this.draw();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}



let asteroid_spawn = 3000;
let max_sz = 60;

let asteroids = [];