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

var testAngle = Math.PI/2;
var moveAngle = 0;

var iceBrickHitSong;
var waterSong;

var entity_5;
//условие победы
var cracksDestroy = 1;
//================

var saveBox = { time: 0, hp: 0, stars: 0, score: 0, mod: 1};

window.snowPongGame = {

    preload: function () {
        gameLoad().spritesheet('arrow_indicator', 'assets/img/snowPong/arrow.png');

        gameLoad().image('fonPongGame', 'assets/img/snowPong/fon.png');
        gameLoad().image('snowStuck', 'assets/img/snowPong/snowStuck.png');
        gameLoad().image('snowStuckQuadro', 'assets/img/snowPong/snowStuck2.png');
        gameLoad().image('iceBrick', 'assets/img/snowPong/iceBrick.png');
        gameLoad().image('crack', 'assets/img/snowPong/crack.png');
        gameLoad().image('crack2', 'assets/img/snowPong/crack2.png');
        gameLoad().image('stoneBig', 'assets/img/snowPong/stone.png');
        gameLoad().image('stoneMiddle', 'assets/img/snowPong/stoneMiddle.png');
        gameLoad().image('stoneSmall', 'assets/img/snowPong/stoneSmall.png');
        gameLoad().image('woodBox', 'assets/img/snowPong/woodBox.png');
        gameLoad().image('hole', 'assets/img/snowPong/hole.png');

        gameLoad().image('iceWall', 'assets/img/snowPong/iceWall.png');
        gameLoad().image('woodStick', 'assets/img/snowPong/woodStick.png');

        gameLoad().image('smallSnow', 'assets/img/smallSnow.png');

        gameLoad().audio('mainSound', 'assets/audio/snowPongGame/Broke_For_Free_-_05_-_Something_Elated(main_sound).ogg');
        gameLoad().audio('iceCrack', 'assets/audio/snowPongGame/iceCrack_cuted.ogg');
        gameLoad().audio('rollingBall', 'assets/audio/snowPongGame/MarbleRollonWood_cuted.ogg');
        gameLoad().audio('indicator', 'assets/audio/snowPongGame/Rezinovyi_shar_trut_skrepit_cuted.ogg');
        gameLoad().audio('snow_poof', 'assets/audio/snowPongGame/Snow_cuted.ogg');
        gameLoad().audio('stoun_hit', 'assets/audio/snowPongGame/StounSong_cuted.ogg');
        gameLoad().audio('wood_hit', 'assets/audio/snowPongGame/Metal_Strike_on_Wood_cuted.ogg');
        gameLoad().audio('iceWall', 'assets/audio/snowPongGame/iceWall_cuted.ogg');
    },
    create: function (){
        gameAdd().image(0, 0, 'fonPongGame');

        snow_poof = gameAdd().audio('snow_poof');
        indicator = gameAdd().audio('indicator');
        mainSound = gameAdd().audio('snowBallGame_mainTrack');
        iceCrack = gameAdd().audio('iceCrack');
        rollingBall = gameAdd().audio('rollingBall');
        wood_hit =gameAdd().audio('wood_hit');
        stoun_hit= gameAdd().audio('stoun_hit');
        iceWall_hit = gameAdd().audio('iceWall');
        starSong = gameAdd().audio('starSong');
        iceBrickHitSong = gameAdd().audio('iceBrickPunch');
        waterSong = gameAdd().audio('waterSong');

        mainSound.volume = 0.4;
        if (!mainSound.isPlaying)
        {
          mainSound.play();
        }
        //Группа подарков=======================================
                gifts = gameAdd().group();
                gifts.enableBody = true;
                gifts.createMultiple(8, 'star');
                gifts.setAll('anchor.x', 0.5);
                gifts.setAll('anchor.y', 0.5);
                gifts.forEach(
                  function (invader){
                    invader.animations.add('play');
                  }, this);
                var gift_1 = gifts.getFirstExists(false);
                gift_1.reset(270, 210);
                gift_1.animations.play('play', 12,  true ,true);

        //Группы препятствий и прочих штук на карте==================
                entityGroup = gameAdd().group();
                entityGroup.enableBody = true;
                entityGroup.physicsBodyType = Phaser.Physics.ARCADE;

                var entity_1 = entityGroup.create(30, 200, 'stoneMiddle');
                entity_1.body.immovable = true;
                entity_1.anchor.setTo(0.5, 0.5);
                entity_1.type = 'stone';

                var entity_2 = entityGroup.create(350, 220, 'stoneBig');
                entity_2.body.immovable = true;
                entity_2.anchor.setTo(0.5, 0.5);
                entity_2.type = 'stone';

                var iceWall = entityGroup.create(0, 0, 'iceWall');
                iceWall.body.immovable = true;
                iceWall.type = 'iceWall';
        //=============Группа снежных препятствий==================================
                snowGroup = gameAdd().group();
                snowGroup.enableBody = true;
                var snow_1 = snowGroup.create(120, 460, 'snowStuck');
                snow_1.anchor.setTo(0.5, 0.5);
        //Группа целей====================================================
                aimsGroup = gameAdd().group();
                aimsGroup.enableBody = true;
                aimsGroup.physicsBodyType = Phaser.Physics.ARCADE;
                var aim_1 = aimsGroup.create(300, 7, 'crack');
                aim_1.body.immovable = true;
                aim_1.anchor.setTo(0.5, 0);

//===============================================================
        explosions = gameAdd().group();
        explosions.createMultiple(30, 'kaboom');

        explosions.forEach( function (invader){
          invader.anchor.x =  0.5;
          invader.anchor.y =  0.5;
          invader.animations.add('kaboom');
        }, this);

        iceBall.sprite = gameAdd().sprite(iceBall.startX, iceBall.startY, 'bigSnowBaall');//110 x 110 px
        gamePhysics().arcade.enable(iceBall.sprite);
        iceBall.sprite.body.bounce.set(0.9);
        iceBall.sprite.animations.add('bigSnowBaall');
        iceBall.sprite.animations.play('bigSnowBaall', true, true);
        iceBall.sprite.anchor.x = 0.5;
        iceBall.sprite.anchor.y = 0.5;
        iceBall.sprite.scale.setTo(0.5, 0.5);
        iceBall.sprite.volume = 0;
        iceBall.sprite.outOfBoundsKill = true;
        iceBall.sprite.checkWorldBounds = true;
        iceBall.sprite.tempYmax  = 200;
        iceBall.sprite.tempYmin = -200;
        iceBall.sprite.tempXmax  = 200;
        iceBall.sprite.tempXmin = -200;
        iceBall.sprite.vectorVelocitiMax = Math.sqrt(iceBall.velocityRatio*iceBall.velocityRatio*(iceBall.sprite.tempXmax*iceBall.sprite.tempXmax + iceBall.sprite.tempYmax*iceBall.sprite.tempYmax));

        iceBall.sprite.arrow_1 = this.add.button(iceBall.sprite.x + 80, iceBall.sprite.y, 'arrow',goRight, this, 1, 2 ,0);
        iceBall.sprite.arrow_1.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_1.scale.setTo(0.7, 0.7);
        iceBall.sprite.arrow_2 = this.add.button(iceBall.sprite.x - 80, iceBall.sprite.y, 'arrow_2', goLeft, this, 1, 2 ,0);
        iceBall.sprite.arrow_2.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_2.scale.setTo(0.7, 0.7);

        iceBall.recentX = iceBall.startX;
        iceBall.recentY = iceBall.startY;

        iceBall.status = 'wait';

        // gamePhysics().arcade.enable([entity_1, iceBall.sprite]);

        // entity_1.body.mass = 50;
        // entity_2.body.mass = 50;
        // entity_3.body.mass = 50;



        textDebag = gameAdd().text(220, 200, '', { fontSize: '32px', fill: 'red' , font: 'mainFont'});

        //индикатор броска
        arrow = gameAdd().sprite(iceBall.startX, iceBall.startY, 'arrow_indicator');
        arrow.anchor.y = 0.5;
        arrow.anchor.x = 1;
        arrow.animations.add('arrow_indicator');
        arrow.alpha = 0;

        iceBall.minX = iceBall.sprite.x - iceBall.sprite.width/2;
        iceBall.maxX = iceBall.sprite.x + iceBall.sprite.width/2;

        iceBall.minY = iceBall.sprite.y - iceBall.sprite.height/2;
        iceBall.maxY = iceBall.sprite.y + iceBall.sprite.height/2;

        iceBall.manipulator = gameInput().mousePointer,
        gamePhysics().enable(iceBall.sprite, Phaser.Physics.ARCADE);

        //Табло================================================
        gameAdd().image(0, 0, 'underLyaer');
        //Звузда
        scoreStarsImage = gameAdd().sprite (20 , 20, 'starBar');
        scoreStarsImage.scale.setTo(1, 1);
        scoreStarsImage.anchor.x = 0.5;
        scoreStarsImage.anchor.y = 0.5;
        scoreStarsImage.alpha = 1;
        scoreStarsImage.animations.add('starBar');
        starTable = gameAdd().bitmapText(50, 25, 'fontStarMessage', "0", 32);
        // starTable = gameAdd().text(50, 20, '-', { fontSize: '32px', fill: '#7C4111', font: 'mainFont' });
        starTable.anchor.x = 0.5;
        starTable.anchor.y = 0.5;
        //Сердце
        scoreHartImage = gameAdd().sprite (97 , 20, 'HartBar');
        scoreHartImage.scale.setTo(1, 1);
        scoreHartImage.anchor.x = 0.5;
        scoreHartImage.anchor.y = 0.5;
        scoreHartImage.alpha = 1;
        scoreHartImage.animations.add('hartBar');
        healthTable = gameAdd().bitmapText(132, 25, 'fontHart', "0", 32);
        // healthTable = gameAdd().text(132, 20, '-', { fontSize: '32px', fill: '#91294E', font: 'mainFont' });
        healthTable.anchor.x = 0.5;
        healthTable.anchor.y = 0.5;
        //часы
        scoreTimerImage =  gameAdd().sprite (178 , 20, 'timeBar');
        scoreTimerImage.scale.setTo(1, 1);
        scoreTimerImage.anchor.x = 0.5;
        scoreTimerImage.anchor.y = 0.5;
        scoreTimerImage.alpha = 1;
        scoreTimerImage.animations.add('timeBar');
        levelTable = gameAdd().bitmapText(213, 25, 'fontClock', "0", 32);
        // levelTable = gameAdd().text(213, 20,  '-', { fontSize: '32px', fill: '#8E3E36', font: 'mainFont'  });
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

        arrowScale = vectorSum / (4 * iceBall.sprite.height);

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
          iceBall.sprite.arrow_1.x = iceBall.sprite.x + 85;
          iceBall.sprite.arrow_2.x = iceBall.sprite.x - 70;
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
            iceBall.tempX = 0;
            iceBall.tempY = 0;
            iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
            iceBall.isSet = true;
            iceBall.status = 'wait';
            countSnowSong = 0;
            health -= 1;
            healthTable.text = health;
            scoreHartImage.animations.play('hartBar');
            levelTable.text = realTimeNow;
            riseArrow();
            function resetAll(aim) {
            aim.reset(aim.x, aim.y);
            }
            function resetStars(star){
              star.reset(star.x, star.y);
            }
        }
    },
    update: function (){
      if (iceBall.status == 'wait'){
          iceBall.sprite.angle = testAngle *180 / Math.PI - 90;
      }else if (iceBall.status == 'start'){
        if(iceBall.sprite.body.velocity.x < 0 && iceBall.sprite.body.velocity.y < 0){
          iceBall.sprite.angle = -moveAngle;
        }else if (iceBall.sprite.body.velocity.y > 0 || iceBall.sprite.body.velocity.x < 0){
          iceBall.sprite.angle = -moveAngle + 180;
        }else{
          iceBall.sprite.angle = -moveAngle;
        }

      }

      //ограничение на передвижение
      if (iceBall.sprite.x < 220  && iceBall.status == 'wait'){
        iceBall.sprite.x = 220 ;
      }

      //textDebag
      // textDebag.text = 'velx' + iceBall.sprite.body.velocity.x + 'vely' + iceBall.sprite.body.velocity.y;
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
        if (!checkover){
            countSnowSong = 0;
        }
        checkRollingBall();

        this.checkShoot();
        this.checkManipulator();

        gamePhysics().arcade.collide(entityGroup, entityGroup);
        gamePhysics().arcade.collide(entityGroup, iceBall.sprite, playSong);
        gamePhysics().arcade.collide(aimsGroup, iceBall.sprite, killAim);
        gamePhysics().arcade.collide(holesGroup, entityGroup,  killAll);

        gamePhysics().arcade.overlap(holesGroup, iceBall.sprite,  doReplayGame, null, this);
        checkover = gamePhysics().arcade.overlap(snowGroup, iceBall.sprite,  friction, null, this);
        gamePhysics().arcade.overlap(gifts, iceBall.sprite,  killgift, null, this);
        this.resetBall();
        entityGroup.forEachAlive(frictionAll, this );

        //трение для шара
        if(iceBall.sprite.body.velocity.x !== 0 || iceBall.sprite.body.velocity.y !== 0 && iceBall.status == 'start'){
          frictionBall(iceBall.sprite);
        }
    },
    getInfo: function (){
      return saveBox;
    },

}

var iceBall = {
  startX : 400,
  startY : 420,
  velocityRatio : 2,
  tempX : 0,
  tempY : 0,
  isSet : true,

}

var killAim = function (iceBall, aim) {
    iceCrack.play();
    aim.kill();
}

var replay = function (){
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  iceBall.isSet = true;
  iceBall.status = 'wait';
  countSnowSong = 0;
  health = 3;
  scoreStars = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  rollingBall.stop();
  healthTable.text = health;
  scoreHartImage.animations.play('hartBar');
  levelTable.text = realTimeNow;
  starTable.text = scoreStars;
  riseArrow();
  aimsGroup.forEachDead(resetAll, this);
  gifts.forEachDead(resetStars, this);
  entityGroup.forEachDead(function (ent){
    if(ent.type = 'wood'){
      ent.reset(ent.coordBeginX, ent.coordBeginY);
    }
  }, this);

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

    if(countSnowSong == 0){
      snow_poof.play();
      var explosion = explosions.getFirstExists(false);
      explosion.reset(iceBall.x, iceBall.y);
      explosion.play('kaboom', 30, false, true);
      countSnowSong++;
    }
}
var rollingCounter = 0;



var checkRollingBall = function () {
  if((Math.abs(iceBall.sprite.body.velocity.x) > 0 || Math.abs(iceBall.sprite.body.velocity.y) > 0) && !checkover){
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
var playSong = function (ball, entity) {

  if (entity.type == 'wood'){
        wood_hit.volume = iceBall.sprite.volume;
        wood_hit.play();
  }else if (entity.type == 'stone'){
        stoun_hit.volume = iceBall.sprite.volume
        stoun_hit.play();
  } else if(entity.type == 'iceWall'){
        iceWall_hit.play();
  } else if(entity.type == 'iceBrick'){
        iceBrickHitSong.play();
  }

}

var killgift = function (player, star){
  star.kill();
  starSong.play();
  scoreStarsImage.animations.play('starBar');
  scoreStars += 1;
  starTable.text = scoreStars;
}

var goMenuLoose = function () {
  gameSound().stopAll();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  iceBall.isSet = true;
  iceBall.status = 'wait';
  riseArrow();
  realTimeNow = 0;
  health = 3;
  scoreStars = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  saveBox.currentGame = 'snowPongGame';
  saveStat(21);
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
  saveBox.currentGame = 'snowPongGame';
  saveStat(21);
  changeState('Win_SnowBallGame');
}

doReplayGame = function (){
  waterSong.play();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  countSnowSong = 0;
  health -= 1;
  healthTable.text = health;
  scoreHartImage.animations.play('hartBar');
  levelTable.text = realTimeNow;
  // starTable.text = '0';
  riseArrow();
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
  saveBox.currentGame = 'snowPongGame';
  saveStat(21);

  changeState('map');
}


 function  frictionBall (ball) {

    var vX = ball.body.velocity.x;
    var vY = ball.body.velocity.y;
    moveAngle = Math.atan(vX/vY) * 180/Math.PI;
    var v = Math.sqrt(vX*vX + vY*vY);
    var kX = vX/v;
    var kY = vY/v;

    ball.body.velocity.x =   ball.body.velocity.x - kX/100;
    ball.body.velocity.y =   ball.body.velocity.y - kY/100;

    if (Math.abs(ball.body.velocity.x) < 10){
      if (ball.body.velocity.x > 0){
      ball.body.velocity.x = Math.floor(ball.body.velocity.x - 0.1);
      }else {
      ball.body.velocity.x = Math.ceil(ball.body.velocity.x + 0.1);
      }
    }

    if (Math.abs(ball.body.velocity.y) < 10){
      if (ball.body.velocity.y > 0){
      ball.body.velocity.y = Math.floor(ball.body.velocity.y - 0.1);
      }else{
      ball.body.velocity.y = Math.ceil(ball.body.velocity.y + 0.1);
      }
    }

}

function frictionAll (brick) {
   if (brick.body.velocity.x > 0){
       brick.body.velocity.x = Math.floor(brick.body.velocity.x - 1);
   } else if (brick.body.velocity.x < 0){
     brick.body.velocity.x = Math.floor(brick.body.velocity.x + 1);
   }
   if (brick.body.velocity.y > 0){
       brick.body.velocity.y = Math.floor(brick.body.velocity.y - 1);
   } else if (brick.body.velocity.y < 0){
      brick.body.velocity.y = Math.floor(brick.body.velocity.y + 1);
   }
}

function killAll (hole, ent){
  if(!iceBall.manipulator.isDown){
    waterSong.play();
    ent.kill();
  }

}

})()
