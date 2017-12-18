(function (){
  window.Game_over =
  {
      create: function ()
      {
        gameAdd().image(0, 0, 'Game_over');
        // gameAdd().text(250, 40, 'GAME OVER', { fontSize: '32px', fill: 'red' });
        // gameAdd().text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
        var b_1 = gameAdd().button( 400, 200, 'button_again', this.startPlay, this, 1, 0 ,2);
        var b_2 = gameAdd().button( 400, 300, 'button_out', this.goToMenu, this, 1, 0 ,2);
        b_1.anchor.x = 0.5;
        b_2.anchor.x = 0.5;
        b_1.anchor.y = 0.5;
        b_2.anchor.y = 0.5;

      },

      startPlay: function () {
            Level = 1;
            score = 0;
            changeState(getInfoCurrentGame().currentGame);
      },

      goToMenu: function ()
      {
            changeState('menu_cards');
      }
  }

}())
