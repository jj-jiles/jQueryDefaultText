(function( $ ) {

	$.defaultText = function() {

		var color = {
			active   : '',
			inactive : '#bbb',
			alert    : '#C86E6E'
		};


		var methods = {

			addDefaultTextValueToInputAndTextArea : function(_this) {

				var _val = _this.val()
					, _default_text = _this.attr('data-defaulttext')
					, _req_default_text = "Required: " + _default_text;

				// only run on the input field if it is visible
				// IE still runs on the element even if you have it set to display: none
				if ( _this.is(':visible') && _val === '' || ( _val === _default_text ) || ( _val === _req_default_text ) ) {

					//var _this = $(this);
					var _text = _this.attr('data-defaulttext');

					// if data-defaulttext actually has a value, run
					if ( _text.length > 0 ) {

						// set the ruler to match the border and padding of the input field
						// this needs to be done to match the widths measured
						_dft_ruler.css({
							'padding' : _this.css('padding'),
							'border'  : _this.css('border')
						});

						// clear the ruler's HTML, just in case
						_dft_ruler.html('');
						// set the text
						_dft_ruler.text(_text);

						// get the widths of the input and ruler
						var _text_width  = _dft_ruler.outerWidth();
						var _input_width = _this.outerWidth();

						// set the input value to the default text
						// and set the font color
						_this.val(_text);
						_this.css({ 'color' : color.inactive });

						// if the input's width is less than the default text pixel width
						// adjust the width of the input
						if ( _text_width > _input_width ) {
							_this.css({ 'width' : _text_width + 'px' });
						}

						// when the user sets focus on the input, clear the default text
						_this.focus(function() {
							default_text     = _this.attr('data-defaulttext');
							req_default_text = "Required: " + default_text;
							current_val      = _this.val();

							has_default_value     = (default_text.indexOf(current_val) > -1);
							has_req_default_value = (req_default_text.indexOf(current_val) > -1);

							should_null = ( (has_default_value || has_req_default_value) && current_val.length >= 1 );

							_this.css({ 'color' : color.active });

							if ( should_null ) {
								_this.val('');
							}

						});

						// if the user moves away from the input and has not entered anything
						// set the text back to the default text
						_this.blur(function() {
							default_text = _this.attr('data-defaulttext');
							current_val  = _this.val();

							ignore_required = (_this.hasClass('require-ignore') || _this.hasClass('required-ignore'));

							if ( current_val.length <= 0 && _this.hasClass('required') ) {
								_this.val("Required: " + default_text);
								_this.css({ 'color' : color.alert });
							} else if ( current_val.length <= 0 && ignore_required ) {
								_this.val(default_text);
								_this.css({ 'color' : color.inactive });
							}
						});
					}
				}

			}

			, addDefaultTextValueToSelect : function(_this) {


				// only run on the input field if it is visible
				// IE still runs on the element even if you have it set to display: none
				if ( _this.is(':visible') ) {

					var _has_selected = _this.find('option:selected').length
						, _text = _this.attr('data-defaulttext');

					// if data-defaulttext actually has a value, run
					if ( _text.length > 0 ) {

						var _first_option = _this.find('option').eq(0)
							, _first_text   = _first_option.text()
							, is_multiple   = ( typeof(_this.attr('multiple')) != 'undefined' )
							, has_selection = ( _this.find('option:selected').length > 0 );

						if ( _first_text.length <= 0 || ( is_multiple && !has_selection ) ) {

							// set the input value to the default text
							// and set the font color
							if ( !is_multiple ) {
								_first_option.text(_text);
							}

							_this.css({ 'color' : color.inactive });

							_this.change(function() {
								if ( _this.val().length > 0 ) {
									// if ( !is_multiple ) {
									// 	_first_option.text('');
									// }
									_this.css({ 'color' : color.active });
								} else if ( !has_selection ) {
									_first_option.text(_text);
									_this.css({ 'color' : color.inactive });
								}
							});

							if ( !has_selection ) {
								if ( _this.find('option:selected').val() ) {
									_this.css({ 'color' : color.active });
								}
							} else if ( has_selection && _this.find('option:selected').index() > 0 ) {
								_this.css({ 'color' : color.active })
							}

							_this.on('focus', function() {
								_this.css({ 'color' : color.active });
							});

							_this.on('blur', function() {
								if ( (!is_multiple && _this.find('option:selected').index() == 0) || _this.find('option:selected').length == 0 ) {
									_this.css({ 'color' : color.inactive });
								}
							});
						}
					}
				}
			}

		}

		//
		// Add Default Text to all INPUT and TEXTAREA elements
		var _input_fields = $('input[data-defaulttext], textarea[data-defaulttext]');
		if ( _input_fields.length > 0 ) {
			
			// append an element to the body so text pixel width can be measured
			$('body').append('<span id="dft-ruler" style="visibility: hidden; white-space: nowrap"><span>');
			var _dft_ruler = $('#dft-ruler');

			// loop through the list of input elements that have default text
			$.each(_input_fields, function() {
				methods.addDefaultTextValueToInputAndTextArea($(this));
			});
			
			// set some of the variables to null to restore memory usage
			_input_fields=null,_dft_ruler=null,_this=null;
			
			// remove the ruler element
			$('body> #dft-ruler').remove();
		}
		// End INPUT and TEXTAREA
		// 

		//
		// Add Default Text to all SELECT elements
		var _select_lists = $('select[data-defaulttext]');
		if ( _select_lists.length > 0 ) {		


			// loop through the list of input elements that have default text
			$.each(_select_lists, function() {
				methods.addDefaultTextValueToSelect($(this));
			});
		}
		// End SELECT
		//
		
	};

})( jQuery );