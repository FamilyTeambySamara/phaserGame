var loadingBar;
var Preload = {

    preload: function () {
      loadingBar = game.add.sprite(250, 250, 'loading_bar');
      loadingBar.anchor.setTo(0, 0.5);

      game.load.setPreloadSprite(loadingBar, 0);

      var loadingText = this.game.add.bitmapText(410, 150, 'ds_digital', 'loading...', 72);
      loadingText.anchor.setTo(0.5, 0.5);


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

    },

    create: function() {

      //console.log('%cSTATE::PRELOAD', 'color: #fff; background: #0f0;');
      // if (trigger = 'snowBallGame'){
      //       game.state.start('SnowBallGame');
      // } else if ()
      game.state.start('Menu');
 }
}
