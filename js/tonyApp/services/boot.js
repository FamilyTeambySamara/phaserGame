(function(){
  var music;
  window.Boot = {
        preload: function (){
            game.load.audio('cristmas', ['assets/audio/menu.mp3', 'assets/audio/menu.ogg']);
            game.load.image('loading_bar', 'assets/img/loadingLights.png');
            game.load.image('loading_fon', 'assets/img/loadingImage.png');
            game.load.bitmapFont('ds_digital', 'assets/font/ds_digital.png', 'assets/font/ds_digital.fnt');

            // game.load.bitmapFont('mainFont', 'assets/font/ds_digital.png', 'assets/font/ds_digital.fnt');
        },

        create: function (){
          // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          // game.scale.pageAlignHorizontally = true;
          // game.scale.pageAlignVertically = true;
          game.state.start('Preload');
        }
  }
}())
