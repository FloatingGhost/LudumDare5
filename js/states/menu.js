var Menu = function() {};
Menu.prototype = {
  
  init: function() {
  
  },

  start_game: function() {
//    this.theme.stop();
    game.state.start("IntroScreen"); 
  },
  preload: function() {
    game.load.image("title_bg", "res/img/TitleScreen.png");
    game.load.image("start_button", "res/img/buttons/StartGame.png");
    game.load.audio("menu", "res/snd/Theme.wav");
  },

  create: function() {
    game.add.sprite(0,0,"title_bg");
    game.theme = game.add.audio("menu");
    game.theme.loopFull();
    game.add.button(450, 350, "start_button", this.start_game, this, 2, 1, 0);
  },

  update: function() {
  
  },


};
