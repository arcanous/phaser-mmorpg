var PhaserMMORPG = PhaserMMORPG || {};





PhaserMMORPG.settings = {

    player : {
        walkSpeed : 150,
        runSpeed : 300
    },

    keyboard : {
        runKey : Phaser.Keyboard.SHIFT      
    }

};

/**
* The player controlled avatar
*
* @class PhaserMMORPG.Avatar
* @constructor
* @param {Phaser.Game} game - Reference to the current game instance.
* @param {string} name - Avatar name that will be visible above it
* @param {integer} initialX - Initial x coordinates. Defaults to 84
* @param {integer} initialY - Initial y coordinates. Defaults to 48
* @param {string} color - Color denotifying sprite tint
*
* @return {PhaserMMORPG.Avatar} Itself
*/
PhaserMMORPG.Avatar = function(game, name, initialX, initialY, color) {


  /**
  * @name PhaserMMORPG.Avatar#name
  * @property {string} name - the name associated with this avatar. Matches the text above head
  * @default
  */  
  this.name = name || 'Player name';

  initialX = initialX || 84;

  initialY = initialY || 48;

  /**
  * @name PhaserMMORPG.Avatar#mainSprite
  * @property {Phaser.Sprite} mainSprite - the name that will be visible above 
  */  
  this.mainSprite = game.add.sprite(initialX, initialY, 'playerDude', 1);
  
  this.setColor('random');
  
  this.mainSprite.anchor.set(0.5, 0.5);

  this.mainSprite.animations.add('left', [0, 1, 2, 3], 10, true);
  this.mainSprite.animations.add('right', [5, 6, 7, 8], 10, true);
  this.mainSprite.animations.add('up', [9, 12, 9, 13], 10, true);
  this.mainSprite.animations.add('down', [4, 10, 4, 11], 10, true);

  game.physics.enable(this.mainSprite, Phaser.Physics.ARCADE);


  /**
  * @name PhaserMMORPG.Avatar#avatarName
  * @property {Phaser.Text} avatarName - the name that will be visible above 
  */  
  this.avatarName = game.add.text(0, -30, this.name , { font: '10px Arial', fill: '#444444', align: 'center' }); 
  this.avatarName.anchor.setTo(0.5);
  
  
    //player.body.setSize(100, 140, 2, 1);
  this.mainSprite.body.collideWorldBounds = true;
  this.mainSprite.body.setSize(10, 20, 0, 0);
  
  
  this.mainSprite.addChild(this.avatarName);
  
  return this;

}

/**
* Sets a tint on the avatar sprite from the available colors
*
* @method PhaserMMORPG.Avatar#setColor
* @param {string} tintName - The tint to color the player avatar in. 
*/
PhaserMMORPG.Avatar.prototype.setColor = function (tintName) {
  var tints = {
      'pink' : 0xf000f0, 
      'turquoise' : 0x00ffff, 
      'green' : 0x00ff00, 
      'orange' : 0xff7e3d,
    }, tintsArray = ['pink','turquoise','green','orange'];  


    if (tints[tintName]) {
      this.mainSprite.tint = tints[tintName];

    } else if (tintName === 'random') {
      tintName = tintsArray[Math.floor(Math.random() * tintsArray.length)];
      this.mainSprite.tint = tints[tintName];
    } else {
      return;      
    }

    this.mainSpriteColor = tintName;
}

/**
* Walk upwards
*
* @method PhaserMMORPG.Avatar#walkUp
*/
PhaserMMORPG.Avatar.prototype.walkUp = function () {
  this.mainSprite.body.velocity.y -= PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('up');
  this.update('up');
}

PhaserMMORPG.Avatar.prototype.walkDown = function () {
  this.mainSprite.body.velocity.y += PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('down');  
  this.update('down');
}

PhaserMMORPG.Avatar.prototype.walkLeft = function () {
  this.mainSprite.body.velocity.x -= PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('left');  
  this.update('left');
}

PhaserMMORPG.Avatar.prototype.walkRight = function () {
  this.mainSprite.body.velocity.x += PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('right');
  this.update('right');
}

PhaserMMORPG.Avatar.prototype.runUp = function () {
  this.mainSprite.body.velocity.y -= PhaserMMORPG.settings.player.runSpeed;
  this.playAnimation('up', 20);
  this.update('up');
}

PhaserMMORPG.Avatar.prototype.runDown = function () {
  this.mainSprite.body.velocity.y += PhaserMMORPG.settings.player.runSpeed;
  this.playAnimation('down', 20);  
  this.update('down');
}

PhaserMMORPG.Avatar.prototype.runLeft = function () {
  this.mainSprite.body.velocity.x -= PhaserMMORPG.settings.player.runSpeed;
  this.playAnimation('left', 20);  
  this.update('left');
}

PhaserMMORPG.Avatar.prototype.runRight = function () {
  this.mainSprite.body.velocity.x += PhaserMMORPG.settings.player.runSpeed;
  this.playAnimation('right', 20);
  this.update('right');
}

PhaserMMORPG.Avatar.prototype.stopVelocity = function () {
    this.mainSprite.body.velocity.y = 0;
    this.mainSprite.body.velocity.x = 0;
}

PhaserMMORPG.Avatar.prototype.playAnimation = function (animationName) {
  this.mainSprite.play(animationName);  
}

PhaserMMORPG.Avatar.prototype.stopAnimations = function () {
  this.mainSprite.animations.stop();
}

PhaserMMORPG.Avatar.prototype.stopMovement = function () {
  this.stopAnimations();
  this.update();
}

PhaserMMORPG.Avatar.prototype.setX = function (x) {
  this.mainSprite.x = x;
}

PhaserMMORPG.Avatar.prototype.setY = function (y) {
  this.mainSprite.y = y;
}

PhaserMMORPG.Avatar.prototype.setName = function (name) {
  this.name = name;
  this.mainSpriteName.text = name;
}

PhaserMMORPG.Avatar.prototype.update = function (animationPlaying) {

  var keys = {
      x: this.mainSprite.position.x,
      y: this.mainSprite.position.y,
      animationPlaying : animationPlaying || null,
      playerColor : this.mainSpriteColor || null//,
      //playerName : this.name || 'Player name'
  };

  PhaserMMORPG.eurecaServer.handleKeys(keys);
}

PhaserMMORPG.Avatar.prototype.kill = function () {
  this.mainSprite.kill();
}
