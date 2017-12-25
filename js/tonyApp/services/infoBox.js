(function(){
var pass = 0;
var appRun = false;
var currentGameStat = {
  time: 0,
  hp: 0,
  stars: 0,
  score: 0,
  mod: 1,
  currentGame: 'game'
}
var infoBox = {
  user : {
      id: 78,
      name: 'newUser',
      totalstars: 0,
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
window.getInfo = function (){
  return infoBox;
}
var getPass = function() {
  return pass;
}
window.getInfoCurrentGame = function (){
  return currentGameStat;
}
window.getInfoUser = function () {
  return infoBox.user;
}
window.saveStat = function (currentGame){
    switch (currentGame) {
      case 1:
        currentGameStat = SnowBallGame.getInfo();
        break;
      case 21:
        currentGameStat = snowPongGame.getInfo();
        break;
      case 22:
        currentGameStat = snowPongGame_2.getInfo();
        break;
      case 23:
        currentGameStat = snowPongGame_3.getInfo();
        break;
      case 24:
        currentGameStat = snowPongGame_4.getInfo();
        break;
      case 25:
        currentGameStat = snowPongGame_5.getInfo();
        break;
      case 26:
        currentGameStat = snowPongGame_6.getInfo();
        break;
      case 27:
        currentGameStat = snowPongGame_7.getInfo();
        break;
      case 28:
      currentGameStat = snowPongGame_8.getInfo();
        break;
      case 29:
      currentGameStat = snowPongGame_9.getInfo();
        break;
      case 210:
      currentGameStat = snowPongGame_10.getInfo();
        break;
    }
    // console.log(currentGameStat);
}
window.update = function (){
  VK.init(function() {
     VK.api("users.get", {"access_token": "Zg7Wppz2W21OvAXPgXTE"}, function (data) {
           //ajax запрос к checkUser.php
           var id = data.response[0].id;
           var name = data.response[0].first_name;
       $.ajax({
          type: "POST",
          dataType: "json",
          url: "checkUser.php",
          data: "id_vk=" + id + "&name=" + name,
          success: function(result){
            pass = result.pass;
            result.pass = "";
            infoBox = result;
            appRun = true;
            startAppJs ();
          }
      });
 });
  }, function() {
}, '5.69');
  //===========

  // $.ajax({
  //           type: "POST",
  //           dataType: "json",
  //           url: "checkUser.php",
  //           data: "id_vk=" + id + "&name=" + name,
  //           success: function(result){
  //             // console.log(result);
  //           pass = result.pass;
  //           result.pass = "";
  //           infoBox = result;
  //           appRun = true;
  //           // alert('hello' + result.user.name);
  //           // alert(result);
  //           //запустить приложение !!!!!!!!
  //           startAppJs ();
  //           }
  //       });
}
window.saveDb = function () {
      var statistic = currentGameStat;
      switch (statistic.currentGame) {
        case 'SnowBallGame':
          // alert('начинаем');
          var game = getInfo().game_1;
          var game_next = 'game_21';
          var table = 'game_1';
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame':
          var game =  getInfo().game_2.g_1; //путь к объекту в инфобокс
          var game_next = 'game_22'; //название таблицы следующей игры
          var table = 'game_21'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_2':
          var game = getInfo().game_2.g_2; //путь к объекту в инфобокс
          var game_next = 'game_23'; //название таблицы следующей игры
          var table = 'game_22'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_3':
          var game = getInfo().game_2.g_3; //путь к объекту в инфобокс
          var game_next = 'game_24'; //название таблицы следующей игры
          var table = 'game_23'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_4':
          var game = getInfo().game_2.g_4; //путь к объекту в инфобокс
          var game_next = 'game_25'; //название таблицы следующей игры
          var table = 'game_24'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_5':
          var game = getInfo().game_2.g_5; //путь к объекту в инфобокс
          var game_next = 'game_26'; //название таблицы следующей игры
          var table = 'game_25'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_6':
          var game = getInfo().game_2.g_6; //путь к объекту в инфобокс
          var game_next = 'game_27'; //название таблицы следующей игры
          var table = 'game_26'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_7':
          var game = getInfo().game_2.g_7; //путь к объекту в инфобокс
          var game_next = 'game_28'; //название таблицы следующей игры
          var table = 'game_27'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_8':
          var game = getInfo().game_2.g_8; //путь к объекту в инфобокс
          var game_next = 'game_29'; //название таблицы следующей игры
          var table = 'game_28'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_9':
          var game = getInfo().game_2.g_9; //путь к объекту в инфобокс
          var game_next = 'game_210'; //название таблицы следующей игры
          var table = 'game_29'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
        case 'snowPongGame_10':
          var game = getInfo().game_2.g_10; //путь к объекту в инфобокс
          var game_next = 'end'; //название таблицы следующей игры
          var table = 'game_210'; //имя таблицы игры
          checkChange(game, game_next, statistic, table);
          break;
      }
}

function checkChange (game, game_next, statistic, table){
  //играет первый раз
  // var gamePath = game.status;
  // alert(game.status);
  if (game.status == 'unstart' || game.status == 'start'){
     //ajax запрос на сохранение результатов игры
     var info = {};
     info['currentStars'] = (+statistic.stars);
     info['currentScore'] = (+statistic.score);
     info['status'] = 'over';
     info['totalStars'] = (+statistic.stars + (+infoBox.user.totalstars));
     info['method'] = 'saveNewGame';
     info['table'] = table;
     info['game_next'] = game_next;
     // alert( info['currentScore']);
     query(info);
     // queryUser(totalStars, status);
  }else if (game.status == 'over' && statistic.currentGame == 'SnowBallGame'){
    //добавляем звездочки к имеющимся
    // alert(' game_1 перезапись звезд');
    var starsCurrent = (+statistic.stars);
    var scoreCurrent = (+statistic.score);
    var starsAlready = (+infoBox.game_1.stars);
    var scoreAlready = (+infoBox.game_1.score);

    var info = {};
    info['currentStars'] =( +starsCurrent + (+starsAlready));

    info['method'] = 'saveReplayGame_1';
    info['game_next'] = game_next;
    info['table'] = table;

    if((scoreCurrent - scoreAlready) > 0){
      info['currentScore'] = scoreCurrent;
    }else {
      info['currentScore'] = scoreAlready;
    }
    info['totalStars'] = (+starsCurrent + (+infoBox.user.totalstars));
    //обновляем информацию в приложении
    // infoBox.user.totalstars = info['totalStars'];
    // alert(info['totalStars']);
    // infoBox + '.' + game + '.stars' = info['stars'];
    // infoBox + '.' + game + '.score' = info['score'];

    query(info);
  }else if (game.status == 'over' && statistic.currentGame !== 'SnowBallGame'){
    // alert(' я не там!');
    //сравниваем результат игр с имеющимся и все улучшения записываем
    var starsCurrent = statistic.stars;
    var scoreCurrent = statistic.score;

    var starsAlready = game.stars;
    var scoreAlready = game.score;

    var info = {};
    // info['stars'] = starsCurrent + starsAlready;
    // info['totalStars'] = statistic.stars + infoBox.user.totalStars;
    info['method'] = 'saveReplayGame';
    info['table'] = table;
    info['game_next'] = game_next;

    if((scoreCurrent - scoreAlready) > 0){
      info['currentScore'] = scoreCurrent;
    }else {
      info['currentScore'] = scoreAlready;
    }

    if((starsCurrent - starsAlready) > 0){
      info['currentStars'] = starsCurrent;
      info['totalStars'] = +infoBox.user.totalstars + +(starsCurrent - starsAlready);
    }else {
      info['currentStars'] = starsAlready;
      info['totalStars'] = +infoBox.user.totalstars;
    }

    //обновляем информацию в приложении
    // infoBox.user.totalstars = info['totalStars'];
  //   (infoBox + '.' + game + '.stars') = info['stars'];
  // (infoBox + '.' + game + '.score') = info['score'];

    query(info);
  }

  function query (info) {
    var id = infoBox.user.id;
    var pass = getPass();
    var data = info;
    data.id = id;
    data.pass = pass;
    // alert(pass);
    $.ajax({
              type: "POST",
              // dataType: "json",
              url: "php/saveData.php",
              // processData: false,
              dataType: "json",
              data: data,
              success: function(result){
              // infoBox.user = result.user;
              // alert (infoBox.user.name);
                // alert('запрос отправлен');
                if (result){
                    // alert('данные обновлены');
                    infoBox = result;
                    // console.log(result);
                }
                // alert( "Прибыли данные: " + msg );
              }
          });
  }

}


})();
