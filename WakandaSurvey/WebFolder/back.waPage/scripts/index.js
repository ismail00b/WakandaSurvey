
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var dgSurveys = {};	// @dataGrid
	var btValidateSurveyCreation = {};	// @button
	var btCancelSurveyEdition = {};	// @button
	var btValidateSurveyEdition = {};	// @button
	var btCancelSurveyCreation = {};	// @button
	var btCreateSurvey = {};	// @button
	var btCreateUser = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	dgSurveys.onRowDblClick = function dgSurveys_onRowDblClick (event)// @startlock
	{// @endlock
		$$('cntEditSurvey').show();
		$$('cntSurveysList').hide();
	};// @lock

	btValidateSurveyCreation.click = function btValidateSurveyCreation_click (event)// @startlock
	{// @endlock
		sources.survey.save( {
			'onSuccess': function (event) {
				sources.survey.addEntity( sources.survey.getCurrentElement());
				$$('cntCreateSurveyStep1').hide();
				$$('cntEditSurvey').show();				
			},
			'onError': function (error) {
				alert( error['error'][0].message);
			}
		} );
	};// @lock

	btCancelSurveyEdition.click = function btCancelSurveyEdition_click (event)// @startlock
	{// @endlock
		$$('cntSurveysList').show();
		$$('cntEditSurvey').hide();
	};// @lock

	btValidateSurveyEdition.click = function btValidateSurveyEdition_click (event)// @startlock
	{// @endlock
		sources.survey.save( {
			'onSuccess': function (event) {
			},
			'onError': function (error) {
				alert( error['error'][0].message);
			}
		} );
	};// @lock

	btCancelSurveyCreation.click = function btCancelSurveyCreation_click (event)// @startlock
	{// @endlock
		$$('cntSurveysList').show();
		$$('cntCreateSurveyStep1').hide();
	};// @lock

	btCreateSurvey.click = function btCreateSurvey_click (event)// @startlock
	{// @endlock
		sources.survey.newEntity();
		$$('cntCreateSurveyStep1').show();
		$$('cntSurveysList').hide();		
	};// @lock

	btCreateUser.click = function btCreateUser_click (event)// @startlock
	{// @endlock
		var firstName = $$('teFirstName').getValue();
		var lastName = $$('teLastName').getValue();
		if (firstName.length > 0 && lastName.length > 0) {
			sources.user.newEntity();
			sources.user.firstName = firstName;
			sources.user.lastName = lastName;
			sources.user.save( {
				'onSuccess': function (event) {
					sources.user.addEntity( sources.user.getCurrentElement());
					$$('teFirstName').setValue( '');
					$$('teLastName').setValue( '');
				},
				'onError': function (error) {
					alert( error['error'][0].message);
				}
			} );
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("dgSurveys", "onRowDblClick", dgSurveys.onRowDblClick, "WAF");
	WAF.addListener("btValidateSurveyCreation", "click", btValidateSurveyCreation.click, "WAF");
	WAF.addListener("btCancelSurveyEdition", "click", btCancelSurveyEdition.click, "WAF");
	WAF.addListener("btValidateSurveyEdition", "click", btValidateSurveyEdition.click, "WAF");
	WAF.addListener("btCancelSurveyCreation", "click", btCancelSurveyCreation.click, "WAF");
	WAF.addListener("btCreateSurvey", "click", btCreateSurvey.click, "WAF");
	WAF.addListener("btCreateUser", "click", btCreateUser.click, "WAF");
// @endregion
};// @endlock
