# val

  get/set element value - inspired by jQuery .val()

## Installation

    $ component install nickjackson/val

## Example
```js
var val = require('val');
var el = document.querySelector('input');

val(el) // returns el value
val(el, 'new value'); // sets el with 'new value'
```

## Notes
* supports input elements including checkboxes
* checkboxes can be set with true/false
* also supports select/option
* tested on:
  * IE8, IE9
  * Safari 6 (Windows)
  * Firefox 16 (Windows & Mac) 
  * Chrome 23 (Mac)


## License

  MIT
