//random number function
  function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Draw Line function
function line(x, y, fx, fy) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(fx, fy);
    ctx.strokeStyle = 'white';

    ctx.stroke();
}



    // Mouse Colide Function

    let mouse = {
      x: undefined,
      y: undefined
  }
  
    canvas.onmousemove = function (e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
  }
  
  
  
  let isInsideButton = (rect = { x: 0, y: 0, width: 0, height: 0 }) => {
      return mouse.x > rect.x && mouse.x < rect.x + rect.width && mouse.y < rect.y + rect.height && mouse.y > rect.y
  }


  // Colide Circle Function

  let circleCollision = (circle1, circle2) => {
    let xDiff = circle2.pos.x - circle1.pos.x;
    let yDiff = circle2.pos.y - circle1.pos.y;

    let diff = Math.sqrt((xDiff ** 2) + (yDiff ** 2))

    if (diff <= circle1.radius + circle2.radius) {

        return true;
    }
    return false;

}


let getAngle = ({pos1,pos2}) => {
let xDiff = pos1.x - pos2.x;
let yDiff = pos1.y - pos2.y;

return Math.atan(yDiff / xDiff)
}



function Sigmoid(x, deriv = false){
  if(deriv){
    return x * (1 - x);
  }
  return 1 / (1 + Math.exp(-x));
}
  

function AngleToPoint(pos,bearing,target){
  let angleToTarget = Math.atan2(-target.y + pos.y, target.x - pos.x)
  let diff = bearing - angleToTarget
  return (diff + Math.PI * 2) % (Math.PI * 2) 
  
}
//make values between 0,1
function NormalizeInput(astX,astY,plaAngl){
let input = [];
input[0] = (astX + max_sz) / (canvas.width + max_sz*2)
input[1] = (astY + max_sz) / (canvas.height + max_sz*2)
input[2] = plaAngl / (Math.PI * 2)
return input;
}
  