var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 768;
let anima;

let friction = .95;
let rotation_speed = 0.07;

let projectile_radius = 5;
let projectile_speed = 3.5;
let multi_shot = 1;

let projectiles = [];
let asteroids = [];

let keys = {
    w:
        { pressed: false },

    a:
        { pressed: false },

    d:
        { pressed: false }
}

    //new player

let player = new Player({
    position: { x: 200, y: 200 },
    velocity: { x: 0, y: 0 },
    imageSrc: "../assets/player.png"
});

 setInterval( () => {
    let index = RandomInt(1,4)
    let x,y;
    let vel_angl,max_angl,min_angl;
    let radius = RandomInt(10,50);


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

 },3000)



function draw() {
    
    //background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

        //delet asteroid from list
    //     if(crrnt_asteroid.pos.x + crrnt_asteroid.radius < 0 ||
    //         crrnt_asteroid.pos.x - crrnt_asteroid.radius > canvas.width ||
    //         crrnt_asteroid.pos.y + crrnt_asteroid.radius < 0 ||
    //         crrnt_asteroid.pos.y - crrnt_asteroid.radius > canvas.height)
    //         {
    //         asteroids.splice(i,1);
    //     }
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


    // ctx.beginPath();
    // ctx.rect(100,725,1100,20);
    // ctx.strokeStyle = 'white'
   

    // ctx.rect(75,675,1150,30);
    // ctx.fillStyle = 'white'
    // ctx.fillText('Level: 1',30,740);
    //   ctx.stroke();
    // ctx.closePath();
  

    anima = requestAnimationFrame(draw);
}


draw()


document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case "KeyA": keys.a.pressed = true;
            break;

        case "KeyD": keys.d.pressed = true;
            break;


        case "KeyW": keys.w.pressed = true;
            break;

        case "Space":

            for (i = 1; i < multi_shot +1; i++) {
            projectiles.push(new Projectile({
                position: {x: player.pos.x + Math.cos(player.rot - (multi_shot/20)  + (i-1)/10) * 55  ,   y: player.pos.y + Math.sin(player.rot - (multi_shot/20) + (i - 1)/10 ) * 55},
                velocity: {x: Math.cos(player.rot - (multi_shot/20) + (i-1)/10) * projectile_speed, y: Math.sin(player.rot - (multi_shot/20) + (i-1)/10) * projectile_speed},
                radius: projectile_radius
            }))
        }

            player.img.src = "../assets/player2.png";
            break;


    }

});

document.addEventListener('keyup', function (event) {
    switch (event.code) {
        case "KeyA": keys.a.pressed = false;
            break;

        case "KeyD": keys.d.pressed = false;
            break;


        case "KeyW": keys.w.pressed = false;
            break;


        case "Space": player.img.src = "../assets/player.png";


    }

});