(function () {

//Спрайты================
var playerBet;
var computerBet;
var computerBet_2;
//======================
//Музыка и звкуи
var throw_player;
//====================
///Таблица данных об игре
var scoreTable;
var levelTable;
var healthTable;
//=============================

//============================Переменные значения(настройки игры)==================
var computerBetSpeed = 150; //Скорость передвижения компьютера
var score = 0; //Количество попаданий
var nextLevelScore = 5; //Критерий перехода на следующий уровень
var Level = 1; //Текущий уровень
var health = 3; //Жизни игрока
//==================================================================
//===========Управление============================================
// var plyaerMouse;
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
var enemyBulletTime = 1000;//Начальная задержка пуль по времени Enemys

var enemyBulletvelocity = 400;//скорость пуль PLayer
var playerBulletVelocity = 400;//скорость пуль Enemys

var timeDilayEnemy = 1000;//перезардка выстрела  PLayer
var timeDilayPlayer = 600;//перезардка выстрела  Enemys
//=================Результат матча========================================
var saveBox = {};
/////////================================================\\\\\\\\\\\\\\\\\\\\
window.SnowBallGame =
{
    preload: function () {
        game.load.image('bet', 'assets/img/bet_3.png');
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('background', 'assets/img/menu.jpg');
        game.load.image('button_over', 'assets/img/button.jpg');
    },

    create: function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  game.add.tileSprite(0, 0, 800, 600, 'background');
    //====================Добавлем музыку и звуки
    throw_plyer = game.add.audio('throw');
    throw_plyer.volume = 1;
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
//===================================================

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

      computerBet = this.createBet(game.world.centerX, 450);
      playerBet = this.createBet(game.world.centerX, 20);

      computerBet_2 = this.createBet(game.world.centerX, 600);
      computerBet_2.scale.setTo(1.5, 1.5);

      scoreTable =  game.add.text(16, 60, 'score: ' + score, { fontSize: '32px', fill: 'red' });
      levelTable = game.add.text(16, 16, 'Level: ' + Level, { fontSize: '32px', fill: 'white' });
      healthTable = game.add.text(16, 95, 'Health: ' +  health, { fontSize: '32px', fill: 'blue' });

//=========Управление игроком========================================
       fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
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
            bullet.reset(playerBet.x, playerBet.y + 8);
            bullet.body.velocity.y = playerBulletVelocity;
            bulletTime = game.time.now + timeDilayPlayer;
        }
    }

},
    //Стрельба Enemy
    fireBulletEnemy: function () {

      if (game.time.now > enemyBulletTime)
      {
          //  Grab the first bullet we can from the pool
          enemyBullet = enemyBullets.getFirstExists(false);

          if (enemyBullet)
          {
              //  And fire it
              enemyBullet.reset(computerBet.x, computerBet.y - 8);
              enemyBullet.body.velocity.y = -enemyBulletvelocity;
              enemyBulletTime = game.time.now + timeDilayEnemy;
          }
      }
    },

     killComp: function (bet, bullet){

            bullet.kill();
            score = score + 1;
            scoreTable.text = 'Score: ' + score;

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
            //==============================
            this.state.start('Game_over');
        }
        healthTable.text = 'HitPoint: ' + health;
     },

     update: function () {
       //Если нажат пробел запускаем стрельбу PLayer
        if (fireButton.isDown)
        {
            this.fireBullet();
        }
        //Если комп рядом с Player - запускаем стрельбу
        if ( Math.abs(playerBet.x - computerBet.x) < 35 ){

            this.fireBulletEnemy();
        }
         //Управляем ракеткой игрока
         playerBet.x = game.input.x;

         var playerBetHalfWidth = playerBet.width / 2;

         if (playerBet.x < playerBetHalfWidth) {
            playerBet.x = playerBetHalfWidth;
         }
         else if (playerBet.x > game.width - playerBetHalfWidth) {
            playerBet.x = game.width - playerBetHalfWidth;
         }

         //Управляем ракеткой компьютерного соперника
         if(computerBet.x - playerBet.x < -15) {
            computerBet.body.velocity.x = computerBetSpeed;
         }
         else if(computerBet.x - playerBet.x > 15) {
            computerBet.body.velocity.x = -computerBetSpeed;
         }
         else {
            computerBet.body.velocity.x = 0;
         }
//==================Управление большим врагом=============================
         if(Level >= 2 ){

              if (computerBet_2.y > 400){
                    computerBet_2.body.velocity.y = -100;
              }else if (computerBet_2.y <= 400){
                  computerBet_2.body.velocity.y = 0;
              }

              if(playerBet.x > 400 && !(computerBet_2.x > 800)){
                  computerBet_2.body.velocity.x = computerBetSpeed/2;
              } else if (playerBet.x < 400 && !(computerBet_2.x < 0)){
                  computerBet_2.body.velocity.x = -computerBetSpeed/2;
              } else {
                  computerBet_2.body.velocity.x = 0;
              }
              if (Math.abs(computerBet_2.x - playerBet.x) < 400 ){
                    fireBulletEnemyBig();
              }
         }
//==========================================================================
         // game.physics.arcade.collide(ball, playerBet);
         //game.physics.arcade.collide(ball, computerBet);
//Реакция на пересечение пуль и игроков================================================
              game.physics.arcade.overlap(bullets, computerBet, this.killComp, null, this);
              game.physics.arcade.overlap(bullets, computerBet_2, this.killComp, null, this);
              game.physics.arcade.overlap(enemyBullets, playerBet, this.killPLayer, null, this);
              game.physics.arcade.overlap(enemyBulletsBig, playerBet, this.killPLayer, null, this);
//======================================================================================
         // game.physics.arcade.collide(ball, playerBet, this.boomBol(playerBet), null, this);
         // game.physics.arcade.collide(ball, computerBet, this.boomBol(computerBet), null, this);
        // this.goSnowBall();
         //this.checkBall();
     },


}
///===Конец объекта Game=====================================================================================

 function fireBulletEnemyBig () {

  if (game.time.now > enemyBulletTime)
  {
      //  Grab the first bullet we can from the pool
      enemyBulletBig = enemyBulletsBig.getFirstExists(false);
      enemyBulletBig.scale.setTo(3,3);

      if (enemyBulletBig)
      {
          //  And fire it
          enemyBulletBig.reset(computerBet_2.x, computerBet_2.y - 15);
          enemyBulletBig.body.velocity.y = -enemyBulletvelocity/2;
          enemyBulletTime = game.time.now + timeDilayEnemy;
      }
  }
}

})();
