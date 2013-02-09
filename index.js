/**
 * Module dependencies.
 */

var aSelect = require('select')

/**
 * Gets `el` value or set `el` with `value`
 *
 * @param {Element} el
 * @param {String} value
 * @return {String}
 * @api public
 */

module.exports = val = function(el, value) {
  if (!el) throw Error('no el specified');

  var nodeName = el.nodeName.toLowerCase()
    , type = el.type;

  if (nodeName == 'input' || nodeName == 'textarea') {
    if (type == 'checkbox') {
      return checkbox.call(el, value);
    }
    return normal.call(el, value);
  }

  if (nodeName == 'select') {
    return select.call(el, value);
  }

  if (nodeName == 'option') {
    return option.call(el, value);
  }

}

/**
 * Defines getter/setter for normal fields
 */

function normal(value) {
  if (value == undefined) {
    return this.value;
  }
  return this.value = value;
}



/**
 * Defines getter/setter for checkbox
 */

function checkbox(value) {
  if (value == undefined) {
    return this.checked ? true : false;
  }

  if (value == true || value == 'true') {
    this.setAttribute('checked', 'true');
    return true;
  }

  if (value == false || value == 'false') {
    this.removeAttribute('checked');
    return false;
  }
}

/**
 * Defines getter/setter for option
 */

function option(value) {
  if (value == undefined) {
    return this.value || this.innerText;
  }
  this.value = value;
  return val(this);
}



/**
 * Defines getter/setter for select
 */

function select(value) {
  if (!this.options) return null;
  var options = [];
  
  options = aSelect(this.options, function(option){
    return option.nodeType == 1;
  });

  if (value == undefined) {
    aSelect(options, function(option){
      if (option.selected) return value = val(option);
    });

    return value;
  }

  aSelect(options, function(option){
    option.selected = (val(option) == value);
  });

  return val(this);
}
