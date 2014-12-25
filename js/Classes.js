var PhaserMMORPG = PhaserMMORPG || {};


PhaserMMORPG.settings = {
    player : {
        walkSpeed : 150
    }

};



PhaserMMORPG.Avatar = function(game, name, initialX, initialY, color) {
  
  this.name = name || 'Player name';
  initialX = initialX || 84;
  initialY = initialY || 48;

  //this.avatar = game.add.group();

  //  Player
  this.player = game.add.sprite(initialX, initialY, 'playerDude', 1);
  
  this.setPlayerColor('random');
  
  this.player.anchor.set(0.5, 0.5);

  this.player.animations.add('left', [0, 1, 2, 3], 10, true);
  this.player.animations.add('right', [5, 6, 7, 8], 10, true);
  this.player.animations.add('up', [9, 12, 9, 13], 10, true);
  this.player.animations.add('down', [4, 10, 4, 11], 10, true);

  game.physics.enable(this.player, Phaser.Physics.ARCADE);


  //player name text
  this.playerName = game.add.text(0, -30, this.name , { font: '10px Arial', fill: '#444444', align: 'center' }); 
  this.playerName.anchor.setTo(0.5);
  
  
    //player.body.setSize(100, 140, 2, 1);
  this.player.body.collideWorldBounds = true;
  this.player.body.setSize(10, 20, 0, 0);
  
  
  //this.avatar.add(this.player);
  //this.avatar.add(this.playerName);
  
  this.player.addChild(this.playerName);
  
  return this;

}


PhaserMMORPG.Avatar.prototype.setPlayerColor = function (tintName) {
  var tints = {
      'pink' : 0xf000f0, 
      'turquoise' : 0x00ffff, 
      'green' : 0x00ff00, 
      'orange' : 0xff7e3d,
    }, tintsArray = ['pink','turquoise','green','orange'];  


    if (tints[tintName]) {
      this.player.tint = tints[tintName];

    } else if (tintName === 'random') {
      tintName = tintsArray[Math.floor(Math.random() * tintsArray.length)];
      this.player.tint = tints[tintName];
    } else {
      return;      
    }

    this.playerColor = tintName;
}



PhaserMMORPG.Avatar.prototype.walkUp = function () {
  this.player.body.velocity.y -= PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('up');
  this.update('up');
}

PhaserMMORPG.Avatar.prototype.walkDown = function () {
  this.player.body.velocity.y += PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('down');  
  this.update('down');
}

PhaserMMORPG.Avatar.prototype.walkLeft = function () {
  this.player.body.velocity.x -= PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('left');  
  this.update('left');
}

PhaserMMORPG.Avatar.prototype.walkRight = function () {
  this.player.body.velocity.x += PhaserMMORPG.settings.player.walkSpeed;
  this.playAnimation('right');
  this.update('right');
}

PhaserMMORPG.Avatar.prototype.stopVelocity = function () {
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;
}

PhaserMMORPG.Avatar.prototype.playAnimation = function (animationName) {
  this.player.play(animationName);  
}

PhaserMMORPG.Avatar.prototype.stopAnimations = function () {
  this.player.animations.stop();
}

PhaserMMORPG.Avatar.prototype.stopMovement = function () {
  this.stopAnimations();
  this.update();
}

PhaserMMORPG.Avatar.prototype.setX = function (x) {
  this.player.x = x;
}

PhaserMMORPG.Avatar.prototype.setY = function (y) {
  this.player.y = y;
}

PhaserMMORPG.Avatar.prototype.setName = function (name) {
  this.name = name;
  this.playerName.text = name;
}

PhaserMMORPG.Avatar.prototype.update = function (animationPlaying) {

  var keys = {
      x: this.player.position.x,
      y: this.player.position.y,
      animationPlaying : animationPlaying || null,
      playerColor : this.playerColor || null//,
      //playerName : this.name || 'Player name'
  };

  PhaserMMORPG.eurecaServer.handleKeys(keys);
}

PhaserMMORPG.Avatar.prototype.kill = function () {
  this.player.kill();
}
