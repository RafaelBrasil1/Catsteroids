var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 768;
let anima;

let AUTOMATION_ON = false;





let player;
let paused = false;
let friction = .95;
let rotation_speed = 0.07;
let max_index = 9;
let bossMode = false;
let angle
let menu = AUTOMATION_ON === true ? false : true;
let ctrl_screen = false;
let credits_screen = false;
let titleImg = new Image();
titleImg.src = "./assets/Title.png"
let played = false;
let menuShoot = new Projectile({

    position: { x: -10, y: 270 },
    velocity: { x: 7, y: 0 },
    radius: 5,
    damage: 5
})
let menuShoot2 = new Projectile({

    position: { x: 630, y: 270 + 48 },
    velocity: { x: 0, y: 7 },
    radius: 5,
    damage: 5
})

let menuShoot3 = new Projectile({

    position: { x: 630, y: 270 + 48 },
    velocity: { x: 0, y: 7 },
    radius: 5,
    damage: 5
})

let menuShoot4 = new Projectile({

    position: { x: 630, y: 270 - 48 },
    velocity: { x: 0, y: -7 },
    radius: 5,
    damage: 5
})





let abilityE = {
    unlocked: false,
    helper: false,
    duration: 40,
    cooldown: 600,
    timer: 0,
    cooldown_timer: 0
}



let keys = {
    w:
        { pressed: false },

    a:
        { pressed: false },

    d:
        { pressed: false },

    space: { pressed: false },

    e: { pressed: false }
}

// new player
if (menu) {
    player = new Player({
        position: { x: -100, y: 270 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./assets/player.png"
    });
} else {
    player = new Player({
        position: { x: 630, y: 270 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./assets/player.png"
    });
}



// neural network
let aiShootimer = 0;
let nn;
let num_Inputs = 3;
let num_hidden = 100;
let num_outputs = 1;
let outputLimit = 0.25;
let output_left = 0;
let output_right = 1;
let fire_rate = 1; //per second

if (AUTOMATION_ON) {

    nn = new NeuralNetwork({
        numInputs: num_Inputs,
        numHidden: num_hidden,
        numOutput: num_outputs,

    });


    //training
    let astX, astY, PlaAngl, PlaX, PlaY
    for (let i = 0; i < 2000000; i++) {

        //asteroid pos
        astX = Math.random() * (canvas.width + max_sz * 2) - max_sz;
        astY = Math.random() * (canvas.height + max_sz * 2) - max_sz;

        //player
        PlaAngl = Math.random() * (Math.PI * 2)
        PlaX = player.pos.x
        PlaY = player.pos.y

        //angle to asteroid
        let angle = AngleToPoint(
            {x:PlaX,
            y: PlaY},
            PlaAngl,
            {x: astX,
            y: astY}
        )

        //direction to turn

        let direction = angle > Math.PI ? output_left : output_right

        //train network


        nn.Train(NormalizeInput(astX,astY,PlaAngl),[direction]);



    }



}




let rotatePlayer = (right) =>{
 let multiplier = right ? 1 : -1;
    player.rot += rotation_speed * multiplier;
    console.log(player.rot);


}


asteroids.push(new Asteroid({
    position: { x: 200, y: 100 },
    velocity: { x: 1, y: 1 },
    radius: 60
}));


function SpawnAsteroid() {
    setTimeout(() => {

        if (paused == false && bossMode == false && menu == false) {
            let index = RandomInt(1, 4);
            let x, y;
            let vel_angl, max_angl, min_angl;
            let radius = RandomInt(20, max_sz);


            switch (index) {
                case 1:  // left side
                    x = 0 - radius;
                    y = RandomInt(20, canvas.height - 20);
                    min_angl = Math.atan(y / (canvas.width + radius)) * -1;
                    max_angl = Math.atan((canvas.height - y) / (canvas.width + radius))


                    vel_angl = Math.random() * (max_angl - min_angl) + min_angl



                    break;

                case 2:  // right side
                    x = canvas.width + radius;
                    y = RandomInt(20, canvas.height - 20);

                    min_angl = (Math.atan(y / (canvas.width + radius)) * -1)
                    max_angl = Math.atan((canvas.height - y) / (canvas.width + radius))


                    vel_angl = Math.PI - (Math.random() * (max_angl - min_angl) + min_angl)


                    break;

                case 3:  // top side
                    x = RandomInt(20, canvas.width - 20);
                    y = 0 - radius;

                    min_angl = (Math.atan(x / (canvas.height + radius)) + (Math.PI / 2))
                    max_angl = ((Math.atan((canvas.width - x) / (canvas.height + radius)) * -1) + (Math.PI / 2))


                    vel_angl = (Math.random() * (max_angl - min_angl) + min_angl)




                    break;

                case 4:  // bottom side
                    x = RandomInt(20, canvas.width - 20);
                    y = canvas.height + radius;

                    min_angl = (Math.atan(x / (canvas.height + radius)) * -1 + (Math.PI / 2)) - Math.PI
                    max_angl = ((Math.atan((canvas.width - x) / (canvas.height + radius))) + (Math.PI / 2)) - Math.PI

                    vel_angl = (Math.random() * (max_angl - min_angl) + min_angl)


                    break;
            }
            asteroids.push(new Asteroid({
                position: { x: x, y: y },
                velocity: { x: Math.cos(vel_angl) * 2, y: Math.sin(vel_angl) * 2 },
                radius: radius
            }))

        }

        SpawnAsteroid();
    }, asteroid_spawn)

}








function draw() {
    if (menu == false) {
        if (paused == false) {

                // keep between 0 - 360

                if(player.rot < 0){
                    player.rot += (Math.PI * 2)
                }else if(player.rot >= (Math.PI*2)){
                    player.rot -= (Math.PI * 2)
                }


            //automation
            if (AUTOMATION_ON) {
                let astX;
                let asty;
                if(asteroids.length > 0){
                astX = asteroids[0].pos.x;
                astY = asteroids[0].pos.y;
                }else{
                astX = 0;
                astY = 0;
                }
                
                let PlaAngl = Math.PI - player.rot;
                let predict = nn.FeedForward(NormalizeInput(astX,astY,PlaAngl)).data[0][0]
                

                //make turn
                let dLeft = Math.abs(predict - output_left);
                let dRight = Math.abs(predict - output_right);

                if(dLeft < outputLimit){
                    rotatePlayer(true);
                } else if (dRight < outputLimit){
                    rotatePlayer(false); 
                }else{
                    //stop rotating
                    
                }

                if(aiShootimer == 0){
                    aiShootimer = 20;       

                    projectiles.push(new Projectile({
                        position: { x: player.pos.x + Math.cos(player.rot) * 55, y: player.pos.y + Math.sin(player.rot) * 55 },
                        velocity: { x: Math.cos(player.rot) * projectile_speed, y: Math.sin(player.rot) * projectile_speed },
                        radius: projectile_radius,
                        damage: max_dmg
                    }))

                }else{
                    aiShootimer --;
                }


            }




            // background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            // cooldowns
            if (shoot_timer > 0) {

                shoot_timer -= 1;

            }

            if (healthRegen > 0) {
                healthRegen -= 1;
            } else {
                if (life < max_life) {
                    life += max_life / 100;
                    healthRegen = 100;

                }
            }

            if (hit_animation > 0) {
                hit_animation -= 1;
            } else {
                player.img.src = './assets/player.png'
            }




            player.updt();


            // projectile updt
            for (let i = projectiles.length; i >= 0, i--;) {
                let current_projectile = projectiles[i];
                current_projectile.updt();

                // delet projectile from list 
                if (current_projectile.pos.x + current_projectile.radius < 0 ||
                    current_projectile.pos.x - current_projectile.radius > canvas.width ||
                    current_projectile.pos.y + current_projectile.radius < 0 ||
                    current_projectile.pos.y - current_projectile.radius > canvas.height) {
                    projectiles.splice(i, 1);
                }

                if (circleCollision(current_projectile, boss)) {
                    projectiles.splice(i, 1);
                    boss.life -= max_dmg;
                }

            }


            // Asteroid updt

            for (let i = asteroids.length; i >= 0, i--;) {
                let crrnt_asteroid = asteroids[i];
                crrnt_asteroid.updt();

                // delet asteroid from list
                if (crrnt_asteroid.pos.x + crrnt_asteroid.radius < 0 ||
                    crrnt_asteroid.pos.x - crrnt_asteroid.radius > canvas.width ||
                    crrnt_asteroid.pos.y + crrnt_asteroid.radius < 0 ||
                    crrnt_asteroid.pos.y - crrnt_asteroid.radius > canvas.height) {
                    asteroids.splice(i, 1);
                }
                // asteroid killed
                if (crrnt_asteroid.radius <= 0) {
                    if (crrnt_asteroid.killed) {
                        exp += crrnt_asteroid.maxRadius * exp_collect;
                    }
                    asteroids.splice(i, 1);
                }
                // player collision
                if (circleCollision(crrnt_asteroid, player)) {
                    life -= crrnt_asteroid.radius;
                    crrnt_asteroid.radius = 0;
                    hit_animation = 70;
                    player.img.src = './assets/player3.png';
                }


                // asteroid projectile collision
                for (let j = projectiles.length; j >= 0, j--;) {
                    let current_projectile = projectiles[j];
                    if (circleCollision(crrnt_asteroid, current_projectile)) {



                        if (crrnt_asteroid.radius > 20) {
                            current_projectile.vida -= crrnt_asteroid.radius;
                            crrnt_asteroid.radius -= current_projectile.dmg;
                            current_projectile.dmg = current_projectile.vida;

                            if (current_projectile.dmg <= 0) {
                                projectiles.splice(j, 1);
                            }

                        }
                        if (crrnt_asteroid.radius <= 20) {
                            crrnt_asteroid.killed = true;
                            crrnt_asteroid.radius = 0;

                        }



                    }

                }
            }



            // Boss
            if (level % 5 == 0 && !AUTOMATION_ON) {


                if (bossMode == false) {
                    boss.nome = nomes[RandomInt(0, nomes.length)];

                }

                bossMode = true
                boss.updt();
                if (boss.life <= 500) {
                    boss.radius = boss.life
                } else {
                    boss.radius = 500;
                }

                if (boss.pos.x > canvas.width) {
                    boss.vel.x = -5;
                } else {
                    boss.vel.x = 0;
                };

                if (boss.life <= 0) {
                    boss.life = 0;
                }

                // boss colision player
                if (circleCollision(player, boss)) {
                    life = 0;
                }


                // boss ataq
                if (boss.cooldown <= 0) {
                    angle = Math.atan2(boss.pos.y - player.pos.y, boss.pos.x - player.pos.x)


                    bossprojectiles.push(new BossProjectile({
                        position: { x: boss.pos.x + Math.cos(angle + Math.PI) * boss.radius, y: boss.pos.y + Math.sin(angle + Math.PI) * boss.radius },
                        velocity: { x: Math.cos(angle + Math.PI) * boss.shoot_speed, y: Math.sin(angle + Math.PI) * boss.shoot_speed },
                        radius: boss.shoot_sz,
                        damage: boss.dmg

                    }));


                    boss.cooldown = 100;



                } else {

                    boss.cooldown -= 1;
                }

                // boss projectiles updt
                for (let i = bossprojectiles.length; i >= 0, i--;) {

                    let crrnt_bossprojectile = bossprojectiles[i];
                    if (boss.nome == "Gojo Satoru") {
                        crrnt_bossprojectile.color = 'purple';
                    }

                    crrnt_bossprojectile.updt();

                    // delet projectile from list 
                    if (crrnt_bossprojectile.pos.x + crrnt_bossprojectile.radius < 0 ||
                        crrnt_bossprojectile.pos.x - crrnt_bossprojectile.radius > canvas.width ||
                        crrnt_bossprojectile.pos.y + crrnt_bossprojectile.radius < 0 ||
                        crrnt_bossprojectile.pos.y - crrnt_bossprojectile.radius > canvas.height) {
                        bossprojectiles.splice(i, 1);
                    }

                    if (circleCollision(crrnt_bossprojectile, player)) {
                        bossprojectiles.splice(i, 1);
                        life -= boss.dmg;

                    }






                }



                if (boss.nome == "Gojo Satoru") {
                    boss.shoot_sz = 800;
                    boss.dmg = Infinity;

                }





                //boss death

                if (boss.life <= 20) {
                    boss.life = 0;
                    bossMode = false;
                    boss.life = boss.newlife;
                    boss.newlife += (level + 5) * 100;
                    boss.maxlife = boss.life;
                    boss.dmg += 15;
                    boss.shoot_speed += 0.5;
                    boss.shoot_sz += 2;
                    bossprojectiles = [];
                    if (boss.life < 500) {
                        boss.pos.x = canvas.width + boss.life;
                    } else {
                        boss.pos.x = canvas.width + 500;
                    }
                    level += 1;
                    leveling = true;
                }

            }





            // E ability
            if (abilityE.unlocked) {

                if (keys.e.pressed == false) {
                    abilityE.timer = abilityE.duration;
                    abilityE.cooldown_timer = abilityE.cooldown;
                } else {
                    if (abilityE.timer > 0) {
                        for (i = 1; i < multi_shot + 1; i++) {
                            projectiles.push(new Projectile({
                                position: { x: player.pos.x + Math.cos(player.rot - (multi_shot / 20) + (i - 1) / 10) * 55, y: player.pos.y + Math.sin(player.rot - (multi_shot / 20) + (i - 1) / 10) * 55 },
                                velocity: { x: Math.cos(player.rot - (multi_shot / 20) + (i - 1) / 10) * projectile_speed, y: Math.sin(player.rot - (multi_shot / 20) + (i - 1) / 10) * projectile_speed },
                                radius: projectile_radius,
                                damage: max_dmg
                            }))
                        }
                        abilityE.timer -= 1;

                    } else {
                        if (abilityE.cooldown_timer > 0) {
                            abilityE.cooldown_timer--;
                        } else {
                            keys.e.pressed = false;
                        }
                    }

                }

                ctx.strokeStyle = 'white';
                ctx.rect(25, 550, 100, 100);

                ctx.fillStyle = 'white';
                ctx.font = '70px JOYSTIX';
                ctx.fillText('E', 45, 625);
                ctx.fillStyle = 'rgba(255,255,255,0.1'
                ctx.fillRect(25, 550, (abilityE.cooldown_timer / abilityE.cooldown) * 100, 100);
                ctx.stroke();



            }






            // movement
            if (keys.w.pressed) {
                player.vel.x = Math.cos(player.rot) * player.speed;
                player.vel.y = Math.sin(player.rot) * player.speed;
            }
            // friction
            else if (!keys.w.pressed) {
                player.vel.x *= friction;
                player.vel.y *= friction;
            }


            // rotate
            if (keys.a.pressed) {
                rotatePlayer(false)
                
            }

            if (keys.d.pressed) {
                rotatePlayer(true)
                
            }


            // bounds

            if (player.pos.x < -87) {
                player.pos.x = canvas.width + 87;
            }
            if (player.pos.x > canvas.width + 87) {
                player.pos.x = -87;
            }

            if (player.pos.y < -87) {
                player.pos.y = canvas.height + 87;
            }

            if (player.pos.y > canvas.height + 87) {
                player.pos.y = -87;
            }

            if (life < 0) {
                life = 0;
            }




            // game updt after lvl
            if (exp >= exp_limit) {
                exp -= exp_limit;
                level += 1;
                exp_limit += exp_limit / 10
                max_sz += 4;
                asteroid_spawn -= 85;
                if(!AUTOMATION_ON){
                leveling = true;
                }

            }




            // UI
            ctx.beginPath();

            // Exp
            ctx.strokeStyle = 'white'

            ctx.fillStyle = 'rgb(168, 0, 235)';
            ctx.fillRect(150, 725, exp / exp_limit * 1000, 20);

            ctx.rect(150, 725, 1000, 20);



            // Life
            ctx.strokeStyle = 'white'

            ctx.fillStyle = 'green';
            ctx.fillRect(100, 675, (life / max_life) * 1100, 30);

            ctx.fillStyle = 'white'
            ctx.font = "25px JOYSTIX"
            ctx.fillText(`${Math.floor(life)}/${Math.floor(max_life)}`, 600, 700)


            ctx.rect(100, 675, 1100, 30);

            // LevelDisplay

            ctx.fillStyle = 'white'
            ctx.font = '15px JOYSTIX'
            ctx.fillText(`Level: ${level}`, 25, 740);
            ctx.stroke();
            ctx.closePath();



        }

        // leveling

        if (leveling == false) {

            card.i = RandomInt(1, max_index);

            card2.i = card.i
            while (card2.i == card.i) {
                card2.i = RandomInt(1, max_index);

            }

            card3.i = card2.i
            while (card3.i == card2.i || card3.i == card.i) {
                card3.i = RandomInt(1, max_index);
            }




            card.vel.y = 0;
            card.pos.y = 150;
            card.selected = false;

            card2.vel.y = 0;
            card2.pos.y = 150;
            card2.selected = false;

            card3.vel.y = 0;
            card3.pos.y = 150;
            card3.selected = false;
        }

        if (leveling == true) {


            paused = true;
            for (i = 0; i < 100; i++) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            if (abilityE.unlocked == true) {
                max_index = 10;
            }


            // card updt
            card.updt();
            card2.updt();
            card3.updt();


            // card selected
            if (card.selected == true) {
                card.vel.y += -0.2;
                card2.vel.y += 0.2;
                card3.vel.y += 0.2;

            }

            if (card2.selected == true) {
                card.vel.y += 0.2;
                card2.vel.y += -0.2;
                card3.vel.y += 0.2;
            }

            if (card3.selected == true) {
                card.vel.y += 0.2;
                card2.vel.y += 0.2;
                card3.vel.y += -0.2;
            }




            ctx.fillStyle = 'white';
            ctx.font = '70px JOYSTIX';
            ctx.fillText("Select an Upgrade", 150, 100);


            if (card.vel.y < -17 || card.vel.y > 17) {
                leveling = false;
                paused = false;
                if (abilityE.helper == true) {
                    abilityE.unlocked = true;
                }
            }
        }







        // Gameover

        if (life <= 0) {

            player.img.src = './assets/player3.png';
            player.updt();
            player.vel.x = 0;
            player.vel.y = 0;
            paused = true;
            life = 0
            hit_animation = 10
            healthRegen = 10;

            ctx.font = '80px JOYSTIX';
            ctx.fillText("Game Over", 310, 300)


            ctx.save();
            ctx.beginPath();
            retrybtn.desenha();
            menubtn.desenha();
            ctx.closePath();
            ctx.restore();
        }




    } // Menu 

    else {
        ctx.save();

        // background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Title
        ctx.drawImage(titleImg, 265, 20, 700, 200);



        if (!played) {
            playbtn.desenha();

            Controlsbtn.desenha();
            Creditsbtn.desenha();
        }


        if (played) {
            playbtn.mouseOn = false;
            playbtn.colorUsed = playbtn.color1;
            playbtn.txtColor = 'white';

            Controlsbtn.mouseOn = false;
            Controlsbtn.colorUsed = Controlsbtn.color1;
            Controlsbtn.txtColor = 'white';

            Creditsbtn.mouseOn = false;
            Creditsbtn.colorUsed = Creditsbtn.color1;
            Creditsbtn.txtColor = 'white';




            player.updt();

            menuShoot.updt();


            if (menuShoot.pos.x < 370) {
                playbtn.desenha();

            } else {
                menuShoot.pos.x = 2000;
                menuShoot.vel.x = 0;
                if (player.pos.x < 630) {
                    player.vel.x = 6;
                } else {
                    player.vel.x = 0;
                    if (player.rot < 1.57) {
                        player.rot += 0.05
                    } else {
                        menuShoot2.updt();

                    }
                }

            }

            if (menuShoot2.pos.y < 420) {
                Controlsbtn.desenha();
            } else {
                menuShoot2.pos.x = 2000;
                menuShoot2.vel.y = 0;
                menuShoot3.updt();
            }


            if (menuShoot3.pos.y < 620) {
                Creditsbtn.desenha();
            } else {
                menuShoot3.pos.x = 2000;
                menuShoot3.vel.y = 0;
                if (player.rot < 1.575 * 3) {
                    player.rot += 0.05

                } else {
                    menuShoot4.updt();
                    if (menuShoot4.pos.y < 200) {
                        titleImg.src = '';
                        menuShoot4.pos.x = 2000;
                        menuShoot4.vel.y = 0;
                        menu = false;
                    }
                }
            }




        }



        if (ctrl_screen) {
            ctx.fillStyle = 'white'
            ctx.fillRect(45, 45, canvas.width - 90, canvas.height - 90);
            ctx.fillStyle = 'black'
            ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100)

            ctx.font = '70px JOYSTIX';
            ctx.fillStyle = 'white'
            ctx.fillText("Controls", 630, 150)

            ctx.font = '30px JOYSTIX';
            ctx.fillText('Rotate Player: A / D', 400, 300);
            ctx.fillText('Move Forward: W', 340, 400);
            ctx.fillText('Shoot Projectile: Spacebar', 475, 500);

            ctrlClose.desenha();

        }
        if (credits_screen) {
            ctx.fillStyle = 'white';
            ctx.fillRect(45, 45, canvas.width - 90, canvas.height - 90);
            ctx.fillStyle = 'black';
            ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

            ctx.font = '70px JOYSTIX';
            ctx.fillStyle = 'white';
            ctx.fillText("Credits", 630, 150);

            ctx.font = '30px JOYSTIX';
            ctx.fillText('Game Developer', 640, 250);
            ctx.fillText('Rafael B. Ulbrich', 640, 300);

            ctx.fillText('Art Designer', 635, 500);
            ctx.fillText('Leonardo B. Ulbrich', 640, 550);

            creditsClose.desenha();
        }
        ctx.restore();
    }




    anima = requestAnimationFrame(draw);
}


draw()

SpawnAsteroid();

// eventlisteners

document.addEventListener('keydown', function (event) {
    if (AUTOMATION_ON) {
        return
    }

    switch (event.code) {
        case "KeyA":
        case "ArrowLeft": keys.a.pressed = true;
            break;

        case "KeyD":
        case "ArrowRight": keys.d.pressed = true;
            break;


        case "KeyW":
        case "ArrowUp": keys.w.pressed = true;
            break;

        case "Space":
            if (keys.space.pressed == false) {
                if (paused == false && menu == false) {
                    if (shoot_timer <= 0) {

                        for (i = 1; i < multi_shot + 1; i++) {
                            projectiles.push(new Projectile({
                                position: { x: player.pos.x + Math.cos(player.rot - (multi_shot / 20) + (i - 1) / 10) * 55, y: player.pos.y + Math.sin(player.rot - (multi_shot / 20) + (i - 1) / 10) * 55 },
                                velocity: { x: Math.cos(player.rot - (multi_shot / 20) + (i - 1) / 10) * projectile_speed, y: Math.sin(player.rot - (multi_shot / 20) + (i - 1) / 10) * projectile_speed },
                                radius: projectile_radius,
                                damage: max_dmg
                            }))
                        }

                        shoot_timer = shoot_cd;

                        player.img.src = "./assets/player2.png";
                    }
                }
            }
            keys.space.pressed = true;
            break;


        case "KeyE": if (abilityE.unlocked) {
            keys.e.pressed = true;

        }
            break;



    }

});

document.addEventListener('keyup', function (event) {
    if (AUTOMATION_ON) {
        return
    }
    switch (event.code) {
        case "KeyA": keys.a.pressed = false;
            break;

        case "ArrowLeft": keys.a.pressed = false;
            break;

        case "KeyD": keys.d.pressed = false;
            break;

        case "ArrowRight": keys.d.pressed = false;
            break;


        case "KeyW": keys.w.pressed = false;
            break;

        case "ArrowUp": keys.w.pressed = false;
            break;


        case "Space": keys.space.pressed = false;
            player.img.src = "./assets/player.png";
            break;





    }

});


document.addEventListener('click', function (event) {
    if (AUTOMATION_ON) {
        return
    }
    if (retrybtn.mouseOn) {

        asteroid_spawn = 3000;
        max_sz = 60;
        projectile_radius = 5;
        projectile_speed = 3.5;
        multi_shot = 1;
        max_dmg = 10;
        shoot_timer = 0;
        shoot_cd = 25;
        projectiles = [];
        asteroids = []
        level = 1;
        healthRegen = 0;
        exp_limit = 100;
        exp = 0
        max_life = 100;
        life = max_life
        hit_animation = 0;
        friction = .95;
        rotation_speed = 0.07;
        paused = false;
        leveling = false;
        retrybtn.mouseOn = false;
        abilityE = {
            unlocked: false,
            helper: false,
            duration: 40,
            cooldown: 600,
            timer: 0,
            cooldown_timer: 0
        }
        bossMode = false

        boss = new Boss(
            {
                position: { x: canvas.width + Size, y: 350 },
                velocity: { x: 0, y: 0 },
                size: Size

            }

        )


    }
    if (menubtn.mouseOn) {
        location.reload();
    }


    if (card.selected == false && card2.selected == false && card3.selected == false) {
        if (card.mouseOn) {
            card.selected = true;
            card.applying = true;
            card.mouseOn = false;
        }

        if (card2.mouseOn) {
            card2.selected = true;
            card2.applying = true;
            card2.mouseOn = false;
        }

        if (card3.mouseOn) {
            card3.selected = true;
            card3.applying = true;
            card3.mouseOn = false;
        }
    }


    if (Controlsbtn.mouseOn && credits_screen == false && played == false) {
        Controlsbtn.mouseOn = false
        ctrl_screen = true;

    }

    if (ctrl_screen && ctrlClose.mouseOn) {
        ctrlClose.mouseOn = false;
        ctrl_screen = false;
    }


    if (ctrl_screen == false && Creditsbtn.mouseOn == true && played == false) {
        credits_screen = true;
        Creditsbtn.mouseOn = false;
    }

    if (credits_screen && creditsClose.mouseOn) {
        credits_screen = false;
        creditsClose.mouseOn = false;
    }

    if (credits_screen == false && ctrl_screen == false && playbtn.mouseOn) {
        playbtn.mouseOn = false;
        played = true;

    }


});

// //XOR
// // 0 0 == 0
// // 0 1 == 1
// // 1 0 == 1
// // 1 1 == 0
// let input0 = RandomInt(0,1)
// let input1 = RandomInt(0,1)
// let output = input0 == input1 ? 0 : 1

// console.log("0 0 ==" + nn.FeedForward([0, 0]).data)
// console.log("1 0 ==" + nn.FeedForward([1, 0]).data)
// console.log("0 1 ==" + nn.FeedForward([0, 1]).data)
// console.log("1 1 ==" + nn.FeedForward([1, 1]).data)