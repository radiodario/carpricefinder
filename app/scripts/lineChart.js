(function() {
  var priceChart, _ref;

  priceChart = function() {
    var X, Y, chart, height, line, margin, width, xAxis, xScale, xValue, yAxis, yAxisTitle, yScale, yValue;
    margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 50
    };
    width = 460;
    height = 312;
    xValue = function(d) {
      return d[0];
    };
    yValue = function(d) {
      return d[1];
    };
    xScale = d3.time.scale();
    yScale = d3.scale.linear();
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    yAxisTitle = "Approximate Price (£)";
    line = d3.svg.line().interpolate("bundle");
    X = function(d) {
      return xScale(d[0]);
    };
    Y = function(d) {
      return yScale(d[1]);
    };
    line.x(X);
    line.y(Y);
    chart = function(selection) {
      selection.each(function(data) {
        var g, gEnter, svg;
        data = data.map(function(d, i) {
          return [xValue.call(data, d, i), yValue.call(data, d, i)];
        });
        xScale.domain(d3.extent(data, function(d) {
          return d[0];
        })).range([0, width - margin.left - margin.right]);
        yScale.domain(d3.extent(data, function(d) {
          return d[1];
        })).range([height - margin.top - margin.bottom, 0]);
        svg = d3.select(this).selectAll("svg").data([data]);
        gEnter = svg.enter().append("svg").append("g");
        gEnter.append("path").attr("class", "line");
        gEnter.append("g").attr("class", "x axis");
        gEnter.append("g").attr("class", "y axis");
        svg.attr("width", width).attr("height", height);
        g = svg.select("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        g.select(".line").attr("d", line);
        g.select(".x.axis").attr("transform", "translate(0," + yScale.range()[0] + ")").call(xAxis);
        g.selectAll(".x.axis text").attr("transform", "rotate(-45)").style("text-anchor", "end").attr("dx", "-.61em");
        g.select(".y.axis").call(yAxis).append("g").attr("class", "title");
        g.select(".title").append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(yAxisTitle);
        return this;
      });
      return this;
    };
    chart.margin = function(_) {
      if (!arguments.length) {
        return margin;
      }
      margin = _;
      return chart;
    };
    chart.width = function(_) {
      if (!arguments.length) {
        return width;
      }
      width = _;
      return chart;
    };
    chart.height = function(_) {
      if (!arguments.length) {
        return height;
      }
      height = _;
      return chart;
    };
    chart.x = function(_) {
      if (!arguments.length) {
        return xValue;
      }
      xValue = _;
      return chart;
    };
    chart.y = function(_) {
      if (!arguments.length) {
        return yValue;
      }
      yValue = _;
      return chart;
    };
    chart.yAxisTitle = function(_) {
      if (!arguments.length) {
        return yAxisTitle;
      }
      yAxisTitle = _;
      return chart;
    };
    return chart;
  };

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.priceChart = priceChart;

}).call(this);
