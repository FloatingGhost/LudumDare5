var IntroScreen = function() {};
IntroScreen.prototype = {
  
  init: function() {
    //For now, we'll just skip to the main game
  },

  preload: function() {
    game.load.image("bg", "res/img/bg/introbg.png");
    game.load.image("go", "res/img/buttons/SkipIntro.png");
  },

  create: function() {
    game.add.sprite(0,0,"bg");
    var start = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    start.onDown.add(this.startgame, this)
    game.add.button(game.world.centerX-190, 375, "go", this.startgame, 2, 1, 0);
  },

  startgame: function() {
    game.theme.stop();
    game.state.start("TutorialScreen");
  },

  update: function() {
  
  },


};
