var Game_over =
{

    create: function ()
    {
      this.add.tileSprite(0, 0, 640, 450, 'Game_over');
      this.add.button( 250, 250, 'button', this.startPlay, this, 2, 1, 0);
      this.add.button( 250, 150, 'button', this.goToMenu, this, 2, 1, 0);
    },

    startPlay: function () {
          score = 0;
          this.state.start('Game');
    },

    goToMenu: function ()
    {
          this.state.start('Menu');
    }
}
