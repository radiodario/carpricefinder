jQuery ->
	class AppView extends Backbone.View
		el: 'body'
		template: _.template($('#homeview-template').html())
		events:
			'click #search': 'navigateToSearch'
			'click #titleText' : 'navigateToHome'
			#'click #newSearch' : 'renderControls'
		initialize: ->
			_.bindAll @
			@titleView = new TitleView()
			@searchView = new SearchView()
			@resultsView = new ResultsView()
			@explanationView = new ExplanationView()
			@footerView = new FooterView()
			@
		render: ->
			$(@el).html @template()
			@$('#contents').append @titleView.render().el
			@$('#controls').append @searchView.render().el
			$(@el).append @footerView.render().el
			@
		renderControls: ->
			@$('#searchControls').show()
			@hideResults()
			@
		renderExplanation: ->
			@$('#contents').append @explanationView.render().el
			@
		navigateToSearch: ->
			make = @$('select#make').val()
			model = @$('select#model').val()
			year = @$('select#year').val()
			mileage = @$('select#mileage').val()
			url = 'search/' + make + '/' + model + '/' + year + '/' + mileage
			app.router.navigate(url , false)
			@search(make, model, year, mileage)
			@
		navigateToHome: ->
			app.router.navigate('/', true)
		search: (make, model, year, mileage) ->
			view = @
			console.log("processing search")
			#make the 'headspace' smaller
			@$('#headerspace').animate {'margin-top': '20px'}, ->
				#hide the search controls
				console.log $('#searchControls')
				$('#subTitle').fadeOut()
				$('#explanationView').fadeOut()
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
			@resultsView = new ResultsView(model: new app.CarData())
			@$('#contents').append @resultsView.render().el
			@shareView = new ShareView( model: new app.Share() )
			@
		hideResults: ->
			@resultsView.hide()

	class ShareView extends Backbone.View
		el: 'body'
		template: _.template($('#sharing-template').html())
		initialize: ->
			@model.bind 'change', @render, @
			@render()
			@
		render:->
			$('#shareDialog').remove()
			console.log()
			$(@el).append @template(@model.toJSON())
			@


	class FooterView extends Backbone.View
		tagName: 'footer'
		template: _.template($('#footer-template').html())
		render: ->
			$(@el).html @template()
			@

	class ExplanationView extends Backbone.View
		id: 'explanationView'
		template: _.template($('#explanation-template').html())
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
			@
		render: ->
			model = @model.toJSON()
			model.searchLink = window.location.href
			$(@el).html @template(model)
			@classifieds = new ClassifiedsView el: @$('#classifiedsContainer')
			@priceChart = new PriceChartView()
			@priceChart.render()
			@
		hide: ->
			dat = @
			$(@el).fadeOut( () ->
				$(dat.el).remove()
				)

	class ClassifiedsView extends Backbone.View
		template: _.template($('#classifieds-template').html())
		initialize: ->
			@collection = new app.Classifieds()
			@collection.bind 'reset', @render, @
			@collection.fetch()
			@
		render: ->
			$(@el).html @template()
			console.log $(@el)
			for classified in @collection.models
				#console.log classified.toJSON()
				classifiedView = new ClassifiedView (model: classified)
				@$('ul').append classifiedView.render().el
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
			formatDate = d3.time.format("%b %Y")
			@chart = app.priceChart()
				.x((d) -> formatDate.parse(d.date))
				.y((d) -> +d.price)
			@
		render: ->
			console.log "rendering price chart view", $(@el)
			@draw()
			@
		update:->
			if @chart?
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