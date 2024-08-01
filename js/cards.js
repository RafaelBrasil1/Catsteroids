class Card {
    constructor({ position, velocity, index }) {
        this.pos = position;
        this.vel = velocity;
        this.size = { w: 325, h: 500 }
        this.i = index;
        this.icon = new Image();
        this.mouseOn = false;
        this.selected = false;
        this.applying = false;
    }

    desenha() {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(30, 30, 30)';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);


        ctx.strokeStyle = 'white';
        ctx.rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        ctx.stroke();

        ctx.fillStyle = 'rgb(20,20,20)';
        ctx.fillRect(this.pos.x + 95, this.pos.y + 100, 125, 125);
        ctx.rect(this.pos.x + 95, this.pos.y + 100, 125, 125);


        ctx.stroke();

        ctx.fillStyle = 'rgb(40,40,40)';
        ctx.fillRect(this.pos.x + 25, this.pos.y + 270, 280, 200);





        switch (this.i) {
            case 1:
                //Damage
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Damage', this.pos.x + 83, this.pos.y + 70);
                this.icon.src = '../assets/strenghUp.png'
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 104, 125, 125);
                ctx.font = '15px JOYSTIX'
                ctx.fillText('Increase the damage ', this.pos.x + 30, this.pos.y + 290)
                ctx.fillText('each projectile you', this.pos.x + 30, this.pos.y + 315)
                ctx.fillText('shoot deal to ', this.pos.x + 30, this.pos.y + 340)
                ctx.fillText('asteroids', this.pos.x + 30, this.pos.y + 365)
                break;

            case 2:
                //Health
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Max Health', this.pos.x + 45, this.pos.y + 70);

                ctx.fillStyle = 'lightgreen';
                ctx.fillRect(this.pos.x + 107, this.pos.y + 150, 100, 25)
                ctx.fillRect(this.pos.x + 145, this.pos.y + 112, 25, 100)

                ctx.fillStyle = 'white';
                ctx.font = '15px JOYSTIX'
                ctx.fillText('Increase the maximum ', this.pos.x + 30, this.pos.y + 290)
                ctx.fillText('amount of health you', this.pos.x + 30, this.pos.y + 315)
                ctx.fillText('can have ', this.pos.x + 30, this.pos.y + 340)


                break;

            case 3:
                //Speed
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Speed', this.pos.x + 90, this.pos.y + 70);
                this.icon.src = '../assets/speedUp.png';
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 104, 125, 125);
                ctx.font = '15px JOYSTIX'
                ctx.fillText('Increase the speed ', this.pos.x + 30, this.pos.y + 290)
                ctx.fillText('your player moves', this.pos.x + 30, this.pos.y + 315)
                ctx.fillText('across the screen ', this.pos.x + 30, this.pos.y + 340)
                break;

            case 4:
                //Shoot Speed
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Shoot Speed', this.pos.x + 24, this.pos.y + 70);
                this.icon.src = '../assets/shootSpeedUp.png'
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 104, 125, 125);
                ctx.font = '15px JOYSTIX'
                ctx.fillText('Increase the speed of', this.pos.x + 30, this.pos.y + 290)
                ctx.fillText('the projectiles you', this.pos.x + 30, this.pos.y + 315)
                ctx.fillText('shoot', this.pos.x + 30, this.pos.y + 340)

                break;

            case 5:
                //Exp
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Exp', this.pos.x + 125, this.pos.y + 70);
                this.icon.src = '../assets/expUp.png'
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 94, 125, 125);
                ctx.font = '15px JOYSTIX'
                ctx.fillText('Increase the amount of ', this.pos.x + 30, this.pos.y + 290)
                ctx.fillText('exp you gain for each', this.pos.x + 30, this.pos.y + 315)
                ctx.fillText('asteroid destroyed', this.pos.x + 30, this.pos.y + 340)
                break;

            case 6:
                //Recharge
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Recharge', this.pos.x + 60, this.pos.y + 70);
                this.icon.src = '../assets/rechargeUp.png'
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 104, 125, 125);
                ctx.font = '15px JOYSTIX'
                ctx.fillText('Decrease the time it', this.pos.x + 30, this.pos.y + 290);
                ctx.fillText('takes to shoot a new', this.pos.x + 30, this.pos.y + 315);
                ctx.fillText('projectile', this.pos.x + 30, this.pos.y + 340);

                break;

            case 7:
                //Multishot
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Multishot', this.pos.x + 52, this.pos.y + 70);
                this.icon.src = '../assets/multishotUp.png'
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 99, 125, 125);
                ctx.font = '15px JOYSTIX'
                ctx.fillText('shoot 1 more ', this.pos.x + 30, this.pos.y + 290)
                ctx.fillText('projectile at once', this.pos.x + 30, this.pos.y + 315)
                ctx.fillText('', this.pos.x + 30, this.pos.y + 340)
                ctx.fillText('', this.pos.x + 30, this.pos.y + 365)

                break;

            case 8:
                //Size
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX'
                ctx.fillText('Size', this.pos.x + 109, this.pos.y + 70);
                this.icon.src = '../assets/shootSzUp.png'
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 97, 125, 125);
                ctx.font = '15px JOYSTIX'
                ctx.fillText('Increase the size of', this.pos.x + 30, this.pos.y + 290)
                ctx.fillText('the projectile you', this.pos.x + 30, this.pos.y + 315)
                ctx.fillText('shoot ', this.pos.x + 30, this.pos.y + 340)

                break;

            case 9:
                //Ability
                if (abilityE.unlocked == false) {
                    ctx.fillStyle = 'white';
                    ctx.font = '30px JOYSTIX';
                    ctx.fillText('Ability', this.pos.x + 80, this.pos.y + 70);
                    ctx.font = '80px JOYSTIX';
                    ctx.fillText('E', this.pos.x + 125, this.pos.y + 190);
                    ctx.font = '15px JOYSTIX';
                    ctx.fillText('Unlock a new ability ', this.pos.x + 30, this.pos.y + 290);
                    ctx.fillText('(press E to use)', this.pos.x + 30, this.pos.y + 315);
                } else {
                    ctx.fillStyle = 'white';
                    ctx.font = '30px JOYSTIX';
                    ctx.fillText('Duration', this.pos.x + 63, this.pos.y + 70);
                    this.icon.src = '../assets/durationUp.png';
                    ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 104, 125, 125);
                    ctx.font = '15px JOYSTIX';
                    ctx.fillText('Increase the duration', this.pos.x + 30, this.pos.y + 290);
                    ctx.fillText('of your e ability', this.pos.x + 30, this.pos.y + 315);
                }

                break;

            case 10:
                //Cooldown
                ctx.fillStyle = 'white';
                ctx.font = '30px JOYSTIX';
                ctx.fillText('Cooldown', this.pos.x + 60, this.pos.y + 70);
                this.icon.src = '../assets/cooldownUp.png';
                ctx.drawImage(this.icon, this.pos.x + 95, this.pos.y + 104, 125, 125);
                ctx.font = '15px JOYSTIX';
                ctx.fillText('Reduce the cooldown', this.pos.x + 30, this.pos.y + 290);
                ctx.fillText('of your e ability', this.pos.x + 30, this.pos.y + 315);
                break;

        }


        ctx.closePath();



    }

    updt() {
        this.desenha();

        if (isInsideButton({ x: this.pos.x, y: this.pos.y, width: this.size.w, height: this.size.h })) {
            this.mouseOn = true;
        } else {
            this.mouseOn = false;
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.applying == true) {
            switch (this.i) {
                //Damage
                case 1:
                    max_dmg += 5;
                    break;

                //Health
                case 2:
                if(life == max_life){
                    max_life += 10;
                    life = max_life
                }else{
                    max_life += 10;
                }
                
                    break;
                //Speed
                case 3:
                    player.speed += 0.5;
                    break;

                //Shoot speed

                case 4:
                projectile_speed += 0.5
                    break;

                //Exp
                
                case 5:
                    exp_collect += 0.1;
                    break;
                //recharge                    
                case 6:
                shoot_cd -= 1.5;
                    break;
                //Multi
                
                case 7:
                multi_shot += 1;
                    break;

                //size
                case 8:
                projectile_radius += 1;
                    break;

                //ability
                case 9:
                if(abilityE.unlocked == false){
                    
                    abilityE.helper = true;
                    
                }else{
                    abilityE.duration += 5;
                }
                    break;

                //cooldown
                case 10:
                    abilityE.cooldown -= 15;
                    break;
            }

            this.applying = false;
        }

    
}

}





let card = new Card({
    position: { x: 75, y: 150 },
    velocity: { x: 0, y: 0 },
    index: 0
})

let card2 = new Card({
    position: { x: 485, y: 150 },
    velocity: { x: 0, y: 0 },
    index: 0
})

let card3 = new Card({
    position: { x: 900, y: 150 },
    velocity: { x: 0, y: 0 },
    index: 0
}) 