
var ws = ws || {};
ws.surveyResult = [];


ws.updateSurveyList = function updateSurveyList( date) {
	var utc = Date.UTC( date.getFullYear(), date.getMonth(), date.getDate());
	sources.survey.query( 'beginDateUTC >= :1 && endDateUTC <= :1', utc);
};


WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var btValidate = {};	// @button
	var questionsEvent = {};	// @dataSource
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	btValidate.click = function btValidate_click (event)// @startlock
	{// @endlock
		var survey = sources.survey.getCurrentElement();
		if (survey != null) {
		
			var result = {
				'surveyID': survey.ID.getValue(),
				'firstName': $$('teFirstName').getValue(),
				'lastName': $$('teLastName').getValue(),
				'createUserIfNeed': true,
				'responses': []
			};
			
			for (var questionIter = 0, questionLen = ws.surveyResult.length ; questionIter < questionLen ; ++questionIter) {
				
				var questionResult = ws.surveyResult[questionIter];
				var responseID = null;
				
				for (var responseIter = 0, responseLen = questionResult.responses.length ; (responseIter < responseLen) && (responseID == null) ; ++responseIter) {
				
					var rbResponse = document.getElementById( 'rbResponse' + questionResult.responses[responseIter]);
					if (rbResponse != null) {
						if (('checked' in rbResponse) && rbResponse.checked) {
							responseID = questionResult.responses[responseIter];
						}
					}
				}
					
				if (responseID != null) {
					result.responses.push( {
						'questionID': questionResult.ID,
						'responseID': responseID
					} );
				}
			}
			
			if ((result.responses.length > 0) && (result.firstName !== '') && (result.lastName !== '')) {
				survey.setUserResult( result);
			}
		}
	};// @lock

	questionsEvent.onCollectionChange = function questionsEvent_onCollectionChange (event)// @startlock
	{// @endlock
		ws.surveyResult = [];
		
		if (sources.questions.length > 0) {
			
			var questionLabelHeight = 30;
			var responseControlHeight = 25;
		
			var ctSurveyView = document.getElementById( 'ctSurveyView');
			
			// empty the container
			var lChildNodes = [];
			for (var iter = 0, len = ctSurveyView.childNodes.length ; iter < len ; ++iter) {
				lChildNodes.push( ctSurveyView.childNodes[iter]);
			}
			lChildNodes.forEach( function (node) {
				ctSurveyView.removeChild( node);
			} );
		
			var divQuestionHPos = 0;
			
			sources.questions.getEntityCollection().forEach( {
				'onSuccess': function(event) {

					var question = event.entity;
					var responses = question.getResponses();
					
					var questionResult = {
						'ID': question.ID.getValue(),
						'responses': []
					};
					
					ws.surveyResult.push( questionResult);
					
					var ctSurveyView = document.getElementById( 'ctSurveyView');
					
					var divQuestionHeight = 0;

					// create a div element for the question
					var divQuestion = document.createElement( 'div');
					divQuestion.setAttribute( 'id', 'divQuestion' + question.ID.getValue());

					var labelQuestion = document.createElement( 'richText');
					labelQuestion.setAttribute( 'id', 'lblQuestion' + question.ID.getValue());
					labelQuestion.setAttribute( 'style', 'width:100%;height:' + questionLabelHeight.toString() + 'px');
					labelQuestion.style.font = 'bold 14px arial';
					labelQuestion.innerHTML = question.label.getValue();
					divQuestion.appendChild( labelQuestion);
					divQuestionHeight += questionLabelHeight;
					
					var radioButtonName = 'radioButton' + question.ID.getValue();
				
					responses.forEach( {
						'onSuccess': function(event) {
							
							var response = event.entity;
							
							// create a div element for the response
							var divResponse = document.createElement( 'div');
							divResponse.setAttribute( 'id', 'divResponse' + response.ID.getValue());
							divResponse.setAttribute( 'style', 'width:100%;height:' + responseControlHeight.toString() + 'px;left:20px;top:' + divQuestionHeight.toString() + 'px;position:absolute');
	
							var radioButton = document.createElement( 'input');
							radioButton.setAttribute( 'id', 'rbResponse' + response.ID.getValue());
							radioButton.setAttribute( 'type', 'radio');
							radioButton.setAttribute( 'name', radioButtonName);
							radioButton.setAttribute( 'value', response.ID.getValue());
							radioButton.setAttribute( 'style', 'width:15px;height:15px');
							divResponse.appendChild( radioButton);
							
							var labelResponse = document.createElement( 'richText');
							labelResponse.setAttribute( 'id', 'lblResponse' + response.ID.getValue());
							labelResponse.setAttribute( 'style', 'width:100%;left:20px;position:absolute');
							labelResponse.style.font = '12px arial';
							labelResponse.innerHTML = response.label.getValue();
							divResponse.appendChild( labelResponse);
							divQuestion.appendChild( divResponse);
							
							questionResult.responses.push( response.ID.getValue());
											
							divQuestionHeight += responseControlHeight;
						}
					} );
					
					divQuestionHeight += 20;
					
					divQuestion.setAttribute( 'style', 'width:100%;height:' + divQuestionHeight.toString() + 'px;top:' + divQuestionHPos.toString() + 'px;position:absolute');
					ctSurveyView.appendChild( divQuestion);

					divQuestionHPos += divQuestionHeight;
					
				},
				
        		'onError': function(event) {
				},
				
				atTheEnd: function(event) {
				}
			} );
			
			ctSurveyView.setAttribute( 'style', 'height:' + divQuestionHPos.toString() + 'px');
			
			var ctValidation = document.getElementById( 'ctValidation');
			var ctSurveyViewBottom = ctSurveyView.offsetTop + ctSurveyView.clientHeight;
			ctValidation.setAttribute( 'style', 'top:' + ctSurveyViewBottom.toString() + 'px;position:absolute');
	    }
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		ws.updateSurveyList( new Date());		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("btValidate", "click", btValidate.click, "WAF");
	WAF.addListener("questions", "onCollectionChange", questionsEvent.onCollectionChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
