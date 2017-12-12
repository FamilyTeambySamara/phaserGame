(function(){
var infoBox = {
  currentGameStat : {
    time: 0,
    hp: 0,
    stars: 0,
    score: 0,
    mod: 1,
    currentGame: 'game'
  },
  user : {
      name: 'newUser',
      totalScore: 0,
      totalStars: 0,
      totalTime: 0,
      //Информация по игре 1
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
})();
