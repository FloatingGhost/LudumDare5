var IntelScreen = function() {};
IntelScreen.prototype = {
  
  init: function() {
  },

  preload: function() {
    game.load.image("scare_button", "res/img/buttons/intelread.png");
    game.load.spritesheet("desk", "res/img/desk.png", 640, 480);
    game.load.image("folder", "res/img/folder.png");
  },

  create: function() {
    var memes = game.add.sprite(0,0,"desk");
    memes.animations.add("flicker");
    memes.animations.play("flicker", 10, true);
    game.child = this.createInfoText();
    var x = 50;
    var y = 150;
    for (i in game.child["evidence"]) {
      game.add.sprite(x,y,"folder");
      x += 250;
    } 
    var style = { font: "16px Arial", fill: "#ff0044", align: "center" }; 
    //var text = game.add.text(100, 50,this.infoText,style); 
    game.add.button(game.world.centerX-50, 430, "scare_button", this.scare, this, 2, 1, 0);
  },

  scare: function() {
    game.target = 100;
    game.state.start("MonsterCreator");
  },

  format: function(child) {
    string = ""
    string += child["name"] + ", " + child["age"] + " years old\n";
    for (i in child["evidence"]) {
      string += child["evidence"][i] + "\n\n";
    }
    return string;
  },

  createInfoText: function() {
    return this.choice(children); 
  },

  choice: function(lst){ 
    return lst[parseInt(Math.random()*lst.length)];
  },

  update: function() {
  
  },


};
