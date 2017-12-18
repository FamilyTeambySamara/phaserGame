(function (){
  var buttonSong ;
  var  music;

  var card_1;
  var card_2;
  var card_3;

  var b1_history;
  var b2_history;
  var b3_history;

  var b1_post;
  var b2_post;
  var b3_post;

  var b1_reit;
  var b2_reit;
  var b3_reit;

  var b1_ruls;
  var b2_ruls;
  var b3_ruls;
  var back_emitter;

  var b_info;
  var b_music_1;
  var b_music_2;
  var infoStars;
  var likeVk;
  window.musicPlay = false;
window.menu_cards = {
    preload: function (){
        gameLoad().image('cardsFon', 'assets/img/menuCards/menuCardsFon.png');
        gameLoad().image('card_1', 'assets/img/menuCards/Card1_2.png');
        gameLoad().image('card_1_2', 'assets/img/menuCards/Card1_1.png');
        gameLoad().image('card_2', 'assets/img/menuCards/Card2_2.png');
        gameLoad().image('card_2_2', 'assets/img/menuCards/Card2_1.png');
        gameLoad().image('card_3', 'assets/img/menuCards/Card3_2.png');

        gameLoad().spritesheet('b_info', 'assets/img/menuCards/seeInfo.png', 50 , 50);
        gameLoad().spritesheet('b_music', 'assets/img/menuCards/offSound.png', 50 , 50);
        gameLoad().spritesheet('infoStars', 'assets/img/menuCards/seeStarts.png', 50 , 50);
        gameLoad().spritesheet('likeVk', 'assets/img/menuCards/doRepost.png', 50 , 50);

        gameLoad().spritesheet('button_history', 'assets/img/menuCards/HistoryCard.png', 70 , 20);
        gameLoad().spritesheet('button_play_cards', 'assets/img/menuCards/PlayCard.png', 150 , 80);

        gameLoad().spritesheet('button_post_1', 'assets/img/menuCards/giveCard.png', 50 , 50);
        gameLoad().spritesheet('button_reit_1', 'assets/img/menuCards/seeTop.png', 50 , 50);
        gameLoad().spritesheet('button_ruls_1', 'assets/img/menuCards/seeRegulation.png', 50 , 50);
    },

    create: function (){
      //музыка
      music = gameAdd().audio('cristmas');
      if(!musicPlay){
          music.loopFull();
          musicPlay = true;
      }
      buttonSong = gameAdd().audio('buttonSong');
      //============================
      // фон
      gameAdd().image(0, 0, 'cardsFon');

      //snow
      back_emitter = this.add.emitter(gameWorld().centerX, -32, 5200);
      back_emitter.makeParticles('snow_small', [0, 1, 2, 3, 4, 5]);
      back_emitter.maxParticleScale = 0.6;
      back_emitter.minParticleScale = 0.2;
      back_emitter.setYSpeed(20, 100);
      back_emitter.gravity = 0;
      back_emitter.width = gameWorld().width * 1.5;
      back_emitter.minRotation = 0;
      back_emitter.maxRotation = 40;

      back_emitter.start(false, 14000, 20);
      //======================================
      //карточки
      if (getInfo().game_1.status == 'over'){
        card_1 = gameAdd().image(145, 240, 'card_1_2');
      }else {
        card_1 = gameAdd().image(145, 240, 'card_1');
      }
      card_1.anchor.setTo(0.5, 0.5);
      if (getInfo().game_2.g_1.status == 'over'){
          card_2 = gameAdd().image(400, 240, 'card_2_2');
      }else {
          card_2 = gameAdd().image(400, 240, 'card_2');
      }
      card_2.anchor.setTo(0.5, 0.5);
      card_3 = gameAdd().image(655, 240, 'card_3');
      card_3.anchor.setTo(0.5, 0.5);
      //================================

      // Кнопки запуска игры
      buttonPlay_1 = gameAdd().button(145, 364, 'button_play_cards', this.startGame_1, this, 3, 1 ,2);
      buttonPlay_1.anchor.setTo(0.5, 0.5);
      buttonPlay_2 = gameAdd().button(400, 364, 'button_play_cards', this.startGame_2, this, 3, 1 ,2);
      buttonPlay_2.anchor.setTo(0.5, 0.5);
      buttonPlay_3 = gameAdd().button(655, 364, 'button_play_cards', this.startGame_3, this, 3, 1 ,2);
      buttonPlay_3.anchor.setTo(0.5, 0.5);
      //============================
      b1_history = gameAdd().button(143, 319,'button_history', this.startPresent, this, 0, 2, 1);
      b1_history.present = 1;
      b1_history.anchor.setTo(0.5, 0.5);
      b2_history = gameAdd().button(400, 319,'button_history', this.startPresent, this, 0, 2, 1);
      b1_history.present = 2;
      b2_history.anchor.setTo(0.5, 0.5);
      b3_history = gameAdd().button(655, 319,'button_history', this.startPresent, this, 0, 2, 1);
      b1_history.present = 3;
      b3_history.anchor.setTo(0.5, 0.5);

      //кнопки интерфейс
      b1_post = gameAdd().button(80, 130,'button_post_1', this.postPicture, this, 0, 2, 1);
      b1_post.anchor.setTo(0.5, 0.5);
      b1_post.post = 1;
      b2_post = gameAdd().button(335, 130,'button_post_1', this.postPicture, this, 0, 2, 1);
      b2_post.anchor.setTo(0.5, 0.5);
      b2_post.post = 2;
      b3_post = gameAdd().button(590, 130,'button_post_1', this.postPicture, this, 0, 2, 1);
      b3_post.anchor.setTo(0.5, 0.5);
      b3_post.post = 3;

      b1_reit = gameAdd().button(80, 180,'button_reit_1', this.showReit, this, 0, 2, 1);
      b1_reit.anchor.setTo(0.5, 0.5);
      b1_reit.nGame = 1;
      b2_reit = gameAdd().button(335, 180,'button_reit_1', this.showReit, this, 0, 2, 1);
      b2_reit.anchor.setTo(0.5, 0.5);
      b2_reit.nGame = 2;
      b3_reit = gameAdd().button(590, 180,'button_reit_1', this.showReit, this, 0, 2, 1);
      b3_reit.anchor.setTo(0.5, 0.5);
      b3_reit.nGame = 3;

      b1_ruls = gameAdd().button(80, 230,'button_ruls_1', this.showRuls, this, 0, 2, 1);
      b1_ruls.anchor.setTo(0.5, 0.5);
      b1_ruls.nGame = 1;
      b2_ruls = gameAdd().button(335, 230,'button_ruls_1', this.showRuls, this, 0, 2, 1);
      b2_ruls.anchor.setTo(0.5, 0.5);
      b2_ruls.nGame = 2;
      b3_ruls = gameAdd().button(590, 230,'button_ruls_1', this.showRuls, this, 0, 2, 1);
      b3_ruls.anchor.setTo(0.5, 0.5);
      b3_ruls.nGame = 3;

      b_info = gameAdd().button(692, 40, 'b_info', this.showInfoGame, this,  1, 2 , 0);
      b_info.anchor.setTo(0.5, 0.5);
      likeVk = gameAdd().button(58, 40, 'likeVk', this.doLike, this,  0, 2, 1);
      likeVk.anchor.setTo(0.5, 0.5);
      infoStars = gameAdd().sprite(108, 40, 'infoStars');
      infoStars.anchor.setTo(0.5, 0.5);

      //управление музыкой==========================
      b_music_1 = gameAdd().button(742, 40, 'b_music', this.turnMusic, this,  0, 2 ,1);
      b_music_1.anchor.setTo(0.5, 0.5);

      b_music_2 = gameAdd().button(742, 40, 'b_music', this.turnMusic, this, 3, 5 ,4);
      b_music_2.anchor.setTo(0.5, 0.5);

      if(!gameSound().mute){
          b_music_2.kill();
      }else{
          b_music_1.kill();
      }
      //=============================================================

    },
    showInfoGame: function (){
        alert('Правила игры');
    },
    turnMusic: function (){
      // gameSound().mute = true;
      if(!gameSound().mute){
        gameSound().mute = true;
        b_music_1.kill();
        b_music_2.reset(742, 40);
      }else {
        gameSound().mute = false;
        b_music_2.kill();
        b_music_1.reset(742, 40);
      }
    },
    doLike: function (){
      alert('лайкнуть игру');
    },
    showRuls: function (b){
      alert('правилы для игры: ' + b.nGame);
    },
    showReit: function (b) {
      alert('рейтинг для игры: ' + b.nGame);
    },
    postPicture: function (b){
        alert ('отправка открытки: ' + b.post);
    },
    startPresent: function (b){
        switch (b.present) {
          case 1:
            changeState('presentSnowBallGame');
            break;
          case 2:
            // changeState('presentSnowPongGame');
            alert('в разаработке');


        }
    },

    startGame_1: function ()
    {
      buttonSong.volume = 0.6;
      buttonSong.play();
      musicPlay = false;

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
      // alert('здесь будех переход карту');
      var status = getInfo().game_2.g_1.status;
      var access = getInfo().game_2.g_1.access;
      //временный переход

      //==
      if (status == 'unstart' && access == 1){
        //перейти к презентации
        // changeState('presentSnowPongGame');
        changeState('map');

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
      // gameSound().stopAll();

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
