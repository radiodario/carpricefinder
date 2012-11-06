# a simple d3 time series in coffee

priceChart = () ->
	margin =
		top: 20
		right: 20
		bottom: 70
		left: 50
	width = 460
	height = 280
	xValue = (d) -> d[0]
	yValue = (d) -> d[1]
	xScale = d3.time.scale()
	yScale = d3.scale.linear()
	xAxis = d3.svg.axis().scale(xScale).orient("bottom")
	yAxis = d3.svg.axis().scale(yScale).orient("left")
	yAxisTitle = "Approximate Price (£)"
	line = d3.svg.line().interpolate("bundle")

	X = (d) ->
		xScale(d[0])

	Y = (d) ->
		yScale(d[1])

	line.x(X)
	line.y(Y)

	chart = (selection) ->
		selection.each (data) ->

			data = data.map (d, i) ->
				[xValue.call(data, d, i), yValue.call(data, d, i)]

			xScale
				.domain(d3.extent(data, (d) -> d[0]))
				.range [0, width - margin.left - margin.right]

			yScale
				.domain(d3.extent(data, (d) -> d[1]))
				.range [height - margin.top - margin.bottom, 0]

			# select the svg
			svg = d3.select(@).selectAll("svg").data([data])

			# create skeleton
			gEnter = svg.enter().append("svg").append("g")
			gEnter.append("path").attr("class", "line")
			gEnter.append("g").attr("class", "x axis")
			gEnter.append("g").attr("class", "y axis")

			# outer dim
			svg
				.attr("width", width)
				.attr("height", height)

			# inner dim
			g = svg.select("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")" )

			# line path
			g.select(".line")
				.attr("d", line)
			# x axis
			g.select(".x.axis")
				.attr("transform", "translate(0," + yScale.range()[0] + ")")
				.call(xAxis)
			# orient x-axis labels
			g.selectAll(".x.axis text")
				.attr("transform", "rotate(-45)")
				.style("text-anchor", "end")
				.attr("dx", "-.61em")
				# .attr("dy", "-.11em")

			# y axis
			g.select(".y.axis")
				.call(yAxis)
				.append("g")
					.attr("class", "title")

			g.select(".title")
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text(yAxisTitle)

		  return @
		return @

	chart.margin = (_) ->
		if !arguments.length 
			return margin
		margin = _
		return chart

	chart.width = (_) ->
		if !arguments.length
			return width
		width = _
		return chart

	chart.height = (_) ->
		if !arguments.length
			return height
		height = _
		return chart

	chart.x = (_) ->
		if !arguments.length
			return xValue
		xValue = _
		return chart

	chart.y = (_) ->
		if !arguments.length
			return yValue
		yValue = _
		return chart

	chart.yAxisTitle = (_) ->
		if !arguments.length
			return yAxisTitle
		yAxisTitle = _
		return chart

	return chart


@app = window.app ? {}
@app.priceChart = priceChart












