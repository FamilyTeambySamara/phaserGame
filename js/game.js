// var game = new Phaser.Game(480, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//
var playerBet;
var computerBet;
var ball;


///Таблица данных об игре
var scoreTable;
var levelTable;
var healthTable;
//=============================

var ballReleased = false;

var computerBetSpeed = 150;
var ballSpeed = 300;
var score = 0;

var nextLevelScore = 5;
var Level = 1;

var health = 3;


// var playerPosition = 0;
// var compPosition = 1;



var fireButton;






var bullets;
var bullet;
var trigerBullet = false;

var bulletTime = 0;
var enemyBulletTime = 0;
var enemyBulletvelocity = 400;
var timeDilay = 1000;

var Game =
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
//============Пули противника=======================
      enemyBullets = game.add.group();
      enemyBullets.enableBody = true;
      enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBullets.createMultiple(30, 'ball');
      enemyBullets.setAll('anchor.x', 0.5);
      enemyBullets.setAll('anchor.y', 1);
      enemyBullets.setAll('outOfBoundsKill', true);
      enemyBullets.setAll('checkWorldBounds', true);
//===================================================
      // function bulletGo ()
      // {
      //   if (trigerBullet){
      //
      //     bullet = bullets.getFirstExists(false);
      //     bullet.reset(playerBet.x, playerBet.y + 25);
      //     // bullet.x = playerBet.x;
      //     // bullet.y = playerBet.y + 10;
      //     bullet.body.velocity.y = 50;
      //   }
      // }
      //
      // setInterval(bulletGo , 2000);

//======================================================


      scoreTable =  game.add.text(16, 60, 'score: ' + score, { fontSize: '32px', fill: 'red' });
      levelTable = game.add.text(16, 16, 'Level: ' + Level, { fontSize: '32px', fill: 'white' });
      healthTable = game.add.text(16, 95, 'Health: ' +  health, { fontSize: '32px', fill: 'blue' });


//==========Создаем игроков================================
      computerBet = this.createBet(game.world.centerX, 450);
      playerBet = this.createBet(game.world.centerX, 20);
//==========================================================

       //  weapon = game.add.weapon(1, 'ball');
       // weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
       // weapon.bulletAngleOffset = 90;
       // weapon.bulletSpeed = -400;
       // weapon.trackSprite(playerBet, 14, 0);



//=========Управление игроком========================================
       fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
       //game.input.onDown.add(this.releaseBall, this);
//===================================================================

       // setInterval(createBall, 300);
       //
       // setInterval(createEnemyBall, 200);

    //  game.add.button( 15, 50, 'button_over', this.goMenu, this);
      // ball = game.add.sprite(-25, playerBet.y + 10, 'ball');
      //
      //   function createBall () {
      //       if (triger) {
      //           triger = false;
      //           ball = game.add.sprite(playerBet.x, playerBet.y + 10, 'ball');
      //           // ball.x = playerBet.x;
      //           // ball.y = playerBet.y + 10;
      //           game.physics.arcade.enable(ball);
      //           //ball.body.collideWorldBounds = true;
      //         //  ball.body.bounce.setTo(1, 1);
      //           ball.body.velocity.y = 400;
      //       }
      //   }
      //
      //   enemyBall = game.add.sprite(-25, playerBet.y + 10, 'ball');

        // function createEnemyBall () {
        //     if (enemyTriger) {
        //         enemyTriger = false;
        //         enemyBall = game.add.sprite(computerBet.x, computerBet.y - 10, 'ball');
        //         // ball.x = playerBet.x;
        //         // ball.y = playerBet.y + 10;
        //         game.physics.arcade.enable(enemyBall);
        //         //ball.body.collideWorldBounds = true;
        //       //  ball.body.bounce.setTo(1, 1);
        //         enemyBall.body.velocity.y = -400;
        //     }
        // }
    },

    createBet: function (x, y) {
        var bet = game.add.sprite(x, y, 'bet');
        bet.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(bet);
      //  bet.body.collideWorldBounds = true;
      //  bet.body.bounce.setTo(1, 1);
      //  bet.body.immovable = true;
        return bet;
    },

     fireBullet: function () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(playerBet.x, playerBet.y + 8);
            bullet.body.velocity.y = 400;
            bulletTime = game.time.now + 350;
        }
    }

},

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
              enemyBulletTime = game.time.now + timeDilay;
          }
      }
    },

    // goOverMenu: function ()
    // {
    //     this.state.start('Game_over');
    // },

    // releaseBall: function () {
    //   // if (!ballReleased) {
    //   //   ball.body.velocity.x = ballSpeed;
    //   //   ball.body.velocity.y = -ballSpeed;
    //   //   ballReleased = true;
    //   // }
    // },
///пересечение со снарядом==================================================================
    // ballHitsBet: function (_ball, _bet) {
    //      var diff = 0;
    //
    //      if (_ball.x < _bet.x) {
    //          //  Шарик находится с левой стороны ракетки
    //          diff = _bet.x - _ball.x;
    //          _ball.body.velocity.x = (-10 * diff);
    //      }
    //      else if (_ball.x > _bet.x) {
    //          //  Шарик находится с правой стороны ракетки
    //          diff = _ball.x -_bet.x;
    //          _ball.body.velocity.x = (10 * diff);
    //      }
    //      else {
    //          //  Шарик попал в центр ракетки, добавляем немножко трагической случайности его движению
    //          _ball.body.velocity.x = 2 + Math.random() * 8;
    //      }
    //  },


     killComp: function (bet, bullet){

            bullet.kill();
            score = score + 1;
            scoreTable.text = 'Score: ' + score;

            if (score > nextLevelScore){
                game.state.start('nextLevel');
            }
     },
///////////================================================================================
     // checkBall: function () {
     //     if (ball.y < 10) {
     //        ball.kill();
     //     } else if (ball.y > 450) {
     //          ball.kill();
     //    }
     //
     //  },
     // setBall: function () {
     //     if (ballReleased) {
     //        ball.x = game.world.centerX;
     //        ball.y = game.world.centerY;
     //        ball.body.velocity.x = 0;
     //        ball.body.velocity.y = 0;
     //        ballReleased = false;
     //     }
     // },
     // SnowBallOver: function ()
     // {
     //
     // },

     killPLayer: function (bet, bullet )
     {
        bullet.kill();
        health = health - 1;
        if (health < 1)
        {
           this.state.start('Game_over');
           health = 3;
           shotAim = 0;
        }
        healthTable.text = 'HitPoint: ' + health;
     },

     update: function () {

        if (fireButton.isDown)
        {
            this.fireBullet();
        }

        if (playerBet.x == computerBet.x || Math.abs(playerBet.x - computerBet.x) < 10 ){

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

         // game.physics.arcade.collide(ball, playerBet);
         //game.physics.arcade.collide(ball, computerBet);

         game.physics.arcade.overlap(bullets, computerBet, this.killComp, null, this);
         game.physics.arcade.overlap(enemyBullets, playerBet, this.killPLayer, null, this);

         // game.physics.arcade.collide(ball, playerBet, this.boomBol(playerBet), null, this);
         // game.physics.arcade.collide(ball, computerBet, this.boomBol(computerBet), null, this);
        // this.goSnowBall();
         //this.checkBall();
     }

}
