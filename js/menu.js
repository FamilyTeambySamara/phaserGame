var front_emitter;
var mid_emitter;
var back_emitter;
var music;

var Menu =
{
    preload: function ()
    {
        game.load.image('menu', 'assets/img/pingvi.png');
        game.load.spritesheet('button', 'assets/img/button_sprite.png', 193 , 71);
        game.load.image('Game_over', 'assets/img/menu_over.jpg');

        //делаем снежок
        game.load.spritesheet('snow_small', 'assets/img/snowflakes.png', 17, 17);
        game.load.spritesheet('snow_big', 'assets/img/snowflakes_large.png', 64, 64);
        game.load.audio('cristmas', ['assets/audio/menu.mp3', 'assets/audio/menu.ogg']);
    },

    create: function ()
    {

       music = game.add.audio('cristmas');
       music.play();

      this.add.image(0, 0, 'menu');
      this.add.button(250, 150, 'button', this.startGame, this, 2, 1 ,0);
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
      music.stop();

      this.state.start('Game');
    },

    hello: function ()
    {
      alert('hello');
    }
}
