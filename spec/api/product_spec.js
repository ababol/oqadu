var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');

// tests of the APIv2
var expectedProduct = {
  "_id": "54de3738b7e9b0141917ec44",
  "barcode": -1,
  "name": "Abri de jardin en bois Nomel NATERIAL, 2.36 m², ép. 12 mm",
  "price": 253,
  "__v": 0,
  "reviews": [],
  "features": [{
    "label": "Surface hors tout (en m²)",
    "value": "3",
    "_id": "54de3738b7e9b0141917ec6b"
  }, {
    "label": "Surface utile (en m²)",
    "value": "2.36",
    "_id": "54de3738b7e9b0141917ec6a"
  }, {
    "label": "Largeur hors tout (cm)",
    "value": "170.8",
    "_id": "54de3738b7e9b0141917ec69"
  }, {
    "label": "Profondeur hors tout (en cm)",
    "value": "175.4",
    "_id": "54de3738b7e9b0141917ec68"
  }, {
    "label": "Hauteur hors tout (en cm)",
    "value": "199.8",
    "_id": "54de3738b7e9b0141917ec67"
  }, {
    "label": "Hauteur de la porte (en cm)",
    "value": "163.5",
    "_id": "54de3738b7e9b0141917ec66"
  }, {
    "label": "Largeur de la porte (en cm)",
    "value": "74.5",
    "_id": "54de3738b7e9b0141917ec65"
  }, {
    "label": "Epaisseur de la paroi (en mm)",
    "value": "12",
    "_id": "54de3738b7e9b0141917ec64"
  }, {
    "label": "Matière",
    "value": "Bois",
    "_id": "54de3738b7e9b0141917ec63"
  }, {
    "label": "Densité du bois (kg/m3)",
    "value": "450",
    "_id": "54de3738b7e9b0141917ec62"
  }, {
    "label": "Certification",
    "value": "PEFC",
    "_id": "54de3738b7e9b0141917ec61"
  }, {
    "label": "Process de traitement",
    "value": "Aucun",
    "_id": "54de3738b7e9b0141917ec60"
  }, {
    "label": "Surface à traiter (en m²)",
    "value": "11.2",
    "_id": "54de3738b7e9b0141917ec5f"
  }, {
    "label": "Classe d'emploi",
    "value": "1",
    "_id": "54de3738b7e9b0141917ec5e"
  }, {
    "label": "Couleur",
    "value": "Bois naturel",
    "_id": "54de3738b7e9b0141917ec5d"
  }, {
    "label": "Montage",
    "value": "Panneaux à assembler",
    "_id": "54de3738b7e9b0141917ec5c"
  }, {
    "label": "Temps indicatif de montage",
    "value": "1/2 journée à 2 personnes",
    "_id": "54de3738b7e9b0141917ec5b"
  }, {
    "label": "Type de toiture",
    "value": "Panneaux de particules hydrofuges",
    "_id": "54de3738b7e9b0141917ec5a"
  }, {
    "label": "Recouvrable en tuile/ardoise",
    "value": "Non",
    "_id": "54de3738b7e9b0141917ec59"
  }, {
    "label": "Surface de toit à couvrir (en m²)",
    "value": "3.2",
    "_id": "54de3738b7e9b0141917ec58"
  }, {
    "label": "Pourcentage pente de toit (en %)",
    "value": "40",
    "_id": "54de3738b7e9b0141917ec57"
  }, {
    "label": "Type de couverture",
    "value": "Feutre bitumé",
    "_id": "54de3738b7e9b0141917ec56"
  }, {
    "label": "Couleur de la couverture",
    "value": "Noir",
    "_id": "54de3738b7e9b0141917ec55"
  }, {
    "label": "Fenêtre",
    "value": "Non",
    "_id": "54de3738b7e9b0141917ec54"
  }, {
    "label": "Dimension de la dalle en béton (lxL) (en m)",
    "value": "1,5×1,6",
    "_id": "54de3738b7e9b0141917ec53"
  }, {
    "label": "Plancher fourni",
    "value": "Oui",
    "_id": "54de3738b7e9b0141917ec52"
  }, {
    "label": "Type de serrure",
    "value": "Verrou",
    "_id": "54de3738b7e9b0141917ec51"
  }, {
    "label": "Garantie (année)",
    "value": "2",
    "_id": "54de3738b7e9b0141917ec50"
  }, {
    "label": "Surface (en m²)",
    "value": "Moins de 4",
    "_id": "54de3738b7e9b0141917ec4f"
  }, {
    "label": "Largeur intérieure (en cm)",
    "value": "150",
    "_id": "54de3738b7e9b0141917ec4e"
  }, {
    "label": "Largeur extérieure (en cm)",
    "value": "152.4",
    "_id": "54de3738b7e9b0141917ec4d"
  }, {
    "label": "Profondeur intérieure (en cm)",
    "value": "157.6",
    "_id": "54de3738b7e9b0141917ec4c"
  }, {
    "label": "Profondeur extérieure (en cm)",
    "value": "160",
    "_id": "54de3738b7e9b0141917ec4b"
  }, {
    "label": "Hauteur paroi extérieure (en cm)",
    "value": "164",
    "_id": "54de3738b7e9b0141917ec4a"
  }, {
    "label": "Hauteur faîtage extérieur (en cm)",
    "value": "199.8",
    "_id": "54de3738b7e9b0141917ec49"
  }, {
    "label": "Nécessite un permis de construire",
    "value": "Non",
    "_id": "54de3738b7e9b0141917ec48"
  }, {
    "label": "Déclaration de travaux à faire en mairie",
    "value": "Oui",
    "_id": "54de3738b7e9b0141917ec47"
  }, {
    "label": "Essence de bois",
    "value": "Sapin du nord",
    "_id": "54de3738b7e9b0141917ec46"
  }, {
    "label": "Dimension (en cm)",
    "value": "l 74.5 cm x H 163.5 cm",
    "_id": "54de3738b7e9b0141917ec45"
  }],
  "pictures": [{
    "label": "Abri de jardin en bois Nomel NATERIAL, 2.36 m², ép. 12 mm",
    "path": "http://s2.lmcdn.fr/imagesV3/navigationPermanente/common/lazy._r04475433a070_.gif",
    "_id": "54de3738b7e9b0141917ec6c"
  }],
  "tags": ["Terrasse", "Jardin", "Abri", "garage", "rangement", "étendage",
    "Abri de jardin", "Moins de 4"
  ]
};

// test the integrity of the returned JSON by getting the products list
frisby.create('Check All Products /Products')
  .get(url + '/api/v2/Products')
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(200)
  .expectJSONTypes('*', {
    barcode: Number,
    name: String,
    price: Number,
    tags: [String],
    pictures: [{
      label: String,
      path: String
    }],
    features: [{
      label: String,
      value: String
    }],
    reviews: [{
      title: String,
      reviewerName: String,
      score: Number,
      comment: String
    }]
  })
  .expectJSON('?', expectedProduct)
.toss();

frisby.create('Check Product ID /Products/:productId')
  .get(url + '/api/v2/Products/54de3738b7e9b0141917ec44')
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(200)
  .expectJSON(expectedProduct)
  .toss();
