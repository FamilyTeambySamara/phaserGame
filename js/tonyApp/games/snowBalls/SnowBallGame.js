(function () {

//Спрайты================
var playerBet;
var computerBet;
//полярники
var simplePolarMan;
var simplePolarMen;
var smartPolarMen;
var smartPolarMan;
var bigPolarMen;
var bigPolarMan;

var timeDealyPolarCreate = 1000;
//====================
var refuse;
var gifts;
var gift;
//var refuseLive = 10;
//======================
//Музыка и звкуи audio
var throw_player;
var throw_enemy;
var harmPolar;
var clap;
var hitPinguin
var starSong;
//========================
//====================
///Таблица данных об игре
var scoreTable;
var levelTable;
var healthTable;
var starTable;

var scoreStarsImage;
var scoreHartImage;
var scoreTimerImage;

//Статистика смертей===========
var bigPolarDead = 0;
var simplePolarDead = 0;
var smartPolarDead = 0;
//===========================
//=============================
//Анимационные эффекты===================
var explosions;
var explosion;
var animBigPolar;

//============================Переменные значения(настройки игры)==================
var computerBetSpeed = 150; //Скорость передвижения компьютера
var score = 0; //Количество попаданий
var nextLevelScore = 3; //Критерий перехода на следующий уровень
var Level = 1; //Текущий уровень
var health = 3; //Жизни игрока
var scoreStars = 0;
var counterStarterTime = 0;
var starterTime = 0;

var realTimeNow;
//==================================================================
//===========Управление============================================
// var plyaerMouse;
var cursors;
var fireButton;

var blockKeys =  false;
//=====Для стрельбы=================================================

//Группы пуль
var bullets;
var enemyBullets;
var enemyBulletsBig;
//Экземплры пуль
var bullet;
var enemyBullet;
var enemyBulletBig;

//Параметры стрельбы
var bulletTime = 1000;  //Начальная задержка пуль по времени PLayer
var enemyBigBulletTime = 2000;
var enemyBulletTime = 1000;//Начальная задержка пуль по времени Enemys

var enemyBulletvelocity = 400;//скорость пуль PLayer
var playerBulletVelocity = 300;//скорость пуль Enemys

var mark = 'right';//марке стрельбы

var timeDilayEnemy = 2000;//перезардка выстрела  Enemys
var timeDilayPlayer = 600;//перезардка выстрела  PLayer
//================mod==============================
var mod;
//уровень 1
var countSimple_1;
var aliveSimple_1;

var changeLevel_1;
//уровень 2
var countSimple_2;
var aliveSimple_2;

var countSmart_2;
var aliveSmart_2;

var changeLevel_2 ;

//уровень 3
var countSimple_3;
var aliveSimple_3;

var countSmart_3 ;
var aliveSmart_3;

var countBig_3;
var aliveBig_3;

var changeLevel_3;
//=================Результат матча========================================
var saveBox = {};
/////////================================================\\\\\\\\\\\\\\\\\\\\

//кнопки управления
var distanceToMove;
var angleToMove;
var moveToX;
var moveToY;

var replayGame;
var exitGame;
var doReplayGame;
var doExitGame;

var wholeStars;

var b_music_1;
var b_music_2;
var layerUnderMenu;

var infoRuls;
var b_info ;
var closeButton;
window.snowBallMainTrack = false;
window.SnowBallGame =
{
    preload: function () {
        gameLoad().image('infoRuls', 'assets/img/rules/rules2.png');
    },
    create: function () {

    gamePhysics().startSystem(Phaser.Physics.ARCADE);
    gameAdd().image(0, 0, 'mainLayer');

    //====================Добавлем музыку и звуки====================
    //звуки бросков
    throw_plyer = gameAdd().audio('throw');
    throw_plyer.volume = 1;
    throw_enemy = gameAdd().audio('throw');
    throw_enemy.volume = 0.85;
    //звуки полярников
    harmPolar = gameAdd().audio('harmPolar');
    clap = gameAdd().audio('clap');
    clap.volume = 0.3;
    //удар в пингвина
    hitPinguin = gameAdd().audio('hitPinguin');
    hitPinguin.volume = 0.4;
    //сбор звездочек
    starSong = gameAdd().audio('starSong');
    //=======================================
    mainTrack = gameAdd().audio('snowBallGame_mainTrack');
    mainTrack.volume = 0.5;
    if(!snowBallMainTrack){
      mainTrack.loopFull();
      snowBallMainTrack = true;
    }

//=======Пули игрока============================
      bullets = gameAdd().group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.createMultiple(30, 'ball');
      bullets.setAll('anchor.x', 0.5);
      bullets.setAll('anchor.y', 1);
      bullets.setAll('outOfBoundsKill', true);
      bullets.setAll('checkWorldBounds', true);
//============Пули противника обыкновенные=======================
      enemyBullets = gameAdd().group();
      enemyBullets.enableBody = true;
      enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBullets.createMultiple(30, 'ball');
      enemyBullets.setAll('anchor.x', 0.5);
      enemyBullets.setAll('anchor.y', 1);
      enemyBullets.setAll('outOfBoundsKill', true);
      enemyBullets.setAll('checkWorldBounds', true);
//===================BIG bullets========================
      enemyBulletsBig = gameAdd().group();
      enemyBulletsBig.enableBody = true;
      enemyBulletsBig.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBulletsBig.createMultiple(30, 'bigSnowBaall');
      enemyBulletsBig.setAll('anchor.x', 0.5);
      enemyBulletsBig.setAll('anchor.y', 1);
      enemyBulletsBig.forEach(
        function (invader){
          invader.animations.add('goBall',  [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
        }, this);
//=====================Простые полярники===============
      simplePolarMan = gameAdd().group();
      simplePolarMan.enableBody = true;
      simplePolarMan.physicsBodyType = Phaser.Physics.ARCADE;
      simplePolarMan.createMultiple(30, 'simplePolarMan');
      simplePolarMan.setAll('anchor.x', 0.5);
      simplePolarMan.setAll('anchor.y', 0.5);
      simplePolarMan.forEach(
        function (invader){
          invader.animations.add('go', [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 30, true);
          invader.animations.add('goBack', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 30, true);
          invader.animations.add('shoot',  [26, 27, 28, 0], 10, false);
        }, this);
//================BigPolarMen=============================
        bigPolarMen = gameAdd().group();
        bigPolarMen.enableBody = true;
        bigPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        bigPolarMen.createMultiple(30, 'bigPolarMan');
        bigPolarMen.setAll('anchor.x', 0.5);
        bigPolarMen.setAll('anchor.y', 0.5);
        bigPolarMen.forEach(
          function (invader){
            invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
            animBigPolar = invader.animations.add('throw',  [12, 13, 14], 3, false);
          }, this);
//===============SmartPolarMen==============================
        smartPolarMen = gameAdd().group();
        smartPolarMen.enableBody = true;
        smartPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        smartPolarMen.createMultiple(30, 'smartPolarMan');
        smartPolarMen.setAll('anchor.x', 0.5);
        smartPolarMen.setAll('anchor.y', 0.5);
        smartPolarMen.forEach(
          function (invader){
            invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
            invader.animations.add('goBack', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 30, true);
            invader.animations.add('shoot',  [26, 27, 28, 0], 10, false);
          }, this);
//================Анимационные группы==================
//=============Группа взрывов==========================
      explosions = gameAdd().group();
      explosions.createMultiple(30, 'kaboom');
      explosions.forEach( function (invader){
        invader.anchor.x =  0.5;
        invader.anchor.y =  0.5;
        invader.animations.add('kaboom');
      }, this);
//===========Статичные объект====================
        //Подарочки
        gifts = gameAdd().group();
        gifts.enableBody = true;
        //gifts.physicsBodyType = Phaser.Physics.ARCADE;
        gifts.createMultiple(30, 'star');
        gifts.setAll('anchor.x', 0.5);
        gifts.setAll('anchor.y', 0.5);
        gifts.forEach(
          function (invader){
            invader.animations.add('play');
          }, this);
      //хижина
      refuse = gameAdd().group()
      refuse.physicsBodyType = Phaser.Physics.ARCADE;
      refuse.enableBody = true;
      //Сугробы
      var ref = refuse.create(420, 290, 'bigSnow');
      ref.body.immovable = true;
      ref.hp = 8;
      ref.anchor.x = 0.5;
      ref.anchor.y = 0.5;
      var ref_2 = refuse.create(70, 70, 'refuse');
      ref_2.body.immovable = true;
      ref_2.hp = 10;
      ref_2.anchor.x = 0.5;
      ref_2.anchor.y = 0.5;
      // ref_2.body.setCircle(175/2,);
      var ref_3 = refuse.create(510, 10, 'midleSnow');
      ref_3.body.immovable = true;
      ref_3.hp = 5;
      ref_3.anchor.x = 0.5;
      ref_3.anchor.y = 0.5;
      var ref_4 = refuse.create(240, 350, 'smallSnow');
      ref_4.body.immovable = true;
      ref_4.hp = 2;
      ref_4.anchor.x = 0.5;
      ref_4.anchor.y = 0.5;
      var ref_5 = refuse.create(100, 240, 'smallSnow');
      ref_5.body.immovable = true;
      ref_5.hp = 2;
      ref_5.anchor.x = 0.5;
      ref_5.anchor.y = 0.5;
      var ref_6 = refuse.create(420, 40, 'smallSnow');
      ref_6.body.immovable = true;
      ref_6.hp = 2;
      ref_6.anchor.x = 0.5;
      ref_6.anchor.y = 0.5;
      //player
      playerBet = gameAdd().sprite(35, 230, 'bet');
      playerBet.anchor.setTo(0.5, 0.5);
      playerBet.status = 'whait';
      gamePhysics().arcade.enable(playerBet);
      playerBet.body.setSize(30, 58, 10, 10);
      playerBet.fullVelocity = 250;
      playerBet.animations.add('throw',[ 7 , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20], 40);
      playerBet.animations.add('right',[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 25, true);
      playerBet.animations.add('hit',[42, 41, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53], 25);
//==================Табло=======================
      //Подложка
      infoRuls = gameAdd().image(0,0, 'infoRuls');
      infoRuls.alpha = 0;
      infoRuls.anchor.setTo(0.5, 0.5);
      infoRuls.kill();
      b_info = gameAdd().button(400, 0, 'infoButton', showInfoGame, this,  1, 2 , 0);
      b_info.anchor.setTo(0.5, 0);
      closeButton = gameAdd().button(145, 364, 'button_play', closeWindow, this, 2, 1 ,0);
      closeButton.kill();
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

      // scoreTable =  gameAdd().text(55, 60, 'simple: ' + simplePolarDead +   ' \n smart ' + smartPolarDead + '\n big' + bigPolarDead, { fontSize: '32px', fill: 'white' });
      //healthTable = gameAdd().text(16, 95, 'Health: ' +  health, { fontSize: '32px', fill: 'red' });


      //кнопки управления============
      layerUnderMenu = gameAdd().image(800, 0, 'underLyaerInGame');
      layerUnderMenu.anchor.x = 1;

      //управление музыкой==========================
      b_music_1 = gameAdd().button(layerUnderMenu.left + 2, layerUnderMenu.centerY, 'turnSound_new', this.turnMusic, this,  0, 2 ,1);
      b_music_1.anchor.setTo(0, 0.5);

      b_music_2 = gameAdd().button(layerUnderMenu.left + 2, layerUnderMenu.centerY, 'turnSound_new', this.turnMusic, this, 3, 5 ,4);
      b_music_2.anchor.setTo(0, 0.5);

      replayGame = gameAdd().button(b_music_1.right - 2, layerUnderMenu.centerY, 'replay_game_new', doReplayGame, this, 1, 2 ,0);
      replayGame.anchor.setTo(0, 0.5);
      exitGame = gameAdd().button(replayGame.right + 1, layerUnderMenu.centerY, 'exit_game_new', doExitGame, this, 1, 2 ,0);
      exitGame.anchor.setTo(0, 0.5);

      if(!gameSound().mute){
          b_music_2.kill();
      }else{
          b_music_1.kill();
      }
      //=====================debag========
textDebag = gameAdd().text(220, 200, '', { fontSize: '32px', fill: 'red'});
//=========Управление игроком========================================
       fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
       cursors = gameInput().keyboard.createCursorKeys();
       // plyaerMouse = gameInput().x;
       //gameInput().onDown.add(this.releaseBall, this);
       // gamePhysics().angleToPointer(displayObject, pointer, world) //вычисляем угол
       // gamePhysics().distanceToPointer(displayObject, pointer, world)//вычисляем расстояние
       gameInput().onDown.add(this.fireBulletAndGo, this); //стреляем
//===================================================================
if (getInfo().game_1.status == 'unstart'){
  showInfoGame();
}
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
    fireBulletAndGo:function ()
    {
      blockKeys = true;
      playerBet.status = 'start';
      distanceToMove =  gamePhysics().arcade.distanceToPointer(playerBet);
      if (Math.abs(distanceToMove)>20){
        moveToX = gameInput().x;
        moveToY = gameInput().y;
        angleToMove = gamePhysics().arcade.angleToPointer(playerBet);
        playerBet.angle = angleToMove * 180/Math.PI;
        playerBet.body.velocity.x = Math.cos(angleToMove)*playerBet.fullVelocity;
        playerBet.body.velocity.y = Math.sin(angleToMove)*playerBet.fullVelocity;
        playerBet.animations.play('right');
      }

   //  To avoid them being allowed to fire too fast we set a time limit
   if (gameTime().now > bulletTime)
   {
     bullet = bullets.getFirstExists(false);
     playerBet.animations.play('throw');
     throw_plyer.play();
     bullet.reset(playerBet.x, playerBet.y);
     bullet.body.velocity.x = Math.cos(angleToMove)*playerBulletVelocity;
     bullet.body.velocity.y = Math.sin(angleToMove)*playerBulletVelocity;
     bulletTime = gameTime().now + timeDilayPlayer;
    //      switch (playerBet.angle) {
    //        case 90:
    //        //вниз
    //            throw_plyer.play();
    //            bullet.reset(playerBet.x, playerBet.y + 5);
    //            bullet.body.velocity.y = playerBulletVelocity;
    //            bulletTime = gameTime().now + timeDilayPlayer;
    //            break;
    //        case 45:
    //          //вниз-право
    //            throw_plyer.play();
    //            bullet.reset(playerBet.x, playerBet.y + 5);
    //            bullet.body.velocity.y = playerBulletVelocity/2;
    //            bullet.body.velocity.x = playerBulletVelocity/2;
    //            bulletTime = gameTime().now + timeDilayPlayer;
    //            break;
    //        case -45:
    //            //вверх-право
    //            throw_plyer.play();
    //            bullet.reset(playerBet.x, playerBet.y + 5);
    //            bullet.body.velocity.y = -playerBulletVelocity/2;
    //            bullet.body.velocity.x = playerBulletVelocity/2;
    //            bulletTime = gameTime().now + timeDilayPlayer;
    //            break;
    //        case 135:
    //          //вниз-лево
    //          throw_plyer.play();
    //          bullet.reset(playerBet.x, playerBet.y + 5);
    //          bullet.body.velocity.y = playerBulletVelocity/2;
    //          bullet.body.velocity.x = -playerBulletVelocity/2;
    //          bulletTime = gameTime().now + timeDilayPlayer;
    //          break;
    //        case -135:
    //          //вверх-лево
    //          throw_plyer.play();
    //          bullet.reset(playerBet.x, playerBet.y + 5);
    //          bullet.body.velocity.y = -playerBulletVelocity/2;
    //          bullet.body.velocity.x = -playerBulletVelocity/2;
    //          bulletTime = gameTime().now + timeDilayPlayer;
    //          break;
    //        case -90:
    //            throw_plyer.play();
    //            bullet.reset(playerBet.x, playerBet.y - 5);
    //            bullet.body.velocity.y = -playerBulletVelocity;
    //            bulletTime = gameTime().now + timeDilayPlayer;
    //            break;
    //        case -180:
    //            throw_plyer.play();
    //            bullet.reset(playerBet.x - 5, playerBet.y);
    //            bullet.body.velocity.x = -playerBulletVelocity;
    //            bulletTime = gameTime().now + timeDilayPlayer;
    //            break;
    //        case 0:
    //            throw_plyer.play();
    //            bullet.reset(playerBet.x + 5, playerBet.y);
    //            bullet.body.velocity.x = playerBulletVelocity;
    //            bulletTime = gameTime().now + timeDilayPlayer;
    //            break;
    //      }
    }
  },
    //Стрельба PLayer
     fireBullet: function () {
       playerBet.status = 'start';
    //  To avoid them being allowed to fire too fast we set a time limit
    if (gameTime().now > bulletTime)
    {
      bullet = bullets.getFirstExists(false);
      playerBet.animations.play('throw');
          switch (playerBet.angle) {
            case 90:
            //вниз
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y + 5);
                bullet.body.velocity.y = playerBulletVelocity;
                bulletTime = gameTime().now + timeDilayPlayer;
                break;
            case 45:
              //вниз-право
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y + 5);
                bullet.body.velocity.y = playerBulletVelocity/2;
                bullet.body.velocity.x = playerBulletVelocity/2;
                bulletTime = gameTime().now + timeDilayPlayer;
                break;
            case -45:
                //вверх-право
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y + 5);
                bullet.body.velocity.y = -playerBulletVelocity/2;
                bullet.body.velocity.x = playerBulletVelocity/2;
                bulletTime = gameTime().now + timeDilayPlayer;
                break;
            case 135:
              //вниз-лево
              throw_plyer.play();
              bullet.reset(playerBet.x, playerBet.y + 5);
              bullet.body.velocity.y = playerBulletVelocity/2;
              bullet.body.velocity.x = -playerBulletVelocity/2;
              bulletTime = gameTime().now + timeDilayPlayer;
              break;
            case -135:
              //вверх-лево
              throw_plyer.play();
              bullet.reset(playerBet.x, playerBet.y + 5);
              bullet.body.velocity.y = -playerBulletVelocity/2;
              bullet.body.velocity.x = -playerBulletVelocity/2;
              bulletTime = gameTime().now + timeDilayPlayer;
              break;
            case -90:
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y - 5);
                bullet.body.velocity.y = -playerBulletVelocity;
                bulletTime = gameTime().now + timeDilayPlayer;
                break;
            case -180:
                throw_plyer.play();
                bullet.reset(playerBet.x - 5, playerBet.y);
                bullet.body.velocity.x = -playerBulletVelocity;
                bulletTime = gameTime().now + timeDilayPlayer;
                break;
            case 0:
                throw_plyer.play();
                bullet.reset(playerBet.x + 5, playerBet.y);
                bullet.body.velocity.x = playerBulletVelocity;
                bulletTime = gameTime().now + timeDilayPlayer;
                break;
          }
        // }
      }

},
      fireBulletSmartEnemy: function (enemy) {

        if (gameTime().now > enemy.timeDelay)
        {
            //  Grab the first bullet we can from the pool
            enemyBullet = enemyBullets.getFirstExists(false);

            if (enemyBullet)
            {
                //  And fire it
                throw_enemy.play();
                enemy.angle = 180;
                enemy.body.velocity.y = 0;
                enemy.animations.play('shoot');
                enemyBullet.reset(enemy.x - 10, enemy.y);
                //enemyBullet.body.velocity.x = -enemyBulletvelocity;
                gamePhysics().arcade.moveToObject(enemyBullet, playerBet,120);
                enemy.timeDelay = gameTime().now + timeDilayEnemy;
            }
        }
      },
    //Стрельба Enemy
    fireBulletEnemy: function (enemy) {

      if (gameTime().now > enemy.timeDelay)
      {
          //  Grab the first bullet we can from the pool
          enemyBullet = enemyBullets.getFirstExists(false);

          if (enemyBullet)
          {
              //  And fire it
              throw_enemy.play();
              enemy.angle = 180;
              enemy.body.velocity.y = 0;
              enemy.animations.play('shoot');
              enemyBullet.reset(enemy.x - 10, enemy.y);
              enemyBullet.body.velocity.x = -enemyBulletvelocity;
              enemy.timeDelay = gameTime().now + timeDilayEnemy;
          }
      }
    },

     killComp: function (bullet, polar){

            //добавляем счет
            if (polar.hp >= 1){
              score = score + 1;
            }
            // scoreTable.text = 'simple: ' + simplePolarDead +   ' \n smart ' + smartPolarDead + '\n big' + bigPolarDead;
            //убиваем и взрываем пулю
            bullet.kill();

            var explosion = explosions.getFirstExists(false);
            explosion.reset(polar.x, polar.y);
            explosion.scale.setTo(1,1);
            explosion.play('kaboom', 30, false, true);
            //проверяем жизни врага и убиваем если 0
            polar.hp -= 1;
            harmPolar.play();
            if(polar.hp < 1 && polar.status !== 'dead'){
              if(polar.name == 'simplePolarMan'){
                simplePolarDead += 1;
                polar.status = 'dead';
                polar.animations.play('goBack');
                polar.angle = 0;
                polar.body.velocity.x = 120 ;
              } else if (polar.name == 'smartPolarMan'){
                smartPolarDead += 1;
                polar.status = 'dead';
                polar.animations.play('goBack');
                polar.angle = 0;
                polar.body.velocity.x = 120 ;
              } else {
                bigPolarDead += 1;
                polar.status = 'dead';
                //polar.animations.play('goBack');
                polar.angle = 90;
                polar.body.velocity.y = 250 ;
                bigPolarMan.animations.play('go');
                function doit (){
                  polar.kill();
                }
                gameTime().events.add(1000, doit, this);
                // var  go = gameAdd().Timer;
                // go.add(300, kill(), this);
              }
              switch (smartPolarDead + simplePolarDead + bigPolarDead) {
                case changeLevel_1:
                    nextLevelScore += 5;
                    enemyBulletvelocity += 60;
                    timeDilayEnemy -= 50;
                    ++Level;
                    //levelTable.text = "Time " + Math.floor(gameTime().now/1000);
                    break;
                case changeLevel_2:
                    // nextLevelScore += 5;
                    enemyBulletvelocity += 100;
                    timeDilayEnemy -= 80;
                    ++Level;
                    //levelTable.text = "Level" + Level;
                    break;
                case changeLevel_3:
                    saveBox.time = realTimeNow;
                    saveBox.hp =  health;
                    saveBox.stars = scoreStars;
                    if (scoreStars){
                        saveBox.score = scoreStars * Math.floor(1000/realTimeNow) * health * (saveBox.mod * saveBox.mod);
                    }else {
                        saveBox.score = Math.floor(1000/realTimeNow) * health * (saveBox.mod * saveBox.mod);
                    }
                    saveBox.currentGame = 'SnowBallGame';
                    saveStat(1);
                    //========Сброс настроек====
                    wholeStars = 2*(+saveBox.mod);
                    counterStarterTime = 0;
                    scoreStars = 0;
                    simplePolarDead = 0;
                    smartPolarDead = 0;
                    bigPolarDead = 0;
                    nextLevelScore = 5;
                    health = 3;
                    shotAim = 0;
                    Level = 1;
                    score = 0;
                    timeDilayEnemy = 2000;
                    enemyBulletvelocity = 400;
                    refuseLive = 10;
                    snowBallMainTrack = false;
                    // mainTrack.pause();
                    gameSound().stopAll();
                    //==============================
                    changeState('Win_SnowBallGame');
                    break;

                  }
              }
     },

     getInfo: function (){
        return saveBox;
     },

     killBullets: function (refuse, bullet){
        var explode = explosions.getFirstExists(false);
        explode.reset(bullet.x, bullet.y);
        explode.scale.setTo(0.5, 0.5);

        explode.play('kaboom', 30, false, true);
        refuse.hp -= 1;

        if (refuse.hp < 1){
            refuse.kill();
            if (wholeStars > 0){
              wholeStars--;
              var star = gifts.getFirstExists(false);
              star.reset(refuse.x, refuse.y);
              star.animations.play('play', 12, true, true);
            }

        }
        clap.play();
        bullet.kill();
     },

     killBulletsBig: function (refuse, bullet){
        var explode = explosions.getFirstExists(false);
        explode.reset(bullet.x, bullet.y);
        explode.scale.setTo(2,2);
        explode.play('kaboom', 30, false, true);
        refuse.hp -= 2;
        if (refuse.hp < 1){
            refuse.kill();
        }
        bullet.kill();
   },

     killPLayer: function (bet, bullet )
     {
        if (bullet.name !== 'bigPolarMan'){
          bullet.kill();
        } else {

        }
        hitPinguin.play();
        scoreHartImage.animations.play('hartBar', 12);
        playerBet.animations.play('hit');
        health = health - 1;
        if (health < 1)
        {
            saveBox.currentGame = 'SnowBallGame';
            saveStat(1);
            //========Сброс настроек====
            wholeStars = 2*(+saveBox.mod);
            counterStarterTime = 0;
            scoreStars = 0;
            simplePolarDead = 0;
            smartPolarDead = 0;
            bigPolarDead = 0;
            nextLevelScore = 5;
            health = 3;
            shotAim = 0;
            Level = 1;
            score = 0;
            timeDilayEnemy = 2000;
            enemyBulletvelocity = 400;
            refuseLive = 10;

            // mainTrack.pause();
            gameSound().stopAll();
            snowBallMainTrack = false;
            //==============================
            changeState('Game_over');
        }
        healthTable.text = health;
     },

     killGifts: function (player, star){
       star.kill();
       starSong.play();
       scoreStarsImage.animations.play('starBar');
       scoreStars += 1;
       starTable.text = scoreStars;
     },

      manipulate: function (polar) {

              if (polar.hp >= 1){
                //анимаци выхода полярника
                if (polar.x > 700){
                  polar.body.velocity.x = -50;
                  polar.angle = 180;
                  polar.animations.play('go');
                }else if (polar.x <= 700) {
                  polar.body.velocity.x = 0;
                  //polar.animations.stop('go');
                }
                ///////==============================================
                if (polar.timeWalk > gameTime().now && polar.animations.getAnimation('shoot').isFinished){

                  // if(simplePolarMan.countLiving() > 0){
                    var rand = Math.floor(Math.random() * (90 + 1));
                    if (polar.y - playerBet.y < -polar.range) {
                        polar.angle = 90;
                        polar.animations.play('go');
                        polar.body.velocity.y = computerBetSpeed;
                    }
                    else if (polar.y - playerBet.y > polar.range) {
                      polar.angle = 270;
                       polar.body.velocity.y = -computerBetSpeed;
                       polar.animations.play('go');
                    }
                    else if (polar.x <= 700){
                        polar.angle = 180;
                        polar.animations.stop();
                        polar.body.velocity.y = 0;

                    }else{
                      polar.body.velocity.y = 0;
                    }
                  // }
                } else if ((gameTime().now - polar.timeWalk) > (Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000)){
                    //alert(gameTime().now);
                      polar.timeWalk += 9000;
                    //  alert( polar.timeWalk);
                } else if (polar.animations.getAnimation('shoot').isFinished) {
                  //alert((Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000));
                  polar.angle = 180;
                  polar.animations.stop();
                  polar.body.velocity.y = 0;
                }
              }
      },
      manipulateBigPolar: function () {
                      //приходим наверх
                              if(bigPolarMan && bigPolarMan.hp > 0){
                                if (bigPolarMan.y > 480){
                                      bigPolarMan.angle = 270;
                                      bigPolarMan.body.velocity.y = -50;
                                }else if (bigPolarMan.y <= 480){
                                    bigPolarMan.body.velocity.y = 0;
                                }
                      //====================Управление======================
                                if ((bigPolarMan.x - playerBet.x) < -35 && bigPolarMan.animations.getAnimation('throw').isFinished){
                                      bigPolarMan.angle = 0;
                                      bigPolarMan.animations.play('go');
                                      bigPolarMan.body.velocity.x = computerBetSpeed/2;
                                } else if ((bigPolarMan.x - playerBet.x) > 35 && bigPolarMan.animations.getAnimation('throw').isFinished){
                                        bigPolarMan.angle = 180;
                                        bigPolarMan.animations.play('go');
                                        bigPolarMan.body.velocity.x = -computerBetSpeed/2;
                                } else if (bigPolarMan.animations.getAnimation('throw').isFinished) {
                                        bigPolarMan.angle = 270;
                                        bigPolarMan.body.velocity.x = 0;
                                        bigPolarMan.animations.stop();
                                }
                                if (Math.abs(bigPolarMan.x - playerBet.x) < 400){
                                      fireBulletEnemyBig();
                                }
                              }
      },
      chekDead: function (polar){

                      if (polar.x > 800){
                          polar.kill();
                      }
      },

     update: function () {
       // textDebag.text = 'расстояние' + distanceToMove + '\n угол' + angleToMove + '\n скорость' + playerBet.body.velocity.y;

       //Timer
       if (counterStarterTime == 0 && playerBet.status == 'start'){
          counterStarterTime++;
          starterTime = Math.floor(gameTime().now/1000);
          healthTable.text = health;
          starTable.text = '0';
          //scoreHartImage.animations.play('hartBar');
          scoreTimerImage.animations.getAnimation('timeBar').onComplete.add(function () {scoreHartImage.animations.play('hartBar');}, this);
          scoreHartImage.animations.getAnimation('hartBar').onComplete.add(function () {scoreStarsImage.animations.play('starBar');}, this);
       }

       if (playerBet.status == 'start'){
         realTimeNow = Math.floor(gameTime().now/1000) - starterTime;
         levelTable.text = realTimeNow;
         if (realTimeNow % 60 == 0){
              scoreTimerImage.animations.play('timeBar');
         }
       }
       //Если нажат пробел запускаем стрельбу PLayer
        if (fireButton.isDown)
        {
            this.fireBullet();
            playerBet.status = 'start';
        }
//Управление Player============================================================
if(cursors.right.isDown || cursors.up.isDown || cursors.down.isDown || cursors.left.isDown){
  blockKeys = false;
}
if((Math.abs(moveToX - playerBet.x) < 5 && Math.abs(moveToY - playerBet.y) < 5) && blockKeys){
  playerBet.animations.stop('right');
  playerBet.body.velocity.x = 0;
  playerBet.body.velocity.y = 0;
}
  if(!blockKeys){
      if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown){
           playerBet.angle = 0;
           playerBet.status = 'start';
           if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
             playerBet.animations.play('right');
           }
           playerBet.body.velocity.x = 250;
           playerBet.body.velocity.y = 0;
           //playerBet.angle = 90;
           //  playerBet.animations.play('left'); ждем спрайтов
      } else if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown){
            if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
              playerBet.animations.play('right');
            }
           playerBet.angle = 180;
           playerBet.body.velocity.x = -250;
           playerBet.body.velocity.y = 0;
           playerBet.status = 'start';
           //  playerBet.animations.play('left'); ждем спрайтов
      } else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown){
              if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                playerBet.animations.play('right');
              }
             playerBet.angle = 270;
             playerBet.body.velocity.y = -250;
             playerBet.body.velocity.x = 0;
             playerBet.status = 'start';
          //playerBet.animations.stop();
          // player.frame = 4;
      } else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown){
            if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
              playerBet.animations.play('right');
            }
             playerBet.angle = 90;
             playerBet.body.velocity.y = 250;
             playerBet.body.velocity.x = 0;
             playerBet.status = 'start';
      } else if (cursors.down.isDown && cursors.left.isDown){
            if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
              playerBet.animations.play('right');
            }
            playerBet.angle = 135;
            playerBet.body.velocity.y = 125;
            playerBet.body.velocity.x = -125;
            playerBet.status = 'start';

       } else if (cursors.down.isDown && cursors.right.isDown){
             if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
               playerBet.animations.play('right');
             }
             playerBet.angle = 45;
             playerBet.body.velocity.y = 125;
             playerBet.body.velocity.x = 125;
             playerBet.status = 'start';

      } else if (cursors.up.isDown && cursors.left.isDown){
            if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
              playerBet.animations.play('right');
            }
            playerBet.angle = 225;
            playerBet.body.velocity.y = -125;
            playerBet.body.velocity.x = -125;
            playerBet.status = 'start';

       } else if (cursors.up.isDown && cursors.right.isDown){
             if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
               playerBet.animations.play('right');
             }
             playerBet.angle = 315;
             playerBet.body.velocity.y = -125;
             playerBet.body.velocity.x = 125;
             playerBet.status = 'start';

        } else {
         playerBet.animations.stop('right');
         playerBet.body.velocity.y = 0;
         playerBet.body.velocity.x = 0;
    }
  }

//=====================================================================
//=========================================================================
//Ограничения для игрока по высоте и ширине карты
         var playerBetHalfWidth = playerBet.width / 2;
         var playerBetHalfHeight = playerBet.height / 2;

         if (playerBet.x < playerBetHalfWidth) {
            playerBet.x = playerBetHalfWidth;
         }
         else if (playerBet.x > 650 - playerBetHalfWidth) {
            playerBet.x = 650 - playerBetHalfWidth;
         }

         if (playerBet.y < 15) {
            playerBet.y = 15;
         }
         else if (playerBet.y > gameHeight() - 15 ) {
            playerBet.y = gameHeight() - 15;
         }
//Изменение уровней====================================================
//====Сюжет уровень 2================================================
          if(Level == 1){
                if(simplePolarMan.countLiving() < aliveSimple_1 && timeDealyPolarCreate < gameTime().now && simplePolarDead + simplePolarMan.total < countSimple_1){
                  simplePolarMen = simplePolarMan.getFirstExists(false);
                  // alert(simplePolarMan.total);
                  if (simplePolarMen)
                  {
                    simplePolarMen.hp = 1;
                    simplePolarMen.status = 'alive';
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.range = 25;
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = gameTime().now + 7000;
                    simplePolarMen.reset(800, 250);
                    timeDealyPolarCreate = gameTime().now + 1500;
                  }
                }
          }
//====Сюжет уровень 2================================================
//=====Управление большим врагом=
         if(Level == 2 ){
              //простые полярники
              if(simplePolarMan.countLiving() < aliveSimple_2 && timeDealyPolarCreate < gameTime().now && simplePolarDead < countSimple_2){

                simplePolarMen = simplePolarMan.getFirstExists(false);
                if (simplePolarMen)
                {
                    simplePolarMen.hp = 1;
                    simplePolarMen.status = 'alive';
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.range = 25;
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = gameTime().now + 7000;
                    simplePolarMen.reset(800, 250);
                    timeDealyPolarCreate = gameTime().now + 1500;
                }
              }
              //умные полярники
              if(smartPolarMen.countLiving() < aliveSmart_2 && timeDealyPolarCreate < gameTime().now && smartPolarDead < countSmart_2){
                  smartPolarMan = smartPolarMen.getFirstExists(false);
                if (smartPolarMan)
                {
                    smartPolarMan.hp = 2;
                    smartPolarMan.status = 'alive';
                    smartPolarMan.name = 'smartPolarMan';
                    smartPolarMan.range = 200;
                    smartPolarMan.timeDelay = 1000;
                    smartPolarMan.timeWalk = gameTime().now + 9000;
                    smartPolarMan.reset(800, 150);
                    timeDealyPolarCreate = gameTime().now + 3500;
                }
              }
         }
//====Сюжет уровень 3================================================
          if(Level == 3){
            //большие полярники
            if(bigPolarMen.countLiving() < aliveBig_3 && bigPolarDead < countBig_3){
              bigPolarMan = bigPolarMen.getFirstExists(false);
              if (bigPolarMan)
              {
                bigPolarMan.hp = 6;
                bigPolarMan.name = 'bigPolarMan';
                bigPolarMan.status = 'alive';
                bigPolarMan.reset(400, 550);
              }

            }
              if(bigPolarMen.countLiving() >= 1){
                this.manipulateBigPolar();
              }
              //умные полярники
              if(smartPolarMen.countLiving() < aliveSmart_3 && timeDealyPolarCreate < gameTime().now && smartPolarDead + smartPolarMen.total  < countSmart_3){
                smartPolarMan = smartPolarMen.getFirstExists(false);
                if (smartPolarMan)
                {
                    smartPolarMan.hp = 2;
                    smartPolarMan.name = 'smartPolarMan';
                    smartPolarMan.status = 'alive';
                    smartPolarMan.range = 200;
                    smartPolarMan.timeDelay = 1000;
                    smartPolarMan.timeWalk = gameTime().now + 9000;
                    smartPolarMan.reset(800, 150);
                    timeDealyPolarCreate = gameTime().now + 1500;
                }
              }
              //простые полярники
              if(simplePolarMan.countLiving() < aliveSimple_3 && timeDealyPolarCreate < gameTime().now && simplePolarDead + simplePolarMan.total < countSimple_3){
                simplePolarMen = simplePolarMan.getFirstExists(false);
                if (simplePolarMen)
                {
                    simplePolarMen.hp = 2;
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.status = 'alive';
                    simplePolarMen.range = 25;
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = gameTime().now + 7000;
                    simplePolarMen.reset(800, 250);
                    timeDealyPolarCreate = gameTime().now + 1500;
                }
              }
          }
//======================================================================
              simplePolarMan.forEachAlive(this.manipulate, this);
              simplePolarMan.forEachAlive(this.fireBulletEnemy, this);

              smartPolarMen.forEachAlive(this.manipulate, this);
              smartPolarMen.forEachAlive(this.fireBulletSmartEnemy, this);

              simplePolarMan.forEachAlive(this.chekDead, this);
              smartPolarMen.forEachAlive(this.chekDead, this);

//==========================================================================
              // gamePhysics().arcade.collide(simplePolarMan, smartPolarMen);
              // gamePhysics().arcade.collide(simplePolarMan, simplePolarMan);
              gamePhysics().arcade.collide(playerBet, refuse);
              //gamePhysics().arcade.collide(playerBet, bigggg);
              //gamePhysics().arcade.collide(ball, computerBet);
//Реакция на пересечение пуль и игроков================================================
              gamePhysics().arcade.overlap(bullets, simplePolarMan, this.killComp, null, this);
              gamePhysics().arcade.overlap(bullets, smartPolarMen, this.killComp, null, this);
              gamePhysics().arcade.overlap(bullets, bigPolarMen, this.killComp, null, this);
              gamePhysics().arcade.overlap(enemyBullets, playerBet, this.killPLayer, null, this);
              gamePhysics().arcade.overlap(enemyBulletsBig, playerBet, this.killPLayer, null, this);

              gamePhysics().arcade.overlap(refuse, enemyBullets,  this.killBullets, null, this);
              gamePhysics().arcade.overlap(refuse, enemyBulletsBig,  this.killBulletsBig, null, this);
              gamePhysics().arcade.overlap(refuse, bullets,  this.killBullets, null, this);

              gamePhysics().arcade.overlap(gifts, playerBet,  this.killGifts, null, this);
              gamePhysics().arcade.overlap(bigPolarMen, playerBet,  this.killPLayer, null, this);
//======================================================================================
     },
}
///=======================Конец объекта Game==================================================
 function fireBulletEnemyBig () {

  if (gameTime().now > enemyBigBulletTime)
  {
      //  Grab the first bullet we can from the pool
      enemyBulletBig = enemyBulletsBig.getFirstExists(false);

      if (enemyBulletBig)
      {
          //  And fire it
          bigPolarMan.angle = 270;
          bigPolarMan.animations.play('throw');
          enemyBulletBig.scale.setTo(0.7, 0.7);
          enemyBulletBig.reset(bigPolarMan.x, bigPolarMan.y - 10);
          enemyBulletBig.body.velocity.y = -enemyBulletvelocity/7;
          enemyBulletBig.animations.play('goBall');
          enemyBigBulletTime = gameTime().now + 2*timeDilayEnemy;
      }
  }
}

window.changeLevel = function (mod) {
  wholeStars = 2*(+mod);
  switch (mod) {

    case 3:
      saveBox.mod = mod;
      //alert(saveBox.mod);
      //уровень 1
      countSimple_1 = 5;  //общее количество
      aliveSimple_1 = 2;  //одновременно живых

      changeLevel_1 = countSimple_1;
      //уровень 2
      countSimple_2 = 7;
      aliveSimple_2 = 2;

      countSmart_2 = 4;
      aliveSmart_2 = 2;

      changeLevel_2 = countSimple_2 + countSmart_2;
      //уровень 3
      countSimple_3 = 13;
      aliveSimple_3 = 3;

      countSmart_3 = 8;
      aliveSmart_3 = 3;

      countBig_3 = 2;
      aliveBig_3 = 1;

      changeLevel_3 = countSimple_3 + countSmart_3 + countBig_3;
      break;

    case 2:
      saveBox.mod = mod;
      //уровень 1
      countSimple_1 = 3;  //общее количество
      aliveSimple_1 = 1;  //одновременно живых

      changeLevel_1 = countSimple_1;
      //уровень 2
      countSimple_2 = 4;
      aliveSimple_2 = 1;

      countSmart_2 = 2;
      aliveSmart_2 = 1;

      changeLevel_2 = countSimple_2 + countSmart_2;
      //уровень 3
      countSimple_3 = 7;
      aliveSimple_3 = 3;

      countSmart_3 = 5;
      aliveSmart_3 = 2;

      countBig_3 = 1;
      aliveBig_3 = 1;

      changeLevel_3 = countSimple_3 + countSmart_3 + countBig_3;
      break;
    case 1:
      saveBox.mod = mod;
    //уровень 1
    countSimple_1 = 1;  //общее количество
    aliveSimple_1 = 1;  //одновременно живых

    changeLevel_1 = countSimple_1;
    //уровень 2
    countSimple_2 = 1;
    aliveSimple_2 = 1;

    countSmart_2 = 1;
    aliveSmart_2 = 1;

    changeLevel_2 = countSimple_2 + countSmart_2;
    //уровень 3
    countSimple_3 = 2;
    aliveSimple_3 = 1;

    countSmart_3 = 2;
    aliveSmart_3 = 1;

    countBig_3 = 0;
    aliveBig_3 = 0;

    changeLevel_3 = countSimple_3 + countSmart_3 + countBig_3;
    break;
  }
}

doReplayGame = function (){
  saveBox.currentGame = 'SnowBallGame';
  saveStat(1);
  //========Сброс настроек====
  wholeStars = 2*(+saveBox.mod);
  counterStarterTime = 0;
  scoreStars = 0;
  simplePolarDead = 0;
  smartPolarDead = 0;
  bigPolarDead = 0;
  nextLevelScore = 5;
  health = 3;
  shotAim = 0;
  Level = 1;
  score = 0;
  timeDilayEnemy = 2000;
  enemyBulletvelocity = 400;
  refuseLive = 10;
  // mainTrack.pause();
  //==============================
  changeState('SnowBallGame');
}

doExitGame = function (){
  saveBox.currentGame = 'SnowBallGame';
  saveStat(1);
  //========Сброс настроек====
  wholeStars = 2*(+saveBox.mod);
  counterStarterTime = 0;
  scoreStars = 0;
  simplePolarDead = 0;
  smartPolarDead = 0;
  bigPolarDead = 0;
  nextLevelScore = 5;
  health = 3;
  shotAim = 0;
  Level = 1;
  score = 0;
  timeDilayEnemy = 2000;
  enemyBulletvelocity = 400;
  refuseLive = 10;
  // mainTrack.pause();
  snowBallMainTrack = false
  gameSound().stopAll();
  //==============================
  changeState('menu_cards');
}


var showInfoGame = function (){
  if (infoRuls.alpha == 0){
    infoRuls.reset(b_info.centerX, b_info.centerY);
    infoRuls.scale.set(0);
    gameAdd().tween(infoRuls.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Elastic.Out, true);
    gameAdd().tween(infoRuls).to( { x: gameWorld().centerX, y: gameWorld().centerY }, 100,  Phaser.Easing.Linear.None, true);
    var anim_1 = gameAdd().tween(infoRuls).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true);

    var animExit = function () {
      gameAdd().tween(infoRuls.scale).to( {  x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true);
      gameAdd().tween(infoRuls).to( { x: b_info.centerX, y: b_info.centerY}, 100,  Phaser.Easing.Linear.None, true);
      var anim = gameAdd().tween(infoRuls).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    }
    anim_1.onComplete.addOnce(function (){
      gamePaused();
      closeButton.reset(infoRuls.centerX, infoRuls.bottom - 75);
      closeButton.anchor.setTo(0.5, 0.5);
      closeButton.animation = animExit;
    })
  }


}

function closeWindow (b){
  b.animation();
  gamePaused();
  b.kill();
}

})();
