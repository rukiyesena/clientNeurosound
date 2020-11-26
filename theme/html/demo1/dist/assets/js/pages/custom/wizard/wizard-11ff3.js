"use strict";

// Class definition
var KTWizard1 = function () {
	// Base elements
	var _wizardEl;
	var _formEl;
	var _wizardObj;
	var _validations = [];

	// Private functions
	var _initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					name: {
						validators: {
							notEmpty: {
								message: 'İsim gerekli'
							}
						}
					},
					surname: {
						validators: {
							notEmpty: {
								message: 'Soyad gerekli'
							}
						}
					},
					city: {
						validators: {
							notEmpty: {
								message: 'Şehir gerekli'
							}
						}
					},
					state: {
						validators: {
							notEmpty: {
								message: 'Şehir gerekli'
							}
						}
					},
					country: {
						validators: {
							notEmpty: {
								message: 'Ülke gerekli'
							}
						}
					},
					testdate: {
						validators: {
							notEmpty: {
								message: 'Test zamanı gerekli'
							}
						}
					},
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 2
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					package: {
						validators: {
							notEmpty: {
								message: 'Package details is required'
							}
						}
					},
					phone: {
						validators: {
							notEmpty: {
								message: 'Telefon numarası gerekli'
							},
							digits: {
								message: 'Girilen değer kullanılamaz'
							}
						}
					},
					weight: {
						validators: {
							notEmpty: {
								message: 'Package weight is required'
							},
							digits: {
								message: 'The value added is not valid'
							}
						}
					},
					width: {
						validators: {
							notEmpty: {
								message: 'Package width is required'
							},
							digits: {
								message: 'The value added is not valid'
							}
						}
					},
					height: {
						validators: {
							notEmpty: {
								message: 'Package height is required'
							},
							digits: {
								message: 'The value added is not valid'
							}
						}
					},
					packagelength: {
						validators: {
							notEmpty: {
								message: 'Package length is required'
							},
							digits: {
								message: 'The value added is not valid'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 3
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					delivery: {
						validators: {
							notEmpty: {
								message: 'Uygulanan program gerekli'
							}
						}
					},
					packaging: {
						validators: {
							notEmpty: {
								message: 'Packaging type is required'
							}
						}
					},
					preferreddelivery: {
						validators: {
							notEmpty: {
								message: 'Preferred delivery window is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 4
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					locaddress1: {
						validators: {
							notEmpty: {
								message: 'Address is required'
							}
						}
					},
					locpostcode: {
						validators: {
							notEmpty: {
								message: 'Postcode is required'
							}
						}
					},
					loccity: {
						validators: {
							notEmpty: {
								message: 'City is required'
							}
						}
					},
					locstate: {
						validators: {
							notEmpty: {
								message: 'State is required'
							}
						}
					},
					loccountry: {
						validators: {
							notEmpty: {
								message: 'Country is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));
	}

	var _initWizard = function () {
		// Initialize form wizard
		_wizardObj = new KTWizard(_wizardEl, {
			startStep: 1, // initial active step number
			clickableSteps: false  // allow step clicking
		});

		// Validation before going to next page
		_wizardObj.on('change', function (wizard) {
			if (wizard.getStep() > wizard.getNewStep()) {
				return; // Skip if stepped back
			}

			// Validate form before change wizard step
			var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					if (status == 'Valid') {
						wizard.goTo(wizard.getNewStep());

						KTUtil.scrollTop();
					} else {
						Swal.fire({
							text: "Üzgünüz, bazı hatalar tespit ettik, lütfen tekrar deneyiniz.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Tamamdır, anladım!",
							customClass: {
								confirmButton: "btn font-weight-bold btn-light"
							}
						}).then(function () {
							KTUtil.scrollTop();
						});
					}
				});
			}

			return false;  // Do not change wizard step, further action will be handled by he validator
		});

		// Change event
		_wizardObj.on('changed', function (wizard) {
			KTUtil.scrollTop();
		});

		// Submit event
		_wizardObj.on('submit', function (wizard) {
			Swal.fire({
				text: "Herşey tamam! Lütfen formu onaylayın.",
				icon: "success",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Evet, onaylandı!",
				cancelButtonText: "Hayır, iptal edildi",
				customClass: {
					confirmButton: "btn font-weight-bold btn-primary",
					cancelButton: "btn font-weight-bold btn-default"
				}
			}).then(function (result) {
				if (result.value) {
					_formEl.submit(); // Submit form
				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "Formunuz onaylanmadı!.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Tamam, anladım!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-primary",
						}
					});
				}
			});
		});
	}

	return {
		// public functions
		init: function () {
			_wizardEl = KTUtil.getById('kt_wizard');
			_formEl = KTUtil.getById('kt_form');

			_initValidation();
			_initWizard();
		}
	};
}();

jQuery(document).ready(function () {
	KTWizard1.init();
});
