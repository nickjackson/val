var assert = require('component-assert')
  , val = require('val');

describe('val', function(){
  describe('input#text', function(){
    var textbox;

    beforeEach(function(){
      textbox = document.createElement('input');
      textbox.setAttribute('type', 'text');
      textbox.setAttribute('value', 'get foo bar');
    })

    it('can get value', function(){
      var v = val(textbox).value();
      assert(v == 'get foo bar');
    })

    it('can set value', function(){
      val(textbox).value('set foo bar');
      assert(textbox.getAttribute('value') == 'set foo bar');
    })
  })

  describe('input#password', function(){
    var textbox;

    beforeEach(function(){
      textbox = document.createElement('input');
      textbox.setAttribute('type', 'password');
      textbox.setAttribute('value', 'get foo bar');
    })

    it('can get value', function(){
      var v = val(textbox).value();
      assert(v == 'get foo bar');
    })

    it('can set value', function(){
      val(textbox).value('set foo bar');
      assert(textbox.getAttribute('value') == 'set foo bar');
    })
  })

  describe('input#hidden', function(){
    var textbox;

    beforeEach(function(){
      textbox = document.createElement('input');
      textbox.setAttribute('type', 'hidden');
      textbox.setAttribute('value', 'get foo bar');
    })

    it('can get value', function(){
      var v = val(textbox).value();
      assert(v == 'get foo bar');
    })

    it('can set value', function(){
      val(textbox).value('set foo bar');
      assert(textbox.getAttribute('value') == 'set foo bar');
    })
  })


  describe('textarea', function(){
    var textarea;

    beforeEach(function(){
      textarea = document.createElement('textarea');
      textarea.value = 'get foo bar';
    })

    it('can get value', function(){
      var v = val(textarea).value();
      assert( v == 'get foo bar');
    })

    it('can set value', function(){
      val(textarea).value('set foo bar');
      assert(textarea.value == 'set foo bar');
    })
  })

  describe('checkbox', function(){
    var checkbox, v;

    beforeEach(function(){
      checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('value', 'foo foo bar');
      v = val(checkbox);
    })

    describe('.value()', function(){
      it('can get value', function(){
        assert(v.value() == undefined);
        checkbox.setAttribute('checked', 'checked');
        assert(v.value() == 'foo foo bar');
      })

      it('can set value', function(){
        v.value('foo bar bar');
        assert(checkbox.value == 'foo bar bar');
      })
    })

    describe('.checked()', function(){
      it('can get checked state', function(){
        checkbox.setAttribute('checked', 'checked');
        assert(v.checked() == true);
        checkbox.removeAttribute('checked');
        assert(v.checked() == false);
      })

      it('can set a checked state', function(){
        v.checked(true);
        assert(checkbox.checked == true);
        v.checked(false);
        assert(checkbox.checked == false);
      })
    })

    it('can get .checkedValue()', function(){
      assert(v.checkedValue() == 'foo foo bar');
    })

  })

  describe('select', function(){
    var select
      , options = []

    beforeEach(function(){
      select = document.createElement('select');
      options = [];

      for (var i=0; i < 4; i++) {
        var option = document.createElement('option');
        option.setAttribute('value', 'foo-bar-' + i);
        option.innerText = 'Foo Bar ' + i;
        select.appendChild(option);
        options.push(option);
      };
    });

    it('doesn\'t moan if there are no options in select', function(){
      select.innerHTML = '';
      assert(val(select).value() == undefined)
      assert(val(select).text() == undefined)
    });

    describe('not multiple', function(){
      describe('.value()', function(){
        it('can be set', function(){
          val(select).value('foo-bar-3');
          assert(options[0].selected == false)
          assert(options[1].selected == false)
          assert(options[2].selected == false)
          assert(options[3].selected == true)
        })
        it('can be set and handle array', function(){
          val(select).value(['foo-bar-1']);
          assert(options[0].selected == false)
          assert(options[1].selected == true)
          assert(options[2].selected == false)
          assert(options[3].selected == false)
        })
        it('defaults to 0 with invalid value', function(){
          val(select).value('foo');
          assert(options[0].selected == true)
          assert(options[1].selected == false)
          assert(options[2].selected == false)
          assert(options[3].selected == false)
        })
        it('defaults to 0 with invalid array value', function(){
          val(select).value(['foo']);
          assert(options[0].selected == true)
          assert(options[1].selected == false)
          assert(options[2].selected == false)
          assert(options[3].selected == false)
        })
        it('can be got', function(){
          options[2].selected = true;
          assert(val(select).value() == 'foo-bar-2')
        })
      })

      describe('.text()', function(){
        it('can be set', function(){
          val(select).text('Foo Bar 1');
          assert(options[0].selected == false)
          assert(options[1].selected == true)
          assert(options[2].selected == false)
          assert(options[3].selected == false)
        })
        it('can be got', function(){
          options[0].selected = true;
          assert(val(select).text() == 'Foo Bar 0')
        })
      })
    })

    describe('multiples', function(){
      beforeEach(function(){
        select.setAttribute('multiple', '');
      })

      describe('.value', function(){
        it('can be set with single item', function(){
          val(select).value('foo-bar-3');
          assert(options[0].selected == false)
          assert(options[1].selected == false)
          assert(options[2].selected == false)
          assert(options[3].selected == true)
        })
        it('can be set with multiple items', function(){
          val(select).value(['foo-bar-1', 'foo-bar-0']);
          assert(options[0].selected == true)
          assert(options[1].selected == true)
          assert(options[2].selected == false)
          assert(options[3].selected == false)
        })
        it('can be got', function(){
          options[2].selected = true;
          options[3].selected = true;
          assert(val(select).value()[0] == 'foo-bar-2')
          assert(val(select).value()[1] == 'foo-bar-3')
        })
      })

      describe('.text', function(){
        it('can be set with single item', function(){
          val(select).text('Foo Bar 3');
          assert(options[0].selected == false)
          assert(options[1].selected == false)
          assert(options[2].selected == false)
          assert(options[3].selected == true)
        })
        it('can be set with multiple items', function(){
          val(select).text(['Foo Bar 1', 'Foo Bar 0']);
          assert(options[0].selected == true)
          assert(options[1].selected == true)
          assert(options[2].selected == false)
          assert(options[3].selected == false)
        })
        it('can be got', function(){
          options[2].selected = true;
          options[3].selected = true;
          assert(val(select).text()[0] == 'Foo Bar 2')
          assert(val(select).text()[1] == 'Foo Bar 3')
        })
      })
    })

    describe('.options(fn)', function(){
      it('loops through the options correctly', function(){
        var i = 0;
        val(select).options(function(option){
          assert(options[i] == option);
          i++;
        });
      })
    })

    describe('.options()', function(){
      beforeEach(function(){
        select.innerHTML = '';
        options = [];
      })

      it('can set options with array of string', function(){
        val(select).options(['Foo 1', 'Foo 2']);
        var html = '<option>Foo 1</option><option>Foo 2</option>';
        assert(select.innerHTML == html)
      })

      it('can set options with array of object', function(){
        var foo = {text: 'Foo', value: 'foo'};
        var bar = {text: 'Bar', value: 'bar'};
        val(select).options([foo, bar]);
        var foohtml = '<option value="foo">Foo</option>';
        var barhtml = '<option value="bar">Bar</option>';
        assert(select.options[0].outerHTML == foohtml);
        assert(select.options[1].outerHTML == barhtml);
      });

      it('can set options with object', function(){
        val(select).options({ foo: "Foo", bar: "Bar"});
        var foohtml = '<option value="foo">Foo</option>';
        var barhtml = '<option value="bar">Bar</option>';
        assert(select.options[0].outerHTML == foohtml);
        assert(select.options[1].outerHTML == barhtml);
      });

      it('can set options with object with blank text', function(){
        val(select).options({ foo: "", bar: "Bar"});
        var foohtml = '<option value="foo"></option>';
        var barhtml = '<option value="bar">Bar</option>';
        assert(select.options[0].outerHTML == foohtml);
        assert(select.options[1].outerHTML == barhtml);
      });

      it('can set options and select with array of object', function(){
        var foo = {text: 'Foo', value: 'foo'};
        var bar = {text: 'Bar', value: 'bar'};
        var baz = {text: 'Baz', value: 'baz', selected: true};
        val(select).options([foo, bar, baz]);
        assert(val(select).value() == 'baz');
        assert(val(select).text() == 'Baz');
      });

      it('can set options and multiple select with array of object', function(){
        select.setAttribute('multiple', '')
        var foo = {text: 'Foo', value: 'foo', selected: false};
        var bar = {text: 'Bar', value: 'bar', selected: true};
        var baz = {text: 'Baz', value: 'baz', selected: true};
        val(select).options([foo, bar, baz]);
        assert(val(select).value()[0] == 'bar');
        assert(val(select).value()[1] == 'baz');
        assert(val(select).text()[0] == 'Bar');
        assert(val(select).text()[1] == 'Baz');
      });

      it('can be chained when options are set', function(){
        assert(val(select).options(['One', 'Two', 'Three']).text() == 'One');
        var foo = {text: 'Foo', value: 'foo'};
        var bar = {text: 'Bar', value: 'bar', selected: true};
        assert(val(select).options([foo, bar]).value() == 'bar');
      })
    })
  })
})