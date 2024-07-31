class Projectile {
    constructor({ position, velocity, radius, damage}) {
        this.pos = position;
        this.vel = velocity;
        this.radius = radius;
        this.dmg = damage;
        this.vida = this.dmg;

    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath()
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    updt() {
        this.draw();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}



    let projectile_radius = 5;
    let projectile_speed = 3.5;
    let multi_shot = 1;
    let max_dmg = 5;
    let shoot_timer = 0;
    let shoot_cd = 25;

    let projectiles = [];