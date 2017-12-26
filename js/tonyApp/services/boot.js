(function(){
  var music;
  window.Boot = {
        preload: function (){
            gameLoad().audio('loosSound', 'assets/audio/new/Jahzzar_-_02_-_Family_Tree(loos).ogg');
            gameLoad().audio('cristmas', 'assets/audio/new/veryCool.ogg');
            gameLoad().audio('bells', ['assets/audio/bells.ogg']);

            gameLoad().image('loading_bar', 'assets/img/preloader/loader3.png');
            gameLoad().image('loading_fon', 'assets/img/preloader/loadingLights.png');
            gameLoad().spritesheet('load_text', 'assets/img/preloader/load.png', 193, 71);

            gameLoad().bitmapFont('fontClock', 'assets/font/digitals/fontClock.png', 'assets/font/digitals/fontClock.fnt');
            gameLoad().bitmapFont('fontStar', 'assets/font/digitals/fontStar.png', 'assets/font/digitals/fontStar.fnt');
            gameLoad().bitmapFont('fontHart', 'assets/font/digitals/fontHart.png', 'assets/font/digitals/fontHart.fnt');
            gameLoad().bitmapFont('fontStarMessage', 'assets/font/digitals/fontStarMessage.png', 'assets/font/digitals/fontStarMessage.fnt');
            gameLoad().image('logo', 'assets/img/preloader/Logo.png');
        },

        create: function (){
          // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          // game.scale.pageAlignHorizontally = true;
          // game.scale.pageAlignVertically = true;
          changeState('Preload');
        }
  }
}())
