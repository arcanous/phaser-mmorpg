var PhaserMMORPG = PhaserMMORPG || {};

//loading the game assets
PhaserMMORPG.Preload = function(){};

PhaserMMORPG.Preload.prototype = {
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
    
    //tilemaps
    this.load.tilemap('desert', '/assets/tilemaps/desert/desert.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('desertmaze', '/assets/tilemaps/desert/desertmaze.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('uno', '/assets/tilemaps/desert/uno.json', null, Phaser.Tilemap.TILED_JSON);
    

    this.load.image('gameTiles', '/assets/tilemaps/desert/tmw_desert_spacing.png');

    this.load.image('space', '/assets/images/space.png');
    this.load.image('greencup', '/assets/images/greencup.png');
    this.load.image('bluecup', '/assets/images/bluecup.png');
    this.load.image('browndoor', '/assets/images/browndoor.png');

    this.load.image('goldpile', '/assets/images/goldpile.png');



    this.load.spritesheet('playerDude', '/assets/images/dude.png', 32, 48);


    this.load.audio('spaceTheme', '/assets/audio/space-theme.mp3');
    this.load.audio('coins', '/assets/audio/coins.wav');

    
    this.game.load.onFileComplete.add(this.onFileCompleteCallback, this);

  },
  create: function() {
    //this.state.start('MainMenu');
    this.loadingTextNode.text = "Starting multiplayer...";
    PhaserMMORPG.eurecaClientSetup();
  },
  update: function () {
    if (PhaserMMORPG.MultiplayerServerReady) {
        this.state.start('MainMenu');    
    } 

  },


  onFileCompleteCallback: function (percentLoaded, assetName) {
    this.loadingTextNode.text = percentLoaded + "% loaded";
  }
};