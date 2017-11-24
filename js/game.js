// var game = new Phaser.Game(480, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//
var playerBet;
var computerBet;
var ball;

var scoreTable;

var ballReleased = false;

var computerBetSpeed = 150;
var ballSpeed = 300;
var score = 0;

var nextLevelScore = 20;
var Level = 1;



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

      game.add.tileSprite(0, 0, 800, 600, 'background');

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




      scoreTable =  game.add.text(16, 60, 'score: ' + score, { fontSize: '32px', fill: 'red' });
      game.add.text(16, 16, 'Level: ' + Level, { fontSize: '32px', fill: 'white' });

      computerBet = this.createBet(game.world.centerX, 600);
      playerBet = this.createBet(game.world.centerX, 20);

    //  game.add.button( 15, 50, 'button_over', this.goMenu, this);

      ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
       ball.anchor.setTo(0.5, 0.5);
       game.physics.arcade.enable(ball);
       ball.body.collideWorldBounds = true;
       ball.body.bounce.setTo(1, 1);


       game.input.onDown.add(this.releaseBall, this);
    },

    createBet: function (x, y) {
        var bet = game.add.sprite(x, y, 'bet');
        bet.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(bet);
        bet.body.collideWorldBounds = true;
        bet.body.bounce.setTo(1, 1);
        bet.body.immovable = true;

        return bet;
    },

    goMenu: function () {

        this.state.start('Menu');
    },

    goOverMenu: function ()
    {
        this.state.start('Game_over');
    },

    releaseBall: function () {
      if (!ballReleased) {
        ball.body.velocity.x = ballSpeed;
        ball.body.velocity.y = -ballSpeed;
        ballReleased = true;
      }
    },

    ballHitsBet: function (_ball, _bet) {
         var diff = 0;

         if (_ball.x < _bet.x) {
             //  Шарик находится с левой стороны ракетки
             diff = _bet.x - _ball.x;
             _ball.body.velocity.x = (-10 * diff);
         }
         else if (_ball.x > _bet.x) {
             //  Шарик находится с правой стороны ракетки
             diff = _ball.x -_bet.x;
             _ball.body.velocity.x = (10 * diff);
         }
         else {
             //  Шарик попал в центр ракетки, добавляем немножко трагической случайности его движению
             _ball.body.velocity.x = 2 + Math.random() * 8;
         }
     },

     checkGoal: function () {
         if (ball.y < 15) {
          score = score + 10;
           scoreTable.text = 'player: ' + score;
           if (score > nextLevelScore) {
             this.state.start('nextLevel');
           }
            this.setBall();
         } else if (ball.y > 430) {
          score = score - 10;
          if (score < 0){
            this.goOverMenu();
          }
          scoreTable.text = 'player: ' + score;
            this.setBall();
          }
     },

     setBall: function () {
         if (ballReleased) {
            ball.x = game.world.centerX;
            ball.y = game.world.centerY;
            ball.body.velocity.x = 0;
            ball.body.velocity.y = 0;
            ballReleased = false;
         }
     },

     update: function () {
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
         if(computerBet.x - ball.x < -15) {
            computerBet.body.velocity.x = computerBetSpeed;
         }
         else if(computerBet.x - ball.x > 15) {
            computerBet.body.velocity.x = -computerBetSpeed;
         }
         else {
            computerBet.body.velocity.x = 0;
         }

         // game.physics.arcade.collide(ball, playerBet);
         // game.physics.arcade.collide(ball, computerBet);

         game.physics.arcade.collide(ball, playerBet, this.ballHitsBet, null, this);
         game.physics.arcade.collide(ball, computerBet, this.ballHitsBet, null, this);

         this.checkGoal();
     }

}
