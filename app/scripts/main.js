(function() {
  var _ref;

  this.app = (_ref = window.app) != null ? _ref : {};

  jQuery(function() {
    this.app.router = new this.app.CarPriceFinderRouter;
    return Backbone.history.start();
  });

}).call(this);
