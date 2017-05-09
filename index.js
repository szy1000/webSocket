var server = require('ws').Server;
var s = new server({ port: 5001 });

var name;

s.on('connection', function(ws) {
	ws.on('message', function(message) {

		// console.log("Received:" + message);
		// //for index.html
		// if(message == 'hello') {
		// 	ws.send("hey there from server");
		// }
		// // for index2.html
		// ws.send("Form server:" + message);

		// // for index3.html
		// console.log("one more client connected");

		// for index4.html
		message = JSON.parse(message);

		if(message.type == "name") {
			ws.personName = message.data;
			return;
		};
		s.clients.forEach(function e(client) {
			if(client != ws)
				client.send(JSON.stringify({
					// name: ws.personName,
					// data: message.data
					name: client.personName,
					data: message.data
				}));
		})
	})
	ws.on('close', function() {
		console.log('I am lost');
	});
})