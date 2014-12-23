var PhaserMMORPG = PhaserMMORPG || {};

PhaserMMORPG.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

PhaserMMORPG.game.state.add('Boot', PhaserMMORPG.Boot);
PhaserMMORPG.game.state.add('Preload', PhaserMMORPG.Preload);
PhaserMMORPG.game.state.add('MainMenu', PhaserMMORPG.MainMenu);
PhaserMMORPG.game.state.add('Game', PhaserMMORPG.Game);

PhaserMMORPG.game.state.start('Boot');