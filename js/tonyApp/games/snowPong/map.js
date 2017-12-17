(function(){
  var  b_1, b_2, b_3, b_4, b_5, b_6, b_7, b_8, b_9, b_10;
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
        gameAdd().image(0, 0, 'map');
        //buttonPlay_1 = gameAdd().button(100, 250, 'button_play', this.startGame_1, this, 1, 0 ,2);
        b_1 = gameAdd().button(166, 257, 'b_1', this.startGame, this, 1, 0, 2, 3);
        b_1.path = "g_1";
        b_1.gameName = 'snowPongGame';
        b_1.anchor.setTo(0.5, 0.5);
        b_2 = gameAdd().button(240, 180, 'b_2', this.startGame, this, 1, 0, 2, 3);
        b_2.marker = "g_2";
        b_2.gameName = 'snowPongGame_2';
        b_2.anchor.setTo(0.5, 0.5);
        b_3 = gameAdd().button(344, 155, 'b_3', this.startGame, this, 1, 0, 2, 3);
        b_3.marker = "g_3";
        b_3.gameName = 'snowPongGame_3';
        b_3.anchor.setTo(0.5, 0.5);
        b_4 = gameAdd().button(333, 230, 'b_4', this.startGame, this, 1, 0, 2, 3);
        b_4.marker = "g_4";
        b_4.gameName = 'snowPongGame_4';
        b_4.anchor.setTo(0.5, 0.5);
        b_5 = gameAdd().button(344, 315, 'b_5', this.startGame, this, 1, 0, 2, 3);
        b_5.marker = "g_5";
        b_5.gameName = 'snowPongGame_5';
        b_5.anchor.setTo(0.5, 0.5);
        b_6 = gameAdd().button(414, 366, 'b_6', this.startGame, this, 1, 0, 2, 3);
        b_6.marker = "g_6";
        b_6.gameName = 'snowPongGame_6';
        b_6.anchor.setTo(0.5, 0.5);
        b_7 = gameAdd().button(453, 273, 'b_7', this.startGame, this, 1, 0, 2, 3);
        b_7.marker = "g_7";
        b_7.gameName = 'snowPongGame_7';
        b_7.anchor.setTo(0.5, 0.5);
        b_8 = gameAdd().button(545, 300, 'b_8', this.startGame, this, 1, 0, 2, 3);
        b_8.marker = "g_8";
        b_8.gameName = 'snowPongGame_8';
        b_8.anchor.setTo(0.5, 0.5);
        b_9 = gameAdd().button(646, 266, 'b_9', this.startGame, this, 1, 0, 2, 3);
        b_9.marker = "g_9";
        b_9.gameName = 'snowPongGame_9';
        b_9.anchor.setTo(0.5, 0.5);
        b_10 = gameAdd().button(650, 173, 'b_10', this.startGame, this, 1, 0, 2, 3);
        b_10.marker = "g_10";
        b_10.gameName = 'snowPongGame_10';
        b_10.anchor.setTo(0.5, 0.5);

        // buttons = gameAdd().group();
        // // buttons.enableBody = true;
        // //gifts.physicsBodyType = Phaser.Physics.ARCADE;
        // buttons.createMultiple(30, 'star');
        // buttons.setAll('anchor.x', 0.5);
        // buttons.setAll('anchor.y', 0.5);
        // buttons.forEach(
        //   function (invader){
        //     invader.animations.add('play');
        //   }, this);
    },

    update: function (){

    },
    startGame: function(but){
        // changeState('snowPongGame');
        if (!changeState('snowPongGame')){
          alert('уровень еще не открыт');
        }

      alert(but.marker);
    }
  }
}())
