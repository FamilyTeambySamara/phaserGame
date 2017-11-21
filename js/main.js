var game;

game = new Phaser.Game(640, 450, Phaser.AUTO, '');

game.state.add('Menu', Menu);
// game.state.add('Menu_over', Game_over);
game.state.add('Game', Game);

game.state.add('Game_over', Game_over);

game.state.start('Menu');
