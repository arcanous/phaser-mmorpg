var PhaserMMORPG = PhaserMMORPG || {};

//game
PhaserMMORPG.Game = function(){};

PhaserMMORPG.Game.prototype = {
  init: function (levelName) {
      this.levelName = levelName || 'desert';

  },
  create: function() {
    that = this;
    this.map = this.game.add.tilemap(this.levelName);

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('Desert', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    //this.createDoors();    

    this.coinPickupSound = this.game.add.audio('coins',1,true);

    //find player start position
    //var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    //this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    

    this.player = new PhaserMMORPG.Avatar(this.game, 'You');

    PhaserMMORPG.myAvatar = this.player;

    //spawn other players
    PhaserMMORPG.eurecaServer.spawnOtherPlayers();


    //this.player.body.collideWorldBounds = true;
    //console.log(this.player);

    this.game.physics.arcade.enable(this.player);


    //the camera will follow the player in the world
    this.game.camera.follow(this.player.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
     
    //listen to key releases
    this.game.input.keyboard.addCallbacks(null, null, this.onKeyUpCallback);
  
  
  },
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight - 15;
        element.x -= 15;
        
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player.player, this.doors, this.enterDoor, null, this);

    //player movement
    
    this.player.stopVelocity();

    if(this.cursors.up.isDown) {
      this.player.walkUp();
    }
    else if(this.cursors.down.isDown) {
      this.player.walkDown();
    }
    if(this.cursors.left.isDown) {
      this.player.walkLeft();
    }
    else if(this.cursors.right.isDown) {
      this.player.walkRight();
    } 

    if (this.escapeKey.isDown) {
        //this.state.start('MainMenu');
    }

  },
  
  onKeyUpCallback: function (event) {
  var keyCode = event.which;
  
  if (keyCode === Phaser.Keyboard.UP ||
    keyCode === Phaser.Keyboard.DOWN ||
    keyCode === Phaser.Keyboard.LEFT ||
    keyCode === Phaser.Keyboard.RIGHT) {
    that.player.stopMovement();
  }
  
  },
  collect: function(player, collectable) {
    console.log('Yeey muney!');
    this.coinPickupSound.play('',0,1,false);
    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },
};