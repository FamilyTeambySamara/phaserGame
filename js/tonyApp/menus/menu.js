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

var Menu =
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
      music = game.add.audio('cristmas');
      music.loopFull();

      windSong = game.add.audio('wind');
      buttonSong = game.add.audio('buttonSong');

      mainLayout = this.add.image(0, 0, 'menu');
      button = this.add.button(300, 150, 'button_play', this.startGame, this, 1, 0 ,2);
      //button.anchor.setTo(0.5,0.5);
      button.alpha = 1;


     // button.enableBody = true;
     //   button.physicsBodyType = Phaser.Physics.ARCADE;


      //game.add.text(16, 16, 'загрузка: ' + load_time, { fontSize: '32px', fill: 'white' });

      // var dragon = game.add.creature(450, 350, 'dragonTexture', 'dragonMesh');
      //
      // dragon.scale.set(25.0);
      //
      // dragon.play(true); //  true = loop


      // var moon = this.add.image(350, 15, 'moon');
      // moon.scale.setTo(0.5, 0.5);
      // var star = game.add.sprite(565, 100, 'star');
      // star.animations.add('star');
      // star.play('star', 4, true, true);
      //explode.play('kaboom', 30, false, true);

      // var star = this.add.sprite(250, 80, 'star');
      //
      // var shine = star.animations.add('shine');
      //
      // star.animations.play('shine', 4, true);

      // shadow = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
      // shadow.anchor.set(0.5);
      // shadow.tint = 0.9 * 0xffc400;
      // shadow.alpha = 1;

      // sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
      // sprite.anchor.set(0.5);


      // shadow.x = sprite.x + offset.x;
      // shadow.y = sprite.y + offset.y;

      //////////////снег===================
      back_emitter = this.add.emitter(game.world.centerX, -32, 5200);
      back_emitter.makeParticles('snow_small', [0, 1, 2, 3, 4, 5]);
      back_emitter.maxParticleScale = 0.6;
      back_emitter.minParticleScale = 0.2;
      back_emitter.setYSpeed(20, 100);
      back_emitter.gravity = 0;
      back_emitter.width = game.world.width * 1.5;
      back_emitter.minRotation = 0;
      back_emitter.maxRotation = 40;

      back_emitter.start(false, 14000, 20);

      textStart = game.add.text(220, 200, 'Новогодние приключения \n      пингвиненка Тони', { fontSize: '32px', fill: 'red' , font: 'mainFont'});
      textStart.alpha = 0;
      ///////////////////////////////////
    },

    animationTransition: function () {
      var buttonAnim = game.add.tween(button).to({alpha: 0}, 3000, Phaser.Easing.Exponential.Out, true, 0);
      buttonAnim.onComplete.add(this.killAll, this);
      animLayout = game.add.tween(mainLayout).to( {tint: 0xffffff ,alpha: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
      textStartAnim = game.add.tween(textStart).to( {alpha: 1}, 6000, Phaser.Easing.Linear.None, true, 1500);


      textStartAnim.onComplete.add(changeWind, this);

      function changeWind (){
          //mainLayout.kill();
          windSong.play();
          music.stop();
          back_emitter.start(false, 14000, 20000000);
          textOutAnim = game.add.tween(textStart).to( {alpha: 0}, 5000, Phaser.Easing.Linear.None, true, 0);


          // game.particles.remove(back_emitter);
          back_emitter.forEachAlive(function (snow) {snow.body.velocity.x = 200;}, this);

          textOutAnim.onComplete.add(goPresentation, this);

          function goPresentation (){
           score = 0;
           Level = 1;
           //music.stop();
           // game.state.start('presentSnowBallGames');
            changeLevel(3);
            //game.state.start('SnowBallGame');
              game.state.start('snowPongGame');
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
