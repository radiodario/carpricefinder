jQuery ->

	class CarPriceFinderRouter extends Backbone.Router
		routes:
			'' : 'homeScreen'
			'search/:make/:model/:year/:mileage' :  'search'
			'searchTest' : 'searchTest'
			
		initialize: ->
			@view = new app.AppView()
			@view.render()
			#bind any changes to the search query model

		homeScreen: ->
			console.log 'rendering'
			@view.renderControls()
			@view.renderExplanation()
			@

		searchTest: ->
			console.log 'rendering results'
			@view.search()
			@

		search: (make, model, year, mileage) ->
			@view.search(make, model, year, mileage)


	@app = window.app ? {}
	@app.CarPriceFinderRouter = CarPriceFinderRouter

