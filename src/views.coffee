jQuery ->
	class AppView extends Backbone.View
		el: 'body'
		template: _.template($('#homeview-template').html())
		events:
			'click #search': 'navigateToSearch'
			'click #titleText' : 'renderControls'
		initialize: ->
			_.bindAll @
			@titleView = new TitleView()
			@searchView = new SearchView()
			@resultsView = new ResultsView()
			@footerView = new FooterView()
		render: ->
			$(@el).html @template()
			@$('#contents').append @titleView.render().el
			$(@el).append @footerView.render().el
			@
		renderControls: ->
			#$('#resultsView').fadeOut()
			@$('#contents').append @searchView.render().el
			@
		navigateToSearch: ->
			app.router.navigate('searchTest', true)
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

	class FooterView extends Backbone.View
		tagName: 'footer'
		template: _.template($('#footer-template').html())
		render: ->
			$(@el).html @template()
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
				$(@el).append classifiedView.render().el
			@

	class ClassifiedView extends Backbone.View
		tagName: 'li'
		className: 'span3'
		template: _.template($('#classified-template').html())
		render:->
			$(@el).html @template(@model.toJSON())
			@

	class PriceChartView extends Backbone.View
		el: '#graph'
		initialize: ->
			$(window).on("resize.app", _.bind(@update, @))
			@
		render: ->
			$(@el).empty()
			@drawChart()
			that = @
			callback = () -> that.update()
			setTimeout callback, 1
			@
		drawChart: ->
			formatDate = d3.time.format("%b %Y")
			@chart = app.priceChart()
				.x((d) -> formatDate.parse(d.date))
				.y((d) -> +d.price)
			@draw()
			@

		update:->
			@chart
				.width($('#graph').width()-2)
			@draw()
			@
		draw: ->
			that = @
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