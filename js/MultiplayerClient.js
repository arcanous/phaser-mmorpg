var PhaserMMORPG = PhaserMMORPG || {};


PhaserMMORPG.MultiplayerServerReady = false;
PhaserMMORPG.playerList = [];
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
		//create() is moved here to make sure nothing is created before uniq id assignation
		PhaserMMORPG.MyMyltiplayerId = id;
		//create();
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
	
	eurecaClient.exports.spawnAnotherPlayer = function(id, x, y)
	{
		
		if (id == PhaserMMORPG.MyMyltiplayerId) return; //this is me
		
		console.log('Spawning another player');
		var tnk = new PhaserMMORPG.Avatar(PhaserMMORPG.game, 'Player' + id);
		PhaserMMORPG.playerList[id] = tnk;
	}
	
	eurecaClient.exports.updateState = function(id, state)
	{
		if (PhaserMMORPG.playerList[id])  {
			//PhaserMMORPG.playerList[id].cursor = state;
			PhaserMMORPG.playerList[id].tank.x = state.x;
			PhaserMMORPG.playerList[id].tank.y = state.y;
			//PhaserMMORPG.playerList[id].tank.angle = state.angle;
			//PhaserMMORPG.playerList[id].turret.rotation = state.rot;
			//PhaserMMORPG.playerList[id].update();
		}
	}
}
