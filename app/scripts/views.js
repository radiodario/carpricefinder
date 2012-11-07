(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AppView, ClassifiedView, ClassifiedsView, ExplanationView, FooterView, PriceChartView, ResultsView, SearchView, ShareView, TitleView, _ref;
    AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        return AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.el = 'body';

      AppView.prototype.template = _.template($('#homeview-template').html());

      AppView.prototype.events = {
        'click #search': 'navigateToSearch',
        'click #titleText': 'navigateToHome'
      };

      AppView.prototype.initialize = function() {
        _.bindAll(this);
        this.titleView = new TitleView();
        this.searchView = new SearchView();
        this.resultsView = new ResultsView();
        this.explanationView = new ExplanationView();
        this.footerView = new FooterView();
        return this;
      };

      AppView.prototype.render = function() {
        $(this.el).html(this.template());
        this.$('#contents').append(this.titleView.render().el);
        this.$('#controls').append(this.searchView.render().el);
        $(this.el).append(this.footerView.render().el);
        return this;
      };

      AppView.prototype.renderControls = function() {
        this.$('#searchControls').show();
        this.hideResults();
        return this;
      };

      AppView.prototype.renderExplanation = function() {
        this.$('#contents').append(this.explanationView.render().el);
        return this;
      };

      AppView.prototype.navigateToSearch = function() {
        var make, mileage, model, url, year;
        make = this.$('select#make').val();
        model = this.$('select#model').val();
        year = this.$('select#year').val();
        mileage = this.$('select#mileage').val();
        url = 'search/' + make + '/' + model + '/' + year + '/' + mileage;
        app.router.navigate(url, false);
        this.search(make, model, year, mileage);
        return this;
      };

      AppView.prototype.navigateToHome = function() {
        return app.router.navigate('/', true);
      };

      AppView.prototype.search = function(make, model, year, mileage) {
        var view;
        view = this;
        console.log("processing search");
        this.$('#headerspace').animate({
          'margin-top': '20px'
        }, function() {
          console.log($('#searchControls'));
          $('#subTitle').fadeOut();
          $('#explanationView').fadeOut();
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
        this.resultsView = new ResultsView({
          model: new app.CarData()
        });
        this.$('#contents').append(this.resultsView.render().el);
        this.shareView = new ShareView({
          model: new app.Share()
        });
        return this;
      };

      AppView.prototype.hideResults = function() {
        return this.resultsView.hide();
      };

      return AppView;

    })(Backbone.View);
    ShareView = (function(_super) {

      __extends(ShareView, _super);

      function ShareView() {
        return ShareView.__super__.constructor.apply(this, arguments);
      }

      ShareView.prototype.el = 'body';

      ShareView.prototype.template = _.template($('#sharing-template').html());

      ShareView.prototype.initialize = function() {
        this.model.bind('change', this.render, this);
        this.render();
        return this;
      };

      ShareView.prototype.render = function() {
        $('#shareDialog').remove();
        console.log();
        $(this.el).append(this.template(this.model.toJSON()));
        return this;
      };

      return ShareView;

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
    ExplanationView = (function(_super) {

      __extends(ExplanationView, _super);

      function ExplanationView() {
        return ExplanationView.__super__.constructor.apply(this, arguments);
      }

      ExplanationView.prototype.id = 'explanationView';

      ExplanationView.prototype.template = _.template($('#explanation-template').html());

      ExplanationView.prototype.render = function() {
        $(this.el).html(this.template());
        return this;
      };

      return ExplanationView;

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
        return this;
      };

      ResultsView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.classifieds = new ClassifiedsView({
          el: this.$('#classifiedsContainer')
        });
        this.priceChart = new PriceChartView();
        this.priceChart.render();
        return this;
      };

      ResultsView.prototype.hide = function() {
        var dat;
        dat = this;
        return $(this.el).fadeOut(function() {
          return $(dat.el).remove();
        });
      };

      return ResultsView;

    })(Backbone.View);
    ClassifiedsView = (function(_super) {

      __extends(ClassifiedsView, _super);

      function ClassifiedsView() {
        return ClassifiedsView.__super__.constructor.apply(this, arguments);
      }

      ClassifiedsView.prototype.template = _.template($('#classifieds-template').html());

      ClassifiedsView.prototype.initialize = function() {
        this.collection = new app.Classifieds();
        this.collection.bind('reset', this.render, this);
        this.collection.fetch();
        return this;
      };

      ClassifiedsView.prototype.render = function() {
        var classified, classifiedView, _i, _len, _ref;
        $(this.el).html(this.template());
        console.log($(this.el));
        _ref = this.collection.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          classified = _ref[_i];
          classifiedView = new ClassifiedView({
            model: classified
          });
          this.$('ul').append(classifiedView.render().el);
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
        var formatDate;
        $(window).on("resize.app", _.bind(this.update, this));
        formatDate = d3.time.format("%b %Y");
        this.chart = app.priceChart().x(function(d) {
          return formatDate.parse(d.date);
        }).y(function(d) {
          return +d.price;
        });
        return this;
      };

      PriceChartView.prototype.render = function() {
        console.log("rendering price chart view", $(this.el));
        this.draw();
        return this;
      };

      PriceChartView.prototype.update = function() {
        if (this.chart != null) {
          this.chart.width($('#graph').width() - 2);
        }
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
