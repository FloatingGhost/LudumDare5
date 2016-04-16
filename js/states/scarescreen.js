var ScareScreen = function() {};
ScareScreen.prototype = {
  
  init: function() {
  },

  preload: function() {
    game.load.image("scare_bg", "res/img/bg/Scare_BG.png");
    game.load.image("monster_base", "res/img/monsterparts/Monster_Base.png");
    game.load.image("sleeping_child", "res/img/Sleeping-child.png");
  },

  create: function() {
    game.add.sprite(0,0,"scare_bg");
    console.log(game.monsterParts);
    this.monster = game.add.group();
    var base = this.monster.create(0, 72, "monster_base");
    for (i in game.monsterParts) {
      obj = game.monsterParts[i];
      obj.x += base.x;
      obj.y += base.y;
      this.monster.create(obj.x, obj.y, obj.name);
    }
    
    var child = game.add.sprite(230, 330, "sleeping_child");
    child.scale.x = 2;  
    child.scale.y = 2;
    this.style = { font: "16px Arial", fill: "#000044", align: "center" };
    this.faliure = { font: "16px Arial", fill: "#ff0044", align:"center"};
    this.success = { font: "16px Arial", fill: "00ff44", align:"center"};
    game.add.text(0, 0, "Scaring "+game.child["name"] +"\nTarget:"+game.target,this.style);
    //Get monster moving towards child
    var path = [null,{"type":2,"closed":false,"x":[0,72,169,253,355,267],"y":[76,159,55,156,191,272]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[279,424,393,269,242,308]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[405,178,109,352,222,259]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[95,165,402,260,279,65]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[91,427,171,352,225,54]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[325,327,174,48,37,98]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[36,219,415,364,284,427]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[262,227,415,91,70,391]}];
  
  console.log(path[1]);
  var tween = game.add.tween(this.monster).to({x: path[1]["x"],
                                                y: path[1]["y"]}, 
                                          5000).interpolation(  
                                              function(v, k){    
                      return Phaser.Math.catmullRomInterpolation(v, k);});
  tween.onComplete.add(this.scareChild, this);
  tween.start();
  },

  scareChild: function() {
    console.log("argh!");
    y = 50;
    var total = {};
    var sumtotal = 0;
    for (i in stat_names) {
      i = stat_names[i];
      total[i] = game.monsterParts.stats[i]*game.child.modifiers[i];
      sumtotal += total[i];
      console.log("Monster has " + game.monsterParts.stats[i] + " " + i);
      game.add.text(0,y,i + ": " + game.monsterParts.stats[i],this.style);
      game.add.text(0,y+17, "Multiplier "+game.child.modifiers[i]+"="+total[i],this.style);
      y+=17*2; 
    }
    var s, ss;
    if (sumtotal >= game.target){
      s = this.success;
      ss="Success!";
    } else {
      s = this.faliure
      ss="Faliure :(";
    };
    game.add.text(0, y, "Total: "+sumtotal+"(/"+game.target+")", s);
    game.add.text(0, y+17, "Result: "+ss, s);
    
  },

  update: function() {
  
  },

  
};
