var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //game loading text
    var text = "Loading...";
    var style = { font: "13px Open Sans", fill: "#aaa", align: "center" };
    this.loadingTextNode = this.game.add.text(this.game.width/2, this.game.height/2 + 30, text, style);
    this.loadingTextNode.anchor.set(0.5);

    //load game assets
    this.load.tilemap('level1', '/assets/tilemaps/desert/desert.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', '/assets/tilemaps/desert/tmw_desert_spacing.png');
    this.load.image('greencup', '/assets/images/greencup.png');
    this.load.image('bluecup', '/assets/images/bluecup.png');
    //this.load.image('player', '/assets/images/player.png');
    this.load.spritesheet('playerDude', '/assets/images/dude.png', 32, 48);
    this.load.image('browndoor', '/assets/images/browndoor.png');
    
    this.game.load.onFileComplete.add(this.onFileCompleteCallback, this);

  },
  create: function() {
    this.state.start('Game');
  },
  


  onFileCompleteCallback: function (percentLoaded, assetName) {
    this.loadingTextNode.text = percentLoaded + "% loaded";
  }
};