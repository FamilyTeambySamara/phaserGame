(function(){
  var  b_1, b_2, b_3, b_4, b_5, b_6, b_7, b_8, b_9, b_10;
  var b_music_1;
  var b_music_2;
  var buttonSong;

  var messageNotStars;
  var messageNotAccess;
  var closeButton;
  var nEnoughStar;
  window.map = {
    preload: function (){
        gameLoad().image('map','assets/img/map/map.png');
        gameLoad().spritesheet('b_1', 'assets/img/map/1.png', 70 , 70);
        gameLoad().spritesheet('b_2', 'assets/img/map/2.png', 70 , 70);
        gameLoad().spritesheet('b_3', 'assets/img/map/3.png', 70 , 70);
        gameLoad().spritesheet('b_4', 'assets/img/map/4.png', 70 , 70);
        gameLoad().spritesheet('b_5', 'assets/img/map/5.png', 70 , 70);
        gameLoad().spritesheet('b_6', 'assets/img/map/6.png', 70 , 70);
        gameLoad().spritesheet('b_7', 'assets/img/map/7.png', 70 , 70);
        gameLoad().spritesheet('b_8', 'assets/img/map/8.png', 70 , 70);
        gameLoad().spritesheet('b_9', 'assets/img/map/9.png', 70 , 70);
        gameLoad().spritesheet('b_10', 'assets/img/map/10.png', 70 , 70);
        // gameLoad().image(0, 0, 'map');
    },

    create: function (){
        buttonSong = gameAdd().audio('buttonSong');

        gameAdd().image(0, 0, 'map');
        //buttonPlay_1 = gameAdd().button(100, 250, 'button_play', this.startGame_1, this, 1, 0 ,2);
        b_1 = {};
        b_1.path = "g_1";
        b_1.but = gameAdd().button(166, 257, 'b_1', this.startGame, this, overState(b_1), outState(b_1));
        b_1.but.gameName = 'snowPongGame';
        b_1.but.anchor.setTo(0.5, 0.5);
        b_2 = {};
        b_2.path = "g_2";
        b_2.but = gameAdd().button(240, 180, 'b_2', this.startGame, this, overState(b_2), outState(b_2));
        b_2.but.gameName = 'snowPongGame_2';
        b_2.but.anchor.setTo(0.5, 0.5);
        b_3 = {};
        b_3.path = "g_3";
        b_3.but = gameAdd().button(344, 155, 'b_3', this.startGame, this, overState(b_3), outState(b_3));
        b_3.but.gameName = 'snowPongGame_3';
        b_3.but.anchor.setTo(0.5, 0.5);
        b_4 = {};
        b_4.path = "g_4";
        b_4.but = gameAdd().button(333, 230, 'b_4', this.startGame, this, overState(b_4), outState(b_4));
        b_4.but.gameName = 'snowPongGame_4';
        b_4.but.anchor.setTo(0.5, 0.5);
        b_5 = {};
        b_5.path = "g_5";
        b_5.but = gameAdd().button(344, 315, 'b_5', this.startGame, this, overState(b_5), outState(b_5));
        b_5.but.gameName = 'snowPongGame_5';
        b_5.but.anchor.setTo(0.5, 0.5);
        b_6 = {};
        b_6.path = "g_6";
        b_6.but = gameAdd().button(414, 366, 'b_6', this.startGame, this, overState(b_6), outState(b_6));
        b_6.but.gameName = 'snowPongGame_6';
        b_6.but.anchor.setTo(0.5, 0.5);
        b_7 = {};
        b_7.path = "g_7";
        b_7.but = gameAdd().button(453, 273, 'b_7', this.startGame, this, overState(b_7), outState(b_7));
        b_7.but.gameName = 'snowPongGame_7';
        b_7.but.anchor.setTo(0.5, 0.5);
        b_8 = {};
        b_8.path = "g_8";
        b_8.but = gameAdd().button(545, 300, 'b_8', this.startGame, this, overState(b_8), outState(b_8));
        b_8.but.gameName = 'snowPongGame_8';
        b_8.but.anchor.setTo(0.5, 0.5);
        b_9 = {};
        b_9.path = "g_9";
        b_9.but = gameAdd().button(646, 266, 'b_9', this.startGame, this, overState(b_9), outState(b_9));
        b_9.but.gameName = 'snowPongGame_9';
        b_9.but.anchor.setTo(0.5, 0.5);
        b_10 = {};
        b_10.path = "g_10";
        b_10.but = gameAdd().button(650, 173, 'b_10', this.startGame, this, overState(b_10), outState(b_10));
        b_10.but.gameName = 'snowPongGame_10';
        b_10.but.anchor.setTo(0.5, 0.5);

        //интерфейс и управление

        gameAdd().button(15, 15, 'arrow_2', this.goBack, this, 0, 1 ,2);
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
        //info about stars
        var infoStars = gameAdd().sprite(b_music_1.left - 35, b_music_1.centerY, 'infoStars', 2);
        infoStars.name = 'infoStars';
        infoStars.anchor.setTo(0.5, 0.5);
        var totalStarScore = gameAdd().bitmapText(infoStars.centerX + 7, infoStars.centerY + 2, 'fontStarMessage', getInfo().user.totalstars, 22);
        totalStarScore.anchor.setTo(0.5, 0.5);
        //============сообщения========================================

        messageNotStars = gameAdd().image(400,250, 'notStars');
        messageNotStars.anchor.set(0.5);
        messageNotStars.alpha = 0;
        messageNotStars.scale.set(0);

        nEnoughStar = gameAdd().bitmapText(400, 250, 'fontStarMessage', 0, 32);
        nEnoughStar.anchor.set(0.5);
        nEnoughStar.alpha = 0;
        nEnoughStar.scale.set(0);

        messageNotAccess = gameAdd().image(400,250, 'notAccess');
        messageNotAccess.anchor.set(0.5);
        messageNotAccess.alpha = 0;
        messageNotAccess.scale.set(0);

        closeButton = gameAdd().button(145, 364, 'exit_game', closeWindow, this, 1, 0 ,2);
        closeButton.kill();
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
    goBack: function (){
        buttonSong.play();
        changeState('menu_cards');
    },

    update: function (){

    },
    startGame: function(but){
        // changeState('snowPongGame');

        buttonSong.play();
        // alert(but.gameName);
        var amount = changeState(but.gameName);
        if (amount == 'notAccess'){
          showMessage(messageNotAccess);
        } else if (typeof(amount) == 'number'){
            nEnoughStar.text = amount;
            showMessage(messageNotStars);
        }
        if (changeState(but.gameName) !== 'notStars' && changeState(but.gameName) !== 'notAccess'){
          musicPlay = false;
          gameSound().stopAll();
        }else{
          if (changeState(but.gameName) == 'notStars'){
            showMessage(messageNotStars);
          }else{
            showMessage(messageNotAccess);
          }

        }

      // alert(but.marker);
    }
  }

  function outState (b) {
    var game = getInfo().game_2[b.path];

    if(game.status == 'unstart'){
      return 1;
    }else {
      return 0;
    }
  }

  function overState (b) {
    var game = getInfo().game_2[b.path];

    if(game.status == 'unstart'){
      return 2;
    }else {
      return 3;
    }
  }

  function showMessage (image){
    image.alpha = 1;
    nEnoughStar.alpha = 1;
    var anim_1 = gameAdd().tween(image.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    gameAdd().tween(image).to( { x: gameWorld().centerX, y: gameWorld().centerY }, 100,  Phaser.Easing.Linear.None, true);
    gameAdd().tween(nEnoughStar.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    gameAdd().tween(nEnoughStar).to( { x: image.centerX + 22, y: image.centerY + 42 }, 100,  Phaser.Easing.Linear.None, true);

    var animExit = function (){
      gameAdd().tween(image.scale).to( { x: 0.1, y: 0.1 }, 200, Phaser.Easing.Linear.None, true);
      gameAdd().tween(image).to( { x:gameWorld().centerX, y: gameWorld().centerY }, 100,  Phaser.Easing.Linear.None, true);
      gameAdd().tween(image).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);

      nEnoughStar.alpha = 0;
      nEnoughStar.scale.setTo(0,0);
    }

    anim_1.onComplete.addOnce(function (){
      var cordX = image.right - 15;
      var cordY = image.top + 15;

      closeButton.reset(cordX, cordY);
      closeButton.anchor.setTo(0.5, 0.5);
      closeButton.animation = animExit;
    })
  }

  function closeWindow (b){
    b.animation();
    b.kill();
  }
}())
