var loadingBar;
var Preload = {

    preload: function () {

      // var loading_line = game.add.image(400, 250, 'loading_fon');
      // loading_line.anchor.setTo(0.5, 0.5);

      var loading_fon = game.add.image(220, 290, 'loading_fon');
      loading_fon.anchor.setTo(0, 0.5);

      loadingBar = game.add.sprite(220 , 290, 'loading_bar');
      loadingBar.anchor.setTo(0, 0.5);

      game.load.setPreloadSprite(loadingBar, 0);

      // var loadingText = this.game.add.bitmapText(410, 150, 'ds_digital', 'loading...', 72);
      // loadingText.anchor.setTo(0.5, 0.5);
    game.load.audio('wind',  'assets/audio/wind.wav');
    game.load.audio('buttonSong',  'assets/audio/button.wav');
    game.load.spritesheet('button_play', 'assets/img/button_sprite3.png', 193 , 71);
    game.load.spritesheet('button_out', 'assets/img/button_sprite4.png', 193 , 71);

    game.load.image('menu', 'assets/img/menuWrapper.png');
    game.load.spritesheet('button', 'assets/img/button_sprite.png', 193 , 71);
    game.load.spritesheet('arrow', 'assets/img/button_sprite1.png', 193 , 71);
    game.load.spritesheet('arrow_2', 'assets/img/button_sprite2.png', 193 , 71);
    game.load.image('Game_over', 'assets/img/menu_over.png');
    game.load.image('moon', 'assets/img/moon.png');

    //win and loos
    game.load.spritesheet('menuWin', 'assets/img/menuTruo.png', 350 , 171);

    //делаем снежок
    game.load.spritesheet('snow_small', 'assets/img/snowflakes.png', 17, 17);
    // game.load.spritesheet('star', 'assets/img/star.png', 50, 50);
    game.load.spritesheet('snow_big', 'assets/img/snowflakes_large.png', 64, 64);
    //Добавлем музыку

    game.load.audio('throw', 'assets/audio/throw_2.wav');
    game.load.audio('snowBallGame_mainTrack', 'assets/audio/snowBallGame.mp3');
    game.load.audio('happySong', 'assets/audio/HappySong.mp3');



    //для snowBalls
    game.load.audio('harmPolar', 'assets/audio/harmPolar_4.mp3');
    game.load.audio('clap', 'assets/audio/clap_2.mp3');
    game.load.audio('hitPinguin', 'assets/audio/hitPinguin.wav');
    game.load.audio('starSong', 'assets/audio/bell.mp3');

    //
    game.load.spritesheet('simplePolarMan', 'assets/img/Morty.png', 96, 76);
    game.load.spritesheet('smartPolarMan', 'assets/img/Morty2.png', 96, 76);
    game.load.spritesheet('bigPolarMan', 'assets/img/Poo.png', 143.75, 115);
    game.load.spritesheet('bet', 'assets/img/Pingvin.png', 50, 78);

    // game.load.spritesheet('throwSimpleMan', 'assets/img/throwSimpleMan.jpg', 60, 79);

    game.load.image('ball', 'assets/img/ball.png');
    game.load.image('mainLayer', 'assets/img/snowBall_mainLayer.png');
    game.load.image('bigSnow', 'assets/img/bigSnow.png');
    game.load.image('smallSnow', 'assets/img/smallSnow.png');
    game.load.image('midleSnow', 'assets/img/midleSnow.png');
    game.load.image('refuse', 'assets/img/refuse.png');
    game.load.image('underLyaer', 'assets/img/endFonMenu.png');

    game.load.spritesheet('HartBar', 'assets/img/heartmenu.png', 40, 40);
    game.load.spritesheet('star', 'assets/img/stars.png', 49, 50);
    game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);
    game.load.spritesheet('bigSnowBaall', 'assets/img/bigSnowBaall.png', 110, 110);
    game.load.spritesheet('starBar', 'assets/img/startmenu.png', 40, 40);
    game.load.spritesheet('timeBar', 'assets/img/clockmenu.png', 40, 40);

    game.load.spritesheet('button_again', 'assets/img/button_sprite5.png', 193 , 71);
    //============

    },

    create: function() {

      //console.log('%cSTATE::PRELOAD', 'color: #fff; background: #0f0;');
      // if (trigger = 'snowBallGame'){
      //       game.state.start('SnowBallGame');
      // } else if ()
    //  game.state.start('Menu');
      game.state.start('snowPongGame');
 }
}
