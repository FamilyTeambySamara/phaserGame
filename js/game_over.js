var Game_over =
{

    create: function ()
    {
      this.add.tileSprite(0, 0, 640, 450, 'Game_over');
      this.add.button(game.world.centerX, game.world.centerY, 'button', this.startPlay, this)
    },

    startPlay: function () {
          this.state.start('Game');
    }
}
