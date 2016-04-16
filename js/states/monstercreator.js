var MonsterCreator = function() {};
MonsterCreator.prototype = {
 
  //This screen will allow the user to choose body parts
  //In order to scare the child the most 
  init: function() {
    
  },

  preload: function() {
    game.load.image("creator_bg", "res/img/bg/Creator.png");
    game.load.image("monster_base", "res/img/monsterparts/Monster_Base.png");
    for (i in monster_data) {
      console.log("Loading sprites for " + i); 
      i = monster_data[i];
      for (var j = 0; j < i.length; j++) {
        obj = i[j];
        console.log("Loading sprite " + obj["name"]);
        game.load.image(obj["name"], "res/img/monsterparts/"+obj["img"]);
      }                      
    }
  },

  create: function() {
    console.log("Entering monster creator...");
    game.add.sprite(0,0,"creator_bg");
    game.add.sprite(300, 200, "monster_base");
    this.parts = game.add.group();
    var x = 200;
    var y = 200;
    for (i in monster_data) {
      console.log("Adding " + i + " to canvas");
      i = monster_data[i];
      for (var j = 0; j < i.length; j++) {
        obj = i[j];
        console.log("Adding to canvas: "+j["name"]);
        this.createpart(x,y,obj["name"], this.parts);
        y += 50;
      }
    }
  },

  createpart: function(x, y, sprite, grp) {
    p = grp.create(x,y,sprite);
    p.inputEnabled = true;
    p.input.enableDrag(true);
  },


  update: function() {
    game.debug.text("Monster values: ", 0, 50) 
  },


};
