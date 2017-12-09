(function () {

var line1;
var arrow;

var textDebag;

var angleVector_AxisX;
var vectorSum;
var arcsin;

var snowGroup;
var woodGroup;
var snounGroup;

var aimsGroup;

window.snowPongGame = {

    preload: function () {
        game.load.spritesheet('arrow', 'assets/img/snowPong/arrow.png',70,30);

        game.load.image('smallSnow', 'assets/img/smallSnow.png');
       // game.load.spritesheet('HartBar', 'assets/img/heartmenu.png', 40, 40);
    },

    create: function (){
      // button = this.add.button(300, 150, 'button_play', this.startGame, this, 1, 0 ,2);
      game.add.button(700, 450, 'button_play', replay, this, 1, 0 ,2);
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        // snow = game.add.sprite(700, 150, 'smallSnow');
        // game.physics.arcade.enable(snow);
        // //snow.physicsBodyType = Phaser.Physics.ARCADE;
        // //snow.enableBody = true;
        // snow.body.immovable = true;
//Группы препятствий и прочих штук на карте==================
        snowGroup = game.add.group();
        snowGroup.enableBody = true;
        snowGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var entity_1 = snowGroup.create(580, 150, 'smallSnow');
        entity_1.body.immovable = true;
        var entity_2 = snowGroup.create(200, 250, 'smallSnow');
        entity_2.body.immovable = true;
        var entity_3 = snowGroup.create(400, 20, 'smallSnow');
        entity_3.body.immovable = true;
//==============================================================
//Группа целей====================================================
        aimsGroup = game.add.group();
        aimsGroup.enableBody = true;
        aimsGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var aim_1 = aimsGroup.create(700, 10, 'smallSnow');
        aim_1.scale.setTo(0.5, 0.5);
        aim_1.tint = 0xFF0000;
//===============================================================
        // bigPolarMen.createMultiple(30, 'bigPolarMan');
        // bigPolarMen.setAll('anchor.x', 0.5);
        // bigPolarMen.setAll('anchor.y', 0.5);
        // bigPolarMen.forEach(
        //   function (invader){
        //     invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        //     animBigPolar = invader.animations.add('throw',  [12, 13, 14], 3, false);
        //
        //     //invader.animations.add('right', [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
        //   }, this);


        iceBall.sprite = game.add.sprite(iceBall.startX, iceBall.startY, 'bigSnowBaall');//110 x 110 px
        game.physics.arcade.enable(iceBall.sprite);
        iceBall.sprite.body.bounce.setTo(0.9, 0.9);
        iceBall.sprite.anchor.x = 0.5;
        iceBall.sprite.anchor.y = 0.5;
        iceBall.sprite.scale.setTo(0.5, 0.5);
        iceBall.sprite.animations.add('bigSnowBaall');
        iceBall.sprite.outOfBoundsKill = true;
        iceBall.sprite.checkWorldBounds = true;

        textDebag = game.add.text(220, 200, '', { fontSize: '32px', fill: 'red' , font: 'mainFont'});
        //iceBall.line = new Phaser.Line(100,15,500,400);
        //индикатор броска
        arrow = game.add.sprite(iceBall.startX, iceBall.startY, 'arrow');
        arrow.anchor.y = 0.5;
        arrow.anchor.x = 1;
        arrow.animations.add('arrow');
        arrow.alpha = 0;
        //arrow.angle = -135;

        //line1 = new Phaser.Line(0, 0, 800, 500);

        // game.debug.text("Drag the handles", 32, 550);
        //game.debug.lineInfo(line1, 32, 32);

        iceBall.minX = iceBall.startX - 2*iceBall.sprite.width;
        iceBall.maxX = iceBall.startX + 2*iceBall.sprite.width;

        iceBall.minY = iceBall.startY - 2*iceBall.sprite.height;
        iceBall.maxY = iceBall.startY + 2*iceBall.sprite.height;

        iceBall.manipulator = game.input.mousePointer,
        game.physics.enable(iceBall.sprite, Phaser.Physics.ARCADE);
        // game.physics.arcade.enable(iceBall.sprite);

    },
    indication: function (vectorX, vectorY) {
        arrow.alpha = 1;
        arrow.animations.play('arrow' , 5 , true);
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
        var arrowScale = vectorSum / (2 * iceBall.sprite.height)

        arrow.angle = angleVector_AxisX;
        arrow.scale.x = arrowScale;
        arrow.scale.y = arrowScale;

    },
    shoot: function (x, y){
        iceBall.sprite.body.velocity.x = x * iceBall.velocityRatio;
        iceBall.sprite.body.velocity.y = y * iceBall.velocityRatio ;
        iceBall.isSet = false;
        arrow.alpha = 0;
        arrow.animations.stop();
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

        game.physics.arcade.collide(snowGroup, iceBall.sprite);
        game.physics.arcade.collide(aimsGroup, iceBall.sprite, killAim);

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

var killAim = function (iceBall, aim) {
    aim.kill();
}

var replay = function (){
    iceBall.tempX = 0;
    iceBall.tempY = 0;
    arrow.alpha = 0;
    iceBall.isSet = true;
    iceBall.sprite.kill();
    iceBall.sprite.reset(iceBall.startX, iceBall.startY);

    game.state.start('snowPongGame');
}





})()
