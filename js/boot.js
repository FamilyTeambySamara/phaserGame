var music;
var Boot = {
      preload: function (){
          game.load.audio('cristmas', ['assets/audio/menu.mp3', 'assets/audio/menu.ogg']);
          game.load.image('loading_bar', 'assets/img/loading_bar.png');
          game.load.bitmapFont('ds_digital', 'assets/font/ds_digital.png', 'assets/font/ds_digital.fnt');



      },

      create: function (){
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;
        music = game.add.audio('cristmas');
        music.loopFull();

        this.game.state.start('Preload');
      }
}
