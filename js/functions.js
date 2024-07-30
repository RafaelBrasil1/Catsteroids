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
  
  