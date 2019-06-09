var SITE_formValidation = {
	config: {
		$form: $('#form')
	},

	init: function() {
		var _ = this;
		
		_.config.$form.each(function(){
			var $thisForm = $(this);
			var submitted = false;

    		$.validator.addMethod("passwordRegex", function(value) {
   				return /^.{8,}$/i.test(value)
			});
			
			$thisForm.validate({
				rules:  {
					phoneNumber: {
						phoneUS: true
					},
					email: {
						email: true
					},
					reEnterEmail: {
						equalTo: "#email"
					},
					zipCode: {
						zipcodeUS: true
					},
					password: {
						passwordRegex: true,
						minlength: 8,
					},
					reEnterPassword: {
						equalTo: "#password",
						minlength: 8,
					}
				},
				messages: {
					firstName: 'Enter a first name',
					lastName: 'Enter a last name',
					name: 'Enter a name',
					phoneNumber: 'Enter a valid phone number',
					email: 'Enter a valid email address',
					reEnterEmail: 'Enter the same email address',
					zipCode: 'Enter a valid zip code',
					customerNumber: 'Enter a valid customer number',
					businessPhoneNumber: 'Enter a valid business phone number',
					password: 'Enter a valid password',
					reEnterPassword: 'Enter the same password',
					username: 'Enter a valid username',
				},
                wrapper: 'li',
                focusInvalid: false,
				highlight: function(element) {
					$(element).parent().addClass('input-form__input--error');
				},
				unhighlight: function(element) {
					$(element).parent().removeClass('input-form__input--error');
				},
				errorPlacement: function (error, element) {
					error.insertAfter(element);
				},
				showErrors: function(errorMap, errorList) {
                    if(submitted) {
                        var summary = '';

                        $.each(errorList, function(i){
                            var el = errorList[i].element,
                                    id = $(el).attr('id');

                            summary += '<li><a href="#' + id + '">' + this.message + '</a></li>';
                        });

						$('.error-message ul').html(summary);
						$('.error-message').addClass('active').attr('tabindex', -1).focus();

                        submitted = false;
                    }

                    this.defaultShowErrors();
				},
				invalidHandler: function(form, validator) {
					submitted = true;
				},
			});
		});
	}
};

SITE_formValidation.init();