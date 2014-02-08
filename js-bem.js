(function() {

  function BemBlock(selector) {
    this.setOrigin(selector);
  }

  BemBlock.prototype.setOrigin = function(selector) {
    this._selector = selector;
    this.$bl = $(this._selector);
    this.$elem = {};
  };

  var concatMod = function(mod) {
    var pairs = [];
    for (var i in mod) {
      if (mod.hasOwnProperty(i)) {
        pairs.push(i + '_' + mod[i]);
      }
    }

    return pairs.join('_');
  };

  BemBlock.prototype.elemSelector = function(elem, mod) {
    return this._selector + '__' + elem + (mod ? '_' + concatMod(mod) : '');
  };

  BemBlock.prototype.elem = function(elem, mod, $ctx) {
    if ($ctx) {
      return $ctx.find(this.elemSelector(elem, mod));
    }

    if (!this.$elem[elem]) {
      this.$elem[elem] = this.$bl.find(this.elemSelector(elem, mod));
    }

    return this.$elem[elem];
  };

  BemBlock.prototype.clearCache = function(elem) {
    if (!elem) {
      this.$elem = {};
    } else {
      delete this.$elem[elem];
    }

    return this;
  };

  BemBlock.prototype.bind = function(elem, mod, type, fn) {
    if (typeof mod === 'string') {
      fn = type;
      type = mod;
      mod = null;
    }
    var block = this;
    this.elem(elem, mod)[type](function(ev) {
      this._bemBlock = block;
      fn.apply(this, arguments);
    });
  };

  BemBlock.getOriginBlockByDomElement = function(el) {
    return el._bemBlock;
  };

  BemBlock.findElem = function(current, elem, mod, $ctx) {
    var block = BemBlock.getOriginBlockByDomElement(current);
    return block.elem(elem, mod, $ctx);
  };
  BemBlock.findElemFrom = function(current, elem, mod) {
    return BemBlock.findElem(current, elem, mod, $(current));
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = BemBlock;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return BemBlock;
      });
    }
    else {
      window.BemBlock = BemBlock;
    }
  }

})();