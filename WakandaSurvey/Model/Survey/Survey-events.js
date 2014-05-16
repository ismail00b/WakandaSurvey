

model.Survey.ownerFullName.onGet = function() {
	
	if (this.owner != null)
		return this.owner.fullName;
	
	return '';
};


model.Survey.beginDateUTC.onGet = function() {
	
	return Date.UTC( this.beginDate.getFullYear(), this.beginDate.getMonth(), this.beginDate.getDate());
	
};


model.Survey.endDateUTC.onGet = function() {
	return Date.UTC( this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), 23, 59, 59);
};
