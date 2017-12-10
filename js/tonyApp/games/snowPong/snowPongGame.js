(function () {
  
var line1;
var arrow;

var textDebag;

var angleVector_AxisX;
var vectorSum;
var arcsin;

var entityGroup;
var snowGroup;
var snounGroup;

var explosions;
var explosion;

var aimsGroup;

//music
var mainSound;
var indicator;
var iceCrack;
var snow_poof;
//=============

var prevScale = 0;

var tempParametr;

var checkover;

var begin = false;

//================

window.snowPongGame = {

    preload: function () {
        game.load.spritesheet('arrow_indicator', 'assets/img/snowPong/arrow.png', 70, 30);

        game.load.image('fonPongGame', 'assets/img/snowPong/fon.png');
        game.load.image('snowStuck', 'assets/img/snowPong/snowStuck.png');
        game.load.image('iceBrick', 'assets/img/snowPong/iceBrick.png');
        game.load.image('crack', 'assets/img/snowPong/crack.png');
        game.load.image('stone', 'assets/img/snowPong/stone.png');
        game.load.image('iceWall', 'assets/img/snowPong/iceWall.png');
        game.load.image('woodStick', 'assets/img/snowPong/woodStick.png');

        game.load.image('smallSnow', 'assets/img/smallSnow.png');

        game.load.audio('mainSound', 'assets/audio/snowPongGame/Broke_For_Free_-_05_-_Something_Elated(main_sound).mp3');
        game.load.audio('iceCrack', 'assets/audio/snowPongGame/iceCrack_cuted.mp3');
        game.load.audio('rollingBall', 'assets/audio/snowPongGame/MarbleRollonWood_cuted.mp3');
        game.load.audio('indicator', 'assets/audio/snowPongGame/Rezinovyi_shar_trut_skrepit_cuted.mp3');
        game.load.audio('snow_poof', 'assets/audio/snowPongGame/Snow_cuted.mp3');
        game.load.audio('stoun_hit', 'assets/audio/snowPongGame/StounSong_cuted.mp3');
        game.load.audio('wood_hit', 'assets/audio/snowPongGame/Metal_Strike_on_Wood_cuted.mp3');

       // game.load.spritesheet('HartBar', 'assets/img/heartmenu.png', 40, 40);
    },

    create: function (){
      // button = this.add.button(300, 150, 'button_play', this.startGame, this, 1, 0 ,2);
        game.add.image(0, 0, 'fonPongGame');

        // game.add.image(0, 0, 'iceWall');
        game.add.button(600, 250, 'button_play', replay, this, 1, 0 ,2);
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        // snow = game.add.sprite(700, 150, 'smallSnow');
        // game.physics.arcade.enable(snow);
        // //snow.physicsBodyType = Phaser.Physics.ARCADE;
        snow_poof = game.add.audio('snow_poof');
        indicator = game.add.audio('indicator');
        mainSound = game.add.audio('snowBallGame_mainTrack');
        iceCrack = game.add.audio('iceCrack');
        mainSound.volume = 0.5;
        if (!mainSound.isPlaying)
        {
          mainSound.play();
        }


        // //snow.enableBody = true;
        // snow.body.immovable = true;
//Группы препятствий и прочих штук на карте==================
        entityGroup = game.add.group();
        entityGroup.enableBody = true;
        entityGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var entity_1 = entityGroup.create(30, 200, 'woodStick');
        entity_1.body.immovable = true;
        entity_1.anchor.setTo(0.5, 0.5);
        // entity_1.angle = 90;
        // entity_1.scale.setTo(0.1, 0.1);
        var entity_2 = entityGroup.create(350, 220, 'stone');
        entity_2.body.immovable = true;
        entity_2.anchor.setTo(0.5, 0.5);
        // // entity_2.angle = 90;
        // var entity_3 = entityGroup.create(120, 460, 'snowStuck');
        // entity_3.body.immovable = true;
        // entity_3.anchor.setTo(0.5, 0.5);
        var iceWall = entityGroup.create(0, 0, 'iceWall');
        iceWall.body.immovable = true;
//=============Группа снежных препятствий==================================
        snowGroup = game.add.group();
        snowGroup.enableBody = true;

        var snow_1 = snowGroup.create(120, 460, 'snowStuck');
        snow_1.anchor.setTo(0.5, 0.5);


//Группа целей====================================================
        aimsGroup = game.add.group();
        aimsGroup.enableBody = true;
        aimsGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var aim_1 = aimsGroup.create(300, 7, 'crack');
        aim_1.body.immovable = true;
        aim_1.anchor.setTo(0.5, 0);
        //aim_1.scale.setTo(0.5, 0.5);
        //aim_1.tint = 0xFF0000;
//===============================================================

        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        // explosions.setAll('anchor.x', 0.5);
        // explosions.setAll('anchor.y', 0.5);
        // explosions.animations.add('kaboom');
        explosions.forEach( function (invader){
          invader.anchor.x =  0.5;
          invader.anchor.y =  0.5;
          invader.animations.add('kaboom');
        }, this);
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
        iceBall.sprite.body.bounce.setTo(0.8, 0.8);
        iceBall.sprite.anchor.x = 0.5;
        iceBall.sprite.anchor.y = 0.5;
        iceBall.sprite.scale.setTo(0.5, 0.5);
        iceBall.sprite.animations.add('bigSnowBaall');
        iceBall.sprite.outOfBoundsKill = true;
        iceBall.sprite.checkWorldBounds = true;
        iceBall.sprite.arrow_1 = this.add.button(iceBall.sprite.x + 80, iceBall.sprite.y, 'arrow',goRight, this, 1, 2 ,0);
        iceBall.sprite.arrow_1.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_1.scale.setTo(0.7, 0.7);
        iceBall.sprite.arrow_2 = this.add.button(iceBall.sprite.x - 80, iceBall.sprite.y, 'arrow_2', goLeft, this, 1, 2 ,0);
        iceBall.sprite.arrow_2.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_2.scale.setTo(0.7, 0.7);


        textDebag = game.add.text(220, 200, '', { fontSize: '32px', fill: 'red' , font: 'mainFont'});
        //iceBall.line = new Phaser.Line(100,15,500,400);
        //индикатор броска
        arrow = game.add.sprite(iceBall.startX, iceBall.startY, 'arrow_indicator');
        arrow.anchor.y = 0.5;
        arrow.anchor.x = 1;
        arrow.animations.add('arrow_indicator');
        arrow.alpha = 0;
        //arrow.angle = -135;

        //line1 = new Phaser.Line(0, 0, 800, 500);

        // game.debug.text("Drag the handles", 32, 550);
        //game.debug.lineInfo(line1, 32, 32);

        iceBall.minX = iceBall.sprite.x - iceBall.sprite.width/2;
        iceBall.maxX = iceBall.sprite.x + iceBall.sprite.width/2;

        iceBall.minY = iceBall.sprite.y - iceBall.sprite.height/2;
        iceBall.maxY = iceBall.sprite.y + iceBall.sprite.height/2;

        iceBall.manipulator = game.input.mousePointer,
        game.physics.enable(iceBall.sprite, Phaser.Physics.ARCADE);
        // game.physics.arcade.enable(iceBall.sprite);

    },
    indication: function (vectorX, vectorY) {
        var arrowScale;
        arrow.alpha = 1;
        arrow.x = iceBall.sprite.x;
        arrow.y = iceBall.sprite.y;

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
        arrowScale = vectorSum / (2 * iceBall.sprite.height);

        if (Math.abs(arrowScale - prevScale) > 0.5 && !indicator.isPlaying){
            indicator.play(false);
        } else if (Math.abs(arrowScale - prevScale) > 0.5){
              indicator.restart();
              //indicator.play(false);
        }
        // else if (!indicator.isPlaying){
        //     // indicator.onPlay.addOnce(function (){ })
        //     //game.time.create().add(1000, function (){ indicator.paused = true;}, this);
        //     indicator.stop();
        // }
        // tempParametr = arrowScale - prevScale;

        prevScale = arrowScale;



        arrow.angle = angleVector_AxisX;
        arrow.scale.x = arrowScale;
        arrow.scale.y = arrowScale;

    },
    shoot: function (x, y){
        iceBall.sprite.body.velocity.x = x * iceBall.velocityRatio;
        iceBall.sprite.body.velocity.y = y * iceBall.velocityRatio ;
        iceBall.isSet = false;
        killArrow();
        arrow.alpha = 0;
        begin = false;
        arrow.animations.stop();
        indicator.stop();
    },
    checkManipulator: function (){
        var pressMouse = iceBall.manipulator.isDown;
        var mouseX = iceBall.manipulator.x;
        var mouseY = iceBall.manipulator.y;



        iceBall.minX = iceBall.sprite.x - iceBall.sprite.width/2;
        iceBall.maxX = iceBall.sprite.x + iceBall.sprite.width/2;

        iceBall.minY = iceBall.sprite.y - iceBall.sprite.height/2;
        iceBall.maxY = iceBall.sprite.y + iceBall.sprite.height/2;

        if (iceBall.sprite.arrow_1){
          iceBall.sprite.arrow_1.x = iceBall.sprite.x + 85;
          iceBall.sprite.arrow_2.x = iceBall.sprite.x - 70;
        }


        if ((pressMouse && iceBall.isSet) || begin){
            if (((mouseY > iceBall.minY && mouseY < iceBall.maxY) && (mouseX > iceBall.minX && mouseX < iceBall.maxX )) || begin){
                begin =  true;
                killArrow();
                //записываем значения
                var tempYmax  = 200;
                var tempYmin = -200;
                var tempXmax  = 200;
                var tempXmin = -200;

                iceBall.tempX = -iceBall.velocityRatio * 3 * (mouseX - iceBall.sprite.x);
                iceBall.tempY = -iceBall.velocityRatio * 3 * (mouseY - iceBall.sprite.y);

                if (iceBall.tempY > tempYmax){
                    iceBall.tempY = tempYmax;
                } else if (iceBall.tempY < tempYmin){
                    iceBall.tempY = tempYmin;
                }
                if (iceBall.tempX > tempXmax){
                    iceBall.tempX = tempXmax;
                } else if (iceBall.tempX < tempXmin){
                    iceBall.tempX = tempXmin;
                }

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

        if (!iceBall.sprite.alive || (iceBall.sprite.body.velocity.x == 0 && iceBall.sprite.body.velocity.y == 0 && countSnowSong !== 0)){
            // alert( iceBall.sprite.alive);
            iceBall.tempX = 0;
            iceBall.tempY = 0;
            iceBall.sprite.reset(iceBall.startX, iceBall.startY);
            // iceBall.sprite.alive = true;
            iceBall.isSet = true;
            countSnowSong = 0;
            riseArrow();
        }
    },
    update: function (){

        if (!checkover){
            countSnowSong = 0;
        }

        this.checkManipulator();

        this.checkShoot();

        game.physics.arcade.collide(entityGroup, iceBall.sprite);
        game.physics.arcade.collide(aimsGroup, iceBall.sprite, killAim);

        checkover = game.physics.arcade.overlap(snowGroup, iceBall.sprite,  stopBall, null, this);

        this.resetBall();

        textDebag.text =   iceBall.sprite.body.velocity.x + '              ' + iceBall.sprite.body.velocity.y;

    },

    render: function (){
        // game.debug.geom(iceBall.line);
        // game.debug.lineInfo(iceBall.line, 32, 32);
    }

}

var iceBall = {
  startX : 400,
  startY : 420,

  velocityRatio : 2,

  tempX : 0,
  tempY : 0,
  isSet : true,
  // manipulator : game.input.mousePointer,
}

var killAim = function (iceBall, aim) {
    iceCrack.play();
    aim.kill();
}

var replay = function (){
    iceBall.tempX = 0;
    iceBall.tempY = 0;
    arrow.alpha = 0;
    countSnowSong = 0;
    iceBall.isSet = true;
    iceBall.sprite.kill();
    iceBall.sprite.reset(iceBall.startX, iceBall.startY);
    aimsGroup.forEachDead(resetAll, this);
    riseArrow();
    function resetAll(aim) {
    aim.reset(aim.x, aim.y);
    }
    //game.sound.stopAll();
}
var countSnowSong = 0;
var stopBall = function (iceBall, snow) {
    if (iceBall.body.velocity.x > 0){
        iceBall.body.velocity.x = Math.floor(iceBall.body.velocity.x - 1);
    } else if (iceBall.body.velocity.x < 0){
      iceBall.body.velocity.x = Math.floor(iceBall.body.velocity.x + 1);;
    }
    if (iceBall.body.velocity.y > 0){
        iceBall.body.velocity.y = Math.floor(iceBall.body.velocity.y - 1);;
    } else if (iceBall.body.velocity.y < 0){
       iceBall.body.velocity.y = Math.floor(iceBall.body.velocity.y + 1);;
    }

    // iceBall.body.velocity.x = Math.floor(iceBall.body.velocity.x / 1.03);
    // iceBall.body.velocity.y = Math.floor(iceBall.body.velocity.y / 1.03);

    if(countSnowSong == 0){
      // game.add.tween(iceBall.body.velocity).to({x: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
      //
      // game.add.tween(iceBall.body.velocity).to({y: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
      snow_poof.play();
      var explosion = explosions.getFirstExists(false);
      explosion.reset(iceBall.x, iceBall.y);
      // explosion.reset(polar.x, polar.y);
      //explosion.animations.play('kaboom');
      explosion.play('kaboom', 30, false, true);
      countSnowSong++;
    }
    // game.state.start('snowPongGame');
}

var goLeft = function (){
  iceBall.sprite.x -= 20;
}

var goRight = function (){
  iceBall.sprite.x += +20;
}

var killArrow = function () {
      iceBall.sprite.arrow_1.kill();
      iceBall.sprite.arrow_2.kill();
}

var riseArrow = function () {
      iceBall.sprite.arrow_1.reset(iceBall.sprite.x, iceBall.sprite.y);
      iceBall.sprite.arrow_2.reset(iceBall.sprite.x, iceBall.sprite.y);
}



})()
