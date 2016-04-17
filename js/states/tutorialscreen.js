var TutorialScreen = function(){};

TutorialScreen.prototype = {
  preload: function() {
    game.load.image("tut1", "res/img/tut/tut1.png");
    game.load.image("tut2", "res/img/tut/tut2.png");
    game.load.image("tut3", "res/img/tut/tut3.png");
  },

  create: function() {
    var t3 = game.add.sprite(0,0,"tut3");
    this.t2 = game.add.sprite(0,0,"tut2");
    this.t1 = game.add.sprite(0,0,"tut1");
    this.x = 0;
    this.t1.inputEnabled = true;
    this.t1.events.onInputDown.add(this.kill, this);
    this.t2.inputEnabled = true;
    this.t2.events.onInputDown.add(this.kill, this);
    t3.inputEnabled = true;
    t3.events.onInputDown.add(this.next, this);
  },

  kill: function(){if(this.x==0)this.t1.kill(); else this.t2.kill(); this.x+=1;},
  next: function(){game.state.start("IntelScreen");},
};
