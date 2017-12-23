(function (){
  var loadingBar;
  var loadText;
  window.Preload = {

    preload: function () {
        // var loading_line = gameAdd().image(400, 250, 'loading_fon');
        // loading_line.anchor.setTo(0.5, 0.5);

      var loading_fon = gameAdd().image(220, 290, 'loading_fon');
      loading_fon.anchor.setTo(0, 0.5);

      loadingBar = gameAdd().sprite(220 , 290, 'loading_bar');
      loadingBar.anchor.setTo(0, 0.5);

      loadText = gameAdd().image(420, 220, 'load_text');
      loadText.anchor.setTo(0.5, 0.5);

      gameLoad().setPreloadSprite(loadingBar, 0);

          // var loadingText = this.gameAdd().bitmapText(410, 150, 'ds_digital', 'loading...', 72);
          // loadingText.anchor.setTo(0.5, 0.5);
      gameLoad().audio('wind',  'assets/audio/wind.wav');
      gameLoad().audio('buttonSong',  'assets/audio/button.wav');
      gameLoad().spritesheet('button_play', 'assets/img/button_sprite3.png', 193 , 71);
      gameLoad().spritesheet('button_out', 'assets/img/button_sprite4.png', 193 , 71);

      gameLoad().image('menu', 'assets/img/menuWrapper.png');
      gameLoad().spritesheet('button', 'assets/img/button_sprite.png', 193 , 71);
      gameLoad().spritesheet('arrow', 'assets/img/button_sprite1.png', 193 , 71);
      gameLoad().spritesheet('arrow_2', 'assets/img/button_sprite2.png', 193 , 71);
      gameLoad().image('Game_win', 'assets/img/menu_over.png');
      gameLoad().image('Game_over', 'assets/img/menu_over2.png');
      gameLoad().image('moon', 'assets/img/moon.png');

      gameLoad().spritesheet('easy', 'assets/img/button_sprite7.png', 193 , 71);
      gameLoad().spritesheet('middle', 'assets/img/button_sprite8.png', 193 , 71);
      gameLoad().spritesheet('difficult', 'assets/img/button_sprite9.png', 193 , 71);
      gameLoad().spritesheet('button_cont', 'assets/img/button_sprite6.png', 193 , 71);


        //win and loos
      gameLoad().spritesheet('menuWin', 'assets/img/menuTruo.png', 350 , 171);

        //делаем снежок
      gameLoad().spritesheet('snow_small', 'assets/img/snowflakes.png', 17, 17);
        // game.load.spritesheet('star', 'assets/img/star.png', 50, 50);
      gameLoad().spritesheet('snow_big', 'assets/img/snowflakes_large.png', 64, 64);
        //Добавлем музыку

      gameLoad().audio('throw', 'assets/audio/throw_2.wav');
      gameLoad().audio('snowBallGame_mainTrack', 'assets/audio/snowBallGame.mp3');
      gameLoad().audio('happySong', 'assets/audio/HappySong.mp3');



        //для snowBalls
      gameLoad().audio('harmPolar', 'assets/audio/harmPolar_4.mp3');
      gameLoad().audio('clap', 'assets/audio/clap_2.mp3');
      gameLoad().audio('hitPinguin', 'assets/audio/hitPinguin.wav');
      gameLoad().audio('starSong', 'assets/audio/bell.mp3');
      //button
      gameLoad().audio('pushSmall', 'assets/audio/button/NFF-clog-up.wav');
      gameLoad().audio('message', 'assets/audio/button/NFF-slowdown.wav');
        //
      gameLoad().spritesheet('simplePolarMan', 'assets/img/Morty.png', 96, 76);
      gameLoad().spritesheet('smartPolarMan', 'assets/img/Morty2.png', 96, 76);
      gameLoad().spritesheet('bigPolarMan', 'assets/img/Poo.png', 143.75, 115);
      gameLoad().spritesheet('bet', 'assets/img/Pingvin.png', 50, 78);

        // game.load.spritesheet('throwSimpleMan', 'assets/img/throwSimpleMan.jpg', 60, 79);

      gameLoad().image('ball', 'assets/img/ball.png');
      gameLoad().image('mainLayer', 'assets/img/snowBall_mainLayer.png');
      gameLoad().image('bigSnow', 'assets/img/bigSnow.png');
      gameLoad().image('smallSnow', 'assets/img/smallSnow.png');
      gameLoad().image('midleSnow', 'assets/img/midleSnow.png');
      gameLoad().image('refuse', 'assets/img/refuse.png');
      gameLoad().image('underLyaer', 'assets/img/endFonMenu.png');

      gameLoad().spritesheet('HartBar', 'assets/img/heartmenu.png', 40, 40);
      gameLoad().spritesheet('star', 'assets/img/stars.png', 49, 50);
      gameLoad().spritesheet('kaboom', 'assets/img/explode.png', 128, 128);
      gameLoad().spritesheet('bigSnowBaall', 'assets/img/bigSnowBaall.png', 110, 110);
      gameLoad().spritesheet('starBar', 'assets/img/startmenu.png', 40, 40);
      gameLoad().spritesheet('timeBar', 'assets/img/clockmenu.png', 40, 40);

      gameLoad().spritesheet('button_again', 'assets/img/button_sprite5.png', 193 , 71);
        //============
      gameLoad().spritesheet('exit_game', 'assets/img/menuCards/exitGame.png', 50 , 50);
      gameLoad().spritesheet('replay_game', 'assets/img/menuCards/RepeatGame.png', 50 , 50);

      gameLoad().spritesheet('exit_game_new', 'assets/img/menuCards/main/exitGame.png', 40 , 40);
      gameLoad().spritesheet('replay_game_new', 'assets/img/menuCards/main/RepeatGame.png', 40 , 40);
      gameLoad().spritesheet('turnSound_new', 'assets/img/menuCards/main/offSound.png', 40 , 40);
      gameLoad().image('underLyaerInGame', 'assets/img/menuCards/main/endFonMenu2.png');

        //значки для игре//=============
      //menu_cards
      gameLoad().image('cardsFon', 'assets/img/menuCards/menuCardsFon.png');
      gameLoad().image('card_1', 'assets/img/menuCards/Card1_2.png');
      gameLoad().image('card_1_2', 'assets/img/menuCards/Card1_1.png');
      gameLoad().image('card_2', 'assets/img/menuCards/Card2_2.png');
      gameLoad().image('card_2_2', 'assets/img/menuCards/Card2_1.png');
      gameLoad().image('card_3', 'assets/img/menuCards/Card3_2.png');

      gameLoad().spritesheet('b_info', 'assets/img/menuCards/seeInfo.png', 50 , 50);
      gameLoad().spritesheet('b_music', 'assets/img/menuCards/offSound.png', 50 , 50);
      gameLoad().spritesheet('infoStars', 'assets/img/menuCards/seeStarts2.png', 100 , 50);
      gameLoad().spritesheet('likeVk', 'assets/img/menuCards/doRepost.png', 50 , 50);

      gameLoad().spritesheet('button_history', 'assets/img/menuCards/HistoryCard.png', 70 , 20);
      gameLoad().spritesheet('button_play_cards', 'assets/img/menuCards/PlayCard.png', 150 , 80);

      gameLoad().spritesheet('button_post_1', 'assets/img/menuCards/giveCard.png', 50 , 50);
      gameLoad().spritesheet('button_reit_1', 'assets/img/menuCards/seeTop.png', 50 , 50);
      gameLoad().spritesheet('button_ruls_1', 'assets/img/menuCards/seeRegulation.png', 50 , 50);
      },

      create: function() {

        //console.log('%cSTATE::PRELOAD', 'color: #fff; background: #0f0;');
        // if (trigger = 'snowBallGame'){
              // changeLevel(3);
              // game.state.start('SnowBallGame');
        // } else if ()
      //  game.state.start('Menu');
        // game.state.start('snowPongGame');

        //
        if (getInfo().game_1.status == 'unstart'){
          changeState('animBegin');
        }else {
          changeState('menu_cards');
          // changeState('snowPongGame_10');
        }

        // changeState('animBegin');

        // changeState('menu_cards');
   }
  }
}())
