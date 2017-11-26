var front_emitter;
var mid_emitter;
var back_emitter;
var music;
var load_time = 0;

var Menu =
{
    preload: function ()
    {




    },

    create: function ()
    {
      this.add.image(0, 0, 'menu');
      this.add.button(250, 150, 'button', this.startGame, this, 2, 1 ,0);
      game.add.text(16, 16, 'загрузка: ' + load_time, { fontSize: '32px', fill: 'white' });


      var moon = this.add.image(350, 15, 'moon');
      moon.scale.setTo(0.5, 0.5);

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

       music = game.add.audio('cristmas');
       music.play();



      //////////////снег
      back_emitter = this.add.emitter(game.world.centerX, -32, 600);
      back_emitter.makeParticles('snow_small', [0, 1, 2, 3, 4, 5]);
      back_emitter.maxParticleScale = 0.6;
      back_emitter.minParticleScale = 0.2;
      back_emitter.setYSpeed(20, 100);
      back_emitter.gravity = 0;
      back_emitter.width = game.world.width * 1.5;
      back_emitter.minRotation = 0;
      back_emitter.maxRotation = 40;

      back_emitter.start(false, 14000, 20);

      ///////////////////////////////////


    },

    startGame: function ()
    {
      score = 0;
      Level = 1;
      music.stop();

      this.state.start('SnowBallGame');
    },

    hello: function ()
    {
      alert('hello');
    },

    update: function ()
    {
      load_time = game.load.progress;
    }
}
