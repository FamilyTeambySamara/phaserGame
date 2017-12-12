(function (){
  var buttonSong ;
  var  music;
window.menu_cards = {
    preload: function (){

    },

    create: function (){
      music = game.add.audio('cristmas');
        music.loopFull();
      buttonSong = game.add.audio('buttonSong');

      var  mainLayout = this.add.image(0, 0, 'menu');

      buttonPlay_1 = this.add.button(100, 250, 'button_play', this.startGame_1, this, 1, 0 ,2);
      buttonPlay_1.anchor.setTo(0.5, 0.5);

      buttonPlay_2 = this.add.button(400, 250, 'button_play', this.startGame_2, this, 1, 0 ,2);
      buttonPlay_2.anchor.setTo(0.5, 0.5);

      buttonPlay_3 = this.add.button(700, 250, 'button_play', this.startGame_3, this, 1, 0 ,2);
      buttonPlay_3.anchor.setTo(0.5, 0.5);
    },

    startGame_1: function ()
    {
      buttonSong.volume = 0.6;
      buttonSong.play();

      var status = getInfoUser().game_1.status;
      var access = getInfoUser().game_1.access;
      changeLevel(3);
      if (status == 'unstart' && access){
          this.state.start('presentSnowBallGames');
      } else if ((status == 'start' || status == 'over') && access){
          this.state.start('SnowBallGame');
      }
      //this.animationTransition();

      game.sound.stopAll();

    },

    startGame_2: function ()
    {
      alert('здесь будех переход карту');
      var status = getInfoUser().game_1.status;
      var access = getInfoUser().game_1.access;
      //временный переход
        this.state.start('snowPongGame');
      //==
      if (status == 'unstart' && access){
        //перейти к презентации
          // this.state.start('presentGame_2');
      } else if ((status == 'start' || status == 'over') && access){
        //перети к карте
          // this.state.start('SnowBallGame');
      }
      //this.animationTransition();
      buttonSong.volume = 0.6;
      buttonSong.play();
      game.sound.stopAll();

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
