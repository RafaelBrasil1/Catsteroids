var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 768;
let anima;

let paused = false;
let friction = .95;
let rotation_speed = 0.07;
let max_index = 9;
let bossMode = false;
let angle

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

let player = new Player({
    position: { x: 200, y: 200 },
    velocity: { x: 0, y: 0 },
    imageSrc: "../assets/player.png"
});

function SpawnAsteroid() {
    setTimeout(() => {

        if (paused == false && bossMode == false) {
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

    if (paused == false) {
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
            player.img.src = '../assets/player.png'
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

            if(circleCollision(current_projectile,boss)){
                projectiles.splice(i,1);
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
                player.img.src = '../assets/player3.png';
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
        if(level % 5 == 0){

        if(bossMode == false){
            boss.nome = nomes[RandomInt(0,nomes.length)];
        }

        bossMode = true
        boss.updt();
        if(boss.life <= 500){
        boss.radius = boss.life
        }else{
            boss.radius = 500;
        }

        if(boss.pos.x > canvas.width){
            boss.vel.x = -5;
        }else{
            boss.vel.x = 0;
        };

        if(boss.life <= 0){
            boss.life = 0;
        }

        // boss colision player
        if(circleCollision(player,boss)){
            life = 0;
        }


        // boss ataq
        if(boss.cooldown <= 0){
            angle = Math.atan2(boss.pos.y - player.pos.y,boss.pos.x - player.pos.x)
            

            bossprojectiles.push(new BossProjectile({
                    position: {x: boss.pos.x + Math.cos(angle + Math.PI) * boss.radius, y: boss.pos.y + Math.sin(angle + Math.PI) * boss.radius },
                    velocity: {x: Math.cos(angle + Math.PI) * boss.shoot_speed, y: Math.sin(angle + Math.PI) * boss.shoot_speed},
                    radius: boss.shoot_sz,
                    damage: boss.dmg
               
            }));


            boss.cooldown = 100;

          

        }else{
            
            boss.cooldown -= 1;
        }

        // boss projectiles updt
        for (let i = bossprojectiles.length; i >= 0, i--;){

            let crrnt_bossprojectile = bossprojectiles[i];
            if(boss.nome == "Gojo Satoru"){
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

            if(circleCollision(crrnt_bossprojectile,player)){
                bossprojectiles.splice(i,1);
                life -= boss.dmg;

            }


            
            

            
        }

        

        if(boss.nome == "Gojo Satoru"){
            boss.shoot_sz = 800;
            boss.dmg = Infinity;

        }



    

        //boss death

        if(boss.life <= 20){
            boss.life = 0;
            bossMode = false;
            boss.life = boss.newlife;
            boss.newlife += (level+5) * 100;
            boss.maxlife = boss.life;
            boss.dmg += 15;
            boss.shoot_speed += 1;
            boss.shoot_sz += 2;
            bossprojectiles = []; 
            if(boss.life < 500){
            boss.pos.x = canvas.width + boss.life;
            }else{
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
            player.rot -= rotation_speed;
        }

        if (keys.d.pressed) {
            player.rot += rotation_speed;
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
            leveling = true;

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

        player.img.src = '../assets/player3.png';
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

    anima = requestAnimationFrame(draw);
}


draw()

SpawnAsteroid();

// eventlisteners

document.addEventListener('keydown', function (event) {

    switch (event.code) {
        case "KeyA": keys.a.pressed = true;
            break;

        case "ArrowLeft": keys.a.pressed = true;
            break;

        case "KeyD": keys.d.pressed = true;
            break;

        case "ArrowRight": keys.d.pressed = true;
            break;


        case "KeyW": keys.w.pressed = true;
            break;

        case "ArrowUp": keys.w.pressed = true;
            break;

        case "Space":
            if (keys.space.pressed == false) {
                if (paused == false) {
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

                        player.img.src = "../assets/player2.png";
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
            player.img.src = "../assets/player.png";
            break;





    }

});


document.addEventListener('click', function (event) {
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
        position: {x: canvas.width + Size,y:350},
        velocity: {x: 0, y:0},
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


});