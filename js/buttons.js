



class Button {
    constructor(X, Y, W, H, btnColor, btnColor2, text, txtSz, strkSz, txtadjust = { x: 0, y: 0 }) {
        this.x = X;
        this.y = Y;
        this.width = W;
        this.height = H;
        this.color1 = btnColor;
        this.color2 = btnColor2;
        this.colorUsed = btnColor;
        this.text = text;
        this.txtSize = String(txtSz);
        this.strokeSize = strkSz;
        this.Vel = 3.5;
        this.Push = 0.2;
        this.adjust = txtadjust;
        this.mouseOn = false;
        this.triggered = false;
        this.txtColor = 'white';
    }

    desenha() {

        ctx.fillStyle = 'white';
        ctx.fillRect(this.x - this.strokeSize, this.y - this.strokeSize, this.width + this.strokeSize * 2, this.height + this.strokeSize * 2);

        ctx.fillStyle = this.colorUsed;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.txtColor;
        ctx.textAlign = 'center';
        ctx.font = this.txtSize + "px JOYSTIX";
        ctx.fillText(this.text, (this.x + this.width / this.adjust.x), this.y + this.height / this.adjust.y);

        if (isInsideButton({ x: this.x, y: this.y, width: this.width, height: this.height }) == true) {

            this.colorUsed = this.color2;
            this.mouseOn = true;
            this.txtColor = 'black';

        } else {
            this.colorUsed = this.color1;
            this.mouseOn = false;
            this.txtColor = 'white';

        }
    }
}


let playbtn = new Button(370, 220, 500, 100, 'rgb(0,0,0)', 'rgba(255,255,255,1)', 'Play!', 70, 5, { x: 1.90, y: 1.35 });
let Controlsbtn = new Button(370, 420, 500, 100, 'rgb(0,0,0)', 'rgba(255,255,255,1)', 'Controls', 70, 5, { x: 1.90, y: 1.35 });
let Creditsbtn = new Button(370, 620, 500, 100, 'rgb(0,0,0)', 'rgba(255,255,255,1)', 'Credits', 70, 5, { x: 1.90, y: 1.35 });
let ctrlClose =  new Button(1120, 80, 75, 75, 'rgb(0,0,0)', 'rgba(255,255,255,1)', 'X', 70, 5, { x: 2, y: 1.23 });
let creditsClose = new Button(1120, 80, 75, 75, 'rgb(0,0,0)', 'rgba(255,255,255,1)', 'X', 70, 5, { x: 2, y: 1.23 });



let retrybtn = new Button(300, 500, 250, 75, 'rgb(0,0,0)', 'rgba(255,255,255,1)', 'Retry!', 50, 5, { x: 1.95, y: 1.3 });
let menubtn = new Button(650, 500, 250, 75, 'rgb(0,0,0)', 'rgba(255,255,255,1)', 'Menu', 50, 5, { x: 1.95, y: 1.3 });
