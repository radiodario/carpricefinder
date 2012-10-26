jQuery ->
	class AppView extends Backbone.View
		el: 'body'
		template: _.template($('#homeview-template').html())
		events:
			'click #search': 'search'
			'click #titleText' : 'renderControls'
		initialize: ->
			_.bindAll @
			@titleView = new TitleView()
			@searchView = new SearchView()
			@resultsView = new ResultsView()
			@render()
		render: ->
			$(@el).html @template()
			@$('#contents').append @titleView.render().el
			@
		renderControls: ->
			#$('#resultsView').fadeOut()
			@$('#contents').append @searchView.render().el
			@
		search: (make, model, year, mileage) ->
			view = @
			#make the 'headspace' smaller
			@$('#headerspace').animate {'margin-top': '20px'}, ->
				#hide the search controls
				console.log $('#searchControls')
				$('#subTitle').fadeOut()
				if $('#searchControls').length > 0
					$('#subTitle').fadeOut()
					$('#searchControls').fadeOut view.renderResults
				else
					view.renderResults()
				@
				#$(this.el).append this.ResultsView.render().el	
			@
		renderResults: ->
			console.log 'woah', @
			@$('#contents').append @resultsView.render().el
			@


	class TitleView extends Backbone.View
		id: 'titleView'
		template: _.template($('#title-template').html())
		render: ->
			$(@el).html @template()
			@

	class SearchView extends Backbone.View
		template: _.template($('#search-template').html())
		id: 'searchControls'
		render: ->
			$(@el).html @template()
			@


	class ResultsView extends Backbone.View
		template: _.template($('#results-template').html())
		id: 'resultsView'
		initialize: ->
			@classifieds = new ClassifiedsView()
			@priceChart = new PriceChartView()
			@
		render: ->
			$(@el).html @template()
			@$('#classifiedsContainer').html @classifieds.render().el
			@priceChart.render()
			@

	class ClassifiedsView extends Backbone.View
		tagName: 'ul'
		id: 'classifieds'
		className: 'thumbnails'
		template: _.template($('#classifieds-template').html())
		render: ->
			$(@el).empty() # @template()
			for classified in app.classifieds.models
				classifiedView = new ClassifiedView (model: classified)
				console.log classified, classifiedView, $('ul'), @el
				$(@el).append classifiedView.render().el
			@

	class ClassifiedView extends Backbone.View
		tagName: 'li'
		className: 'span2'
		template: _.template($('#classified-template').html())
		render:->
			$(@el).html @template(@model.toJSON())
			@

	class PriceChartView extends Backbone.View
		tagName: 'div'
		initialize: ->
			@
		render: ->
			$(@el).empty()
			@drawChart()
			@
		drawChart: ->
			that = @
			formatDate = d3.time.format("%b %Y")
			@chart = app.priceChart()
				.x((d) -> formatDate.parse(d.date))
				.y((d) -> +d.price)

			d3.csv('clioPrices.csv', (data) ->
					d3.select("#graph")
						.datum(data)
						.call(that.chart)
					@
				)
			@






	#	class SparkLineView extends Backbone.View
	@app = window.app ? {}
	@app.AppView = AppView
	@app.TitleView = TitleView