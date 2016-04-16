var ScareScreen = function() {};
ScareScreen.prototype = {
  
  init: function() {
  },

  preload: function() {
    game.load.image("scare_bg", "res/img/bg/Scare_BG.png");
    game.load.image("monster_base", "res/img/monsterparts/Monster_Base.png");
  },

  create: function() {
    game.add.sprite(0,0,"scare_bg");
    console.log(game.monsterParts);
    this.monster = game.add.group();
    var base = this.monster.create(100, 100, "monster_base");
    for (i in game.monsterParts) {
      obj = game.monsterParts[i];
      console.log(obj);
      obj.x += base.x;
      obj.y += base.y;
      this.monster.create(obj.x, obj.y, obj.name);
    }
  },

  update: function() {
  
  },


};
