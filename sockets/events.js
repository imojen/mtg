exports.events = function( socket, current_user ) {

	socket.on('connect_user',function(datas) {
		current_user = datas;
		var isConnected = false;
		var count = 0;
		for( var i in global.users ) {
			if( global.users[i] && global.users[i] == current_user )
				isConnected = true;
			count++;
		}		
		if( !isConnected ) {
			global.users[current_user['user']] = current_user;
			count++;
		}
		all('nb_user_connected',{ 'nb' : count} );
	});	

	socket.on('disconnect',function() {
		delete global.users[current_user['user']];
		var count = 0;
		for( var i in global.users ) {
			count++;
		}			
		all('nb_user_connected',{ 'nb' : count} );	
	});

	socket.on('deconnexion',function() {
		delete global.users[current_user['user']];
		var count = 0;
		for( var i in global.users ) {
			count++;
		}			
		all('nb_user_connected',{ 'nb' : count} );	
	});

	socket.on('nb_user_connected',function() {
		var count = 0;
		for( var i in global.users ) {
			count++;
		}			
		socket.emit('nb_user_connected',{ 'nb' : count} );
	});


	function all( msg, param ) {
		socket.broadcast.emit(msg,param);	
		socket.emit(msg,param);				
	}
	
	
	
}