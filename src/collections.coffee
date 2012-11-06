
class Classifieds extends Backbone.Collection
  url : '/cars.json'
	model: app.Classified


@app = window.app ? {}
@app.Classifieds = Classifieds
@app.classifieds = new Classifieds()
#   [
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
#   { price: "£900", description: "Clio 197 R27 F1 (44/500) made for UK, Black, 49,000 Miles, AC, Xenon cornering head lights, ITG Panel filter" , link: "#"}
# ]

