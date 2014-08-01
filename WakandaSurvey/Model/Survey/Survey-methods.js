



model.Survey.entityMethods.setUserResult = function( result) {
	
	if ( 	('surveyID' in result)
	 	&&	('firstName' in result) && (result.firstName !== '')
		&&	('lastName' in result) && (result.lastName !== '')
		&&	('responses' in result) && (result.responses.length > 0) ) {
			
	
		var survey = ds.Survey.find( 'ID == :1', result.surveyID);
		if (survey != null) {

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
					
					var oneResponse = responses[rpIter];
					
					var questionEntity = survey.questions.find( 'ID == :1', oneResponse.questionID);
					if (questionEntity != null) {
						
						var answeredQuestion = user.answeredQuestions.find( 'question.ID == :1', questionEntity.ID);
						if (answeredQuestion == null) {

							var responseEntity = questionEntity.responses.find( 'ID == :1', oneResponse.responseID);
							if (responseEntity != null) {
													
								answeredQuestion = new ds.AnsweredQuestion();
								if (answeredQuestion != null) {
									answeredQuestion.user = user;
									answeredQuestion.question = questionEntity;
									answeredQuestion.save();
								}
								
								++responseEntity.chosenCount;
								responseEntity.save();
							}
						}
					}
				}
			}
		}
	}
};

model.Survey.entityMethods.setUserResult.scope = 'public';