(function (){
  var buttonSong ;
  var  music;
window.menu_cards = {
    preload: function (){

    },

    create: function (){
      music = gameAdd().audio('cristmas');
      music.loopFull();
      buttonSong = gameAdd().audio('buttonSong');

      var  mainLayout = gameAdd().image(0, 0, 'menu');

      buttonPlay_1 = gameAdd().button(100, 250, 'button_play', this.startGame_1, this, 1, 0 ,2);
      buttonPlay_1.anchor.setTo(0.5, 0.5);

      buttonPlay_2 = gameAdd().button(400, 250, 'button_play', this.startGame_2, this, 1, 0 ,2);
      buttonPlay_2.anchor.setTo(0.5, 0.5);

      buttonPlay_3 = gameAdd().button(700, 250, 'button_play', this.startGame_3, this, 1, 0 ,2);
      buttonPlay_3.anchor.setTo(0.5, 0.5);
    },

    startGame_1: function ()
    {
      buttonSong.volume = 0.6;
      buttonSong.play();

      var status = getInfo().game_1.status;
      var access = getInfo().game_1.access;
      changeLevel(1);
      if (status == 'unstart' && access){
          changeState('presentSnowBallGames');
      } else if ((status == 'start' || status == 'over') && access){
          changeState('SnowBallGame');
      }
      //this.animationTransition();

      gameSound().stopAll();

    },

    startGame_2: function ()
    {
      alert('здесь будех переход карту');
      var status = getInfo().game_2.g_1.status;
      var access = getInfo().game_2.g_1.access;
      //временный переход

      //==
      if (status == 'unstart' && access == 1){
        //перейти к презентации
        changeState('map');
        // changeState('presentSnowPongGame');
          // this.state.start('presentGame_2');
      } else if ((status == 'start' || status == 'over') && access == 1){
        //перети к карте
        changeState('map');
          // this.state.start('SnowBallGame');
      }else {
        alert('нет доступа к игре');
      }
      //this.animationTransition();
      buttonSong.volume = 0.6;
      buttonSong.play();
      //обращени к менеджеру
      gameSound().stopAll();

    },

    startGame_3: function ()
    {

      alert('находится в разработке!');
      // var status = getInfoUser().game_1.status;
      // var access = getInfoUser().game_1.access;
      //
      // if (status == 'unstart' && access){
      //     this.state.start('presentSnowBallGames');
      // } else if ((status == 'start' || status == 'over') && access){
      //     this.state.start('SnowBallGame');
      // }
      // //this.animationTransition();
      // buttonSong.volume = 0.6;
      // buttonSong.play();

    },
}
})();
