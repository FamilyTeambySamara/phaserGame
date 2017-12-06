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

var commonScore = 0;

var stars = 0;

window.Win_SnowBallGame =
{
    preload: function () {
          game.load.audio('calculate', 'assets/audio/calculate.mp3');
          game.load.audio('starSong', 'assets/audio/bell.mp3');
          game.load.audio('clockSound', 'assets/audio/clockSound.mp3');
          game.load.audio('hartSound', 'assets/audio/hartSound.mp3');
          game.load.audio('winSound', 'assets/audio/Kevin_MacLeod_-_Running_Fanfare(win_sound).mp3');
    },
    create: function ()
    {
      calculateSong = this.add.audio('calculate');
      tempStarSong = this.add.audio('starSong');
      clockSound = this.add.audio('clockSound');
      hartSound = this.add.audio('hartSound');
      winSound = this.add.audio('winSound');

      var happySong = this.add.audio('happySong');
      happySong.play();

      winSound.play();
      this.add.image(0, 0, 'Game_over');

      var menuAnim = game.add.sprite(400, 100, 'menuWin');
      menuAnim.alpha = 0;
      menuAnim.anchor.x = 0.5;
      menuAnim.animations.add('menuWin');
      menuAnim.animations.play('menuWin', 20, true);
        // game.add.tween(oneSlide).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0);
      var shouwMenu = game.add.tween(menuAnim).to({alpha: 1}, 12000, Phaser.Easing.Exponential.Out, true, 0);
      // var hp = snowBallGame.getInfo().hp;
      // var time = snowBallGame.getInfo().time;
      // var stars = snowBallGame.getInfo().stars;
      var hp = 15;
      var time = 15;
      // var stars = 0;
      //Считаем звузды
      calulateStarsEvent = game.time.create();
      calulateStarsEvent.repeat(100, stars, this.calculateStars, this);
      calulateStarsEvent.start(2000);
      //Добавлем бзыньк в конце пересчета
      calculateSong.onStop.addOnce( function (){tempStarSong.play();}, this);
      //===================================
      //Считаем время
      calculateTimeEvent = game.time.create();
      calculateTimeEvent.repeat(100, time, this.calculateTime, this);
      calulateStarsEvent.onComplete.addOnce(function (){calculateTimeEvent.start();}, this);

      clockSound.onStop.addOnce( function (){tempStarSong.play();}, this);
      //======================================
      //Считаем жизни
      calculateHpEvent = game.time.create();
      calculateHpEvent.repeat(100, hp, this.calculateHp, this);
      calculateTimeEvent.onComplete.addOnce(function (){calculateHpEvent.start();}, this);

      hartSound.onStop.addOnce( function (){tempStarSong.play();}, this);
      //===========================================================


      //repeat(delay, repeatCount, callback, callbackContext, arguments)

      wholeBarstars = this.add.text(272, 217, '0', { fontSize: '32px', fill: '#7C4111', font: "mainFont"});
      wholeBarstars.anchor.x = 0.5;
      wholeBartime = this.add.text(398, 217, '0', { fontSize: '32px', fill: '#8E3E36', font: 'mainFont' });
      wholeBartime.anchor.x = 0.5;
      wholeBarhp  = this.add.text(527, 217, '0', { fontSize: '32px', fill: '#91294E', font: 'mainFont' });
      wholeBarhp.anchor.x = 0.5;

      wholeScore = this.add.text(400, 270, 'Итоговый счет:', { fontSize: '32px', fill: 'white', font: 'mainFont' });
      wholeScore.anchor.x = 0.5;



      // whole = this.add.text()
      // this.add.text(250, 40, 'You are Win!!!', { fontSize: '32px', fill: 'red' });
      // this.add.text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
      //this.add.button( 250, 250, 'button', this.startPlay, this, 2, 1, 0);
      var button_out = this.add.button( 400, 420, 'button_out', this.goToMenu, this, 1, 0 ,2);
      button_out.anchor.x = 0.5;


    },

    startPlay: function () {
          Level = 1;
          score = 0;
          index = 0;
          this.state.start('SnowBallGame');
    },

    goToMenu: function ()

    {
          Level = 1;
          score = 0;
          index = 0;
          game.state.start('Menu');
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
            wholeScore.text = 'Итоговый счет: ' + (amountStars * Math.floor(1000/amountClock) * amountHp);
      }
      // Звезды равны нулю
      if (amountClock !== 0 && amountHp == 0 && amountStars == 0){
          wholeScore.text = 'Итоговый счет: ' +  Math.floor(1000/amountClock);
      } else if (amountStars == 0 && amountClock !== 0 && amountHp !== 0) {
            wholeScore.text = 'Итоговый счет: ' +  Math.floor(1000/amountClock) * amountHp;
      }

    }
}

})();
