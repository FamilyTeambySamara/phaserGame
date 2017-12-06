var Game_over =
{
    create: function ()
    {
      this.add.image(0, 0, 'Game_over');
      this.add.text(250, 40, 'GAME OVER', { fontSize: '32px', fill: 'red' });
      this.add.text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
      var b_1 = this.add.button( 400, 250, 'button_play', this.startPlay, this, 1, 0 ,2);
      var b_2 = this.add.button( 400, 150, 'button_out', this.goToMenu, this, 1, 0 ,2);
      b_1.anchor.x = 0.5;
      b_2.anchor.x = 0.5;
      b_1.anchor.y = 0.5;
      b_2.anchor.y = 0.5;

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
