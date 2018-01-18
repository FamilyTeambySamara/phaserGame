(function () {

var wholeBarstars;
var wholeBartime;
var wholeBarhp;
var wholeScore;
var calculateSong;

var calulateStarsEvent;
var calculateTimeEvent;
var calculateHpEvent;

var tempStarSong;

var clockSound;
var hartSound;
var winSound;
var amountStars = 0;
var amountClock = 0;
var amountHp = 0;
var mod;

var commonScore = 0;

var hp;
var time;
var stars;

var messageNotStars;
var closeButton;
var nEnoughStar;
var happySong;


window.Win_SnowBallGame =
{
    preload: function () {
          gameLoad().audio('calculate', 'assets/audio/calculate.ogg');
          gameLoad().audio('starSong', 'assets/audio/bell.ogg');
          gameLoad().audio('clockSound', 'assets/audio/clockSound.ogg');
          gameLoad().audio('hartSound', 'assets/audio/hartSound.ogg');
          gameLoad().audio('winSound', 'assets/audio/Kevin_MacLeod_-_Running_Fanfare(win_sound).ogg');


    },
    create: function ()
    {
      // if(getInfo().game_1.status == 'start' || getInfo().game_1.status == 'over'){
      //
      // }else{
      //   animationStart();
      // }
        // initAdman();


      saveDb();
      // getMoney();

      hp = getInfoCurrentGame().hp;
      time = getInfoCurrentGame().time;
      stars = getInfoCurrentGame().stars;
      mod = getInfoCurrentGame().mod;

      calculateSong = gameAdd().audio('calculate');
      tempStarSong = gameAdd().audio('starSong');
      clockSound = gameAdd().audio('clockSound');
      hartSound = gameAdd().audio('hartSound');
      winSound = gameAdd().audio('winSound');

      happySong = gameAdd().audio('happySong');


      // winSound.play();
      gameAdd().image(0, 0, 'Game_win');

      var menuAnim = gameAdd().sprite(400, 100, 'menuWin');
      menuAnim.alpha = 0;
      menuAnim.anchor.x = 0.5;
      menuAnim.animations.add('menuWin');
      menuAnim.animations.play('menuWin', 20, true);
        // gameAdd().tween(oneSlide).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0);
      var shouwMenu = gameAdd().tween(menuAnim).to({alpha: 1}, 12000, Phaser.Easing.Exponential.Out, true, 0);


      // var stars = 0;
      //Считаем звузды
      calulateStarsEvent = gameTime().create();
      calulateStarsEvent.repeat(100, stars, this.calculateStars, this);
      // window.animationStart = function (){
        calulateStarsEvent.start(2000);
        winSound.play();
      // }

      //Добавлем бзыньк в конце пересчета
      calculateSong.onStop.addOnce(function (){tempStarSong.play();}, this);
      //===================================
      //Считаем время
      calculateTimeEvent = gameTime().create();
      calculateTimeEvent.repeat(100, time, this.calculateTime, this);
      calulateStarsEvent.onComplete.addOnce(function (){calculateTimeEvent.start();}, this);

      clockSound.onStop.addOnce( function (){tempStarSong.play();}, this);
      //======================================
      //Считаем жизни
      calculateHpEvent = gameTime().create();
      calculateHpEvent.repeat(100, hp, this.calculateHp, this);
      calculateTimeEvent.onComplete.addOnce(function (){calculateHpEvent.start();}, this);

      hartSound.onStop.addOnce( function (){tempStarSong.play();}, this);
      //===========================================================


      //repeat(delay, repeatCount, callback, callbackContext, arguments)

      // wholeBarstars = gameAdd().text(272, 217, '0', { fontSize: '32px', fill: '#7C4111', font: "mainFont"});
      wholeBarstars = gameAdd().bitmapText(272, 222, 'fontStarMessage', '0', 32);
      wholeBarstars.anchor.x = 0.5;
      wholeBartime = gameAdd().bitmapText(398, 222, 'fontClock', '0', 32);
      // wholeBartime = gameAdd().text(398, 217, '0', { fontSize: '32px', fill: '#8E3E36', font: 'mainFont' });
      wholeBartime.anchor.x = 0.5;
      wholeBarhp = gameAdd().bitmapText(527, 222, 'fontHart', '0', 32);
      // wholeBarhp  = gameAdd().text(527, 217, '0', { fontSize: '32px', fill: '#91294E', font: 'mainFont' });
      wholeBarhp.anchor.x = 0.5;

      wholeScore = gameAdd().bitmapText(400, 270, 'whiteFont', 'ИТОГОВЫЙ СЧЕТ', 32);
      // wholeScore = gameAdd().text(400, 270, 'ИТОГОВЫЙ СЧЕТ:', { fontSize: '32px', fill: 'white', font: 'mainFont' });
      wholeScore.anchor.x = 0.5;

      // whole = gameAdd().text()
      // gameAdd().text(250, 40, 'You are Win!!!', { fontSize: '32px', fill: 'red' });
      // gameAdd().text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
      //gameAdd().button( 250, 250, 'button', this.startPlay, this, 2, 1, 0);
      if(getInfoCurrentGame().currentGame !== 'SnowBallGame'){
        var button_cont = gameAdd().button( 420, 300, 'button_cont', this.goToNext, this, 1, 0 ,2);
        button_cont.anchor.x = 0.5;
      }

      var button_out = gameAdd().button( 400, 420, 'button_out', this.goToMenu, this, 1, 0 ,2);
      button_out.anchor.x = 0.5;

      var button_again = gameAdd().button( 400, 360, 'button_again', this.startPlay, this, 1, 0 ,2);
      button_again.anchor.x = 0.5;

      //сообщения


      messageNotStars = gameAdd().image(400,250, 'notStars');
      messageNotStars.anchor.set(0.5);
      messageNotStars.alpha = 0;
      messageNotStars.scale.set(0);

      nEnoughStar = gameAdd().bitmapText(400, 250, 'fontStarMessage', 0, 32);
      nEnoughStar.anchor.set(0.5);
      nEnoughStar.alpha = 0;
      nEnoughStar.scale.set(0);

      closeButton = gameAdd().button(145, 364, 'exit_game', closeWindow, this, 1, 0 ,2);
      closeButton.kill();

    },
    goToNext: function (){
        gameSound().stopAll();
        amountStars = 0;
        amountClock = 0;
        amountHp = 0;
        commonScore = 0;
        switch (getInfoCurrentGame().currentGame) {
          case 'snowPongGame':
            var result = changeState('snowPongGame_2');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_2':
            var result = changeState('snowPongGame_3');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_3':
            var result = changeState('snowPongGame_4');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_4':
            var result = changeState('snowPongGame_5');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_5':
            var result = changeState('snowPongGame_6');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_6':
            var result = changeState('snowPongGame_7');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_7':
            var result = changeState('snowPongGame_8');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_8':
            var result = changeState('snowPongGame_9');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_9':
            var result = changeState('snowPongGame_10');
            if (typeof(result) == 'number'){
              nEnoughStar.text = result;
              showMessage (messageNotStars);
            }
            break;
          case 'snowPongGame_10':
            changeState('menu_cards');
            break;
        }
    },
    startPlay: function () {
          gameSound().stopAll();
          amountStars = 0;
          amountClock = 0;
          amountHp = 0;
          commonScore = 0;
          changeState(getInfoCurrentGame().currentGame)
          // switch (getInfoCurrentGame().currentGame) {
          //   case 1:
          //     this.state.start('SnowBallGame');
          //     break;
          //   case 21:
          //     this.state.start('SnowBallGame');
          //     break;



    },
    calculateStars: function (){
      happySong.play();
      if (stars > 0) amountStars++;

    },
    goToMenu: function ()

    {
          gameSound().stopAll();
          amountStars = 0;
          amountClock = 0;
          amountHp = 0;
          commonScore = 0;
          changeState('menu_cards');
    },

    calculateTime: function (){
       amountClock++;
    },
    calculateHp: function () {
      amountHp++;
    },
    update: function (){
      if (!calulateStarsEvent.expired  && !calculateSong.isPlaying && amountStars){
        calculateSong.play();
      // alert(calulateEvent.expired);
      }
      if (calulateStarsEvent.expired){
        calculateSong.stop();
      }

      if (!calculateTimeEvent.expired  && !clockSound.isPlaying && amountClock){
          clockSound.play();
      // alert(calulateEvent.expired);
      }

      if (calculateTimeEvent.expired){
        clockSound.stop();
      }

      if (!calculateHpEvent.expired  && !hartSound.isPlaying && amountHp){
          hartSound.play();
      // alert(calulateEvent.expired);
      }

      if (calculateHpEvent.expired){
          hartSound.stop();
      }

      wholeBarstars.text = amountStars;
      wholeBartime.text = amountClock;
      wholeBarhp.text = amountHp;
      //Звезды НЕ равны нулю
      if (amountClock == 0 && amountHp == 0 && amountStars !== 0){
          wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' + amountStars;
      }
      else if (amountClock !== 0 && amountHp == 0 && amountStars !== 0){
          if(getInfoCurrentGame().currentGame == 'SnowBallGame'){
            wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' + (amountStars * Math.floor(1000/amountClock));
          }else{
            wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' + ((amountStars*100) + Math.floor(120/amountClock));
          }
          // saveBox.score = (scoreStars*100) + Math.floor(120/realTimeNow) * health;

      } else if (amountStars !== 0 && amountClock !== 0 && amountHp !== 0) {
        //alert(mod);
        if(getInfoCurrentGame().currentGame == 'SnowBallGame'){
            wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' + (amountStars * Math.floor(1000/amountClock) * amountHp * (mod * mod));
        }else{
            wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' + ((amountStars*100) + Math.floor(120/amountClock) * amountHp * (mod * mod));
        }

      }
      // Звезды равны нулю
      if (amountClock !== 0 && amountHp == 0 && amountStars == 0){
        if(getInfoCurrentGame().currentGame == 'SnowBallGame'){
          wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' +  Math.floor(1000/amountClock);
        }else{
          wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' +  Math.floor(120/amountClock);
        }

      } else if (amountStars == 0 && amountClock !== 0 && amountHp !== 0) {
              if(getInfoCurrentGame().currentGame == 'SnowBallGame'){
                wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' +  Math.floor(1000/amountClock) * amountHp * (mod * mod);
              }else{
                wholeScore.text = 'ИТОГОВЫЙ СЧЕТ: ' +  Math.floor(120/amountClock) * amountHp * (mod * mod);
              }

      }

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

function getMoney (){

  window.addEventListener('load', function() {

  var user_id = null;
  var app_id = 6295768;

  admanInit({
  user_id: user_id,
  app_id: app_id,
  type: 'preloader'
  }, onAdsReady, onNoAds);

  function onAdsReady(adman) {
  adman.onStarted(function () { admanStat(app_id, user_id); });
  adman.start('preroll');
  };

  function onNoAds() {};
  });
}

})();
