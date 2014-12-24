var PhaserMMORPG = PhaserMMORPG || {};

//title screen
PhaserMMORPG.MainMenu = function(){};

PhaserMMORPG.MainMenu.prototype = {
  init: function(score) {

   },
  create: function() {
  	//show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    
    //give it speed in x
    this.background.autoScroll(-20, 20);

    //start game text
    var text = "Click to enter world";
    var style = { font: "30px Open Sans", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);


    //this.menuMusic = this.game.add.audio('spaceTheme',1,true);
    //this.menuMusic.play('',0,.2,false);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game', true, false, 'uno');
      //this.menuMusic.stop();
    }
  }
};