jQuery ->

	class CarPriceFinderRouter extends Backbone.Router
		routes:
			'' : 'homeScreen'
			'/search/:make/:model/:year/:mileage' :  'search'

		initialize: ->
			@view = new app.AppView()
			#bind any changes to the search query model

		homeScreen: ->
			console.log 'rendering'
			@view.render()

		search: (make, model, year, mileage) ->
			


	@app = window.app ? {}
	@app.CarPriceFinderRouter = CarPriceFinderRouter

