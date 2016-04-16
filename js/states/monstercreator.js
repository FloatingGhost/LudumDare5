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
    
  setupDisplay: function() {
    //Setup visuals
    console.log("Entering monster creator...");
    game.add.sprite(0,0,"creator_bg");
    this.base = game.add.sprite(300, 200, "monster_base");
    game.physics.arcade.enable(this.base)
    this.parts = game.add.group();
    this.lastDragged = null;
    var x = 200;
    var y = 200;
    for (i in monster_data) {
      console.log("Adding " + i + " to canvas");
      i = monster_data[i];
      for (var j = 0; j < i.length; j++) {
        obj = i[j];
        console.log("Adding to canvas: "+j["name"]);
        this.createpart(x,y,obj["name"], this.parts, obj["stats"]);
        y += 50;
      }
    }
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.setupDisplay();
    //Setup controls
    var layerup = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    layerup.onDown.add(this.moveSpriteUpLayer, this);
    var cont = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    cont.onDown.add(this.saveMonster, this);
  },

  getStat: function(key) {
    used = this.getUsed()
    sum = 0;
    for (i in used) {
      obj = used[i];
      sum += obj.stats[key]
    }
    return sum;
  },
  
  moveSpriteUpLayer: function() {
    if (this.lastDragged) {
      this.lastDragged.z = 0; 
      this.parts.sort('z', Phaser.Group.SORT_ASCENDING);
    }
  },

  saveMonster: function() {
    console.log("Saving...");
    var used = this.getUsed();
    console.log(used.length + " sprites used.");
  },

  getUsed: function() {
    used = [];
    for (i in this.parts.children) {
      obj = this.parts.children[i];
      if (game.physics.arcade.overlap(obj, this.base, null, null, this))  {
        used = used.concat(obj);
      }
    }   
    return used;
  },

  assignLastDragged: function(sprite, pointer) {
    this.lastDragged = sprite;
  },

  createpart: function(x, y, sprite, grp, stats) {
    p = grp.create(x,y,sprite);
    p.inputEnabled = true;
    p.input.enableDrag(true);
    p.events.onDragStop.add(this.assignLastDragged, this);
    game.physics.arcade.enable(p);
    p.stats = stats;
  },


  update: function() {
    game.debug.text("Monster values: ", 0, 50);
    game.debug.text("Crazed: "+this.getStat("crazed"), 0, 70);
    game.debug.text("Slimy: "+this.getStat("slimy"), 0, 80);
  },


};
