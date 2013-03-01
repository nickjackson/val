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
	
**Get selected option** - Multiple Disabled
```js
val(el).value() 
//= 'item-1'
val(el).text()
//= 'Item 1'
```

**Set selected option** - Multiple Disabled
```js
// if array is specified, only the first index is set to selected
	
val(el).value('item-1')
val(el).value(['item-3', 'item-4'])
val(el).text('Item 1')
val(el).text(['Item 3', 'Item 4'])
```

**Get selected option** - Multiple Enabled

```js
val(el).value() 
//= ['item-1', 'item-3']
val(el).text()
//= ['Item 1', 'Item 3']
```	
**Set selected option** - Multiple Enabled

```js	
val(el).value('item-1')
val(el).value(['item-3', 'item-4'])
val(el).text('Item 1')
val(el).text(['Item 3', 'Item 4'])
```

**Set options**

```js	
val(el).options(['Item 1', 'Item 2'])
	
// you must specify a text tag.
var opt = {text: 'Item 1', value: 'item-1', selected: false}
val(el).options([opt])
```

**Loop options**

```js
val(el).options(function(option, selected){
  console.log(option, 'is', selected)
})
```
## Todo
* Test on other browsers. Currently only tested on Chrome OSX.

## License

  MIT
