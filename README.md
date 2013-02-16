jQueryDefaultText
=================

jQuery plugin for setting default text (via data-defaulttext attribute) on form input and select elements.

When creating a form element, you can add a default value, such as help text. This is a helpful, visual cue for the user to unerstand what needs to be entered into the field.

To add default text to any input or selet element:
```html
<input type="text" id="first_name" name="first_name" value="" data-defaulttext="First Name" />
<input type="text" id="last_name" name="last_name" value="" data-defaulttext="Last Name" />
<input type="text" id="email_address" name="email_address" value="" data-defaulttext="Email Address" />
```
```javascript
$(document).ready(function() {
  $.defaultText();
});
```

The defaultText plugin will loop through all input elements with the data-defaulttext attribute and assign the data-defaulttext value to the input's value, with the text colored a light grey. Once the input field gains focus, the value is set to blank and text color is set to an active state.

You can assign the class "required" to the input. When the user leaves the field blank, the value is set back to the default text with "Required: " prepended to the default text. If the input does not have the "required" class, the value is left blank.
