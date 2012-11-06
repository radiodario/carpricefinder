(function() {
  var Classifieds, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Classifieds = (function(_super) {

    __extends(Classifieds, _super);

    function Classifieds() {
      return Classifieds.__super__.constructor.apply(this, arguments);
    }

    Classifieds.prototype.url = '/cars.json';

    return Classifieds;

  })(Backbone.Collection);

  ({
    model: app.Classified
  });

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.Classifieds = Classifieds;

  this.app.classifieds = new Classifieds();

}).call(this);
