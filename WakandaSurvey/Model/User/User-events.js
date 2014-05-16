

model.User.fullName.onGet = function() {
	return this.firstName + ' ' + this.lastName;
};


model.User.events.onValidate = function() {
	
	var found = application.ds.User.find( 'fullName == :1', this.fullName);
	if (found != null) {
		return {
			'error': 100,
			'errorMessage': 'user already exists'
		};
	}
};
