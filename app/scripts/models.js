(function() {
  var CarData, Classified, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Classified = (function(_super) {

    __extends(Classified, _super);

    function Classified() {
      return Classified.__super__.constructor.apply(this, arguments);
    }

    return Classified;

  })(Backbone.Model);

  CarData = (function(_super) {

    __extends(CarData, _super);

    function CarData() {
      return CarData.__super__.constructor.apply(this, arguments);
    }

    CarData.prototype.defaults = {
      make: 'Renault',
      model: 'Clio',
      subModel: '1.9D',
      price: 1280,
      miles: 100000,
      image: '/images/clio.png'
    };

    return CarData;

  })(Backbone.Model);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.Classified = Classified;

  this.app.CarData = CarData;

}).call(this);
