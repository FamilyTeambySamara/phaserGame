(function (){
  window.menuDialog = false;
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
  var rulsText_1;
  var rulsText_2;
  var rulsText_3;
  var back_emitter;

  var butGroup_1;
  var butGroup_2;
  var butGroup_3;

  var b_info;
  var b_music_1;
  var b_music_2;
  var infoStars;
  var likeVk;

  var bChangeLevel_1;
  var bChangeLevel_2;
  var bChangeLevel_3;
  var windowFor1game;

  var infoRuls;
  var closeButton;
  var messageNotTime;
  var messageNotAccess;
  window.musicPlay = false;
window.menu_cards = {
    preload: function (){
      gameLoad().image('infoRuls', 'assets/img/rules/rulesAll.png');
      gameLoad().image('window', 'assets/img/message/windowFor1game.png');
      gameLoad().image('rules2', 'assets/img/rules/rules1.png');
      gameLoad().image('rules1', 'assets/img/rules/rules2.png');

      gameLoad().image('notAccess', 'assets/img/message/message1.png');
      gameLoad().image('notTime', 'assets/img/message/message3.png');
      // gameLoad().image('notAccess', 'assets/img/message/message1.png');
      // gameLoad().image('rules1', 'assets/img/rules/rules1.png');
    },

    create: function (){
      //музыка
      music = gameAdd().audio('cristmas');
      if(!musicPlay){
          music.loopFull();
          musicPlay = true;
      }
      buttonSong = gameAdd().audio('buttonSong');
      buttonSong.volume = 0.6;
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
        card_1 = gameAdd().image(145, -150, 'card_1_2');
      }else {
        card_1 = gameAdd().image(145, -150, 'card_1');
      }
      card_1.anchor.setTo(0.5, 0.5);
      if (getInfo().game_2.g_10.status == 'over'){
          card_2 = gameAdd().image(400, 650, 'card_2_2');
      }else {
          card_2 = gameAdd().image(400, 650, 'card_2');
      }
      card_2.anchor.setTo(0.5, 0.5);
      card_3 = gameAdd().image(655, -150, 'card_3');
      card_3.anchor.setTo(0.5, 0.5);
      //================================

      // Кнопки запуска игры
      butGroup_1 = gameAdd().group();
      butGroup_2 = gameAdd().group();
      butGroup_3 = gameAdd().group();

      windowFor1game = gameAdd().image(0,0, 'window');
      windowFor1game.kill();
      buttonPlay_1 = gameAdd().button(145, 364, 'button_play_cards', this.startGame_1_anim, this, 3, 1 ,2);
      buttonPlay_1.anchor.setTo(0.5, 0.5);
      butGroup_1.add(buttonPlay_1);
        bChangeLevel_1 = gameAdd().button(145, 364, 'easy', this.startGame_1, this, 1, 0, 2);
        bChangeLevel_1.anchor.setTo(0.5, 0.5);
        bChangeLevel_1.alpha = 0;
        bChangeLevel_1.level = 1;
        bChangeLevel_2 = gameAdd().button(145, 364, 'middle', this.startGame_1, this, 0, 1, 2);
        bChangeLevel_2.anchor.setTo(0.5, 0.5);
        bChangeLevel_2.level = 2;
        bChangeLevel_3 = gameAdd().button(145, 364, 'difficult', this.startGame_1, this, 1, 2 , 0);
        bChangeLevel_3.anchor.setTo(0.5, 0.5);
        bChangeLevel_3.level = 3;
        bChangeLevel_1.kill();
        bChangeLevel_2.kill();
        bChangeLevel_3.kill();



      buttonPlay_2 = gameAdd().button(400, 364, 'button_play_cards', this.startGame_2, this, 3, 1 ,2);
      buttonPlay_2.anchor.setTo(0.5, 0.5);
      butGroup_1.add(buttonPlay_2);
      buttonPlay_3 = gameAdd().button(655, 364, 'button_play_cards', this.startGame_3, this, 3, 1 ,2);
      buttonPlay_3.anchor.setTo(0.5, 0.5);
      butGroup_1.add(buttonPlay_3);
      //============================
      b1_history = gameAdd().button(143, 319,'button_history', this.startPresent, this, 0, 2, 1);
      b1_history.present = 1;
      b1_history.anchor.setTo(0.5, 0.5);
      butGroup_1.add(b1_history);
      b2_history = gameAdd().button(400, 319,'button_history', this.startPresent, this, 0, 2, 1);
      b2_history.present = 2;
      b2_history.anchor.setTo(0.5, 0.5);
      butGroup_1.add(b2_history);
      b3_history = gameAdd().button(655, 319,'button_history', this.startPresent, this, 0, 2, 1);
      b3_history.present = 3;
      b3_history.anchor.setTo(0.5, 0.5);
      butGroup_1.add(b3_history);

      //кнопки интерфейс
      b1_post = gameAdd().button(80, 130,'button_post_1', this.postPicture, this, 0, 2, 1);
      b1_post.anchor.setTo(0.5, 0.5);
      b1_post.post = 1;
      butGroup_2.add(b1_post);
      b2_post = gameAdd().button(335, 130,'button_post_1', this.postPicture, this, 0, 2, 1);
      b2_post.anchor.setTo(0.5, 0.5);
      b2_post.post = 2;
      butGroup_2.add(b2_post);
      b3_post = gameAdd().button(590, 130,'button_post_1', this.postPicture, this, 0, 2, 1);
      b3_post.anchor.setTo(0.5, 0.5);
      b3_post.post = 3;
      butGroup_2.add(b3_post);

      b1_reit = gameAdd().button(80, 180,'button_reit_1', this.showReit, this, 0, 2, 1);
      b1_reit.anchor.setTo(0.5, 0.5);
      b1_reit.nGame = 1;
      butGroup_2.add(b1_reit);
      b2_reit = gameAdd().button(335, 180,'button_reit_1', this.showReit, this, 0, 2, 1);
      b2_reit.anchor.setTo(0.5, 0.5);
      b2_reit.nGame = 2;
      butGroup_2.add(b2_reit);
      b3_reit = gameAdd().button(590, 180,'button_reit_1', this.showReit, this, 0, 2, 1);
      b3_reit.anchor.setTo(0.5, 0.5);
      b3_reit.nGame = 3;
      butGroup_2.add(b3_reit);

      //правила игры
      b1_ruls = gameAdd().button(80, 230,'button_ruls_1', this.showRuls, this, 0, 2, 1);
      b1_ruls.anchor.setTo(0.5, 0.5);
      b1_ruls.nGame = 1;
      butGroup_2.add(b1_ruls);
      b2_ruls = gameAdd().button(335, 230,'button_ruls_1', this.showRuls, this, 0, 2, 1);
      b2_ruls.anchor.setTo(0.5, 0.5);
      b2_ruls.nGame = 2;
      butGroup_2.add(b2_ruls);
      b3_ruls = gameAdd().button(590, 230,'button_ruls_1', this.showRuls, this, 0, 2, 1);
      b3_ruls.anchor.setTo(0.5, 0.5);
      b3_ruls.nGame = 3;
      butGroup_2.add(b3_ruls);

      rulsText_1 = gameAdd().sprite(80, 230, 'rules1');
      rulsText_1.alpha = 0;
      rulsText_1.scale.setTo(0.1, 0.1);
      rulsText_1.anchor.setTo(0.5, 0.5);
      rulsText_1.windowSize = 'full';

      rulsText_2 = gameAdd().sprite(80, 230, 'rules2');
      rulsText_2.alpha = 0;
      rulsText_2.scale.setTo(0.1, 0.1);
      rulsText_2.anchor.setTo(0.5, 0.5);
      rulsText_2.windowSize = 'full';

      messageNotTime = gameAdd().sprite(80, 230, 'notTime');
      messageNotTime.alpha = 0;
      messageNotTime.scale.setTo(0.1, 0.1);
      messageNotTime.anchor.setTo(0.5, 0.5);
      messageNotTime.windowSize = 'small';

      b1_ruls.infoCard = rulsText_1;
      b2_ruls.infoCard = rulsText_2;
      b3_ruls.infoCard = messageNotTime;

      //===============================================

      b_info = gameAdd().button(692, 40, 'b_info', this.showInfoGame, this,  1, 2 , 0);
      b_info.anchor.setTo(0.5, 0.5);
      butGroup_3.add(b_info);
      infoRuls = gameAdd().image(0,0, 'infoRuls');
      infoRuls.alpha = 0;
      infoRuls.anchor.setTo(0.5, 0.5);
      infoRuls.kill();
      likeVk = gameAdd().button(58, 40, 'likeVk', this.doLike, this,  0, 2, 1);
      likeVk.anchor.setTo(0.5, 0.5);
      butGroup_3.add(likeVk);
      infoStars = gameAdd().sprite(140, 40, 'infoStars', 2);
      infoStars.name = 'infoStars';
      infoStars.anchor.setTo(0.5, 0.5);
      butGroup_3.add(infoStars);

      // totalStarScore = gameAdd().text(infoStars.centerX - 3, infoStars.centerY, getInfo().user.totalstars, { fontSize: '22px', fill: '#7C4111', font: 'mainFont' });
      // totalStarScore.anchor.setTo(0, 0.5);

      totalStarScore = gameAdd().bitmapText(infoStars.centerX + 7, infoStars.centerY + 2, 'fontStarMessage', getInfo().user.totalstars, 22);
      // loadingText = this.gameAdd().bitmapText(410, 150, 'ds_digital', 'loading...', 72);
      totalStarScore.anchor.setTo(0.5, 0.5);

      totalStarScore.name = 'infoStars';
      butGroup_3.add(totalStarScore);
      //управление музыкой==========================
      b_music_1 = gameAdd().button(742, 40, 'b_music', this.turnMusic, this,  0, 2 ,1);
      b_music_1.anchor.setTo(0.5, 0.5);
      butGroup_3.add(b_music_1);

      b_music_2 = gameAdd().button(742, 40, 'b_music', this.turnMusic, this, 3, 5 ,4);
      b_music_2.anchor.setTo(0.5, 0.5);
      butGroup_3.add(b_music_2);

      if(!gameSound().mute){
          b_music_2.kill();
      }else{
          b_music_1.kill();
      }
      //=============================================================
      butGroup_3.forEachAlive(function (but){
        if (but.name !== 'infoStars'){
          var sound = gameAdd().audio('pushSmall');
          sound.volume = 0.1;
          but.setSounds(sound, 0, buttonSong);
        }
        but.alpha = 0;
      }, this)
      butGroup_2.forEachAlive(function (but){
        but.alpha = 0;
        var sound = gameAdd().audio('pushSmall');
        sound.volume = 0.1;
        but.setSounds(sound, 0, buttonSong);
      }, this)
      butGroup_1.forEachAlive(function (but){
        var sound = gameAdd().audio('pushSmall');
        sound.volume = 0.1;
        but.setSounds(sound, 0, buttonSong);
        but.alpha = 0;
      }, this)
      //анимация=================
      card_1_anim = gameAdd().tween(card_1).to( {y: 240}, 2000, Phaser.Easing.Exponential.Out, true, 0);
      card_2_anim = gameAdd().tween(card_2).to( {y: 240}, 2000, Phaser.Easing.Exponential.Out, true, 0);
      card_3_anim = gameAdd().tween(card_3).to( {y: 240}, 2000, Phaser.Easing.Exponential.Out, true, 0);
      // 145, 240
      butStart = gameTime().create();
      butStart.add(1000, function (){
        butGroup_3.forEachAlive(function (but){
          gameAdd().tween(but).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        }, this)
        butGroup_2.forEachAlive(function (but){
          gameAdd().tween(but).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 250);
        }, this)
        butGroup_1.forEachAlive(function (but){
          gameAdd().tween(but).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 350);
        }, this)
      }, this);
      butStart.start();

      messageNotAccess = gameAdd().image(400,250, 'notAccess');
      messageNotAccess.anchor.set(0.5);
      messageNotAccess.alpha = 0;
      messageNotAccess.scale.set(0);

      closeButton = gameAdd().button(145, 364, 'exit_game', closeWindow, this, 1, 0 ,2);
      closeButton.kill();
    },
    startGame_1_anim: function (){
        if (bChangeLevel_1.alpha == 0){
          bChangeLevel_1.reset(buttonPlay_1.centerX, buttonPlay_1.centerY);
          bChangeLevel_1.scale.set(0.1);
          bChangeLevel_1.anchor.setTo(0.5,0.5);
          bChangeLevel_1.alpha = 0.8;
          bChangeLevel_2.reset(buttonPlay_1.centerX, buttonPlay_1.centerY);
          bChangeLevel_2.scale.set(0.1);
          bChangeLevel_2.alpha = 0.8;
          bChangeLevel_2.anchor.setTo(0.5,0.5);
          bChangeLevel_3.reset(buttonPlay_1.centerX, buttonPlay_1.centerY);
          bChangeLevel_3.scale.set(0.1);
          bChangeLevel_3.alpha = 0.8;
          bChangeLevel_3.anchor.setTo(0.5,0.5);

          windowFor1game.reset(buttonPlay_1.centerX, buttonPlay_1.centerY);
          windowFor1game.scale.set(0.1);
          windowFor1game.alpha = 0.8;
          windowFor1game.anchor.setTo(0.5,0.5);

          gameAdd().tween(windowFor1game.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
          gameAdd().tween(windowFor1game).to( { x: card_1.centerX, y: card_1.centerY }, 100,  Phaser.Easing.Linear.None, true);
          gameAdd().tween(windowFor1game).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

          gameAdd().tween(bChangeLevel_1.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
          gameAdd().tween(bChangeLevel_1).to( { x: card_1.centerX + 25, y: card_1.centerY - 100 }, 100,  Phaser.Easing.Linear.None, true);
          gameAdd().tween(bChangeLevel_1).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

          gameAdd().tween(bChangeLevel_2.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
          gameAdd().tween(bChangeLevel_2).to( { x: card_1.centerX + 20, y: card_1.centerY}, 100,  Phaser.Easing.Linear.None, true);
          gameAdd().tween(bChangeLevel_2).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

          gameAdd().tween(bChangeLevel_3.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
          gameAdd().tween(bChangeLevel_3).to( { x: card_1.centerX + 20, y: card_1.centerY + 100 }, 100,  Phaser.Easing.Linear.None, true);
          var animTrigger = gameAdd().tween(bChangeLevel_3).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
          var animExit = function () {
            gameAdd().tween(windowFor1game.scale).to( {  x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true);
            gameAdd().tween(windowFor1game).to( { x: buttonPlay_1.centerX, y: buttonPlay_1.centerY}, 100,  Phaser.Easing.Linear.None, true);
            gameAdd().tween(windowFor1game).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

            gameAdd().tween(bChangeLevel_1.scale).to( {  x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true);
            gameAdd().tween(bChangeLevel_1).to( { x: buttonPlay_1.centerX, y: buttonPlay_1.centerY}, 100,  Phaser.Easing.Linear.None, true);
            gameAdd().tween(bChangeLevel_1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

            gameAdd().tween(bChangeLevel_2.scale).to( {  x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true);
            gameAdd().tween(bChangeLevel_2).to( { x: buttonPlay_1.centerX, y: buttonPlay_1.centerY }, 100,  Phaser.Easing.Linear.None, true);
            gameAdd().tween(bChangeLevel_2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

            gameAdd().tween(bChangeLevel_3.scale).to( { x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true);
            gameAdd().tween(bChangeLevel_3).to( {x: buttonPlay_1.centerX, y: buttonPlay_1.centerY }, 100,  Phaser.Easing.Linear.None, true);
            var anim = gameAdd().tween(bChangeLevel_3).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            anim.onComplete.addOnce(function (){
              bChangeLevel_1.kill();
              bChangeLevel_2.kill();
              bChangeLevel_3.kill();
            })
          }
          animTrigger.onComplete.addOnce(function (){
            closeButton.reset(windowFor1game.right -15, windowFor1game.top + 10);
            closeButton.anchor.setTo(0.5, 0.5);
            closeButton.animation = animExit;
          })

        }

    },
    showInfoGame: function (){
      if (infoRuls.alpha == 0){
        infoRuls.reset(b_info.centerX, b_info.centerY);
        infoRuls.scale.set(0);
        gameAdd().tween(infoRuls.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        gameAdd().tween(infoRuls).to( { x: gameWorld().centerX, y: gameWorld().centerY }, 100,  Phaser.Easing.Linear.None, true);
        var anim_1 = gameAdd().tween(infoRuls).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      }
      var animExit = function () {
        gameAdd().tween(infoRuls.scale).to( {  x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true);
        gameAdd().tween(infoRuls).to( { x: b_info.centerX, y: b_info.centerY}, 100,  Phaser.Easing.Linear.None, true);
        var anim = gameAdd().tween(infoRuls).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      }
      anim_1.onComplete.addOnce(function (){
        closeButton.reset(infoRuls.right - 70, infoRuls.top + 70);
        closeButton.anchor.setTo(0.5, 0.5);
        closeButton.animation = animExit;
      })

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
      showMessage(messageNotTime);
    },
    showRuls: function (b){
      // alert('правилы для игры: ' + b.nGame);

        if(b.infoCard.alpha == 0){
          b.infoCard.alpha = 1;
          var anim_1 = gameAdd().tween(b.infoCard.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
          gameAdd().tween(b.infoCard).to( { x: gameWorld().centerX, y: gameWorld().centerY }, 100,  Phaser.Easing.Linear.None, true);
        }
        var animExit = function (){
          gameAdd().tween(b.infoCard.scale).to( { x: 0.1, y: 0.1 }, 200, Phaser.Easing.Linear.None, true);
          gameAdd().tween(b.infoCard).to( { x: b.centerX, y: b.centerY }, 100,  Phaser.Easing.Linear.None, true);
          gameAdd().tween(b.infoCard).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        }

        anim_1.onComplete.addOnce(function (){
          if (b.infoCard.windowSize == 'full'){
            var cordX = b.infoCard.right - 70;
            var cordY = b.infoCard.top + 70;
          }else {
            var cordX = b.infoCard.right - 15;
            var cordY = b.infoCard.top + 15;
          }

          closeButton.reset(cordX, cordY);
          closeButton.anchor.setTo(0.5, 0.5);
          closeButton.animation = animExit;
        })


    },
    showReit: function (b) {
      showMessage(messageNotTime);
    },
    postPicture: function (b){
        showMessage(messageNotTime);
    },
    startPresent: function (b){
        switch (b.present) {
          case 1:
            musicPlay = false;
            gameSound().stopAll();
            changeState('presentSnowBallGames');
            break;
          case 2:
            if(getInfo().game_2.g_1.access == 1){
              musicPlay = false;
              gameSound().stopAll();
              changeState('presentSnowPong');
            }else{
              showMessage(messageNotAccess);
            }
            break;
          case 3:
            this.showRuls(b3_ruls);
            break;


        }
    },

    startGame_1: function (b)
    {

      musicPlay = false;

      var status = getInfo().game_1.status;
      var access = getInfo().game_1.access;
      changeLevel(b.level);
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

      if (status == 'unstart' && access == 1){
        //перейти к презентации
        gameSound().stopAll();
        changeState('presentSnowPong');
        // changeState('map');
          // this.state.start('presentGame_2');
      } else if ((status == 'start' || status == 'over') && access == 1){
        //перети к карте
        changeState('map');
      }else {
        showMessage(messageNotAccess);
      }

    },

    startGame_3: function ()
    {
      this.showRuls(b3_ruls);
    },
}

function showMessage (image){
  image.alpha = 1;
  var anim_1 = gameAdd().tween(image.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
  gameAdd().tween(image).to( { x: gameWorld().centerX, y: gameWorld().centerY }, 100,  Phaser.Easing.Linear.None, true);

  var animExit = function (){
    gameAdd().tween(image.scale).to( { x: 0.1, y: 0.1 }, 200, Phaser.Easing.Linear.None, true);
    gameAdd().tween(image).to( { x:gameWorld().centerX, y: gameWorld().centerY }, 100,  Phaser.Easing.Linear.None, true);
    gameAdd().tween(image).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
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
})();
