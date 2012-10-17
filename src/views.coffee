jQuery ->
	class AppView extends Backbone.View
		el: 'body'
		class: 'container-fluid'
		template: _.template($('#homeview-template').html())
		initialize: ->
			_.bindAll @
			@render()
		render: ->
			$(@el).html @template()


	@app = window.app ? {}
	@app.AppView = AppView