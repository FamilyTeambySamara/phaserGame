
var Boot = {
      preload: function (){
          game.load.image('loading_bar', 'assets/img/loading_bar.png');
          game.load.bitmapFont('ds_digital', 'assets/font/ds_digital.png', 'assets/font/ds_digital.fnt');


      },

      create: function (){
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;

        this.game.state.start('Preload');
      }
}
