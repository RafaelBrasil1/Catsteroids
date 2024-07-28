class Player {
    constructor({position,velocity,imageSrc}){
        this.pos = position;
        this.vel = velocity;
        this.speed = 2;
        this.img = new Image();
        this.img.src = imageSrc;
        this.rot = 0;
    }

    draw(){
        ctx.save();

        ctx.translate(this.pos.x,this.pos.y);
        ctx.rotate(this.rot);
        ctx.translate(-this.pos.x,-this.pos.y);
        ctx.drawImage(this.img, this.pos.x - 87, this.pos.y - 50, 140, 100);

        // ctx.fillStyle = 'white';
        // ctx.arc(this.pos.x, this.pos.y, 1, 0, 2 * Math.PI);
        // ctx.fill();

        ctx.restore();
    }

    updt(){
        this.draw();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}