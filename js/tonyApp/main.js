(function(){
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

  //Добавить условие на старт приложения
   window.startAppJs = function (){
    game.state.start('Boot');
  }

  //метод для изменения состояния
  window.changeState = function (st) {
      //проверка на доступ к игровому состоянию
      switch (st) {
        case 'SnowBallGame':
          var path = 'game_1';
          break;
        case 'snowPongGame':
          var path = 'game_2.g_1'; //путь к объекту в инфобокс
          break;
        case 'snowPongGame_2':
          var path = 'game_2.g_2'; //путь к объекту в инфобокс
          break;
        case 'snowPongGame_3':
          var path = 'game_2.g_3'; //путь к объекту в инфобокс
          break;
        case 'snowPongGame_4':
          var path = 'game_2.g_4'; //путь к объекту в инфобокс
          break;
        case 'snowPongGame_5':
          var path = 'game_2.g_5'; //путь к объекту в инфобокс
          break;
        case 'snowPongGame_6':
          var path = 'game_2.g_6'; //путь к объекту в инфобокс
          break;
        case 'snowPongGame_7':
          var path = 'game_2.g_7'; //путь к объекту в инфобокс
          break;
        case 'snowPongGame_8':
          var path = 'game_2.g_8'; //путь к объекту в инфобокс
          break;
      }
      if (path){
        // alert(getInfo().game_1.access);
        if (getInfo()[path].access){
          game.state.start(st);
        }
      }else {
        game.state.start(st);
      }
  }
  //для добавления в игру
  window.gameAdd = function () {
      return game.add;
  }

  //для загрузки в игрy
  window.gameLoad = function () {
      return game.load;
  }
  window.gameSound = function () {
    return game.sound;
  }
  window.gameTime = function () {
    return game.time;
  }
  window.gamePhysics = function () {
    return game.physics;
  }
  window.gameInput = function () {
    return game.input;
  }
  window.gameHeight = function () {
    return game.height;
  }
}())






//====================================
