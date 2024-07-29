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

let keys = {
    w:
        { pressed: false },

    a:
        { pressed: false },

    d:
        { pressed: false }
}



let player = new Player({
    position: { x: 200, y: 200 },
    velocity: { x: 0, y: 0 },
    imageSrc: "../assets/player.png"
});



function draw() {
    // background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.updt();


    //shoot updt
    for(let i = projectiles.length; i >= 0, i--;){
        let current_projectile = projectiles[i];
        current_projectile.updt();

        //delet from list
        if(current_projectile.pos.x + current_projectile.radius < 0 ||
            current_projectile.pos.x - current_projectile.radius > canvas.width ||
            current_projectile.pos.y + current_projectile.radius < 0 ||
            current_projectile.pos.y - current_projectile.radius > canvas.height)
            {
            projectiles.splice(i,1);
        }
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
                position: {x: player.pos.x + Math.cos(player.rot + (i-1)/10) * 55  ,   y: player.pos.y + Math.sin(player.rot + (i - 1)/10 ) * 55},
                velocity: {x: Math.cos(player.rot) * projectile_speed, y: Math.sin(player.rot) * projectile_speed},
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