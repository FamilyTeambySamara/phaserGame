(function (){
  var front_emitter;
  var mid_emitter;
  var back_emitter;

  var load_time = 0;
  var button;

  var mainLayout;
  var animLayout;

  var textStart;
  var textOutAnim;

  var windSong;
  var buttonSong;

  var animationBegin;
  var bellsSong;

  window.animBegin =
  {
      preload: function ()
      {
        // game.load.image('dragonTexture', 'assets/img/character.png');
        // game.load.json('dragonMesh', 'assets/img/character.json');
        //game.load.spritesheet('star', 'assets/img/stars.png', 60, 60);
        // game.load.audio('wind',  'assets/audio/wind.wav');
        // game.load.audio('buttonSong',  'assets/audio/button.wav');
        // game.load.spritesheet('button_play', 'assets/img/button_sprite3.png', 193 , 71);
        // game.load.spritesheet('button_out', 'assets/img/button_sprite4.png', 193 , 71);


      },

      create: function ()
      {
        // music = gameAdd().audio('cristmas');
        // music.loopFull();


        // add(delay, callback, callbackContext, arguments) ;
        //
        // calculateHpEvent = gameTime().create();
        // calculateHpEvent.repeat(100, hp, this.calculateHp, this);
        // calculateTimeEvent.onComplete.addOnce(function (){calculateHpEvent.start();}, this);

        animationBegin = gameTime().create();
        animationBegin.add(2000, this.animationTransition, this);
        animationBegin.start();

        windSong = gameAdd().audio('wind');
        // buttonSong = gameAdd().audio('buttonSong');
        bellsSong = gameAdd().audio('bells');

        // mainLayout = gameAdd().image(0, 0, 'menu');
        // button = gameAdd().button(300, 150, 'button_play', this.startGame, this, 1, 0 ,2);
        //button.anchor.setTo(0.5,0.5);
        // button.alpha = 1;



        //////////////снег===================
        back_emitter = gameAdd().emitter(gameWorld().centerX, -32, 5200);
        back_emitter.makeParticles('snow_small', [0, 1, 2, 3, 4, 5]);
        back_emitter.maxParticleScale = 0.6;
        back_emitter.minParticleScale = 0.2;
        back_emitter.setYSpeed(20, 100);
        back_emitter.gravity = 0;
        back_emitter.width = gameWorld().width * 1.5;
        back_emitter.minRotation = 0;
        back_emitter.maxRotation = 40;

        back_emitter.start(false, 14000, 20);

        // textStart = gameAdd().text(220, 200, 'Новогодние приключения \n      пингвиненка Тони', { fontSize: '32px', fill: 'red'});
        // textStart.alpha = 0.2;
        textStart = gameAdd().image(400, 200, 'logo');
        textStart.anchor.setTo(0.5, 0.5);
        textStart.alpha = 0;
        ///////////////////////////////////
      },

      animationTransition: function () {
        // var buttonAnim = gameAdd().tween(button).to({alpha: 0}, 3000, Phaser.Easing.Exponential.Out, true, 0);
        // buttonAnim.onComplete.add(this.killAll, this);
        // animLayout = gameAdd().tween(mainLayout).to( {tint: 0xffffff ,alpha: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
        textStartAnim = gameAdd().tween(textStart).to( {alpha: 1}, 6000, Phaser.Easing.Linear.None, true, 1500);
        bellsSong.play();
        // bellsSong.volume = 0;




        textStartAnim.onComplete.add(changeWind, this);

        function changeWind (){
            //mainLayout.kill();
            // bellsSong.stop();
            bellsSong.fadeOut(2000);
            windSong.play();
            // music.stop();
            back_emitter.start(false, 14000, 20000000);
            textOutAnim = gameAdd().tween(textStart).to( {alpha: 0}, 5000, Phaser.Easing.Linear.None, true, 0);


            // game.particles.remove(back_emitter);
            back_emitter.forEachAlive(function (snow) {
              var random = Math.floor(Math.random() * (180 + 1));
              snow.body.velocity.x = 200 + random;

            }, this);

            textOutAnim.onComplete.add(goPresentation, this);

            function goPresentation (){
             score = 0;
             Level = 1;
             //music.stop();

            changeLevel(1);
            changeState('presentSnowBallGames');
              //game.state.start('SnowBallGame');
              // changeState('snowPongGame');
              // game.state.start('Win_SnowBallGame');
           }

            // back_emitter.kill();
        }

      },

      startGame: function ()
      {

        // this.state.start('SnowBallGame');
        this.animationTransition();
        buttonSong.volume = 0.6;
        buttonSong.play();

      },

      hello: function ()
      {
        alert('hello');
      },

      killAll: function (something) {
        something.kill();
      },

      update: function ()
      {


      //       textStart.style = {font: 'mainFont'};
      //       textStart.text = 'Новогодние приключения \n      пингвиненка Тони';
        // if (button.alpha < 1){
        //     button.alpha += 0.5;
        // }
        // load_time = game.load.progress;

      }
  }
}())
