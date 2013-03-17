/**
 * helper to find out type
 */

var toString = Object.prototype.toString;


/**
 * Initalizes and returns the correct API
 * for the specified `el`.
 *
 * @param {Element} el
 * @return {Mixed}
 * @api public
 */

var Val = module.exports = function Val(el) {
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
    if (type == 'password') return 'text';
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
  this.multiple = el.multiple || false
}


/**
 * Creates a map cb loop for all valid el options

 * @return {Array} mapped results
 * @api private
 */


SelectAPI.prototype.options = function(cb){
  var el = this.el
    , rtn = [];

  if (toString.call(cb) != '[object Function]') {
    return this.setOptions(cb)
  }
  // loop through select el option attributes and
  // find dom <option> and store in options array.

  for (var i=0; i < el.options.length; i++) {
    var opt = el.options[i];
    if (opt.nodeType == 1) {
      var fn = cb.call(this, opt, opt.selected);
      if (fn) rtn.push(fn);
    }
  };
  return rtn;
}

/**
 * Getter/Setter for the selected option:

 * @params {string} selector `type`
 * @param {String|Array} value
 * @return {SelectAPI}
 * @api private
 */

SelectAPI.prototype.select = function(type, value) {
  var self = this;

  if (typeof value === 'undefined'){
    var vals = this.options(function(option, sel){
      if (sel) return option[type]
    });

    if (this.multiple) return vals;
    if (vals.length == 0) return;
    return vals[0];
  }

  if (typeof value === 'string') value = [value];

  if (!this.multiple) value = [value[0]];

  this.options(function(option){
    option.selected = !!~value.indexOf(option[type]);
  })

  return this;
}


/**
 * Getter/Setter for the value of a select:
 * - Set by providing `string`
 * - Get by providing no args
 *
 * @param {String|Array} value
 * @return {SelectAPI}
 * @api public
 */

SelectAPI.prototype.value = function(value){
  return this.select.call(this, 'value', value);
}


/**
 * Getter/Setter for the text of a select:
 * - Set by providing `string`
 * - Get by providing no args
 *
 * @param {String|Array} value
 * @return {SelectAPI}
 * @api public
 */

SelectAPI.prototype.text = function(value){
  return this.select.call(this, 'innerText', value);
}


/**
 * Sets options for the select box
 *
 * @param {Array} opts
 * @return {SelectAPI}
 * @api private
 */

SelectAPI.prototype.setOptions = function(opts){
  var self = this
    , selected = [];

  if (toString.call(opts) == '[object Object]') {
    var arr = [];
    for (var key in opts) {
      arr.push({value: key, text: opts[key]})
    }
    opts = arr;
  }

  if (toString.call(opts) != '[object Array]') {
    throw new Error('you have specified an incorrect options type')
  }

  this.el.innerHTML = '';

  opts.forEach(function(opt){
    var el = document.createElement('option');

    if (typeof opt == 'string') {
      opt = {text: opt}
    }

    if (opt.text != undefined) {
      el.innerText = opt.text;
    } else {
      throw new Error('must specify text');
    }

    if (opt.value) {
      el.value = opt.value;
    }

    if (opt.selected) {
      selected.push(opt.text)
    }

    self.el.appendChild(el);
  });

  return this.text(selected);
}