(function(){
  var  b_1, b_2, b_3, b_4, b_5, b_6, b_7, b_8, b_9, b_10;
  var buttonSong;
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
        b_9 = gameAdd().button(646, 266, 'b_9', this.startGame, this, 1, 0, 2, 3);
        b_9.path = "g_9";
        b_9.gameName = 'snowPongGame_9';
        b_9.anchor.setTo(0.5, 0.5);
        b_10 = gameAdd().button(650, 173, 'b_10', this.startGame, this, 1, 0, 2, 3);
        b_10.path = "g_10";
        b_10.gameName = 'snowPongGame_10';
        b_10.anchor.setTo(0.5, 0.5);

        //интерфейс и управление

        gameAdd().button(15, 15, 'arrow_2', this.goBack, this, 0, 1 ,2);

    
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
        alert(but.gameName);
        if (!changeState(but.gameName)){
          alert('уровень еще не открыт');
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
}())
