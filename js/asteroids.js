class Asteroid {
    constructor({ position, velocity, radius}) {
        this.pos = position;
        this.vel = velocity;
        this.radius = radius
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