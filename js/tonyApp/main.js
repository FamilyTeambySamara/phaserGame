(function(){
  var game = new Phaser.Game(800, 500, Phaser.AUTO, '');
  game.state.add('animBegin', animBegin);
  game.state.add('menu_cards', menu_cards);
  // game.state.add('Menu_over', Game_over);
  game.state.add('SnowBallGame', SnowBallGame);

  game.state.add('snowPongGame', snowPongGame);
  game.state.add('snowPongGame_2', snowPongGame_2);
  game.state.add('snowPongGame_3', snowPongGame_3);
  game.state.add('snowPongGame_4', snowPongGame_4);
  game.state.add('snowPongGame_5', snowPongGame_5);
  game.state.add('snowPongGame_6', snowPongGame_6);
  game.state.add('snowPongGame_7', snowPongGame_7);
  game.state.add('snowPongGame_8', snowPongGame_8);
  game.state.add('snowPongGame_9', snowPongGame_9);
  game.state.add('snowPongGame_10', snowPongGame_10);

  game.state.add('Win_SnowBallGame', Win_SnowBallGame);

  game.state.add('presentSnowBallGames', presentSnowBallGames);

  game.state.add('presentSnowPong', presentSnowPong);

  game.state.add('map', map);

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
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_1';
          break;
        case 'snowPongGame_2':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_2';
          break;
        case 'snowPongGame_3':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_3';
          break;
        case 'snowPongGame_4':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_4';
          break;
        case 'snowPongGame_5':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_5';
          break;
        case 'snowPongGame_6':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_6';
          break;
        case 'snowPongGame_7':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_7';
          break;
        case 'snowPongGame_8':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_8';
          break;
        case 'snowPongGame_9':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_9';
          break;
        case 'snowPongGame_10':
          var path = 'game_2'; //путь к объекту в инфобокс
          var path_2 = 'g_10';
          break;
      }
      if (path){
        if(path_2){
          if (getInfo()[path][path_2].access == 1){
            switch (path_2) {
              case 'g_1':
                if(getInfo().user.totalstars > 1){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
              case 'g_2':
                if(getInfo().user.totalstars > 4){
                  game.state.start(st);
                  return true;
                }else {
                return false;
                }
                break;
              case 'g_3':
                if(getInfo().user.totalstars > 7){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
              case 'g_4':
                if(getInfo().user.totalstars > 10){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
              case 'g_5':
                if(getInfo().user.totalstars > 14){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
              case 'g_6':
                if(getInfo().user.totalstars > 17){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
              case 'g_7':
                if(getInfo().user.totalstars > 20){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
              case 'g_8':
                if(getInfo().user.totalstars > 23){
                  game.state.start(st);
                  return true;
                }else {
                return false;
                }
                break;
              case 'g_9':
                if(getInfo().user.totalstars > 26){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
              case 'g_10':
                if(getInfo().user.totalstars > 29){
                  game.state.start(st);
                  return true;
                }else {
                  return false;
                }
                break;
            }
          }else{
            return false;
          }
        }
          if (getInfo()[path].access){
            game.state.start(st);
            return true;
          }else{
            return false;
          }
      }else {
        game.state.start(st);
        return true;
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
  window.gameWorld = function (){
    return game.world;
  }
}())






//====================================
