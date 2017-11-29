var slides;
var index = 0;
var button_next;
var button_prev;
var timeDelay = 3000;
var timeDilay_Big = 9000;
var timeDilay_Small = 100;
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
             game.add.tween(button_next).to( { alpha: 1 }, 8000, Phaser.Easing.Exponential.Out, true, 0);
      }
    },

    goNext: function (){
          var slide = slides.getChildAt(index);
          ++index;
          // var tween;

          if (index + 1 == 3){
            // alert(slide);
            alert(timeDilay_Small);
            var tween_1 = game.add.tween(slide).to( { alpha: 0 }, timeDilay_Small, Phaser.Easing.Exponential.Out, true, 0);
            tween_1.onStart.add(this.start, this);
            tween_1.onComplete.add(this.killAll, this);
          }else {
            var tween_2 = game.add.tween(slide).to( { alpha: 0 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
            tween_2.onStart.add(this.start, this);
            tween_2.onComplete.add(this.killAll, this);
          }
    },

    start: function (){
        var slide = slides.create(0, 0, 'slide_' + (index + 1));
        //alert(index);
        slide.alpha = 0;
        if (index + 1 == 3){
            //удар корабля
            alert(timeDilay_Big);
            game.add.tween(slide).to( { alpha: 1 }, timeDilay_Big , Phaser.Easing.Exponential.Out, true, 0);
        } else{
            game.add.tween(slide).to( { alpha: 1 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);//Phaser.Easing.Linear.None
        }

        if (index >= 1){
            game.add.tween(button_prev).to( { x : 10 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
            //button_prev.x = 100;
        }
    },

    goBack: function (){
        var slide = slides.getChildAt(index);
        --index;
        var tween = game.add.tween(slide).to( { alpha: 0 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);

        tween.onStart.add(this.back, this);
        tween.onComplete.add(this.killAll, this);

    },
    back: function () {
      // var slide = slides.getChildAt(index).kill() ;
      var slide = slides.create(0, 0, 'slide_' + (index + 1));
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
