(function(){
  var music;
  window.Boot = {
        preload: function (){
            gameLoad().audio('cristmas', ['assets/audio/menu.mp3', 'assets/audio/menu.ogg']);
            gameLoad().image('loading_bar', 'assets/img/preloader/loader3.png');
            gameLoad().image('loading_fon', 'assets/img/preloader/loadingLights.png');
            gameLoad().bitmapFont('ds_digital', 'assets/font/ds_digital.png', 'assets/font/ds_digital.fnt');

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
