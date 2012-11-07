
class Classifieds extends Backbone.Collection
  url : 'cars.json'
	model: app.Classified


@app = window.app ? {}
@app.Classifieds = Classifieds
@app.classifieds = new Classifieds()

