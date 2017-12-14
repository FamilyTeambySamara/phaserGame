(function(){
var pass = 0;
var appRun = false;
var infoBox = {
  password: "",
  appRun: false,
  currentGameStat : {
    time: 0,
    hp: 0,
    stars: 0,
    score: 0,
    mod: 1,
    currentGame: 'game'
  },
  user : {
      id: 78,
      name: 'newUser',
      totalStars: 0,
      //Информация по игре 1
  },
  game_1: {
    status: 'over',
    access: true,
    time: 0,
    hp: 0,
    stars: 0,
    score: 0,
  },
  //Информация по игре 2
  game_2: {
      g_1: {
        status: 'start',
        access: true,
        time: 0,
        hp: 0,
        stars: 0,
        score: 0,
      },
      g_2: {
        status: 'unstart',
        access: false,
        time: 0,
        hp: 0,
        stars: 0,
        score: 0,
      },
      g_3:{
        status: 'unstart',
        access: false,
        time: 0,
        hp: 0,
        stars: 0,
        score: 0,
      },
      g_4: {
        status: 'unstart',
        access: false,
        time: 0,
        hp: 0,
        stars: 0,
        score: 0,
      },
      g_5: {
        status: 'unstart',
        access: false,
        time: 0,
        hp: 0,
        stars: 0,
        score: 0,
      },
  },

}

window.getInfoCurrentGame = function (){
  return infoBox.currentGameStat;
}
window.getInfoUser = function () {
  return infoBox.user;
}
window.saveStat = function (currentGame){
    switch (currentGame) {
      case 1:
        infoBox.currentGameStat = SnowBallGame.getInfo();
        break;
      case 21:
        infoBox.currentGameStat = snowPongGame.getInfo();
        break;
      case 22:
        infoBox.currentGameStat = snowPongGame_2.getInfo();
        break;
      case 23:
        infoBox.currentGameStat = snowPongGame_3.getInfo();
        break;
      case 24:
        infoBox.currentGameStat = snowPongGame_4.getInfo();
        break;
      case 25:
        infoBox.currentGameStat = snowPongGame_5.getInfo();
        break;
      case 26:
        infoBox.currentGameStat = snowPongGame_6.getInfo();
        break;
      case 27:
        infoBox.currentGameStat = snowPongGame_7.getInfo();
        break;
      case 28:
        infoBox.currentGameStat = snowPongGame_8.getInfo();
        break;
    }
}
window.update = function (){

  $.ajax({
            type: "POST",
            dataType: "json",
            url: "checkUser.php",
            data: "id_vk=" + id + "&name=" + name,
            success: function(result){
            infoBox = result;
            appRun = true;
            pass = result.pass;
            alert('hello' + result.user.name);
            // alert(result);
            //запустить приложение !!!!!!!!
            startAppJs ();
            }
        });
}

window.save = function () {
      var statistic = infoBox.currentGameStat;
      switch (statistic.currentGame) {
        case 'SnowBallGame':
          var game = 'game_1';
          var game_next = 'game_21';
          var table = 'game_1';
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame':
          var game = 'game_2.g_1'; //путь к объекту в инфобокс
          var game_next = 'game_22'; //название таблицы следующей игры
          var table = 'game_21'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_2':
          var game = 'game_2.g_2'; //путь к объекту в инфобокс
          var game_next = 'game_23'; //название таблицы следующей игры
          var table = 'game_22'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_3':
          var game = 'game_2.g_3'; //путь к объекту в инфобокс
          var game_next = 'game_24'; //название таблицы следующей игры
          var table = 'game_23'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_4':
          var game = 'game_2.g_4'; //путь к объекту в инфобокс
          var game_next = 'game_25'; //название таблицы следующей игры
          var table = 'game_24'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_5':
          var game = 'game_2.g_5'; //путь к объекту в инфобокс
          var game_next = 'game_26'; //название таблицы следующей игры
          var table = 'game_25'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_6':
          var game = 'game_2.g_6'; //путь к объекту в инфобокс
          var game_next = 'game_27'; //название таблицы следующей игры
          var table = 'game_26'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_7':
          var game = 'game_2.g_7'; //путь к объекту в инфобокс
          var game_next = 'game_28'; //название таблицы следующей игры
          var table = 'game_27'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_8':
          var game = 'game_2.g_8'; //путь к объекту в инфобокс
          var game_next = 'end'; //название таблицы следующей игры
          var table = 'game_28'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
      }
}

function checkChange (game, game_next, statistic, table){
  //играет первый раз
  if (infoBox.game.status == 'unstart' || infoBox.game.status == 'start'){
     //ajax запрос на сохранение результатов игры
     var info = [];
     info['currentStars'] = statistic.stars;
     info['currentScore'] = statistic.score;
     info['status'] = 'over';
     info['totalStars'] = statistic.stars + infoBox.user.totalStars;
     info['method'] = 'saveNewGame';
     info['table'] = table;
     info['game_next'] = game_next;
     query(info);
     // queryUser(totalStars, status);
  }else if (infoBox.game.status == 'over' && game == 'game_1'){
    //добавляем звездочки к имеющимся
    var starsCurrent = statistic.stars;
    var scoreCurrent = statistic.score;
    var starsAlready = infoBox.game_1.stars;
    var scoreAlready = infoBox.game_1.score;

    var info = [];
    info['stars'] = starsCurrent + starsAlready;
    info['totalStars'] = statistic.stars + infoBox.user.totalStars;
    info['method'] = 'saveReplayGame_1';
    info['game_next'] = game_next;

    if((scoreCurrent - scoreAlready) > 0){
      info['score'] = scoreCurrent;
    }else {
      info['score'] = scoreAlready;
    }
    //обновляем информацию в приложении
    infoBox.user.totalstars = info['totalStars'];
    infoBox.game.stars = info['stars'];
    infoBox.game.score = info['score'];

    query(info);
  }else if (infoBox.game.status == 'over'){
    //сравниваем результат игр с имеющимся и все улучшения записываем
    var starsCurrent = statistic.stars;
    var scoreCurrent = statistic.score;

    var starsAlready = infoBox.game.stars;
    var scoreAlready = infoBox.game.score;

    var info = [];
    // info['stars'] = starsCurrent + starsAlready;
    // info['totalStars'] = statistic.stars + infoBox.user.totalStars;
    info['method'] = 'saveReplayGame';
    info['table'] = table;
    info['game_next'] = game_next;

    if((scoreCurrent - scoreAlready) > 0){
      info['score'] = scoreCurrent;
    }else {
      info['score'] = scoreAlready;
    }

    if((starsCurrent - starsAlready) > 0){
      info['stars'] = starsCurrent;
      info['totalStars'] = infoBox.user.totalStars + (starsCurrent - starsAlready);
    }else {
      info['stars'] = starsAlready;
      info['totalStars'] = infoBox.user.totalStars;
    }

    //обновляем информацию в приложении
    infoBox.user.totalstars = info['totalStars'];
    infoBox.game.stars = info['stars'];
    infoBox.game.score = info['score'];

    query(info);
  }

  function query (info) {
    var id = infoBox.user.id;
    var pass = pass;
    $.ajax({
              type: "POST",
              // dataType: "json",
              url: "php/saveData.php",
              data: "id=" + id + "&pass=" + pass + "info=" + info,
              success: function(result){
              // infoBox.user = result.user;
              // alert (infoBox.user.name);
              if (result){
                  infoBox = result;
              }

                // alert( "Прибыли данные: " + msg );
              }
          });
  }

}


})();
