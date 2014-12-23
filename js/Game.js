var PhaserMMORPG = PhaserMMORPG || {};

//game
PhaserMMORPG.Game = function(){};

PhaserMMORPG.Game.prototype = {
  init: function (levelName) {
      this.levelName = levelName || 'desert';

  },
  create: function() {
    
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
    this.createDoors();    

    //create player
    //var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    //this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    

    this.player = new Avatar(this.game, 'Player1');

    //this.player.body.collideWorldBounds = true;
    //console.log(this.player);

    this.game.physics.arcade.enable(this.player);


    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

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
        element.y -= map.tileHeight;
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
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 500;
      this.player.play('up');
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 500;
      this.player.play('down');
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 500;
      this.player.play('left');
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 500;
      this.player.play('right');
    } else {
      this.player.animations.stop();
    }

  },
  collect: function(player, collectable) {
    console.log('yummy!');

    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },
};



function Avatar(game, name, initialX, initialY) {
  
  name = name || 'Player name';
  initialX = initialX || 84;
  initialY = initialY || 48;

//this.avatar = game.add.group();

  //  Player
  this.player = game.add.sprite(initialX, initialY, 'playerDude', 1);
  
  var tints = [0xf000f0, 0xff00ff, 0x00ffff, 0x00ff00, 0xff5500, 0x0055ff, 0x55ff00];
  
  this.player.tint = tints[Math.floor(Math.random() * tints.length)];
  
  this.player.anchor.set(0.5, 0.5);

  this.player.animations.add('left', [0, 1, 2, 3], 10, true);
  this.player.animations.add('right', [5, 6, 7, 8], 10, true);
  this.player.animations.add('up', [4], 10, true);
  this.player.animations.add('down', [4], 10, true);

  game.physics.enable(this.player, Phaser.Physics.ARCADE);


  //player name text
  this.playerName = game.add.text(0, -30, name, { font: '10px Arial', fill: '#444444', align: 'center' }); 
  this.playerName.anchor.setTo(0.5);
  
  
    //player.body.setSize(100, 140, 2, 1);
  this.player.body.collideWorldBounds = true;
  this.player.body.setSize(10, 20, 0, 0);
  
  
  //this.avatar.add(this.player);
  //this.avatar.add(this.playerName);
  
  this.player.addChild(this.playerName);
  
  return this.player;

}
