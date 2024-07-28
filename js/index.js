var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 768;
let anima;

let friction = .95;
let rotation_speed = 0.05;

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



    player.speed = 3;
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


    }

});