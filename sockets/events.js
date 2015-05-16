exports.events = function( socket ) {
	socket.on('salut',function(datas) {
		console.log('Un utilisateur a dit salut !');
		process.env['nb_co']++;
	});	
	
	
	
}