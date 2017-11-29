var slides;
var index = 0;
var button_next;
var button_prev;
var timeDelay = 5000;
var timeDilay_2 = 4000;
var presentSnowBallGames = {

    preload: function (){
        game.load.image('slide_1', 'assets/img/presentGameSnowBall/slide_1.png');
        game.load.image('slide_2', 'assets/img/presentGameSnowBall/slide_2.png');
        game.load.image('slide_3', 'assets/img/presentGameSnowBall/slide_3.png');
        // game.load.image('slide_4', 'assets/img/presentGameSnowBall/slide_4.png');
        // game.load.image('slide_5', 'assets/img/presentGameSnowBall/slide_5.png');
        // game.load.image('slide_6', 'assets/img/presentGameSnowBall/slide_6.png');
        // game.load.image('slide_7', 'assets/img/presentGameSnowBall/slide_7.png');

    },

    create: function () {
        slides = game.add.group()
        slides.create(0, 0, 'slide_1');

        button_next = this.add.button(600, 390, 'button', this.goNext, this, 2, 1 ,0);
        button_next.alpha =  0;

        button_prev = this.add.button(-250, 390, 'button', this.goBack, this, 2, 1 ,0);


    },

    update: function () {

      if (button_next.alpha ==  0){
             game.add.tween(button_next).to( { alpha: 1 }, 10000, Phaser.Easing.Exponential.Out, true, 0);
      }
    },

    goNext: function (){
          var slide = slides.getChildAt(index);
          if (index + 2 == 3){
            var timeDelay = 100;
          }
          var tween = game.add.tween(slide).to( { alpha: 0 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
          tween.onStart.add(this.start, this);
          tween.onComplete.add(this.killAll, this);
    },

    start: function (){
        var slide = slides.create(0, 0, 'slide_' + (++index + 1));
        slide.alpha = 0;
        if (index + 1 == 3){
            // var timeDelay = 10000;
        }
        game.add.tween(slide).to( { alpha: 1 }, timeDelay, Phaser.Easing.Linear.None, true, 0);//Phaser.Easing.Linear.None

        if (index >= 1){
            game.add.tween(button_prev).to( { x : 10 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
            //button_prev.x = 100;
        }
    },

    goBack: function (){
        var slide = slides.getChildAt(index);
        var tween = game.add.tween(slide).to( { alpha: 0 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);

        tween.onStart.add(this.back, this);
        tween.onComplete.add(this.killAll, this);


    },
    back: function () {
      // var slide = slides.getChildAt(index).kill() ;
      var slide = slides.create(0, 0, 'slide_' + (--index + 1));
      slide.alpha = 0;
      game.add.tween(slide).to( { alpha: 1 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
      if (index < 1){
            game.add.tween(button_prev).to( { x : -200 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
      }
    },

    killAll: function (something) {
      something.kill();
    }

};
