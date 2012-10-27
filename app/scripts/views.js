(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AppView, ClassifiedView, ClassifiedsView, FooterView, PriceChartView, ResultsView, SearchView, TitleView, _ref;
    AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        return AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.el = 'body';

      AppView.prototype.template = _.template($('#homeview-template').html());

      AppView.prototype.events = {
        'click #search': 'navigateToSearch',
        'click #titleText': 'renderControls'
      };

      AppView.prototype.initialize = function() {
        _.bindAll(this);
        this.titleView = new TitleView();
        this.searchView = new SearchView();
        this.resultsView = new ResultsView();
        return this.footerView = new FooterView();
      };

      AppView.prototype.render = function() {
        $(this.el).html(this.template());
        this.$('#contents').append(this.titleView.render().el);
        $(this.el).append(this.footerView.render().el);
        return this;
      };

      AppView.prototype.renderControls = function() {
        this.$('#contents').append(this.searchView.render().el);
        return this;
      };

      AppView.prototype.navigateToSearch = function() {
        return app.router.navigate('searchTest', true);
      };

      AppView.prototype.search = function(make, model, year, mileage) {
        var view;
        view = this;
        this.$('#headerspace').animate({
          'margin-top': '20px'
        }, function() {
          console.log($('#searchControls'));
          $('#subTitle').fadeOut();
          if ($('#searchControls').length > 0) {
            $('#subTitle').fadeOut();
            $('#searchControls').fadeOut(view.renderResults);
          } else {
            view.renderResults();
          }
          return this;
        });
        return this;
      };

      AppView.prototype.renderResults = function() {
        console.log('woah', this);
        this.$('#contents').append(this.resultsView.render().el);
        return this;
      };

      return AppView;

    })(Backbone.View);
    FooterView = (function(_super) {

      __extends(FooterView, _super);

      function FooterView() {
        return FooterView.__super__.constructor.apply(this, arguments);
      }

      FooterView.prototype.tagName = 'footer';

      FooterView.prototype.template = _.template($('#footer-template').html());

      FooterView.prototype.render = function() {
        $(this.el).html(this.template());
        return this;
      };

      return FooterView;

    })(Backbone.View);
    TitleView = (function(_super) {

      __extends(TitleView, _super);

      function TitleView() {
        return TitleView.__super__.constructor.apply(this, arguments);
      }

      TitleView.prototype.id = 'titleView';

      TitleView.prototype.template = _.template($('#title-template').html());

      TitleView.prototype.render = function() {
        $(this.el).html(this.template());
        return this;
      };

      return TitleView;

    })(Backbone.View);
    SearchView = (function(_super) {

      __extends(SearchView, _super);

      function SearchView() {
        return SearchView.__super__.constructor.apply(this, arguments);
      }

      SearchView.prototype.template = _.template($('#search-template').html());

      SearchView.prototype.id = 'searchControls';

      SearchView.prototype.render = function() {
        $(this.el).html(this.template());
        return this;
      };

      return SearchView;

    })(Backbone.View);
    ResultsView = (function(_super) {

      __extends(ResultsView, _super);

      function ResultsView() {
        return ResultsView.__super__.constructor.apply(this, arguments);
      }

      ResultsView.prototype.template = _.template($('#results-template').html());

      ResultsView.prototype.id = 'resultsView';

      ResultsView.prototype.initialize = function() {
        this.classifieds = new ClassifiedsView();
        this.priceChart = new PriceChartView();
        return this;
      };

      ResultsView.prototype.render = function() {
        $(this.el).html(this.template());
        this.$('#classifiedsContainer').html(this.classifieds.render().el);
        this.priceChart.render();
        return this;
      };

      return ResultsView;

    })(Backbone.View);
    ClassifiedsView = (function(_super) {

      __extends(ClassifiedsView, _super);

      function ClassifiedsView() {
        return ClassifiedsView.__super__.constructor.apply(this, arguments);
      }

      ClassifiedsView.prototype.tagName = 'ul';

      ClassifiedsView.prototype.id = 'classifieds';

      ClassifiedsView.prototype.className = 'thumbnails';

      ClassifiedsView.prototype.template = _.template($('#classifieds-template').html());

      ClassifiedsView.prototype.render = function() {
        var classified, classifiedView, _i, _len, _ref;
        $(this.el).empty();
        _ref = app.classifieds.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          classified = _ref[_i];
          classifiedView = new ClassifiedView({
            model: classified
          });
          $(this.el).append(classifiedView.render().el);
        }
        return this;
      };

      return ClassifiedsView;

    })(Backbone.View);
    ClassifiedView = (function(_super) {

      __extends(ClassifiedView, _super);

      function ClassifiedView() {
        return ClassifiedView.__super__.constructor.apply(this, arguments);
      }

      ClassifiedView.prototype.tagName = 'li';

      ClassifiedView.prototype.className = 'span3';

      ClassifiedView.prototype.template = _.template($('#classified-template').html());

      ClassifiedView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      };

      return ClassifiedView;

    })(Backbone.View);
    PriceChartView = (function(_super) {

      __extends(PriceChartView, _super);

      function PriceChartView() {
        return PriceChartView.__super__.constructor.apply(this, arguments);
      }

      PriceChartView.prototype.el = '#graph';

      PriceChartView.prototype.initialize = function() {
        $(window).on("resize.app", _.bind(this.update, this));
        return this;
      };

      PriceChartView.prototype.render = function() {
        var callback, that;
        $(this.el).empty();
        this.drawChart();
        that = this;
        callback = function() {
          return that.update();
        };
        setTimeout(callback, 1);
        return this;
      };

      PriceChartView.prototype.drawChart = function() {
        var formatDate;
        formatDate = d3.time.format("%b %Y");
        this.chart = app.priceChart().x(function(d) {
          return formatDate.parse(d.date);
        }).y(function(d) {
          return +d.price;
        });
        this.draw();
        return this;
      };

      PriceChartView.prototype.update = function() {
        this.chart.width($('#graph').width() - 2);
        this.draw();
        return this;
      };

      PriceChartView.prototype.draw = function() {
        var that;
        that = this;
        d3.csv('clioPrices.csv', function(data) {
          d3.select("#graph").datum(data).call(that.chart);
          return this;
        });
        return this;
      };

      return PriceChartView;

    })(Backbone.View);
    this.app = (_ref = window.app) != null ? _ref : {};
    this.app.AppView = AppView;
    return this.app.TitleView = TitleView;
  });

}).call(this);
