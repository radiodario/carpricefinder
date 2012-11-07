class Classified extends Backbone.Model


class CarData extends Backbone.Model
  defaults:
    make: 'Renault'
    model: 'Clio'
    subModel: '1.9D'
    price: 1280
    miles: 100000
    image: 'images/clio.png'

class Share extends Backbone.Model
  defaults:
    link: window.location.href


@app = window.app ? {}
@app.Classified = Classified
@app.CarData = CarData
@app.Share = Share

