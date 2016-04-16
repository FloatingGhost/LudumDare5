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
    this.base = game.add.sprite(200, 150, "monster_base");
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
        var p =this.createpart(x,y,obj["name"], this.parts, obj["stats"], true);
        console.log("Adding tooltip "+obj["desc"])
        p.tooltip = new Phasetips(game, {
        targetObject: p,
        context: obj["desc"],
        strokeColor: 0xff0000, // red stroke
        position: "right" // where we want the tooltip to appear
        });
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
    var rot_left = game.input.keyboard.addKey(Phaser.KeyCode.Q);
    rot_left.onDown.add(this.rot_left, this);
    var rot_right = game.input.keyboard.addKey(Phaser.KeyCode.E);
    rot_right.onDown.add(this.rot_right, this);
    var clone = game.input.keyboard.addKey(Phaser.KeyCode.C);
    clone.onDown.add(this.clone, this);
    var del = game.input.keyboard.addKey(Phaser.KeyCode.D);
    del.onDown.add(this.del, this);
    var scaleup = game.input.keyboard.addKey(Phaser.KeyCode.W);
    scaleup.onDown.add(this.scaleup, this);
    var scaledown = game.input.keyboard.addKey(Phaser.KeyCode.S);
    scaledown.onDown.add(this.scaledown, this);
    var fliphoriz = game.input.keyboard.addKey(Phaser.KeyCode.R);
    fliphoriz.onDown.add(this.fliphoriz, this);
    var flipverti = game.input.keyboard.addKey(Phaser.KeyCode.F);
    flipverti.onDown.add(this.flipverti, this);
  },

  fliphoriz: function() {
    this.lastDragged.scale.x *= -1;
  },

  flipverti: function() {
    this.lastDragged.scale.y *= -1;

  },

  scaleup: function() {
    this.lastDragged.scale.x += 0.1;
    this.lastDragged.scale.y += 0.1;
  },

  scaledown: function() {
    this.lastDragged.scale.x -= 0.1;
    this.lastDragged.scale.y -= 0.1;
  },

  rot_left: function() {
    this.lastDragged.rotation -= 0.2;
  },

  rot_right: function() {
    this.lastDragged.rotation += 0.2;
  },

  clone: function() {
    var obj = this.lastDragged;
    this.createpart(obj.x, obj.y-16, obj.name, this.parts, obj.stats); 
  },

  del: function() {
    
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
    this.parts.removeAll();
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
    sprite.tooltip.x = sprite.x + 50;
    sprite.tooltip.y = sprite.y;
  },
    
  playanim: function(sprite, pointer) {
     sprite.animations.play("anim", 5, true);
  },

  createpart: function(x, y, sprite, grp, stats, canDelete) {
    p = grp.create(x,y,sprite);
    p.inputEnabled = true;
    p.input.enableDrag(true);
    p.events.onDragStop.add(this.assignLastDragged, this);
    p.events.onDragStart.add(this.playanim, this);
    game.physics.arcade.enable(p);
    p.stats = stats;
    p.name = sprite;
    p.animations.add("anim");
    if (canDelete) {
      p.canDelete = false
    } else {
      p.canDelete = true;
    }
    p.anchor = {x:0.5, y:0.5};
    return p

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
