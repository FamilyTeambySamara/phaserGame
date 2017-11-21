var Menu =
{
    preload: function ()
    {
        game.load.image('menu', 'img/penguins.jpg');
        game.load.image('button', 'img/button.jpg');
        game.load.image('Game_over', 'img/menu_over.jpg');
    },

    create: function ()
    {
      this.add.sprite(0, 0, 'menu');
      this.add.button(250, 20, 'button', this.startGame, this);
    },

    startGame: function ()
    {
      this.state.start('Game');
    }
}
