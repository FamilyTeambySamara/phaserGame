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
//=============================
//Анимационные эффекты===================
var explosions;
var explosion;

//====================================

//============================Переменные значения(настройки игры)==================
var computerBetSpeed = 150; //Скорость передвижения компьютера
var score = 0; //Количество попаданий
var nextLevelScore = 5; //Критерий перехода на следующий уровень
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
        game.load.spritesheet('simplePolarMan', 'assets/img/simplePolarMan.jpg', 60, 79);
        game.load.spritesheet('throwSimpleMan', 'assets/img/throwSimpleMan.jpg', 60, 79);
        game.load.image('bet', 'assets/img/bet_3.png');
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('background', 'assets/img/menu.jpg');
        game.load.image('refuse', 'assets/img/refuse.png')
        game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);
        //game.load.image('button_over', 'assets/img/button.jpg');
    },

    create: function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  game.add.tileSprite(0, 0, 800, 600, 'background');
    //====================Добавлем музыку и звуки
    //звуки бросков
    throw_plyer = game.add.audio('throw');
    throw_plyer.volume = 1;
    throw_enemy = game.add.audio('throw');
    throw_enemy.volume = 0.85;
    //=======================================
    mainTrack = game.add.audio('snowBallGame_mainTrack');
    mainTrack.volume = 0.2;
    mainTrack.play();
    //=============================================

//=============Снег на фоне игры===================================
      back_emitter = this.add.emitter(game.world.centerX, -32, 600);
      back_emitter.makeParticles('snow_small', [0, 1, 2, 3, 4, 5]);
      back_emitter.maxParticleScale = 0.2;
      back_emitter.minParticleScale = 0.1;
      back_emitter.setYSpeed(20, 100);
      back_emitter.gravity = 0;
      back_emitter.width = game.world.width * 1.5;
      back_emitter.minRotation = 0;
      back_emitter.maxRotation = 40;
      back_emitter.start(false, 14000, 20);
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


//=====================Простые полярники===============
      simplePolarMan = game.add.group();
      simplePolarMan.enableBody = true;
      simplePolarMan.physicsBodyType = Phaser.Physics.ARCADE;
      simplePolarMan.createMultiple(30, 'simplePolarMan');
      simplePolarMan.setAll('anchor.x', 0.5);
      simplePolarMan.setAll('anchor.y', 0.5);
    //  simplePolarMan.setAll('')
      simplePolarMan.forEach(setupAnim, this);

      function setupAnim (invader){
        invader.hp = 3;
        invader.animations.add('left',  [0, 1, 2], 10, true);
        invader.animations.add('right', [3, 4, 5], 10, true);
        // invader.animations.add('throwSimple','throwSimpleMan', [0, 1, 2], 10, false);
      }

//================BigPolarMen====================
        bigPolarMen = game.add.group();
        bigPolarMen.enableBody = true;
        bigPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        bigPolarMen.createMultiple(30, 'simplePolarMan');
        bigPolarMen.setAll('anchor.x', 0.5);
        bigPolarMen.setAll('anchor.y', 0.5);

//===============SmartPolarMen=========================
        smartPolarMen = game.add.group();
        smartPolarMen.enableBody = true;
        smartPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        smartPolarMen.createMultiple(30, 'simplePolarMan');
        smartPolarMen.setAll('anchor.x', 0.5);
        smartPolarMen.setAll('anchor.y', 0.5);
//====================================================
        //  simplePolarMan.setAll('')
        //bigPolarMen.forEach(setupAnim, this);

        // function setupAnim (invader){
        //   invader.hp = 3;
        //   invader.animations.add('left',  [0, 1, 2], 10, true);
        //   invader.animations.add('right', [3, 4, 5], 10, true);
        //   // invader.animations.add('throwSimple','throwSimpleMan', [0, 1, 2], 10, false);
        // }
      // bigPolarMen = this.createBet(game.world.centerX, 600);
      // bigPolarMen.scale.setTo(1.5, 1.5);
      // bigPolarMen.hp = 3;

//================Аниационные группы==================
//Группа взрывов==========================
      explosions = game.add.group();
      explosions.createMultiple(30, 'kaboom');
      // explosions.setAll('anchor.x', 0.5);
      // explosions.setAll('anchor.y', 0.5);
      // explosions.animations.add('kaboom');

      explosions.forEach(setupInvader, this);

      function setupInvader (invader){
        invader.anchor.x =  0.5;
        invader.anchor.y =  0.5;
        invader.animations.add('kaboom');
      }
//=============================================
//========BIG bullets========================
      enemyBulletsBig = game.add.group();
      enemyBulletsBig.enableBody = true;
      enemyBulletsBig.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBulletsBig.createMultiple(30, 'ball');
      enemyBulletsBig.setAll('anchor.x', 0.5);
      enemyBulletsBig.setAll('anchor.y', 1);
      enemyBulletsBig.setAll('outOfBoundsKill', true);
      enemyBulletsBig.setAll('checkWorldBounds', true);
//====================Создаем спрайты игроков===

      // computerBet = this.createBet(game.world.centerX, 450);
      playerBet = this.createBet(game.world.centerX, 20);

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
      function setParams(obj){
        obj.scale.x = 0.5;
        obj.scale.y = 0.5;
        obj.hp = 10;
        //obj.enableBody = true;
        obj.body.immovable = true;
      }
      //game.physics.arcade.collide(player, platforms);
      var ref = refuse.getFirstExists(false);
      ref.reset(250, 150);
      var ref_1 = refuse.getFirstExists(false);
      ref_1.reset(450, 250);
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
    //Создание спрайтов
    createBet: function (x, y) {
        var bet = game.add.sprite(x, y, 'bet');
        bet.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(bet);
      //  bet.body.collideWorldBounds = true;
      //  bet.body.bounce.setTo(1, 1);
      //  bet.body.immovable = true;
        return bet;
    },
    //Стрельба PLayer
     fireBullet: function () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
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
                enemyBullet.reset(smartPolarMen.x - 10, smartPolarMen.y);
                enemyBullet.body.velocity.x = -enemyBulletvelocity;
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

     killComp: function (bullet, simplePolarMan){

            //добавляем счет
            // alert(bullet.hp);
            score = score + 1;
            scoreTable.text = 'Score: ' + score;
            //убиваем и взрываем пулю
            bullet.kill();
            var explosion = explosions.getFirstExists(false);
            explosion.reset(simplePolarMan.x, simplePolarMan.y);
            explosion.scale.setTo(1,1);
            explosion.play('kaboom', 30, false, true);
            //проверяем жизни врага и убиваем если 0
            simplePolarMan.hp -= 1;
            if(simplePolarMan.hp < 1){
              simplePolarMan.kill();
            }

            if (score > nextLevelScore){
                nextLevelScore += 5;
                enemyBulletvelocity += 70;
                timeDilayEnemy -= 50;
                ++Level;
                levelTable.text = "Level" + Level;
                //game.state.start('nextLevel', false);
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
            nextLevelScore = 5;
            health = 3;
            shotAim = 0;
            Level = 1;
            score = 0;
            timeDilayEnemy = 1000;
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

                      if(simplePolarMan.countLiving() > 0){

                        if(polar.y - playerBet.y < -15) {
                            polar.animations.play('right');
                            polar.body.velocity.y = computerBetSpeed;
                        }
                        else if(polar.y - playerBet.y > 15) {
                           polar.body.velocity.y = -computerBetSpeed;
                           polar.animations.play('left');
                        }
                        else {
                            polar.animations.stop();
                            polar.body.velocity.y = 0;
                        }
                      }
                    } else if ((game.time.now - polar.timeWalk) > (Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000)){
                        //alert(game.time.now);
                          polar.timeWalk += 9000;
                        //  alert( polar.timeWalk);
                    }   else {
                      //alert((Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000));
                      polar.animations.stop();
                      polar.body.velocity.y = 0;
                    }
      },

     update: function () {
       //Если нажат пробел запускаем стрельбу PLayer
        if (fireButton.isDown)
        {
            this.fireBullet();
        }
        //Если комп рядом с Player - запускаем стрельбу
        // if (simplePolarMen ){
        //   if ( Math.abs(playerBet.y - simplePolarMen.y) < 35){
        //
        //       this.fireBulletEnemy();
        //   }
        // }

         //Управляем игроком==============================================
         // playerBet.x = game.input.x; Для мобильной версии
         //управление с клавишей

         if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown){
              playerBet.body.velocity.x = 250;
              //  playerBet.animations.play('left'); ждем спрайтов
         } else if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown){
              playerBet.body.velocity.x = -250;
              //  playerBet.animations.play('left'); ждем спрайтов
         } else if (cursors.up.isDown){
              playerBet.body.velocity.y = -250;
             //playerBet.animations.stop();
             // player.frame = 4;
         } else if (cursors.down.isDown){
              playerBet.body.velocity.y = 250;
         } else {
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
//Изменение уровнями====================================================
//Группа простых полярников
          if(Level == 1){

                if(simplePolarMan.countLiving() < 1){
                  simplePolarMen = simplePolarMan.getFirstExists(false);
                  if (simplePolarMen)
                  {
                    simplePolarMen.hp = 1;
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = game.time.now + 7000;

                    simplePolarMen.reset(700, 250);
                  }
                }
          }
//==================Управление большим врагом=============================
         if(Level >= 2 ){

           if(bigPolarMen.countLiving() < 1){
             bigPolarMan = bigPolarMen.getFirstExists(false);
             if (bigPolarMan)
             {
               bigPolarMan.hp = 3;
               bigPolarMan.reset(400, 550);
             }
           }
            //приходим наверх
            if(bigPolarMan){
              if (bigPolarMan.y > 480){
                    bigPolarMan.body.velocity.y = -50;
              }else if (bigPolarMan.y <= 480){
                  bigPolarMan.body.velocity.y = 0;
              }
//==============================================================
              if ((bigPolarMan.x - playerBet.x) < -35 ){
                    bigPolarMan.body.velocity.x = computerBetSpeed/4;
              } else if ((bigPolarMan.x - playerBet.x) > 35){
                      bigPolarMan.body.velocity.x = -computerBetSpeed/4;
              } else {
                      bigPolarMan.body.velocity.x = 0;
              }

              if (Math.abs(bigPolarMan.x - playerBet.x) < 400 ){
                    fireBulletEnemyBig();
              }
            }
              //======================================================
              //простые полярники
              if(simplePolarMan.countLiving() < 2 && timeDealyPolarCreate < game.time.now){
                simplePolarMen = simplePolarMan.getFirstExists(false);
                if (simplePolarMen)
                {
                    simplePolarMen.hp = 2;
                    simplePolarMen.timeDelay = 1000;

                    simplePolarMen.timeWalk = game.time.now + 7000;

                    simplePolarMen.reset(700, 250);
                    timeDealyPolarCreate = game.time.now + 1500;

                }
              }
              // if(simplePolarMan.countLiving() > 0){
              //
              //   if(simplePolarMen.x - playerBet.x < -15) {
              //       simplePolarMen.animations.play('right');
              //       simplePolarMen.body.velocity.x = computerBetSpeed;
              //   }
              //   else if(simplePolarMen.x - playerBet.x > 15) {
              //      simplePolarMen.body.velocity.x = -computerBetSpeed;
              //      simplePolarMen.animations.play('left');
              //   }
              //   else {
              //       simplePolarMen.animations.stop();
              //       simplePolarMen.body.velocity.x = 0;
              //   }
              // }
         }

         simplePolarMan.forEachAlive(this.manipulate, this);
         simplePolarMan.forEachAlive(this.fireBulletEnemy, this);
//==========================================================================
              game.physics.arcade.collide(playerBet, refuse);
         //game.physics.arcade.collide(ball, computerBet);
//Реакция на пересечение пуль и игроков================================================
              game.physics.arcade.overlap(bullets, simplePolarMan, this.killComp, null, this);
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
          enemyBulletBig.scale.setTo(4,4);
          enemyBulletBig.reset(bigPolarMan.x, bigPolarMan.y - 10);
          enemyBulletBig.body.velocity.y = -enemyBulletvelocity/7;
          enemyBigBulletTime = game.time.now + 5*timeDilayEnemy;
      }
  }
}

})();
