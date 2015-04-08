exports.events = function( socket ) {
	socket.on('salut',function(datas) {
		console.log('Un utilisateur a dit salut !');
	});	
	socket.on('coucou',function(datas) {
		console.log('Un utilisateur a dit coucou !');
	});
}