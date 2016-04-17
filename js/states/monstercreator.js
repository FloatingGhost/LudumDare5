var MonsterCreator = function() {};
MonsterCreator.prototype = {
 
  //This screen will allow the user to choose body parts
  //In order to scare the child the most 
  init: function() {
    
  },

  preload: function() {
    game.load.spritesheet("creator", "res/img/bg/Creator-sheet.png",640,480);
    game.load.image("monster_base", "res/img/monsterparts/Monster_Base.png");
    game.load.image("scare_button", "res/img/buttons/scareflower.png");
    game.load.spritesheet("lightning", "res/img/fx/Lightning.png",60,170);
    game.load.image("backing", "res/img/buttons/backing.png");  
    game.load.audio("spawn", "res/snd/item_spawn.wav");
    game.load.audio("bgmusic", "res/snd/bgsound.wav");
    game.load.image("armbutton", "res/img/buttons/armbutton.png");
    game.load.image("legbutton", "res/img/buttons/legbutton.png");
    game.load.image("eyebutton", "res/img/buttons/eyebutton.png");
    game.load.image("mouthbutton", "res/img/buttons/mouthbutton.png");
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
    this.lightning = game.add.sprite(500, 200, "lightning");
    this.lightning.alpha = 0;
    this.lightning.scale={x:1.5, y:1.5};
    var amil = this.lightning.animations.add("pew");
    amil.onComplete.add(this.actuallySpawnThisTime, this);
    this.mehmetmyson = null;
    this.base = game.add.sprite(200, 150, "monster_base");
    game.physics.arcade.enable(this.base)
    this.parts = game.add.group();
    this.spawnSound = game.add.audio("spawn");
    this.lastDragged = null;
    game.add.button(game.world.centerX-50, 430, "scare_button", this.saveMonster, this,2,1,0);
    this.spawnSprites = game.add.group();
    this.showingLegs=false;
    this.showingArms=false;
    this.showingEyes=false;
    this.showingMouths=false;
    this.spawnSprites = game.add.group();
    var kekkles = 0;
    for (i in monster_data) {
      var cat = i;
      
      var x = 100 + (64*kekkles);
      i = monster_data[i];
      console.log("LOADING "+cat);       
      var y = 10;
      switch(cat) {
        case "eyes":
          game.add.button(x,y,"eyebutton", this.showEyes, this, 2, 1, 0);
          break;
        case "mouths":
          game.add.button(x,y,"mouthbutton", this.showMouths, this, 2, 1, 0);
          break;
        case "legs":
          game.add.button(x,y,"legbutton", this.showLegs, this, 2, 1, 0);
          break;
        case "arms":
          game.add.button(x,y,"armbutton", this.showArms, this, 2, 1, 0);
          break;
        }
        y += 100; 
        kekkles += 1;
      for (var j = 0; j < i.length; j++) {
        obj = i[j];
        //var back = game.add.sprite(x,y+10,"backing");
        var p = this.spawnSprites.create(x,y,obj["name"]);
        p.inputEnabled = true;
        p.events.onInputDown.add(this.spawn, this);
        //p.backing = back;
        //back.alpha = 0;
        
        p.magicmushrooms = obj;
        p.magicmushrooms.cat = cat;
        p.width=32;
        p.height=32;
        p.alpha=0;        
        x += 64;
        /*new Phasetips(game, {
          targetObject: p,
          context: this.getDesc(p.magicmushrooms),
          strokeColor: 0xff0000
        });*/  
      }
      x += 64;
    }
  },

  showLegs: function(obj) {
    this.clearall(this.showingLegs);
    for (i in this.spawnSprites.children) {
      var o = this.spawnSprites.children[i];
      if (o.magicmushrooms.cat == "legs") {
        //o.backing.alpha = 1;
        o.alpha = (this.showingLegs)?0:1;
        o.input.priorityID = (this.showingLegs)?1:100
        o.z = 0;

        game.world.bringToTop(o);

      }
    }
    this.showingLegs=!this.showingLegs;
  },

  showArms: function(obj) {
    this.clearall(this.showingArms);
    for (i in this.spawnSprites.children) {
      var o = this.spawnSprites.children[i];
      if (o.magicmushrooms.cat == "arms") {
        //o.backing.alpha = 1;
        o.alpha = (this.showingArms)?0:1;
        o.z = 0;
        o.input.priorityID = (this.showingArms)?1:100
        game.world.bringToTop(o);

      }
    }
    this.showingArms=!this.showingArms;

  },

  showEyes: function(obj) {
    this.clearall(this.showingEyes);
    for (i in this.spawnSprites.children) {
      var o = this.spawnSprites.children[i];
      if (o.magicmushrooms.cat == "eyes") {
        //o.backing.alpha = 1;
        o.alpha = (this.showingEyes)?0:1;
        o.input.priorityID = (this.showingEyes)?1:100;
        o.z = 0;
        game.world.bringToTop(o);
      }
    }
    this.showingEyes =!this.showingEyes;

  },

  showMouths: function(obj) {
    this.clearall(this.showingMouths);
    for (i in this.spawnSprites.children) {
      var o = this.spawnSprites.children[i];
      if (o.magicmushrooms.cat == "mouths") {
        //o.backing.alpha = 1;
        o.alpha = (this.showingMouths)?0:1;
        o.input.priorityID = (this.showingMouths)?1:100;
        o.z = 0;
        game.world.bringToTop(o);

      }
    }
    this.showingMouths =!this.showingMouths;

  },

  clearall: function(me) {
    if (!me) {
      this.showingArms = false;
      this.showingEyes = false;
      this.showingLegs = false;
      this.showingMouths = false;
      for (i in this.spawnSprites.children) {
        var o = this.spawnSprites.children[i];
        o.alpha = 0;

      }
    
    }
  },

  getDesc: function(obj) {
    var text = obj["name"] + "\n";
    text += obj["desc"];
    /*try{
      for (i in stat_names) {
        var x  = obj.stats[stat_names[i]];
        switch (x) {
          case (x > 10):
            text += "\nVery "+stat_names[i]; 
            break;  
          default:
            break;
        }
      }
    } catch (e) {

    }*/
    return text;
  },

  spawn: function(obj) {
    if (obj.alpha == 1) {
    console.log(obj);
    this.lightning.alpha = 1;
    this.lightning.animations.play("pew", 20);
    this.mehmetmyson = obj;
    }
  },

  actuallySpawnThisTime: function() {
    var obj = this.mehmetmyson;
    console.log("Spawning "+obj.start);
    this.spawnSound.play();
    this.createpart(500, 430, obj["key"], this.parts, obj.magicmushrooms["stats"]);
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.music = game.add.audio("bgmusic");
    this.music.loopFull();
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
    this.lastDragged.kill(); 
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
      console.log("USED: " + used[i].name);
      used[i].x -= this.base.x;
      used[i].y -= this.base.y;
    }
    game.monsterParts = {"parts": used, stats: {}};
    for (i in stat_names) {
      var obj = stat_names[i];
      game.monsterParts.stats[obj] = this.getStat(obj);
    }
    if (game.monsterParts.length == 1) {
      game.monsterParts = [game.monsterParts, null];
    }
    this.parts.removeAll();
    console.log("PARTS: ")
    console.log(game.monsterParts);
    this.music.stop();
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

  createpart: function(x, y, sprite, grp, stats, canDelete) {
    p = grp.create(x,y,sprite);
    p.inputEnabled = true;
    p.input.enableDrag(true);
    p.events.onDragStart.add(this.assignLastDragged, this);
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
    p.input.priorityID = 1000;
    return p

  },


  update: function() {
    if (false) {
    game.debug.text("Monster values: ", 0, 50);
    y = 70;
    for (i in stat_names) {
      i = stat_names[i];
      game.debug.text(i+": "+this.getStat(i), 0, y);
      y += 15;
    };
    }
  },


};
