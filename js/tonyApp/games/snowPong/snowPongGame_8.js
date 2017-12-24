(function () {
var line1;
var arrow;

var textDebag;

var angleVector_AxisX;
var vectorSum;
var arcsin;

var entityGroup;
var holesGroup;
var snowGroup;
var snounGroup;
var iceBricks;

var iceBrick_1;
var iceBrick_2;
var iceBrick_3;

var explosions;
var explosion;

var aimsGroup;

var gifts;
var gift;

//music
var mainSound;
var indicator;
var iceCrack;
var snow_poof;
var rollingBall;
var wood_hit;
var stoun_hit;
var iceWall_hit;
var starSong;
//=============

var prevScale = 0;

var tempParametr;

var checkover;

var begin = false;

var saveBox = {};

///Таблица данных об игре
var scoreTable;
var levelTable;
var healthTable;
var starTable;

var scoreStarsImage;
var scoreHartImage;
var scoreTimerImage;

//переменные

var scoreStars = 0;
var counterStarterTime = 0;
var starterTime = 0;
var health = 3;

var realTimeNow = '-';
var entity_1;

//кнопки управления
var replayGame;
var exitGame;
var doReplayGame;
var doExitGame;

var b_music_1;
var b_music_2;
var layerUnderMenu;

var testAngle;

var entity_5;
//условие победы
var cracksDestroy = 1;
//================

var saveBox = { time: 0, hp: 0, stars: 0, score: 0, mod: 1};

window.snowPongGame_8 = {

    preload: function () {
        gameLoad().spritesheet('arrow_indicator', 'assets/img/snowPong/arrow.png', 70, 30);

        gameLoad().image('fonPongGame', 'assets/img/snowPong/fon.png');
        gameLoad().image('snowStuck', 'assets/img/snowPong/snowStuck.png');
        gameLoad().image('snowStuck2', 'assets/img/snowPong/snowStuck2.png');
        gameLoad().image('iceBrick', 'assets/img/snowPong/iceBrick.png');
        gameLoad().image('crack', 'assets/img/snowPong/crack2.png');
        gameLoad().image('stoneBig', 'assets/img/snowPong/stone.png');
        gameLoad().image('stoneMiddle', 'assets/img/snowPong/stoneMiddle.png');
        gameLoad().image('stoneSmall', 'assets/img/snowPong/stoneSmall.png');
        gameLoad().image('woodBox', 'assets/img/snowPong/woodBox.png');
        gameLoad().image('hole', 'assets/img/snowPong/hole.png');
        gameLoad().image('iceBrick_v', 'assets/img/snowPong/iceBrick_v.png');

        gameLoad().image('iceWall', 'assets/img/snowPong/iceWall.png');
        gameLoad().image('woodStick', 'assets/img/snowPong/woodStick.png');

        gameLoad().image('smallSnow', 'assets/img/smallSnow.png');

        gameLoad().audio('mainSound', 'assets/audio/snowPongGame/Broke_For_Free_-_05_-_Something_Elated(main_sound).mp3');
        gameLoad().audio('iceCrack', 'assets/audio/snowPongGame/iceCrack_cuted.mp3');
        gameLoad().audio('rollingBall', 'assets/audio/snowPongGame/MarbleRollonWood_cuted.mp3');
        gameLoad().audio('indicator', 'assets/audio/snowPongGame/Rezinovyi_shar_trut_skrepit_cuted.mp3');
        gameLoad().audio('snow_poof', 'assets/audio/snowPongGame/Snow_cuted.mp3');
        gameLoad().audio('stoun_hit', 'assets/audio/snowPongGame/StounSong_cuted.mp3');
        gameLoad().audio('wood_hit', 'assets/audio/snowPongGame/Metal_Strike_on_Wood_cuted.mp3');
        gameLoad().audio('iceWall', 'assets/audio/snowPongGame/iceWall_cuted.mp3');

       // gameLoad().spritesheet('HartBar', 'assets/img/heartmenu.png', 40, 40);
    },
    create: function (){
      // button = this.add.button(300, 150, 'button_play', this.startGame, this, 1, 0 ,2);
        gameAdd().image(0, 0, 'fonPongGame');
        // gameAdd().image(0, 0, 'iceWall');
        // gameAdd().button(600, 250, 'button_play', replay, this, 1, 0 ,2);
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        // snow = gameAdd().sprite(700, 150, 'smallSnow');
        // game.physics.arcade.enable(snow);
        // //snow.physicsBodyType = Phaser.Physics.ARCADE;
        snow_poof = gameAdd().audio('snow_poof');
        indicator = gameAdd().audio('indicator');
        mainSound = gameAdd().audio('snowBallGame_mainTrack');
        iceCrack = gameAdd().audio('iceCrack');
        rollingBall = gameAdd().audio('rollingBall');
        wood_hit =gameAdd().audio('wood_hit');
        stoun_hit= gameAdd().audio('stoun_hit');
        iceWall_hit = gameAdd().audio('iceWall');
        starSong = gameAdd().audio('starSong');

        mainSound.volume = 0.5;
        if (!mainSound.isPlaying)
        {
          //mainSound.play();
        }

        // //snow.enableBody = true;
        // snow.body.immovable = true;
//Группа подарков=======================================
        gifts = gameAdd().group();
        gifts.enableBody = true;
        //gifts.physicsBodyType = Phaser.Physics.ARCADE;
        gifts.createMultiple(8, 'star');
        gifts.setAll('anchor.x', 0.5);
        gifts.setAll('anchor.y', 0.5);
        gifts.forEach(
          function (invader){
            invader.animations.add('play');
          }, this);

        var gift_1 = gifts.getFirstExists(false);
        gift_1.reset(440, 350);
        gift_1.animations.play('play', 12,  true ,true);
        var gift_2 = gifts.getFirstExists(false);
        gift_2.reset(640,440);
        gift_2.animations.play('play', 12,  true ,true);
        // var gift_3 = gifts.getFirstExists(false);
        // gift_3.reset(720,130);
        // gift_3.animations.play('play', 12,  true ,true);

          //===========================
//==============Группа ледных блоков
        iceBricks = gameAdd().group();
        iceBricks.enableBody = true;
        iceBrick_1 = iceBricks.create(350, 310, 'iceBrick_v');
        iceBrick_1.body.bounce.set(0.5);
//===============================
//=============Группа снежных препятствий==================================
        snowGroup = gameAdd().group();
        snowGroup.enableBody = true;

        var snow_2 = snowGroup.create(50 , 50, 'snowStuck');
        snow_2.snow = 'snow';
        snow_2.angle = -90;
        snow_2.scale.setTo(-1, -1);
        snow_2.anchor.setTo(0.5, 0.5);
        var snow_1 = snowGroup.create(320 , 450, 'snowStuck2');
        snow_1.snow = 'snow';
        var snow_3 = snowGroup.create(510 , 450, 'snowStuck2');
        snow_3.snow = 'snow';

        //==============
//Группа дырочек
        holesGroup = gameAdd().group();
        holesGroup.enableBody = true;
        holesGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var entity_hole = holesGroup.create(200, 345, 'hole');
        // entity_hole.scale.set(1.5);
        entity_hole.body.immovable = true;
        entity_hole.body.setCircle(entity_hole.width/2);
        entity_hole.type = 'hole';
//=========

//Группы препятствий и прочих штук на карте==================
        entityGroup = gameAdd().group();
        entityGroup.enableBody = true;
        entityGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // entity_4 = entityGroup.create(750, 50, 'stoneMiddle');
        // entity_4.body.immovable = true;
        // entity_4.type = 'stone';

        // entity_5 = entityGroup.create(220, 400, 'stoneBig');
        // entity_5.body.immovable = true;
        // entity_5.type = 'stone';
        // entity_6 = entityGroup.create(550, 450, 'stoneSmall');
        // entity_6.body.immovable = true;
        // entity_6.type = 'stone';

        // entity_7 = entityGroup.create(340, 360, 'stoneSmall');
        // entity_7.body.immovable = true;
        // entity_7.type = 'stone';

        entity_8 = entityGroup.create(430, 220, 'stoneSmall');
        entity_8.body.immovable = true;
        entity_8.type = 'stone';

        // var entity_7 = entityGroup.create(25, 35, 'stoneMiddle');
        // entity_7.body.immovable = true;
        // entity_7.type = 'stone';

        // rotateButton = gameAdd().button(entity_1.centerX, entity_1.centerY, 'ball', rotateWood);
        // rotateButton.master = entity_1;

        // var iceWall = entityGroup.create(0, 0, 'iceWall');
        // iceWall.body.immovable = true;
        // iceWall.type = 'iceWall';

        entity_1 = entityGroup.create(370, 150, 'woodBox');
        entity_1.inputEnabled = true;
        entity_1.input.enableDrag(true);
        entity_1.body.immovable = true;
        entity_1.type = 'wood';
        gameAdd().tween(entity_1).to({ width: 0.95*entity_1.width, height: 0.95*entity_1.height}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true).loop();

        entity_2 = entityGroup.create(entity_1.right, entity_1.centerY, 'woodBox');
        entity_2.anchor.setTo(0, 0.5);
        entity_2.inputEnabled = true;
        entity_2.input.enableDrag(true);
        entity_2.body.immovable = true;
        entity_2.type = 'wood';
        gameAdd().tween(entity_2).to({ width: 0.95*entity_2.width, height: 0.95*entity_2.height}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true).loop();

        entity_3 = entityGroup.create(entity_2.right, entity_1.centerY, 'woodBox');
        entity_3.anchor.setTo(0, 0.5);
        entity_3.inputEnabled = true;
        entity_3.input.enableDrag(true);
        entity_3.body.immovable = true;
        entity_3.type = 'wood';
        gameAdd().tween(entity_3).to({ width: 0.95*entity_3.width, height: 0.95*entity_3.height}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true).loop();


//Группа целей====================================================
        aimsGroup = gameAdd().group();
        aimsGroup.enableBody = true;
        aimsGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var aim_1 = aimsGroup.create(470, 450, 'crack');
        aim_1.body.immovable = true;
        aim_1.anchor.setTo(0.5, 0);
        //aim_1.scale.setTo(0.5, 0.5);
        //aim_1.tint = 0xFF0000;
//===============================================================

        explosions = gameAdd().group();
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
        iceBall.sprite = gameAdd().sprite(iceBall.startX, iceBall.startY, 'bigSnowBaall');//110 x 110 px
        gamePhysics().arcade.enable(iceBall.sprite);
        iceBall.sprite.body.bounce.set(0.8);
        // iceBall.sprite.body.mass = 50;
        iceBall.sprite.anchor.x = 0.5;
        iceBall.sprite.anchor.y = 0.5;
        iceBall.sprite.scale.setTo(0.5, 0.5);
        iceBall.sprite.volume = 0;
        iceBall.sprite.animations.add('bigSnowBaall');
        iceBall.sprite.outOfBoundsKill = true;
        iceBall.sprite.checkWorldBounds = true;
        // iceBall.sprite.body.setCircle(50);
        iceBall.sprite.tempYmax  = 200;
        iceBall.sprite.tempYmin = -200;
        iceBall.sprite.tempXmax  = 200;
        iceBall.sprite.tempXmin = -200;
        iceBall.sprite.vectorVelocitiMax = Math.sqrt(iceBall.velocityRatio*iceBall.velocityRatio*(iceBall.sprite.tempXmax*iceBall.sprite.tempXmax + iceBall.sprite.tempYmax*iceBall.sprite.tempYmax));

        iceBall.sprite.arrow_1 = this.add.button(iceBall.sprite.centerX, iceBall.sprite.y + 80, 'arrow',goRight, this, 1, 2 ,0);
        iceBall.sprite.arrow_1.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_1.scale.setTo(0.7, 0.7);
        iceBall.sprite.arrow_1.angle = 90;
        iceBall.sprite.arrow_2 = this.add.button(iceBall.sprite.centerX, iceBall.sprite.y - 80, 'arrow_2', goLeft, this, 1, 2 ,0);
        iceBall.sprite.arrow_2.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_2.scale.setTo(0.7, 0.7);
        iceBall.sprite.arrow_2.angle = 90;

        iceBall.recentX = iceBall.startX;
        iceBall.recentY = iceBall.startY;

        iceBall.status = 'wait';

        gamePhysics().arcade.enable([entity_1, iceBall.sprite]);
        // entity_1.body.velocity.x = 80;
        // iceBall.sprite.facing = 500;
        // entity_1.body.mass = 50;
        // entity_2.body.mass = 50;
        // entity_3.body.mass = 50;
        // entity_4.body.mass = 500;



        textDebag = gameAdd().text(220, 200, '', { fontSize: '32px', fill: 'red' , font: 'mainFont'});
        //iceBall.line = new Phaser.Line(100,15,500,400);
        //индикатор броска
        arrow = gameAdd().sprite(iceBall.startX, iceBall.startY, 'arrow_indicator');
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

        iceBall.manipulator = gameInput().mousePointer,
        gamePhysics().enable(iceBall.sprite, Phaser.Physics.ARCADE);
        // game.physics.arcade.enable(iceBall.sprite);



        //Табло================================================
        gameAdd().image(0, 0, 'underLyaer');

        scoreStarsImage = gameAdd().sprite (20 , 20, 'starBar');
        scoreStarsImage.scale.setTo(1, 1);
        scoreStarsImage.anchor.x = 0.5;
        scoreStarsImage.anchor.y = 0.5;
        scoreStarsImage.alpha = 1;
        scoreStarsImage.animations.add('starBar');
        starTable = gameAdd().text(50, 20, '-', { fontSize: '32px', fill: '#7C4111', font: 'mainFont' });
        starTable.anchor.x = 0.5;
        starTable.anchor.y = 0.5;
        //Сердце
        scoreHartImage = gameAdd().sprite (97 , 20, 'HartBar');
        scoreHartImage.scale.setTo(1, 1);
        scoreHartImage.anchor.x = 0.5;
        scoreHartImage.anchor.y = 0.5;
        scoreHartImage.alpha = 1;
        scoreHartImage.animations.add('hartBar');
        healthTable = gameAdd().text(132, 20, '-', { fontSize: '32px', fill: '#91294E', font: 'mainFont' });
        healthTable.anchor.x = 0.5;
        healthTable.anchor.y = 0.5;
        //часы
        scoreTimerImage =  gameAdd().sprite (178 , 20, 'timeBar');
        scoreTimerImage.scale.setTo(1, 1);
        scoreTimerImage.anchor.x = 0.5;
        scoreTimerImage.anchor.y = 0.5;
        scoreTimerImage.alpha = 1;
        scoreTimerImage.animations.add('timeBar');
        levelTable = gameAdd().text(213, 20,  '-', { fontSize: '32px', fill: '#8E3E36', font: 'mainFont'  });
        levelTable.anchor.x = 0.5;
        levelTable.anchor.y = 0.5;

        //=================================================
        //кнопки управления============
        layerUnderMenu = gameAdd().image(800, 0, 'underLyaerInGame');
        layerUnderMenu.anchor.x = 1;

        //управление музыкой==========================
        b_music_1 = gameAdd().button(layerUnderMenu.left + 2, layerUnderMenu.centerY, 'turnSound_new', this.turnMusic, this,  0, 2 ,1);
        b_music_1.anchor.setTo(0, 0.5);

        b_music_2 = gameAdd().button(layerUnderMenu.left + 2, layerUnderMenu.centerY, 'turnSound_new', this.turnMusic, this, 3, 5 ,4);
        b_music_2.anchor.setTo(0, 0.5);

        replayGame = gameAdd().button(b_music_1.right - 2, layerUnderMenu.centerY, 'replay_game_new', replay, this, 1, 2 ,0);
        replayGame.anchor.setTo(0, 0.5);
        exitGame = gameAdd().button(replayGame.right + 1, layerUnderMenu.centerY, 'exit_game_new', doExitGame, this, 1, 2 ,0);
        exitGame.anchor.setTo(0, 0.5);

        if(!gameSound().mute){
            b_music_2.kill();
        }else{
            b_music_1.kill();
        }
        //=================================
    },
    turnMusic: function (){
      // gameSound().mute = true;
      if(!gameSound().mute){
        gameSound().mute = true;
        b_music_1.kill();
        b_music_2.reset(layerUnderMenu.left + 2, layerUnderMenu.centerY);
      }else {
        gameSound().mute = false;
        b_music_2.kill();
        b_music_1.reset(layerUnderMenu.left + 2, layerUnderMenu.centerY);
      }
    },
    indication: function (vectorX, vectorY) {
        var arrowScale;
        arrow.alpha = 1;
        arrow.x = iceBall.sprite.x;
        arrow.y = iceBall.sprite.y;

        arrow.animations.play('arrow' , 5 , true);
        vectorSum = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
        // angleVector_AxisX = Math.asin(-vectorY / vectorSum) * (180/Math.PI);
        // arcsin = angleVector_AxisX;
        // if (vectorX > 0){
        //   if (angleVector_AxisX > 0){
        //       angleVector_AxisX = 180 - angleVector_AxisX;
        //   } else {
        //       angleVector_AxisX = 180 - angleVector_AxisX;
        //   }
        // }

        arrowScale = vectorSum / (2 * iceBall.sprite.height);

        if (Math.abs(arrowScale - prevScale) > 0.5 && !indicator.isPlaying){
            indicator.play(false);
        } else if (Math.abs(arrowScale - prevScale) > 0.5){
              indicator.restart();
              //indicator.play(false);
        }


        prevScale = arrowScale;

        testAngle = gamePhysics().arcade.angleToPointer(iceBall.sprite);

        arrow.angle = testAngle * (180/Math.PI);
        arrow.scale.x = arrowScale;
        arrow.scale.y = arrowScale;


        iceBall.shootX = -vectorSum * Math.cos(testAngle);
        iceBall.shootY = -vectorSum * Math.sin(testAngle);

    },
    shoot: function (x, y){
        iceBall.recentX = iceBall.sprite.x;
        iceBall.recentY = iceBall.sprite.y;
        iceBall.sprite.body.velocity.x = x * iceBall.velocityRatio;
        iceBall.sprite.body.velocity.y = y * iceBall.velocityRatio ;
        iceBall.isSet = false;
        iceBall.status = 'start';
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
          iceBall.sprite.arrow_1.y = iceBall.sprite.y + 85;
          iceBall.sprite.arrow_2.y = iceBall.sprite.y - 70;
        }


        if ((pressMouse && iceBall.isSet) || begin){
            if (((mouseY > iceBall.minY && mouseY < iceBall.maxY) && (mouseX > iceBall.minX && mouseX < iceBall.maxX )) || begin && iceBall.status == 'wait'){
                begin =  true;
                killArrow();
                //записываем значения

                iceBall.tempX = -iceBall.velocityRatio * 3 * (mouseX - iceBall.sprite.x);
                iceBall.tempY = -iceBall.velocityRatio * 3 * (mouseY - iceBall.sprite.y);

                if (iceBall.tempY > iceBall.sprite.tempYmax){
                    iceBall.tempY = iceBall.sprite.tempYmax;
                } else if (iceBall.tempY < iceBall.sprite.tempYmin){
                    iceBall.tempY = iceBall.sprite.tempYmin;
                }
                if (iceBall.tempX > iceBall.sprite.tempXmax){
                    iceBall.tempX = iceBall.sprite.tempXmax;
                } else if (iceBall.tempX < iceBall.sprite.tempXmin){
                    iceBall.tempX = iceBall.sprite.tempXmin;
                }

                this.indication(iceBall.tempX, iceBall.tempY);

              //  iceBall.line.setTo(iceBall.startX, iceBall.startY, mouseX, mouseY);

            }
        }
    },
    checkShoot: function () {
        var pressMouse = iceBall.manipulator.isDown;
        if (!pressMouse && iceBall.isSet && (iceBall.tempX !== 0 || iceBall.tempY !== 0) && iceBall.status == 'wait'){
            this.shoot(iceBall.shootX, iceBall.shootY);
        }
    },
    resetBall: function () {

        if (!iceBall.sprite.alive || (iceBall.sprite.body.velocity.x == 0 && iceBall.sprite.body.velocity.y == 0 && iceBall.status == 'start')){
            // alert( iceBall.sprite.alive);
            iceBall.tempX = 0;
            iceBall.tempY = 0;
            iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
            // iceBall.sprite.alive = true;
            iceBall.isSet = true;
            iceBall.status = 'wait';
            countSnowSong = 0;
            // counterStarterTime = 0;
            // realTimeNow = 0;
            // scoreStars = 0;
            health -= 1;

            healthTable.text = health;
            scoreHartImage.animations.play('hartBar');
            levelTable.text = realTimeNow;
            // starTable.text = '0';
            riseArrow();

            // aimsGroup.forEachDead(resetAll, this);
            // gifts.forEachDead(resetStars, this);

            function resetAll(aim) {
            aim.reset(aim.x, aim.y);
            }
            function resetStars(star){
              star.reset(star.x, star.y);
            }
        }
    },
    update: function (){
      //ограничение на передвижение
      // if (iceBall.sprite.x > 200  && iceBall.status == 'wait'){
      //   iceBall.sprite.x = 200 ;
      // }
      //textDebag
      // textDebag.text = iceBall.sprite.body.velocity.y + '         ' +iceBall.sprite.body.velocity.x + 'angle=' + angleVector_AxisX + '\n' + 'test=' + testAngle*180/Math.PI;
      //=========
      levelTable.text = realTimeNow;
      //проверка победы
      if (!aimsGroup.getFirstAlive()){
          goMenuWin();
      }
      if (health < 1){
          goMenuLoose();
      }

      //Timer
      if (counterStarterTime == 0 && iceBall.status == 'start'){
         counterStarterTime++;
         starterTime = Math.floor(gameTime().now/1000);
         healthTable.text = health;
         starTable.text = scoreStars;
         //scoreHartImage.animations.play('hartBar');
         scoreTimerImage.animations.getAnimation('timeBar').onComplete.add(function () {scoreHartImage.animations.play('hartBar');}, this);
         scoreHartImage.animations.getAnimation('hartBar').onComplete.add(function () {scoreStarsImage.animations.play('starBar');}, this);

      }

      if (iceBall.status == 'start' || counterStarterTime != 0){
        realTimeNow = Math.floor(gameTime().now/1000) - starterTime;
        levelTable.text = realTimeNow;
        if (realTimeNow % 60 == 0){
             scoreTimerImage.animations.play('timeBar');
        }
      }
        //======================================

        if (!checkover){
            countSnowSong = 0;
        }
        checkRollingBall();

        this.checkShoot();

        this.checkManipulator();



        gamePhysics().arcade.collide(entityGroup, entityGroup);
        gamePhysics().arcade.collide(entityGroup, iceBall.sprite, playSong);
        gamePhysics().arcade.collide(aimsGroup, iceBall.sprite, killAim);

        gamePhysics().arcade.collide(iceBricks, iceBall.sprite);
        gamePhysics().arcade.collide(iceBricks, entityGroup);
        gamePhysics().arcade.collide(iceBricks, iceBricks);


        gamePhysics().arcade.overlap(holesGroup, iceBall.sprite,  doReplayGame, null, this);

        // gamePhysics().arcade.collide(entity_1, iceBall.sprite);

        checkover = gamePhysics().arcade.overlap(snowGroup, iceBall.sprite,  friction, null, this);
        gamePhysics().arcade.overlap(gifts, iceBall.sprite,  killgift, null, this);``

        this.resetBall();

        iceBricks.forEachAlive(frictionAll, this );

    },

    getInfo: function (){
      return saveBox;
    },


}

var iceBall = {
  startX : 95,
  startY : 250,

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
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  // counterStarterTime = 0;
  // realTimeNow = 0;
  // scoreStars = 0;
  // health -= 1;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  countSnowSong = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  rollingBall.stop();

  healthTable.text = health;
  scoreHartImage.animations.play('hartBar');
  levelTable.text = realTimeNow;
  starTable.text = scoreStars;
  // starTable.text = '0';
  riseArrow();

  aimsGroup.forEachDead(resetAll, this);
  gifts.forEachDead(resetStars, this);

  iceBrick_1.reset(350, 310);




  function resetAll(aim) {
  aim.reset(aim.x, aim.y);
  }
  function resetStars(star){
    star.reset(star.x, star.y);
  }


}
var countSnowSong = 0;
var friction = function (iceBall, snow) {
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
      // gameAdd().tween(iceBall.body.velocity).to({x: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
      //
      // gameAdd().tween(iceBall.body.velocity).to({y: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
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
var rollingCounter = 0;
var checkRollingBall = function () {
  if((Math.abs(iceBall.sprite.body.velocity.x) > 0 || Math.abs(iceBall.sprite.body.velocity.y) > 0) && !checkover){
    // var velocityXmax = iceBall.velocityRatio * 200;
    // var velocityYmax = iceBall.velocityRatio * 200;
    var currentVelocity = Math.sqrt(iceBall.sprite.body.velocity.x*  iceBall.sprite.body.velocity.x  +  iceBall.sprite.body.velocity.y* iceBall.sprite.body.velocity.y);

    iceBall.sprite.volume = currentVelocity/iceBall.sprite.vectorVelocitiMax;
    rollingBall.volume = iceBall.sprite.volume;
    if (rollingCounter == 0){
      rollingBall.loopFull();
      rollingCounter++;
    }
  }else {
    rollingBall.stop();
    rollingCounter = 0;
  }
}

var goLeft = function (){
  iceBall.sprite.y -= 20;
}

var goRight = function (){
  iceBall.sprite.y += +20;
}

var killArrow = function () {
      iceBall.sprite.arrow_1.kill();
      iceBall.sprite.arrow_2.kill();
}

var riseArrow = function () {
      iceBall.sprite.arrow_1.reset(iceBall.sprite.x, iceBall.sprite.y);
      iceBall.sprite.arrow_2.reset(iceBall.sprite.x, iceBall.sprite.y);
}
var playSong = function (ball, entity) {

    // iceBall.sprite.body.bounce.set(10);
  if (entity.type == 'wood'){
        wood_hit.volume = iceBall.sprite.volume;
        wood_hit.play();
  }else if (entity.type == 'stone'){
        stoun_hit.volume = iceBall.sprite.volume
        stoun_hit.play();
  } else if(entity.type == 'iceWall'){
        iceWall_hit.play();
  }

}

var killgift = function (player, star){
  star.kill();
  starSong.play();
  scoreStarsImage.animations.play('starBar');
  scoreStars += 1;
  starTable.text = scoreStars;
  // scoreStarsImage.animations.play('starBar');
  // scoreStars += 1;
  // starTable.text = scoreStars;
}

var goMenuLoose = function () {
  gameSound().stopAll();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  riseArrow();
  realTimeNow = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  saveBox.currentGame = 'snowPongGame_8';
  saveStat(28);

  changeState('Game_over');

}

var goMenuWin = function () {
  gameSound().stopAll();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  riseArrow();

  saveBox.time = realTimeNow;
  saveBox.hp = health;
  saveBox.stars = scoreStars;
  if (scoreStars){
      saveBox.score = scoreStars * Math.floor(120/realTimeNow) * health;
  }else {
      saveBox.score = Math.floor(120/realTimeNow) * health;
  }
  realTimeNow = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  saveBox.currentGame = 'snowPongGame_8';
  saveStat(28);
  changeState('Win_SnowBallGame');
}

doReplayGame = function (){
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  countSnowSong = 0;
  // counterStarterTime = 0;
  // realTimeNow = 0;
  // scoreStars = 0;
  health -= 1;

  healthTable.text = health;
  scoreHartImage.animations.play('hartBar');
  levelTable.text = realTimeNow;
  // starTable.text = '0';
  riseArrow();

  // aimsGroup.forEachDead(resetAll, this);
  // gifts.forEachDead(resetStars, this);

  function resetAll(aim) {
  aim.reset(aim.x, aim.y);
  }
  function resetStars(star){
    star.reset(star.x, star.y);
  }
}

doExitGame = function (){
  gameSound().stopAll();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  riseArrow();
  realTimeNow = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  saveBox.currentGame = 'snowPongGame_8';
  saveStat(28);

  changeState('map');
}

function rotateWood (b) {
  // b.master.body.angularVelocity = 8;
  // entity_1.angle = 0;
  entity_1.x = 600;
  entity_1.y = 20;
  // entity_1.angle += 10;
  b.master.body.rotate = 5;

  // moveTo(duration, distance, direction)
  // b.master.update();
  // b.master.updateCrop();
}

 function frictionAll (brick) {
    if (brick.body.velocity.x > 0){
        brick.body.velocity.x = Math.floor(brick.body.velocity.x - 1);
    } else if (brick.body.velocity.x < 0){
      brick.body.velocity.x = Math.floor(brick.body.velocity.x + 1);;
    }
    if (brick.body.velocity.y > 0){
        brick.body.velocity.y = Math.floor(brick.body.velocity.y - 1);;
    } else if (brick.body.velocity.y < 0){
       brick.body.velocity.y = Math.floor(brick.body.velocity.y + 1);;
    }
}

})()
