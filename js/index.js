var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 768;
let anima;
let paused = false;
let death_anim_helper = 0;


let friction = .95;
let rotation_speed = 0.07;

let projectile_radius = 5;
let projectile_speed = 3.5;
let multi_shot = 1;
let max_dmg = 10;
let shoot_timer = 0;
let shoot_cd = 25;

let level = 1;
let healthRegen = 0;
let exp_limit = 100;
let exp = 0
let max_life = 100;
let life = 10//max_life
let hit_animation = 0;

let asteroid_spawn = 3000;
let max_sz = 60;

let projectiles = [];
let asteroids = [];

let keys = {
    w:
        { pressed: false },

    a:
        { pressed: false },

    d:
        { pressed: false },

    space: {pressed: false}
}

    //new player

let player = new Player({
    position: { x: 200, y: 200 },
    velocity: { x: 0, y: 0 },
    imageSrc: "../assets/player.png"
});

    function SpawnAsteroid() {setTimeout( () => {
    
    if(paused == false){
    let index = RandomInt(1,4);
    let x,y;
    let vel_angl,max_angl,min_angl;
    let radius = RandomInt(20,max_sz);


    switch(index){
        case 1:  //left side
        x = 0 - radius;
        y = RandomInt(20,canvas.height - 20);
        min_angl = Math.atan(y / (canvas.width + radius)) * -1;
        max_angl =  Math.atan((canvas.height - y) / (canvas.width + radius))


        vel_angl = Math.random() * (max_angl - min_angl) + min_angl
        

        
        break;

        case 2:  //right side
        x = canvas.width + radius;
        y = RandomInt(20,canvas.height - 20);
        
        min_angl = (Math.atan(y / (canvas.width + radius)) * -1)
        max_angl =  Math.atan((canvas.height - y) / (canvas.width + radius))


        vel_angl = Math.PI - (Math.random() * (max_angl - min_angl) + min_angl)
        

        break;

        case 3:  //top side
        x = RandomInt(20,canvas.width - 20);
        y = 0 - radius;

        min_angl = (Math.atan( x / (canvas.height + radius)) + (Math.PI / 2)) 
        max_angl =   ((Math.atan((canvas.width - x) / (canvas.height + radius)) * -1) + (Math.PI / 2)) 


        vel_angl = (Math.random() * (max_angl - min_angl) + min_angl)
        



        break;

        case 4:  //bottom side
        x = RandomInt(20,canvas.width - 20);
        y = canvas.height + radius;

        min_angl = (Math.atan( x / (canvas.height + radius)) * -1 + (Math.PI / 2))  - Math.PI
        max_angl =  ((Math.atan((canvas.width - x) / (canvas.height + radius))) + (Math.PI / 2)) - Math.PI

        vel_angl = (Math.random() * (max_angl - min_angl) + min_angl)
    

        break;
    }
asteroids.push(new Asteroid({
    position : {x: x, y: y},
    velocity : {x: Math.cos(vel_angl) * 2, y:Math.sin(vel_angl) * 2},
    radius : radius
 }))
 
    }
    
    SpawnAsteroid();
 },asteroid_spawn)

}



  let circleCollision = (circle1, circle2) => {
    let xDiff = circle2.pos.x - circle1.pos.x;
    let yDiff = circle2.pos.y - circle1.pos.y;

    let diff = Math.sqrt((xDiff **2) + (yDiff**2))

    if(diff <= circle1.radius + circle2.radius){
        
        return true;
    }
        return false;

  }

  

function draw() {
    
        if(paused == false){
    //background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

   // cooldowns
    if(shoot_timer > 0){
        
        shoot_timer -= 1;
        
    }

    if(healthRegen > 0){
       healthRegen -= 1;
    }else{
        if(life < max_life){
        life += max_life/100;
        healthRegen = 100;
        }
    }

    if(hit_animation > 0){
        hit_animation -= 1;
    }else{
        player.img.src = '../assets/player.png'
    }




    player.updt();


    //projectile updt
    for(let i = projectiles.length; i >= 0, i--;){
        let current_projectile = projectiles[i];
        current_projectile.updt();

        //delet projectile from list 
        if(current_projectile.pos.x + current_projectile.radius < 0 ||
            current_projectile.pos.x - current_projectile.radius > canvas.width ||
            current_projectile.pos.y + current_projectile.radius < 0 ||
            current_projectile.pos.y - current_projectile.radius > canvas.height)
            {
            projectiles.splice(i,1);
        }
    }


    //Asteroid updt

    for(let i = asteroids.length; i >= 0, i--;){
        let crrnt_asteroid = asteroids[i];
        crrnt_asteroid.updt();

        // delet asteroid from list
        if(crrnt_asteroid.pos.x + crrnt_asteroid.radius < 0 ||
            crrnt_asteroid.pos.x - crrnt_asteroid.radius > canvas.width ||
            crrnt_asteroid.pos.y + crrnt_asteroid.radius < 0 ||
            crrnt_asteroid.pos.y - crrnt_asteroid.radius > canvas.height){
            asteroids.splice(i,1);
        }
        //asteroid killed
        if(crrnt_asteroid.radius <= 0){
            if(crrnt_asteroid.killed){
            exp += crrnt_asteroid.maxRadius;
            }
            asteroids.splice(i,1);
        }
            // player collision
        if(circleCollision(crrnt_asteroid,player)){
            life -= crrnt_asteroid.radius;
            crrnt_asteroid.radius = 0;
            hit_animation = 70;
            player.img.src = '../assets/player3.png';
        }


        // asteroid projectile collision
        for(let j = projectiles.length; j >= 0, j--;){
            let current_projectile = projectiles[j];
            if(circleCollision(crrnt_asteroid,current_projectile)){

                

                if(crrnt_asteroid.radius > 20){
                    current_projectile.vida -= crrnt_asteroid.radius;
                    crrnt_asteroid.radius -= current_projectile.dmg;
                    current_projectile.dmg = current_projectile.vida;

                    if(current_projectile.dmg <= 0){
                        projectiles.splice(j,1);
                    }
                    
                }
                if(crrnt_asteroid.radius <= 20){ 
                   crrnt_asteroid.killed = true;
                   crrnt_asteroid.radius = 0;
                   
                }
            
                
                
            }

            }
    }









    //movement
    if (keys.w.pressed) {
        player.vel.x = Math.cos(player.rot) * player.speed;
        player.vel.y = Math.sin(player.rot) * player.speed;
    }
    //friction
    else if (!keys.w.pressed) {
        player.vel.x *= friction;
        player.vel.y *= friction;
    }


    //rotate
    if (keys.a.pressed) {
        player.rot -= rotation_speed;
    }

    if (keys.d.pressed) {
        player.rot += rotation_speed;
    }


    //bounds

    if(player.pos.x < -87){
        player.pos.x = canvas.width + 87;
    }
    if(player.pos.x > canvas.width + 87){
        player.pos.x = -87;
    }

    if(player.pos.y < -87){
        player.pos.y = canvas.height+87;
    }

    if(player.pos.y > canvas.height+87){
        player.pos.y = -87;
    }

    if(life < 0){
        life = 0;
    }


    // UI
    ctx.beginPath();

        // Exp
    ctx.strokeStyle = 'white'
    
    ctx.fillStyle = 'rgb(168, 0, 235)';
    ctx.fillRect(150,725,exp/exp_limit * 1000,20);

    ctx.rect(150,725,1000,20); 

    if(exp >= exp_limit){
        exp -= exp_limit;
        level += 1;
        exp_limit += exp_limit/10
        max_sz += 2;
        asteroid_spawn -= 15;

    }


// Life
    ctx.strokeStyle = 'white'
    
    ctx.fillStyle = 'green';
    ctx.fillRect(100,675, (life/max_life) * 1100,30);

    ctx.fillStyle = 'white'
    ctx.font = "25px JOYSTIX"
    ctx.fillText(`${life}/${max_life}`,600,700)

   
    ctx.rect(100,675,1100,30); 

    // LevelDisplay

    ctx.fillStyle = 'white'
    ctx.font = '15px JOYSTIX'
    ctx.fillText(`Level: ${level}`,25,740);
      ctx.stroke();
    ctx.closePath();

    

        }



        
    //Gameover
console.log(player.img.src)
    if(life <= 0){
        
        
        if(death_anim_helper < 2){
            player.img.src = '../assets/player3.png';
            player.updt();
            death_anim_helper += 1;
        }
        
        

        paused = true;

        
    

        life = 0
        hit_animation = 10
        healthRegen = 10;

        ctx.font = '80px JOYSTIX';
        ctx.fillText("Game Over",310,300)

        
        ctx.save();
        ctx.beginPath();
        againbtn.desenha();
        menubtn.desenha();
        ctx.closePath();
        ctx.restore();
    }

    anima = requestAnimationFrame(draw);
}


draw()

SpawnAsteroid();

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
            if(keys.space.pressed == false){
            if(paused == false){
                if(shoot_timer <= 0){

            for (i = 1; i < multi_shot +1; i++) {
            projectiles.push(new Projectile({
                position: {x: player.pos.x + Math.cos(player.rot - (multi_shot/20)  + (i-1)/10) * 55  ,   y: player.pos.y + Math.sin(player.rot - (multi_shot/20) + (i - 1)/10 ) * 55},
                velocity: {x: Math.cos(player.rot - (multi_shot/20) + (i-1)/10) * projectile_speed, y: Math.sin(player.rot - (multi_shot/20) + (i-1)/10) * projectile_speed},
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


    case "KeyP" : if(paused == false) {
        paused = true;}
        else{
            paused = false;
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