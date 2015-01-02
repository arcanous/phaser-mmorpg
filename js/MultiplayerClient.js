var PhaserMMORPG = PhaserMMORPG || {};


PhaserMMORPG.MultiplayerServerReady = false;
PhaserMMORPG.playerList = PhaserMMORPG.playerList || {};
PhaserMMORPG.MyMyltiplayerId = 0;

//this function will handle client communication with the server
PhaserMMORPG.eurecaClientSetup = function() {
	//create an instance of eureca.io client
	var eurecaClient = new Eureca.Client();
	
	eurecaClient.ready(function (proxy) {		
		PhaserMMORPG.eurecaServer = proxy;
	});
	
	
	//methods defined under "exports" namespace become available in the server side
	
	eurecaClient.exports.setId = function(id) 
	{
		PhaserMMORPG.MyMyltiplayerId = id;
		PhaserMMORPG.eurecaServer.handshake();
		PhaserMMORPG.MultiplayerServerReady = true;
	}	
	
	eurecaClient.exports.kill = function(id)
	{	
		if (PhaserMMORPG.playerList[id]) {
			PhaserMMORPG.playerList[id].kill();
			console.log('killing ', id, PhaserMMORPG.playerList[id]);
		}
	}	
	
	eurecaClient.exports.spawnAnotherPlayer = function(id, x, y, color, ip)
	{
		
		if (id == PhaserMMORPG.MyMyltiplayerId) return; //this is me
		
		console.log('Spawning another player with name ' + ip);
		var plr = new PhaserMMORPG.Avatar(PhaserMMORPG.game, ip, x, y, color);
		PhaserMMORPG.playerList[id] = plr;
	}
	
	eurecaClient.exports.updateState = function(id, state)
	{
		if (PhaserMMORPG.playerList[id] && PhaserMMORPG.MyMyltiplayerId  !== id)  {

			//PhaserMMORPG.playerList[id].cursor = state;
			PhaserMMORPG.playerList[id].setX(state.x);
			PhaserMMORPG.playerList[id].setY(state.y);

			if (state.animationPlaying) {
				PhaserMMORPG.playerList[id].playAnimation(state.animationPlaying);
			} else {
				PhaserMMORPG.playerList[id].stopAnimations();
			}

			if (PhaserMMORPG.playerList[id].playerColor !== state.playerColor) {
				PhaserMMORPG.playerList[id].setColor(state.playerColor);
			}

			if (PhaserMMORPG.playerList[id].name !== state.playerName) {
				PhaserMMORPG.playerList[id].setName(state.playerName);
			}

		}
	}
}
