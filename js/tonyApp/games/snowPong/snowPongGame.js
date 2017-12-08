(function () {


var line1;
var arrow;

var textDebag;

var angleVector_AxisX;
var vectorSum;
var arcsin;
window.snowPongGame = {

    preload: function () {
        game.load.spritesheet('arrow', 'assets/img/snowPong/arrow.png',70,30);
       // game.load.spritesheet('HartBar', 'assets/img/heartmenu.png', 40, 40);
    },

    create: function (){
        // game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.stage.backgroundColor = '#124184';
        //снаряд
        iceBall.sprite = game.add.sprite(iceBall.startX, iceBall.startY, 'bigSnowBaall');//110 x 110 px
        iceBall.sprite.anchor.x = 0.5;
        iceBall.sprite.anchor.y = 0.5;
        iceBall.sprite.animations.add('bigSnowBaall');
        iceBall.sprite.outOfBoundsKill = true;
        iceBall.sprite.checkWorldBounds = true;

        textDebag = game.add.text(220, 200, '', { fontSize: '32px', fill: 'red' , font: 'mainFont'});
        //iceBall.line = new Phaser.Line(100,15,500,400);
        //индикатор броска
        arrow = game.add.sprite(iceBall.startX, iceBall.startY, 'arrow');
        arrow.anchor.y = 0.5;
        arrow.anchor.x = 1;
        arrow.alpha = 1;
        //arrow.angle = -135;

        //line1 = new Phaser.Line(0, 0, 800, 500);

        // game.debug.text("Drag the handles", 32, 550);
        //game.debug.lineInfo(line1, 32, 32);

        iceBall.minX = iceBall.startX - iceBall.sprite.width;
        iceBall.maxX = iceBall.startX + iceBall.sprite.width;

        iceBall.minY = iceBall.startY - iceBall.sprite.height;
        iceBall.maxY = iceBall.startY + iceBall.sprite.height;

        iceBall.manipulator = game.input.mousePointer,
        game.physics.enable(iceBall.sprite, Phaser.Physics.ARCADE);
        // game.physics.arcade.enable(iceBall.sprite);

    },
    indication: function (vectorX, vectorY) {
        vectorSum = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
        angleVector_AxisX = Math.asin(-vectorY / vectorSum) * (180/Math.PI);
        arcsin = angleVector_AxisX;
        if (vectorX > 0){
          if (angleVector_AxisX > 0){
              angleVector_AxisX = 180 - angleVector_AxisX;
          } else {
              angleVector_AxisX = 180 - angleVector_AxisX;
          }
        }
        // else if (vectorX < 0){
        //
        //     angleVector_AxisX = angleVector_AxisX;
        // }
        arrow.angle = angleVector_AxisX;

    },
    shoot: function (x, y){
        iceBall.sprite.body.velocity.x = x * iceBall.velocityRatio;
        iceBall.sprite.body.velocity.y = y * iceBall.velocityRatio ;
        iceBall.isSet = false;
    },
    checkManipulator: function (){
        var pressMouse = iceBall.manipulator.isDown;
        var mouseX = iceBall.manipulator.x;
        var mouseY = iceBall.manipulator.y;

        if (pressMouse && iceBall.isSet){
            if ((mouseY > iceBall.minY && mouseY < iceBall.maxY) && (mouseX > iceBall.minX && mouseX < iceBall.maxX )){
                //записываем значения
                iceBall.tempX = -iceBall.velocityRatio * (mouseX - iceBall.startX);
                iceBall.tempY = -iceBall.velocityRatio * (mouseY - iceBall.startY);

                this.indication(iceBall.tempX, iceBall.tempY);

              //  iceBall.line.setTo(iceBall.startX, iceBall.startY, mouseX, mouseY);

            }
        }
    },
    checkShoot: function () {
        var pressMouse = iceBall.manipulator.isDown;
        if (!pressMouse && iceBall.isSet && (iceBall.tempX !== 0 || iceBall.tempY !== 0)){
            this.shoot(iceBall.tempX, iceBall.tempY);
        }
    },
    resetBall: function () {

        if (!iceBall.sprite.alive){
            // alert( iceBall.sprite.alive);
            iceBall.tempX = 0;
            iceBall.tempY = 0;
            iceBall.sprite.reset(iceBall.startX, iceBall.startY);
            // iceBall.sprite.alive = true;
            iceBall.isSet = true;
        }
    },
    update: function (){
        this.checkManipulator();

        this.checkShoot();

        this.resetBall();

        textDebag.text = 'векторн сумма: ' + vectorSum + '\n арксин: ' + arcsin + '\n итоговый угол: ' + angleVector_AxisX;
    },

    render: function (){
        // game.debug.geom(iceBall.line);
        // game.debug.lineInfo(iceBall.line, 32, 32);
    }

}

var iceBall = {
  startX : 400,
  startY : 400,

  velocityRatio : 2,

  tempX : 0,
  tempY : 0,
  isSet : true,

  // manipulator : game.input.mousePointer,
}





})()
