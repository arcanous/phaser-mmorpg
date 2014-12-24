var PhaserMMORPG = PhaserMMORPG || {};


PhaserMMORPG.MultiplayerServerReady = false;

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
		myId = id;
		//create();
		PhaserMMORPG.eurecaServer.handshake();
		PhaserMMORPG.MultiplayerServerReady = true;
	}	
	
	eurecaClient.exports.kill = function(id)
	{	
		if (tanksList[id]) {
			tanksList[id].kill();
			console.log('killing ', id, tanksList[id]);
		}
	}	
	
	eurecaClient.exports.spawnEnemy = function(i, x, y)
	{
		
		if (i == myId) return; //this is me
		
		console.log('SPAWN');
		var tnk = new Tank(i, game, tank);
		tanksList[i] = tnk;
	}
	
	eurecaClient.exports.updateState = function(id, state)
	{
		if (tanksList[id])  {
			tanksList[id].cursor = state;
			tanksList[id].tank.x = state.x;
			tanksList[id].tank.y = state.y;
			tanksList[id].tank.angle = state.angle;
			tanksList[id].turret.rotation = state.rot;
			tanksList[id].update();
		}
	}
}
