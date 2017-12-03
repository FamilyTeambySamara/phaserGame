var Game_over =
{
    create: function ()
    {
      this.add.image(0, 0, 'Game_over');
      this.add.text(250, 40, 'GAME OVER', { fontSize: '32px', fill: 'red' });
      this.add.text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
      this.add.button( 250, 250, 'button', this.startPlay, this, 2, 1, 0);
      this.add.button( 250, 150, 'button', this.goToMenu, this, 2, 1, 0);
    },

    startPlay: function () {
          Level = 1;
          score = 0;
          this.state.start('SnowBallGame');
    },

    goToMenu: function ()
    {
          game.state.start('Menu');
    }
}
