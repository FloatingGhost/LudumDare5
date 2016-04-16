var MonsterCreator = function() {};
MonsterCreator.prototype = {
 
  //This screen will allow the user to choose body parts
  //In order to scare the child the most 
  init: function() {
    
  },

  preload: function() {
    game.load.spritesheet("creator", "res/img/bg/Creator-sheet.png",640,480);
    game.load.image("monster_base", "res/img/monsterparts/Monster_Base.png");
    game.load.image("scare_button", "res/img/buttons/BeginScaring.png");
    for (i in monster_data) {
      console.log("Loading sprites for " + i); 
      i = monster_data[i];
      for (var j = 0; j < i.length; j++) {
        obj = i[j];
        console.log("Loading sprite " + obj["name"]);
        game.load.spritesheet(obj["name"], "res/img/monsterparts/"+obj["img"], 
                              obj["size"]["x"], obj["size"]["y"]);
      }                      
    }
  },
  
  setupDisplay: function() {
    //Setup visuals
    console.log("Entering monster creator...");
    var bg = game.add.sprite(0,0,"creator");
    bg.animations.add("fizz");
    bg.animations.play("fizz", 8, true);
    this.base = game.add.sprite(270, 250, "monster_base");
    game.physics.arcade.enable(this.base)
    this.parts = game.add.group();
    this.lastDragged = null;i
    game.add.button(game.world.centerX-50, 430, "scare_button", this.saveMonster, this,2,1,0);
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
        if (y > 430){
          y = 200;
          x += 50;  
        }
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
    for (i in used) {
      used[i].x -= this.base.x;
      used[i].y -= this.base.y;
    }
    game.monsterParts = used;
    game.monsterParts.stats = {"memes": 5}; 
    for (i in stat_names) {
      var obj = stat_names[i];
      game.monsterParts.stats[obj] = this.getStat(obj);
    }
    game.state.start("ScareScreen");
    
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
    
  playanim: function(sprite, pointer) {
     sprite.animations.play("anim", 5, true);
  },

  createpart: function(x, y, sprite, grp, stats) {
    p = grp.create(x,y,sprite);
    p.inputEnabled = true;
    p.input.enableDrag(true);
    p.events.onDragStop.add(this.assignLastDragged, this);
    p.events.onDragStart.add(this.playanim, this);
    game.physics.arcade.enable(p);
    p.stats = stats;
    p.name = sprite;
    p.animations.add("anim");
  },


  update: function() {
    game.debug.text("Monster values: ", 0, 50);
    y = 70;
    for (i in stat_names) {
      i = stat_names[i];
      game.debug.text(i+": "+this.getStat(i), 0, y);
      y += 15;
    };
  },


};
