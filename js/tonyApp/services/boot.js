(function(){
  var music;
  window.Boot = {
        preload: function (){
            gameLoad().audio('cristmas', ['assets/audio/menu.mp3', 'assets/audio/menu.ogg']);
            gameLoad().audio('bells', ['assets/audio/bells.mp3']);

            gameLoad().image('loading_bar', 'assets/img/preloader/loader3.png');
            gameLoad().image('loading_fon', 'assets/img/preloader/loadingLights.png');
            gameLoad().spritesheet('load_text', 'assets/img/preloader/load.png', 193, 71);

            gameLoad().bitmapFont('fontClock', 'assets/font/digitals/fontClock.png', 'assets/font/digitals/fontClock.fnt');
            gameLoad().bitmapFont('fontStar', 'assets/font/digitals/fontStar.png', 'assets/font/digitals/fontStar.fnt');
            gameLoad().bitmapFont('fontHart', 'assets/font/digitals/fontHart.png', 'assets/font/digitals/fontHart.fnt');
            gameLoad().bitmapFont('fontStarMessage', 'assets/font/digitals/fontStarMessage.png', 'assets/font/digitals/fontStarMessage.fnt');
            gameLoad().image('logo', 'assets/img/preloader/Logo.png');

            // game.load.bitmapFont('mainFont', 'assets/font/ds_digital.png', 'assets/font/ds_digital.fnt');
        },

        create: function (){
          // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          // game.scale.pageAlignHorizontally = true;
          // game.scale.pageAlignVertically = true;
          changeState('Preload');
        }
  }
}())
