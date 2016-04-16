var IntroScreen = function() {};
IntroScreen.prototype = {
  
  init: function() {
    //For now, we'll just skip to the main game
  },

  preload: function() {
    game.load.image("bg", "res/img/bg/introbg.png");
  },

  create: function() {
    game.add.sprite(0,0,"bg");
    var start = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    start.onDown.add(this.startgame, this)
  },

  startgame: function() {
    game.state.start("IntelScreen");
  },

  update: function() {
  
  },


};
