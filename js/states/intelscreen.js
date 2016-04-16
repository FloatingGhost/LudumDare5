var IntelScreen = function() {};
IntelScreen.prototype = {
  
  init: function() {
  },

  preload: function() {
    game.load.image("scare_button", "res/img/buttons/intelread.png");
    game.load.spritesheet("desk", "res/img/desk.png", 640, 480);
    game.load.image("folder", "res/img/folder.png");
    game.load.image("grey", "res/img/bg/Grey_Mark.png");
  },

  create: function() {
    var memes = game.add.sprite(0,0,"desk");
    memes.animations.add("flicker");
    memes.animations.play("flicker", 10, true);
    game.child = this.createInfoText();
    this.evidence = game.child["evidence"];
    this.folders = game.add.group();
    this.folderOpen = false;
    this.style = { font: "16px Arial", fill: "#ffffff", align: "center" };
    for (i in this.evidence) {
      var lel = this.folders.create(0, 480, "folder");
      lel.inputEnabled = true;
      lel.events.onInputDown.add(this.openfolder, this);
      lel.evidence = "INTEL\n============\n\nDOCUMENT #"+(parseInt(i)+1)+"\n\n----START MESSAGE----\n\n"+this.evidence[i]+"\n\n----END MESSAGE----";
    }
    this.arrangeFolders();
    var style = { font: "16px Arial", fill: "#ff0044", align: "center" }; 
    //var text = game.add.text(100, 50,this.infoText,style); 
    game.add.button(game.world.centerX-50, 430, "scare_button", this.scare, this, 2, 1, 0);
  

    this.grey = game.add.sprite(0,0,"grey");
    this.grey.alpha = 0;
    this.curtext = null;
  },

  openfolder: function(sprite) {
    if (!this.folderOpen) {
      for (i in this.folders.children) {
        child = this.folders.children[i];
        if (child != sprite)
          game.add.tween(child).to({x:0, y:480}, 700, null, true);
      }
      this.curtex = game.add.text(100, 100, sprite.evidence, this.style);
      this.curtex.alpha = 0;
      
      game.add.tween(sprite).to({x:200, y:150}, 500, null, true);
      game.add.tween(this.grey).to({alpha:1}, 600, null, true);
      game.add.tween(this.curtex).to({alpha:1}, 650, null, true);
    } else {
      this.arrangeFolders();
      game.add.tween(this.curtex).to({alpha:0}, 350, null, true);
      game.add.tween(this.grey).to({alpha:0}, 400, null, true);
      
    }
    this.folderOpen = !this.folderOpen;
  },

  arrangeFolders: function() {
    var minx = 25;
    var len = this.folders.children.length;
    for (i in this.folders.children) {
      child = this.folders.children[i];
      game.add.tween(child).to({x:minx+((640/len)*i), y:150}, 1000, null, true);
    }
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
