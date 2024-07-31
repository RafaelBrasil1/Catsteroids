class Player {
    constructor({position,velocity,imageSrc}){
        this.pos = position;
        this.vel = velocity;
        this.speed = 3;
        this.img = new Image();
        this.img.src = imageSrc;
        this.rot = 0;
        this.radius = 48;
    }

    draw(){
        ctx.save();

        ctx.translate(this.pos.x,this.pos.y);
        ctx.rotate(this.rot);
        ctx.translate(-this.pos.x,-this.pos.y);
        ctx.drawImage(this.img, this.pos.x - 87, this.pos.y - 50, 140, 100);

    

      

        ctx.restore();

        // ctx.beginPath();
        // ctx.strokeRect(this.pos.x,this.pos.y,48,0)
        // ctx.strokeStyle = 'red';
        // ctx.stroke();
        // ctx.closePath();
    }

    updt(){
        this.draw();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}



let level = 1;
let leveling = false;
let healthRegen = 0;
let exp_limit = 100;
let exp = 0
let exp_collect = 1;
let max_life = 100;
let life = max_life
let hit_animation = 0;