# val

  get/set element value and more

## Installation

    $ component install nickjackson/val

## Example
```js
var val = require('val');

var el = document.querySelector('#textbox');

val(el).value('foo bar baz')
// set value to 'foo bar baz'

val(el).value()
//= 'foo bar baz'
```

## API
### input/text & input/password
* `.value()` - get value 
* `.value(str)` - set value 

### input/checkbox
* `.value()` - get value
    * returns value or true if checked
    * returns undefined if not checked.
* `.value(str)` - sets value
* `.checked()` - gets checked state
* `.checked(boolean)` - sets checked state
* `.checkedValue()` - gets value irrelevant of checked

### textarea
* `.value()` - get value 
* `.value(str)` - set value 

### select
* `.value()` - get value of selection option
* `.value(str)` - set selected option by `.value`
* `.text()` - get innerText of selected option 
* `.text(str)` - set selected option by `.innerText`

## Todo
* multiple support from select node
* Allow select-options to be added with object/array.

## License

  MIT
