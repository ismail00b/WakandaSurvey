



model.Survey.entityMethods.setUserResult = function( result) {
	
	if ( 	('firstName' in result) && (result.firstName !== '')
		&&	('lastName' in result) && (result.lastName !== '')
		&&	('responses' in result) && (result.responses.length > 0) ) {
			
	
		var user = ds.User.find( '(firstName === :1) && (lastName === :2)', result.firstName, result.lastName);
		
		if ((user == null) && result.createUserIfNeed) {
			
			user = new ds.User( {
				'firstName': result.firstName,
				'lastName': result.lastName
			} );
			
			if (user != null) {
				user.save();
			}
		}
		
		if (user != null) {
			
			var responses = result.responses;
			
			for (var rpIter = 0, len = responses.length ; rpIter < len ; ++rpIter) {
				
				
			}
		}
	}
};

model.Survey.entityMethods.setUserResult.scope = 'public';