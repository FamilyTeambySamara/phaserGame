var nextLevel =
{

  preload: function ()
  {
      game.load.image('levelUp', 'assets/img/Level_up.jpg')
  },

  create: function ()
  {

      this.add.image(100, 0, 'levelUp');
      this.add.button(250, 150, 'button', this.goNext, this, 2, 1 ,0);
      this.add.text(250, 20, 'Ты перешел на уровень' + ++Level + '!!!', { fontSize: '32px', fill: 'red' });
  },

  goNext: function ()
  {
        nextLevelScore += 50;
        ballSpeed += 25;
        this.state.start('Game');
  }

}
