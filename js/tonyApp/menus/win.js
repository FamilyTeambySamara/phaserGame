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


window.Win_SnowBallGame =
{
    preload: function () {
          gameLoad().audio('calculate', 'assets/audio/calculate.mp3');
          gameLoad().audio('starSong', 'assets/audio/bell.mp3');
          gameLoad().audio('clockSound', 'assets/audio/clockSound.mp3');
          gameLoad().audio('hartSound', 'assets/audio/hartSound.mp3');
          gameLoad().audio('winSound', 'assets/audio/Kevin_MacLeod_-_Running_Fanfare(win_sound).mp3');


    },
    create: function ()
    {

      saveDb();

      hp = getInfoCurrentGame().hp;
      time = getInfoCurrentGame().time;
      stars = getInfoCurrentGame().stars;
      mod = getInfoCurrentGame().mod;
      // hp = 13;
      // time = 13;
      // stars = 13;
      // mod = 13;
      //alert(mod);



      calculateSong = gameAdd().audio('calculate');
      tempStarSong = gameAdd().audio('starSong');
      clockSound = gameAdd().audio('clockSound');
      hartSound = gameAdd().audio('hartSound');
      winSound = gameAdd().audio('winSound');

      var happySong = gameAdd().audio('happySong');
      happySong.play();

      winSound.play();
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
      calulateStarsEvent.start(2000);
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

      wholeBarstars = gameAdd().text(272, 217, '0', { fontSize: '32px', fill: '#7C4111', font: "mainFont"});
      wholeBarstars.anchor.x = 0.5;
      wholeBartime = gameAdd().text(398, 217, '0', { fontSize: '32px', fill: '#8E3E36', font: 'mainFont' });
      wholeBartime.anchor.x = 0.5;
      wholeBarhp  = gameAdd().text(527, 217, '0', { fontSize: '32px', fill: '#91294E', font: 'mainFont' });
      wholeBarhp.anchor.x = 0.5;

      wholeScore = gameAdd().text(400, 270, 'Итоговый счет:', { fontSize: '32px', fill: 'white', font: 'mainFont' });
      wholeScore.anchor.x = 0.5;

      // whole = gameAdd().text()
      // gameAdd().text(250, 40, 'You are Win!!!', { fontSize: '32px', fill: 'red' });
      // gameAdd().text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
      //gameAdd().button( 250, 250, 'button', this.startPlay, this, 2, 1, 0);
      var button_out = gameAdd().button( 400, 420, 'button_out', this.goToMenu, this, 1, 0 ,2);
      button_out.anchor.x = 0.5;

      var button_again = gameAdd().button( 400, 350, 'button_again', this.startPlay, this, 1, 0 ,2);
      button_again.anchor.x = 0.5;

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

    goToMenu: function ()

    {
          gameSound().stopAll();
          amountStars = 0;
          amountClock = 0;
          amountHp = 0;
          commonScore = 0;
          changeState('menu_cards');
    },
    calculateStars: function (){
      if (stars > 0) amountStars++;

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
          wholeScore.text = 'Итоговый счет: ' + amountStars;
      }
      else if (amountClock !== 0 && amountHp == 0 && amountStars !== 0){
          wholeScore.text = 'Итоговый счет: ' + (amountStars * Math.floor(1000/amountClock));
      } else if (amountStars !== 0 && amountClock !== 0 && amountHp !== 0) {
        //alert(mod);
            wholeScore.text = 'Итоговый счет: ' + (amountStars * Math.floor(1000/amountClock) * amountHp * (mod * mod));
      }
      // Звезды равны нулю
      if (amountClock !== 0 && amountHp == 0 && amountStars == 0){
          wholeScore.text = 'Итоговый счет: ' +  Math.floor(1000/amountClock);
      } else if (amountStars == 0 && amountClock !== 0 && amountHp !== 0) {
            wholeScore.text = 'Итоговый счет: ' +  Math.floor(1000/amountClock) * amountHp * (mod * mod);
      }

    }
}

})();
