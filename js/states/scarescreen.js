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
    game.load.spritesheet("snore", "res/img/fx/snore.png", 50, 50);
    game.load.image("grey", "res/img/bg/Grey_Mark.png");
    game.load.image("tryagain", "res/img/buttons/retry.png");
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
    bg.animations.play("twinkle", 2);
    this.monster = game.add.group();
    var base = this.monster.create(0, 300, "monster_base");
    for (i in game.monsterParts["parts"]) {
      if (game.monsterParts["parts"][i] != undefined) {
      
      obj = game.monsterParts["parts"][i];
      if (obj.name != null) {
        obj.x += base.x;
        obj.y += base.y;
        console.log(obj);
        var wew = this.monster.add(obj);
        wew.rotation = obj.rotation;  
    }
    }
   }
    this.monster.anchor = {x:0.5, y:0.5};
    this.monster.scale = {x:0.5, y:0.5};
    this.monster.y = 160; 
    game.add.sprite(280, 370, "bed");
    this.child = game.add.sprite(280, 310, "sleeping_child");
    this.child.animations.add("scare");
    this.style = { font: "16px Sans", fill: "#000044", align: "center" };
    this.faliure = { font: "16px Sans", fill: "#ff0044", align:"center"};
    this.success = { font: "16px Sans", fill: "00ff44", align:"center"};
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
  
  this.snore = game.add.sprite(330, 320, "snore");
  this.snore.animations.add("snore");
  this.snore.play("snore",5, true);
  this.grey = game.add.sprite(0,0,"grey");
  this.grey.alpha = 0;
  },

  step: function(sound) {
    if (this.notscared)
      setTimeout(function(that) {that.footstep.play();}, 750, this);
  },

  scareChild: function() {
    this.notscared = false;
    this.roary = game.add.sprite(this.monster.x, this.monster.y+90, "roarword");
    this.roary.animations.add("wew");
    this.roary.animations.play("wew", 8);
    this.roar1 =game.add.sprite(this.monster.x+140, this.monster.y+90, "roarword");
    this.myMask.kill();  
    this.roar1.animations.add("wew");
    this.roar1.rotation += 3.14/2
    this.roar1.animations.play("wew", 8);
    this.roar.play();
    console.log("argh!");
    this.snore.alpha = 0;
    var total = {};
    var sumtotal = 0;
    for (i in stat_names) {
      i = stat_names[i];
      total[i] = game.monsterParts.stats[i]*game.child.modifiers[i];
      sumtotal += total[i];
    }
    
    game.score = sumtotal;
    setTimeout(function(that){that.finishScare();}, 1000, this); 
  },

  finishScare: function() {
    console.log("Finishing up...");
    this.roary.alpha = 0;
    this.roar1.alpha = 0;
    this.fadein = game.add.tween(this.grey).to({alpha:0.7}, 500);
    this.fadein.onComplete.add(this.showscore, this);
    this.fadein.start();
  },

  statScore: function(name, stat, mod,x,y,i) {
    var whitetext = { font: "20px Sans", fill: "#ffffff", align: "center"};
    var tot = stat*mod;
    console.log(stat);
    var o = game.add.text(0,y,name.toUpperCase()+": "+stat + " X"+mod+" = "+ tot, whitetext);
    o.alpha = 0;
    var y = game.add.tween(o).to({alpha:1}, 1000);
    setTimeout(function(a){a.start();}, 300*i,y);
  },

  showscore: function() {
    var whitetext = { font: "65px Sans", fill: "#ffffff", align: "center",alpha:0 }
    
    var score = game.score;
    var target = game.target;
    var textobj = game.add.text(game.world.centerX-150, 0, "RESULTS", whitetext);
    textobj.alpha = 0;
    game.add.tween(textobj).to({alpha:1}, 1000).start();
    var x = game.world.centerX;
    var y = 80;
    for (i in stat_names) {
      var o = stat_names[i];
      this.statScore(stat_names[i], game.monsterParts.stats[o], game.child.modifiers[o],x,y,i);
      y += 30;
    }
    console.log(game.cost);
    score -= game.cost;
    var s = "Score: "+game.score+" - " + game.cost + " (monster cost) = "+score+"\n"+"Target was: "+target+"\n"+((target>score)?"BETTER LUCK NEXT TIME...":"SUCCESS!");
    var textobj = game.add.text(0, y, s, {font:"30px Sans", fill:"#ffffff"});
    textobj.alpha = 0;
    game.add.tween(textobj).to({alpha:1}, 1000).start(); 
 
    var b = game.add.button(20, y+130, "tryagain", this.tryagain, this,2,1,0);
    
  },
  tryagain: function() {
    game.state.start("IntelScreen");
  },
   update: function() {
   },

  
};
