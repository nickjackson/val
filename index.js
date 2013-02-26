/**
 * Initalizes and returns the correct API
 * for the specified `el`.
 *
 * @param {Element} el
 * @return {Mixed}
 * @api public
 */

module.exports = function Val(el) {
  if (!el) throw Error('no el specified');

  var fn;
  var type = nodeType(el);

  switch (type) {
    case 'text':
      fn = new TextAPI(el);
      break;

    case 'checkbox':
      fn = new CheckboxAPI(el);
      break;

    case 'textarea':
      fn = new TextareaAPI(el);
      break;

    case 'select':
      fn = new SelectAPI(el);
      break;

    default:
      throw new Error(el.nodeName + ' not supported!');
  }

  fn.type = type;
  return fn;
}


/**
 * Returns a single string to identify the
 * current `el`
 *
 * @param {Element} el
 * @return {String} node
 * @api private
 */

function nodeType(el){
  var node = el.nodeName.toLowerCase();
  var type = el.type;

  if (node == 'select') return 'select';
  if (node == 'textarea') return 'textarea';
  if (node == 'input') {
    if (type == 'text') return 'text';
    if (type == 'checkbox') return 'checkbox';
  }
  return;
}


/**
 * Initalizes a new `TextAPI` with `el`
 * `<input type="text">`
 *
 * @param {Element} el
 * @api private
 */

function TextAPI(el){
  this.el = el;
}


/**
 * Getter/Setter for the value of textbox:
 * - Set by providing `string`
 * - Get by providing no args
 *
 * @param {String} string
 * @return {TextAPI}
 * @api public
 */

TextAPI.prototype.value = function(string){
  if (typeof string === 'undefined'){
    return this.el.value;
  }

  this.el.setAttribute('value', string);
  return this;
}




/**
 * Initalizes a new `CheckboxAPI` with `el`
 * `<input type="checkbox">`
 *
 * @param {Element} el
 * @api private
 */

function CheckboxAPI(el){
  this.el = el;
}


/**
 * Getter/Setter for the value of a checkbox:
 * - Set by providing `string`
 * - Gets element value or true if item is checked
 *   otherwise it is undefined
 *
 * @param {String} string
 * @return {CheckboxAPI} for chaining
 * @api public
 */

CheckboxAPI.prototype.value = function(string){
  if (typeof string === 'undefined'){
    return this.checked() ? this.el.value || true : undefined;
  }

  this.el.setAttribute('value', string);
  return this;
}


/**
 * Getter/Setter for the checked state of a checkbox:
 * - Set by providing a boolean to `state`
 * - Get by providing no args
 *
 * @param {Boolean} state
 * @return {CheckboxAPI} for chaining
 * @api public
 */

CheckboxAPI.prototype.checked = function(state){
  if (typeof state === 'undefined'){
    return this.el.checked ? true : false
  }

  if (state == true) {
    this.el.setAttribute('checked', 'checked');
  }

  if (state == false) {
    this.el.removeAttribute('checked');
  }

  return this;
}


/**
 * Gets the value of a checkbox if it was checked
 *
 * @param {Boolean} state
 * @return {String}
 * @api public
 */

CheckboxAPI.prototype.checkedValue = function(){
  return this.el.value;
}


/**
 * Initalizes a new `TextareaAPI` with `el`
 * `<textarea>`
 *
 * @param {Element} el
 * @api private
 */

function TextareaAPI(el){
  this.el = el;
}


/**
 * Getter/Setter for the value of a textarea:
 * - Set by providing `string`
 * - Get by providing no args
 *
 * @param {String} string
 * @return {TextareaAPI}
 * @api public
 */

TextareaAPI.prototype.value = function(string){
  if (typeof string === 'undefined'){
    return this.el.value;
  }

  this.el.value = string;
  return this;
}




/**
 * Initalizes a new `SelectAPI` with `el`
 * `<select>`
 *
 * @param {Element} el
 * @api private
 */

function SelectAPI(el){
  this.el = el;
  this.options = [];

  // loop through select el option attributes and
  // find dom <option> and store in options array.
  for (var i=0; i < el.options.length; i++) {
    var opt = el.options[i];
    if (opt.nodeType == 1) {
      if (opt.selected) this.selected = opt;
      this.options.push(opt);
    }
  };
}


/**
 * Getter/Setter for the selected option:

 * @params {string} selector `type`
 * @param {String} string
 * @return {SelectAPI}
 * @api private
 */

SelectAPI.prototype.select = function(type, string) {
  if (typeof string === 'undefined'){
    return this.selected[type];
  }

  this.options.forEach(function(option){
    option.selected = (option[type] == string);
  })

  return this;
}


/**
 * Getter/Setter for the value of a select:
 * - Set by providing `string`
 * - Get by providing no args
 *
 * @param {String} string
 * @return {SelectAPI}
 * @api public
 */

SelectAPI.prototype.value = function(string){
  return this.select.call(this, 'value', string);
}


/**
 * Getter/Setter for the text of a select:
 * - Set by providing `string`
 * - Get by providing no args
 *
 * @param {String} string
 * @return {SelectAPI}
 * @api public
 */

SelectAPI.prototype.text = function(string){
  return this.select.call(this, 'innerText', string);
}