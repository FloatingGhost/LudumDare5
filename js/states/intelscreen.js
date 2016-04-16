var IntelScreen = function() {};
IntelScreen.prototype = {
  
  init: function() {
  },

  preload: function() {
    game.load.image("scare_button", "res/img/buttons/BeginScaring.png");
  },

  create: function() {
    game.child = this.createInfoText();
    this.infoText = this.format(game.child);
    var style = { font: "16px Arial", fill: "#ff0044", align: "center" }; 
    var text = game.add.text(100, 50,this.infoText,style); 
    game.add.button(game.world.centerX-50, 200, "scare_button", this.scare, this, 2, 1, 0);
  },

  scare: function() {
    game.target = 100;
    game.state.start("MonsterCreator");
  },

  format: function(child) {
    string = ""
    string += child["name"] + ", " + child["age"] + "\n";
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
