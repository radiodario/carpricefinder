(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CarPriceFinderRouter, _ref;
    CarPriceFinderRouter = (function(_super) {

      __extends(CarPriceFinderRouter, _super);

      function CarPriceFinderRouter() {
        return CarPriceFinderRouter.__super__.constructor.apply(this, arguments);
      }

      CarPriceFinderRouter.prototype.routes = {
        '': 'homeScreen',
        'search/:make/:model/:year/:mileage': 'search',
        'searchTest': 'searchTest'
      };

      CarPriceFinderRouter.prototype.initialize = function() {
        this.view = new app.AppView();
        return this.view.render();
      };

      CarPriceFinderRouter.prototype.homeScreen = function() {
        console.log('rendering');
        return this.view.renderControls();
      };

      CarPriceFinderRouter.prototype.searchTest = function() {
        console.log('rendering results');
        return this.view.search();
      };

      CarPriceFinderRouter.prototype.search = function(make, model, year, mileage) {
        return this.view.search(make, model, year, mileage);
      };

      return CarPriceFinderRouter;

    })(Backbone.Router);
    this.app = (_ref = window.app) != null ? _ref : {};
    return this.app.CarPriceFinderRouter = CarPriceFinderRouter;
  });

}).call(this);
