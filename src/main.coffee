#/* Car Price Finder frontend */

@app = window.app ? {}

jQuery ->

	@app.router = new @app.CarPriceFinderRouter
	Backbone.history.start({pushState:true})
