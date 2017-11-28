var game = new Phaser.Game(800, 500, Phaser.AUTO, '');


game.state.add('Menu', Menu);
// game.state.add('Menu_over', Game_over);
game.state.add('SnowBallGame', SnowBallGame);

game.state.add('Win_SnowBallGame', Win_SnowBallGame);

game.state.add('Boot', Boot);

game.state.add('Preload', Preload);

game.state.add('Game_over', Game_over);

game.state.add('nextLevel', nextLevel);

game.state.start('Boot');
