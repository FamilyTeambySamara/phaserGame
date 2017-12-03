var loadingBar;
var Preload = {

    preload: function () {
      loadingBar = game.add.sprite(250, 250, 'loading_bar');
      loadingBar.anchor.setTo(0, 0.5);

      game.load.setPreloadSprite(loadingBar, 0);

      var loadingText = this.game.add.bitmapText(410, 150, 'ds_digital', 'loading...', 72);
      loadingText.anchor.setTo(0.5, 0.5);


      game.load.image('test_0', 'https://upload.wikimedia.org/wikipedia/commons/c/cd/View_from_connors_hill_panorama.jpg');
      //game.load.image('test_1', 'http://photoblogstop.com/wp-content/uploads/2012/07/Sierra_HDR_Panorama_DFX8048_2280x819_Q40_wm_mini.jpg');
      game.load.image('test_2', 'http://www.larkinweb.co.uk/panoramas/lake_placid/Lake_Placid_south_medium_res_panorama.jpg');
      //game.load.image('test_3', 'http://peraalto.se/wp-content/uploads/2013/03/PanoramaRaps.jpg');
    //  game.load.image('test_4', 'http://parkerlab.bio.uci.edu/pictures/photography%20pictures/2008_12_19_select/Untitled_Panorama1.jpg');

    game.load.image('menu', 'assets/img/menuWrapper.png');
    game.load.spritesheet('button', 'assets/img/button_sprite.png', 193 , 71);
    game.load.image('Game_over', 'assets/img/menu_over.png');
    game.load.image('moon', 'assets/img/moon.png');



    //делаем снежок
    game.load.spritesheet('snow_small', 'assets/img/snowflakes.png', 17, 17);
    game.load.spritesheet('star', 'assets/img/star.png', 50, 50);
    game.load.spritesheet('snow_big', 'assets/img/snowflakes_large.png', 64, 64);
    //Добавлем музыку

    game.load.audio('throw', 'assets/audio/throw_2.wav');
    game.load.audio('snowBallGame_mainTrack', 'assets/audio/snowBallGame.mp3');

    },

    create: function() {

      //console.log('%cSTATE::PRELOAD', 'color: #fff; background: #0f0;');

      game.state.start('Menu');
 }
}
