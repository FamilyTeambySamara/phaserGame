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
var snowdrift;
//var refuseLive = 10;
//======================
//Музыка и звкуи
var throw_player;
var throw_enemy;

//====================
///Таблица данных об игре
var scoreTable;
var levelTable;
var healthTable;

//Статистика смертей===========
var bigPolarDead = 0;
var simplePolarDead = 0;
var smartPolarDead = 0;
//===========================
//=============================
//Анимационные эффекты===================
var explosions;
var explosion;

//============================Переменные значения(настройки игры)==================
var computerBetSpeed = 150; //Скорость передвижения компьютера
var score = 0; //Количество попаданий
var nextLevelScore = 3; //Критерий перехода на следующий уровень
var Level = 1; //Текущий уровень
var health = 8; //Жизни игрока
//==================================================================
//===========Управление============================================
// var plyaerMouse;
var cursors;
var fireButton;
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

var timeDilayEnemy = 2000;//перезардка выстрела  Enemys
var timeDilayPlayer = 600;//перезардка выстрела  PLayer
//=================Результат матча========================================
var saveBox = {};
/////////================================================\\\\\\\\\\\\\\\\\\\\
window.SnowBallGame =
{
    preload: function () {
        game.load.spritesheet('simplePolarMan', 'assets/img/Morty.png', 96, 76);
        game.load.spritesheet('bigPolarMan', 'assets/img/Poo.png', 143.75, 115);
        game.load.spritesheet('throwSimpleMan', 'assets/img/throwSimpleMan.jpg', 60, 79);
        game.load.spritesheet('bet', 'assets/img/Poo.png', 100, 80);
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('mainLayer', 'assets/img/SnowBall_mainLayer.png');
        game.load.image('bigSnow', 'assets/img/bigSnow.png');
        game.load.image('refuse', 'assets/img/refuse.png')
        game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);
        game.load.spritesheet('bigSnowBaall', 'assets/img/bigSnowBaall.png', 110, 110);
    },

    create: function () {
    //базовый режим и фон
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.image(0, 0, 'mainLayer');
    //====================MAINPLAYEEEEEEER===
    playerBet = game.add.sprite(game.world.centerX, 20, 'bigPolarMan');
    playerBet.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(playerBet);
    playerBet.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
    //====================Добавлем музыку и звуки====================
    //звуки бросков
    throw_plyer = game.add.audio('throw');
    throw_plyer.volume = 1;
    throw_enemy = game.add.audio('throw');
    throw_enemy.volume = 0.85;
    //=======================================
    mainTrack = game.add.audio('snowBallGame_mainTrack');
    mainTrack.volume = 0.2;
    mainTrack.play();
//=============Снег на фоне игры===================================
      // back_emitter = this.add.emitter(game.world.centerX, -32, 600);
      // back_emitter.makeParticles('snow_small', [0, 1, 2, 3, 4, 5]);
      // back_emitter.maxParticleScale = 0.2;
      // back_emitter.minParticleScale = 0.1;
      // back_emitter.setYSpeed(20, 100);
      // back_emitter.gravity = 0;
      // back_emitter.width = game.world.width * 1.5;
      // back_emitter.minRotation = 0;
      // back_emitter.maxRotation = 40;
      // back_emitter.start(false, 14000, 20);
//=======Пули игрока============================
      bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.createMultiple(30, 'ball');
      bullets.setAll('anchor.x', 0.5);
      bullets.setAll('anchor.y', 1);
      bullets.setAll('outOfBoundsKill', true);
      bullets.setAll('checkWorldBounds', true);
//============Пули противника обыкновенные=======================
      enemyBullets = game.add.group();
      enemyBullets.enableBody = true;
      enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBullets.createMultiple(30, 'ball');
      enemyBullets.setAll('anchor.x', 0.5);
      enemyBullets.setAll('anchor.y', 1);
      enemyBullets.setAll('outOfBoundsKill', true);
      enemyBullets.setAll('checkWorldBounds', true);
//===================BIG bullets========================
      enemyBulletsBig = game.add.group();
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
      simplePolarMan = game.add.group();
      simplePolarMan.enableBody = true;
      simplePolarMan.physicsBodyType = Phaser.Physics.ARCADE;
      simplePolarMan.createMultiple(30, 'simplePolarMan');
      simplePolarMan.setAll('anchor.x', 0.5);
      simplePolarMan.setAll('anchor.y', 0.5);
      simplePolarMan.forEach(
        function (invader){
          invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
          //invader.animations.add('right', [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
        }, this);
//================BigPolarMen=============================
        bigPolarMen = game.add.group();
        bigPolarMen.enableBody = true;
        bigPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        bigPolarMen.createMultiple(30, 'bigPolarMan');
        bigPolarMen.setAll('anchor.x', 0.5);
        bigPolarMen.setAll('anchor.y', 0.5);
        bigPolarMen.forEach(
          function (invader){
            invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
            //invader.animations.add('right', [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
          }, this);
//===============SmartPolarMen==============================
        smartPolarMen = game.add.group();
        smartPolarMen.enableBody = true;
        smartPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        smartPolarMen.createMultiple(30, 'simplePolarMan');
        smartPolarMen.setAll('anchor.x', 0.5);
        smartPolarMen.setAll('anchor.y', 0.5);
        smartPolarMen.forEach(
          function (invader){
            invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
          }, this);
//================Анимационные группы==================
//=============Группа взрывов==========================
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
//===========Статичные объект====================
      //хижина
      refuse = game.add.group()
      //refuse.physicsBodyType = Phaser.Physics.ARCADE;
      refuse.enableBody = true;
      refuse.createMultiple(30, 'refuse');
      refuse.setAll('anchor.x', 0.5);
      refuse.setAll('anchor.y', 0.5);
      // refuse.scale.setTo(0.5, 0.5);
     refuse.forEach(setParams, this);
      // for (var i = 0; i < 15, i++){
      //
      // }
      //Сугробы
      // snowdrift = game.add.group();
      // bigggg.scale.setTo(0.5, 0.5);
      // game.physics.arcade.enable(bigggg);
      // // bigggg.enableBody = true;
      // bigggg.physicsBodyType = Phaser.Physics.ARCADE;
      // bigggg.body.immovable = true;
      function setParams(obj){
        obj.scale.x = 1;
        obj.scale.y = 1;
        obj.hp = 10;
        //obj.enableBody = true;
        obj.body.immovable = true;
      }
      //game.physics.arcade.collide(player, platforms);
      var ref = refuse.getFirstExists(false);
      ref.reset(250, 150);
      // var ref_1 = refuse.getFirstExists(false);
      // ref_1.reset(450, 250);
      //ref_1.enableBody = true;
      //ref_1.body.immovable = true;
        // refuse.create(350, 400, 'refuse');

      //  = game.add.sprite(400, 90, 'refuse');
      // refuse.scale.setTo(0.7,0.7);
      // refuse.anchor.x = 0.5;
      // refuse.anchor.y = 0.5;
      // game.physics.arcade.enable(refuse);
//==========================================================
      scoreTable =  game.add.text(16, 60, 'score: ' + score, { fontSize: '32px', fill: 'red' });
      levelTable = game.add.text(16, 16, 'Level: ' + Level, { fontSize: '32px', fill: 'white' });
      healthTable = game.add.text(16, 95, 'Health: ' +  health, { fontSize: '32px', fill: 'blue' });
//=========Управление игроком========================================
       fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
       cursors = game.input.keyboard.createCursorKeys();
       // plyaerMouse = game.input.x;
       //game.input.onDown.add(this.releaseBall, this);
//===================================================================
    },
    //Стрельба PLayer
     fireBullet: function () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
      bullet = bullets.getFirstExists(false);

      if (cursors.down.isDown && bullet){
        //  And fire it
        throw_plyer.play();
        bullet.reset(playerBet.x, playerBet.y + 5);
        bullet.body.velocity.y = playerBulletVelocity;
        bulletTime = game.time.now + timeDilayPlayer;
      } else if (bullet) {
        //  And fire it
        throw_plyer.play();
        bullet.reset(playerBet.x + 4, playerBet.y);
        bullet.body.velocity.x = playerBulletVelocity;
        bulletTime = game.time.now + timeDilayPlayer;
      }

    }

},
      fireBulletSmartEnemy: function (enemy) {

        if (game.time.now > enemy.timeDelay)
        {
            //  Grab the first bullet we can from the pool
            enemyBullet = enemyBullets.getFirstExists(false);

            if (enemyBullet)
            {
                //  And fire it
                throw_enemy.play();
                //simplePolarMan.animations.play('throwSimpleMan');
                // simplePolarMen.animations.add('throwSimpleMan');
                // simplePolarMen.animations.play('throwSimpleMan', 30, true, true);
                enemyBullet.reset(enemy.x - 10, enemy.y);
                //enemyBullet.body.velocity.x = -enemyBulletvelocity;
                game.physics.arcade.moveToObject(enemyBullet, playerBet,120);
                enemy.timeDelay = game.time.now + timeDilayEnemy;
            }
        }
      },
    //Стрельба Enemy
    fireBulletEnemy: function (enemy) {

      if (game.time.now > enemy.timeDelay)
      {
          //  Grab the first bullet we can from the pool
          enemyBullet = enemyBullets.getFirstExists(false);

          if (enemyBullet)
          {
              //  And fire it
              throw_enemy.play();
              //simplePolarMan.animations.play('throwSimpleMan');
              // simplePolarMen.animations.add('throwSimpleMan');
              // simplePolarMen.animations.play('throwSimpleMan', 30, true, true);
              enemyBullet.reset(enemy.x - 10, enemy.y);
              enemyBullet.body.velocity.x = -enemyBulletvelocity;
              enemy.timeDelay = game.time.now + timeDilayEnemy;
          }
      }
    },

     killComp: function (bullet, polar){

            //добавляем счет
            // alert(bullet.hp);
            score = score + 1;
            scoreTable.text = 'Score: ' + score;
            //убиваем и взрываем пулю
            bullet.kill();
            var explosion = explosions.getFirstExists(false);
            explosion.reset(polar.x, polar.y);
            explosion.scale.setTo(1,1);
            explosion.play('kaboom', 30, false, true);
            //проверяем жизни врага и убиваем если 0
            polar.hp -= 1;
            if(polar.hp < 1){
              if(polar.name == 'simplePolarMan'){
                simplePolarDead += 1;
              } else if (polar.name == 'smartPolarMan'){
                smartPolarDead += 1;
              } else {
                bigPolarDead += 1;
              }
              polar.kill();
            //  alert(simplePolarMan.countDead());
            }

            // if (score > nextLevelScore){
            //     nextLevelScore += 5;
            //     enemyBulletvelocity += 70;
            //     timeDilayEnemy -= 50;
            //     ++Level;
            //     levelTable.text = "Level" + Level;
            //     //game.state.start('nextLevel', false);
            // }

            switch (score) {
              case 3:
                  nextLevelScore += 5;
                  enemyBulletvelocity += 70;
                  timeDilayEnemy -= 50;
                  ++Level;
                  levelTable.text = "Level" + Level;
                  break;
              case 8:
                  nextLevelScore += 5;
                  enemyBulletvelocity += 70;
                  timeDilayEnemy -= 50;
                  ++Level;
                  levelTable.text = "Level" + Level;
                  break;
              case 15:
                  saveBox = {score: score};
                  //========Сброс настроек====
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
                  mainTrack.pause();
                  //==============================
                  game.state.start('Win_SnowBallGame');
                  break;
            }
     },

     getInfo: function (){
        return saveBox.score;
     },

     killBullets: function (refuse, bullet){
        var explode = explosions.getFirstExists(false);
        explode.reset(bullet.x, bullet.y);
        explode.scale.setTo(0.5, 0.5);

        explode.play('kaboom', 30, false, true);
        refuse.hp -= 1;

        if (refuse.hp < 1){
            refuse.kill();
        }
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
        bullet.kill();
        health = health - 1;
        if (health < 1)
        {
            saveBox = {score: score};
            //========Сброс настроек====
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
            mainTrack.pause();
            //==============================
            this.state.start('Game_over');
        }
        healthTable.text = 'HitPoint: ' + health;
     },

      manipulate: function (polar) {
            //alert(game.time.now);
                    if (polar.timeWalk > game.time.now){

                      // if(simplePolarMan.countLiving() > 0){

                        if(polar.y - playerBet.y < -15) {
                            polar.angle = 90;
                            polar.animations.play('go');
                            polar.body.velocity.y = computerBetSpeed;
                        }
                        else if(polar.y - playerBet.y > 15) {
                          polar.angle = 270;
                           polar.body.velocity.y = -computerBetSpeed;
                           polar.animations.play('go');
                        }
                        else {
                            polar.angle = 180;
                            polar.animations.stop();
                            polar.body.velocity.y = 0;
                        }
                      // }
                    } else if ((game.time.now - polar.timeWalk) > (Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000)){
                        //alert(game.time.now);
                          polar.timeWalk += 9000;
                        //  alert( polar.timeWalk);
                    }   else {
                      //alert((Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000));
                      polar.angle = 180;
                      polar.animations.stop();
                      polar.body.velocity.y = 0;
                    }
      },
      manipulateBigPolar: function () {
                      //приходим наверх
                              if(bigPolarMan){
                                if (bigPolarMan.y > 480){
                                      bigPolarMan.angle = 270;
                                      bigPolarMan.body.velocity.y = -50;
                                }else if (bigPolarMan.y <= 480){
                                    bigPolarMan.body.velocity.y = 0;
                                }
                      //====================Управление======================
                                if ((bigPolarMan.x - playerBet.x) < -35 ){
                                      bigPolarMan.angle = 0;
                                      bigPolarMan.animations.play('go');
                                      bigPolarMan.body.velocity.x = computerBetSpeed/4;
                                } else if ((bigPolarMan.x - playerBet.x) > 35){
                                        bigPolarMan.angle = 180;
                                        bigPolarMan.animations.play('go');
                                        bigPolarMan.body.velocity.x = -computerBetSpeed/4;
                                } else {
                                        bigPolarMan.angle = 270;
                                        bigPolarMan.body.velocity.x = 0;
                                        bigPolarMan.animations.stop();
                                }

                                if (Math.abs(bigPolarMan.x - playerBet.x) < 400){
                                      fireBulletEnemyBig();
                                }
                              }
      },

     update: function () {
       //Если нажат пробел запускаем стрельбу PLayer
        if (fireButton.isDown)
        {
            this.fireBullet();
        }

         if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown){
              playerBet.angle = 0;
              playerBet.animations.play('right');
              playerBet.body.velocity.x = 250;
              //playerBet.angle = 90;
              //  playerBet.animations.play('left'); ждем спрайтов
         } else if (cursors.left.isDown && !(cursors.up.isDown) && !(cursors.down.isDown)){
              playerBet.animations.play('right');
              playerBet.angle = 180;
              playerBet.body.velocity.x = -250;
              //  playerBet.animations.play('left'); ждем спрайтов
         } else if (cursors.up.isDown){
              playerBet.animations.play('right');
              playerBet.angle = 270;
              playerBet.body.velocity.y = -250;
             //playerBet.animations.stop();
             // player.frame = 4;
         } else if (cursors.down.isDown){
               playerBet.animations.play('right');
               playerBet.angle = 90;
              playerBet.body.velocity.y = 250;
         } else {
              playerBet.animations.stop('right');
              playerBet.body.velocity.y = 0;
              playerBet.body.velocity.x = 0;
         }
//=========================================================================
//Ограничения для игрока по высоте и ширине карты
         var playerBetHalfWidth = playerBet.width / 2;
         var playerBetHalfHeight = playerBet.height / 2;


         if (playerBet.x < playerBetHalfWidth) {
            playerBet.x = playerBetHalfWidth;
         }
         else if (playerBet.x > game.width - playerBetHalfWidth) {
            playerBet.x = game.width - playerBetHalfWidth;
         }

         if (playerBet.y < playerBetHalfHeight) {
            playerBet.y = playerBetHalfHeight;
         }
         else if (playerBet.y > game.height - playerBetHalfHeight) {
            playerBet.y = game.height - playerBetHalfHeight;
         }
         //Управляем ракеткой компьютерного соперника
         // if(computerBet.x - playerBet.x < -15) {
         //    computerBet.body.velocity.x = computerBetSpeed;
         // }
         // else if(computerBet.x - playerBet.x > 15) {
         //    computerBet.body.velocity.x = -computerBetSpeed;
         // }
         // else {
         //    computerBet.body.velocity.x = 0;
         // }
//Изменение уровней====================================================
//====Сюжет уровень 2================================================
          if(Level == 1){
                if(simplePolarMan.countLiving() < 1){
                  simplePolarMen = simplePolarMan.getFirstExists(false);
                  if (simplePolarMen)
                  {
                    simplePolarMen.hp = 1;
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = game.time.now + 7000;
                    simplePolarMen.reset(700, 250);
                  }
                }
          }
//====Сюжет уровень 2================================================
//=====Управление большим врагом=
         if(Level == 2 ){
              //простые полярники
              if(simplePolarMan.countLiving() < 1 && timeDealyPolarCreate < game.time.now && simplePolarDead < 4){

                simplePolarMen = simplePolarMan.getFirstExists(false);
                if (simplePolarMen)
                {
                    simplePolarMen.hp = 1;
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = game.time.now + 7000;
                    simplePolarMen.reset(700, 250);
                    timeDealyPolarCreate = game.time.now + 1500;
                }
              }
              //умные полярники
              if(smartPolarMen.countLiving() < 1 && timeDealyPolarCreate < game.time.now && smartPolarDead < 2){
                  smartPolarMan = smartPolarMen.getFirstExists(false);
                if (smartPolarMan)
                {
                    smartPolarMan.hp = 2;
                    smartPolarMan.name = 'smartPolarMan';
                    smartPolarMan.timeDelay = 1000;
                    smartPolarMan.timeWalk = game.time.now + 9000;
                    smartPolarMan.reset(700, 150);
                    timeDealyPolarCreate = game.time.now + 3500;
                }
              }
         }
//====Сюжет уровень 3================================================
          if(Level == 3){
            //большие полярники
            if(bigPolarMen.countLiving() < 1 && bigPolarDead < 1){
              bigPolarMan = bigPolarMen.getFirstExists(false);
              if (bigPolarMan)
              {
                bigPolarMan.hp = 4;
                bigPolarMan.name = 'bigPolarMan';
                bigPolarMan.reset(400, 550);
              }

            }
              if(bigPolarMen.countLiving() >= 1){
                this.manipulateBigPolar();
              }

              //умные полярники
              if(smartPolarMen.countLiving() < 1 && timeDealyPolarCreate < game.time.now && smartPolarDead < 3){
                smartPolarMan = smartPolarMen.getFirstExists(false);
                if (smartPolarMan)
                {
                    smartPolarMan.hp = 2;
                    smartPolarMan.name = 'smartPolarMan';
                    smartPolarMan.timeDelay = 1000;
                    smartPolarMan.timeWalk = game.time.now + 9000;
                    smartPolarMan.reset(700, 150);
                    timeDealyPolarCreate = game.time.now + 1500;
                }
              }

              //простые полярники
              if(simplePolarMan.countLiving() < 1 && timeDealyPolarCreate < game.time.now && simplePolarDead < 5){
                simplePolarMen = simplePolarMan.getFirstExists(false);
                if (simplePolarMen)
                {
                    simplePolarMen.hp = 1;
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = game.time.now + 7000;
                    simplePolarMen.reset(700, 250);
                    timeDealyPolarCreate = game.time.now + 1500;
                }
              }
          }

//======================================================================
           simplePolarMan.forEachAlive(this.manipulate, this);
           simplePolarMan.forEachAlive(this.fireBulletEnemy, this);

          smartPolarMen.forEachAlive(this.manipulate, this);
          smartPolarMen.forEachAlive(this.fireBulletSmartEnemy, this);
//==========================================================================
              game.physics.arcade.collide(playerBet, refuse);
              //game.physics.arcade.collide(playerBet, bigggg);
         //game.physics.arcade.collide(ball, computerBet);
//Реакция на пересечение пуль и игроков================================================
              game.physics.arcade.overlap(bullets, simplePolarMan, this.killComp, null, this);
              game.physics.arcade.overlap(bullets, smartPolarMen, this.killComp, null, this);
              game.physics.arcade.overlap(bullets, bigPolarMen, this.killComp, null, this);
              game.physics.arcade.overlap(enemyBullets, playerBet, this.killPLayer, null, this);
              game.physics.arcade.overlap(enemyBulletsBig, playerBet, this.killPLayer, null, this);

              game.physics.arcade.overlap(refuse, enemyBullets,  this.killBullets, null, this);
              game.physics.arcade.overlap(refuse, enemyBulletsBig,  this.killBulletsBig, null, this);
              game.physics.arcade.overlap(refuse, bullets,  this.killBullets, null, this);
//======================================================================================
         // game.physics.arcade.collide(ball, playerBet, this.boomBol(playerBet), null, this);
         // game.physics.arcade.collide(ball, computerBet, this.boomBol(computerBet), null, this);
        // this.goSnowBall();
         //this.checkBall();
     },


}
///===Конец объекта Game=====================================================================================

 function fireBulletEnemyBig () {

  if (game.time.now > enemyBigBulletTime)
  {
      //  Grab the first bullet we can from the pool
      enemyBulletBig = enemyBulletsBig.getFirstExists(false);


      if (enemyBulletBig)
      {
          //  And fire it
          //enemyBulletBig.scale.setTo(4,4);
          enemyBulletBig.reset(bigPolarMan.x, bigPolarMan.y - 10);
          enemyBulletBig.body.velocity.y = -enemyBulletvelocity/7;
          enemyBulletBig.animations.play('goBall');
          enemyBigBulletTime = game.time.now + 5*timeDilayEnemy;
      }
  }
}


window.Win_SnowBallGame =
{
    create: function ()
    {
      this.add.tileSprite(0, 0, 640, 450, 'Game_over');
      this.add.text(250, 40, 'You are Win!!!', { fontSize: '32px', fill: 'red' });
      this.add.text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
      //this.add.button( 250, 250, 'button', this.startPlay, this, 2, 1, 0);
      this.add.button( 250, 150, 'button', this.goToMenu, this, 2, 1, 0);
    },

    startPlay: function () {
          Level = 1;
          score = 0;
          this.state.start('SnowBallGame');
    },

    goToMenu: function ()
    {
          game.state.start('Menu');
    }
}

})();
