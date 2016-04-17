var ScareScreen = function() {};
ScareScreen.prototype = {
  
  init: function() {
  },

  preload: function() {
    game.load.spritesheet("scare_bg", "res/img/bg/Bedroom.png",640,480);
    game.load.image("monster_base", "res/img/monsterparts/Monster_Base.png");
    game.load.spritesheet("sleeping_child", "res/img/Sleeping-child.png",150,100);
    game.load.audio("roar", "res/snd/roar.wav");
    game.load.image("bed", "res/img/bg/bed.png");
    game.load.spritesheet("roarword", "res/img/fx/roar.png", 64,64);
    game.load.audio("footstep","res/snd/footstep.wav");
    game.load.audio("creak", "res/snd/DoorCreak.wav");
  },

  create: function() {
    this.notscared = true;
    game.add.audio("creak").play();
    
    game.plugins.add(Phaser.Plugin.PhaserIlluminated);
    var bg = game.add.sprite(0,0,"scare_bg");
    this.footstep = game.add.audio("footstep");
    this.footstep.onStop.add(this.step, this);
    this.step();
    this.myLamp1 = game.add.illuminated.lamp(365, 85, {distance: 100});
    this.myLamp2 = game.add.illuminated.lamp(290,350, {distance: 30});
    this.myLamps = [this.myLamp1, this.myLamp2];
    
    bg.animations.add("twinkle");
    bg.animations.play("twinkle");
    this.monster = game.add.group();
    var base = this.monster.create(0, 300, "monster_base");
    for (i in game.monsterParts["parts"]) {
      if (game.monsterParts["parts"][i] != undefined) {
      
      obj = game.monsterParts["parts"][i];
      console.log(obj); 
      if (obj.name != null) {
        console.log("Spawning " + obj.name + " at " + obj.x+","+obj.y);
        obj.x += base.x;
        obj.y += base.y;
        console.log(obj);
        var wew = this.monster.add(obj);
        console.log("Adding animations...");
        wew.rotation = obj.rotation;  
        console.log("Added!"); 
    }
    }
   }
    this.monster.anchor = {x:0.5, y:0.5};
    this.monster.scale = {x:0.5, y:0.5};
    this.monster.y = 160; 
    game.add.sprite(280, 370, "bed");
    this.child = game.add.sprite(280, 310, "sleeping_child");
    this.child.animations.add("scare");
    this.style = { font: "16px Arial", fill: "#000044", align: "center" };
    this.faliure = { font: "16px Arial", fill: "#ff0044", align:"center"};
    this.success = { font: "16px Arial", fill: "00ff44", align:"center"};
    game.add.text(0, 0, "Scaring "+game.child["name"] +"\nTarget:"+game.target,this.style);
    //Get monster moving towards child
  
  this.roar = game.add.audio("roar");
  var tween = game.add.tween(this.monster).to({x: 250,
                                                y: 160}, 
                                          5000+ (5000*Math.random()));
  var secondTween = game.add.tween(this.monster).to({y:120}, 200);
  tween.chain(secondTween);
  tween.onComplete.add(this.scareChild, this);
  tween.start();
  
  this.myMask = game.add.illuminated.darkMask(this.myLamps, "#120b0b");     
  },

  step: function(sound) {
    if (this.notscared)
      setTimeout(function(that) {that.footstep.play();}, 750, this);
  },

  scareChild: function() {
    this.notscared = false;
    var x =game.add.sprite(this.monster.x, this.monster.y+90, "roarword");
    x.animations.add("wew");
    x.animations.play("wew", 8);
    var x =game.add.sprite(this.monster.x+140, this.monster.y+90, "roarword");
    this.myMask.kill();  
    x.animations.add("wew");
    x.rotation += 3.14/2
    x.animations.play("wew", 8);
    this.roar.play();
    console.log("argh!");
    y = 50;
    var total = {};
    var sumtotal = 0;
    for (i in stat_names) {
      i = stat_names[i];
      total[i] = game.monsterParts.stats[i]*game.child.modifiers[i];
      sumtotal += total[i];
      game.add.text(0,y,i + ": " + game.monsterParts.stats[i],this.style);
      game.add.text(0,y+17, "Multiplier "+game.child.modifiers[i]+"="+total[i],this.style);
      y+=17*2; 
    }
    var s, ss;
    if (sumtotal >= game.target){
      s = this.success;
      ss="Success!";
      this.child.animations.play("scare");
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
