
var clear = function clear() {
	
	var users = ds.User.all();
	users.remove();
	
	var answeredQuestions = ds.AnsweredQuestion.all();
	answeredQuestions.remove();
	
	var responses = ds.Response.all();
	responses.forEach( function( response) {
		
		response.chosenCount = 0;
		response.save();
	} );
};

//clear();

var survey = ds.Survey.find( 'ID == 17');
var user = ds.User.find( 'ID == 17');
if (survey != null && user != null) {
	survey.owner = user;
	survey.save();
}

