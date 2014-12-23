var PhaserMMORPG = PhaserMMORPG || {};

PhaserMMORPG.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
PhaserMMORPG.Boot.prototype = {
  preload: function() {
    //assets we'll use in the loading screen
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function() {
    //setting loading screen background
    this.game.stage.backgroundColor = '#000';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //screen size will be set automatically
    this.scale.setScreenSize(true);

    //enable physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
  }
};