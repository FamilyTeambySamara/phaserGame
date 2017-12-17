var game = new Phaser.Game(800, 500, Phaser.AUTO, '');


game.state.add('Menu', Menu);
game.state.add('menu_cards', menu_cards);
// game.state.add('Menu_over', Game_over);
game.state.add('SnowBallGame', SnowBallGame);

game.state.add('snowPongGame', snowPongGame);
game.state.add('snowPongGame_2', snowPongGame_2);

game.state.add('Win_SnowBallGame', Win_SnowBallGame);

game.state.add('presentSnowBallGames', presentSnowBallGames);

game.state.add('Boot', Boot);

game.state.add('Preload', Preload);

game.state.add('Game_over', Game_over);



//Добавить условие на старт приложени
function startAppJs (){
  game.state.start('Boot');
}


//====================================
