db.questions.insert(
   [
     { _id: ObjectId("545f70d9946ea453ece17e7e"), text: "Quel rayon vous interesse?" },
     { _id: ObjectId("545f70d9946ea453ece17e7f"), text: "De quoi avez-vous besoin?" },
     { _id: ObjectId("545f70d9946ea453ece17e80"), text: "De quoi avez-vous besoin?" },
     { _id: ObjectId("545f70d9946ea453ece17e81"), text: "Que voulez-vous entretenir" },
     { _id: ObjectId("545f70d9946ea453ece17e82"), text: "Que souhaitez-vous décorer?" },
     { _id: ObjectId("545f70d9946ea453ece17e83"), text: "Que souhaitez-vous peindre?" },
     { _id: ObjectId("545f70d9946ea453ece17e84"), text: "Quel type de matériel?" },
     { _id: ObjectId("545f70d9946ea453ece17e85"), text: "Quel type d'entretien?" },
     { _id: ObjectId("545f70d9946ea453ece17e86"), text: "Quel type d'entretien?" },
     { _id: ObjectId("545f70d9946ea453ece17e87"), text: "Quel type d'entretien?" },
     { _id: ObjectId("545f70d9946ea453ece17e88"), text: "De quoi avez-vous besoin?" },
     { _id: ObjectId("545f70d9946ea453ece17e89"), text: "De quoi avez-vous besoin?" },
     { _id: ObjectId("545f70d9946ea453ece17e90"), text: "Quel type de support?" },
     { _id: ObjectId("545f70d9946ea453ece17e91"), text: "De quelle couleur?" }
   ]
);
db.answers.insert(
   [
      {
        _id: ObjectId("545f70d9946ea453ece17e92"),
        questionId: ObjectId("545f70d9946ea453ece17e7e"),
        text: "Jardin",
        nextUrl: "question/545f70d9946ea453ece17e7f"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17e93"),
        questionId: ObjectId("545f70d9946ea453ece17e7e"),
        text: "Peinture",
        nextUrl: "question/545f70d9946ea453ece17e80"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17e94"),
        questionId: ObjectId("545f70d9946ea453ece17e7f"),
        text: "Outillage",
        nextUrl: "question/545f70d9946ea453ece17e81"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17e95"),
        questionId: ObjectId("545f70d9946ea453ece17e7f"),
        text: "Décoration",
        nextUrl: "question/545f70d9946ea453ece17e82"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17e96"),
        questionId: ObjectId("545f70d9946ea453ece17e80"),
        text: "Pots de peinture",
        nextUrl: "question/545f70d9946ea453ece17e83"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17e97"),
        questionId: ObjectId("545f70d9946ea453ece17e80"),
        text: "Materiel de peinture",
        nextUrl: "question/545f70d9946ea453ece17e84"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17e98"),
        questionId: ObjectId("545f70d9946ea453ece17e81"),
        text: "Gazon",
        nextUrl: "question/545f70d9946ea453ece17e85"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17e99"),
        questionId: ObjectId("545f70d9946ea453ece17e81"),
        text: "Arbres",
        nextUrl: "question/545f70d9946ea453ece17e86"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f00"),
        questionId: ObjectId("545f70d9946ea453ece17e81"),
        text: "Potager",
        nextUrl: "question/545f70d9946ea453ece17e87"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f01"),
        questionId: ObjectId("545f70d9946ea453ece17e82"),
        text: "Terrasse",
        nextUrl: "question/545f70d9946ea453ece17e88"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f02"),
        questionId: ObjectId("545f70d9946ea453ece17e82"),
        text: "Salon de Jardin",
        nextUrl: "question/545f70d9946ea453ece17e89"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f03"),
        questionId: ObjectId("545f70d9946ea453ece17e83"),
        text: "Extérieur",
        nextUrl: "question/545f70d9946ea453ece17e90"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f04"),
        questionId: ObjectId("545f70d9946ea453ece17e83"),
        text: "Cuisine",
        nextUrl: "question/545f70d9946ea453ece17e91"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f05"),
        questionId: ObjectId("545f70d9946ea453ece17e83"),
        text: "Plafond de séjour",
        nextUrl: "recommendation/545fc3da946ea453ece17f58"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f06"),
        questionId: ObjectId("545f70d9946ea453ece17e84"),
        text: "Pinceaux",
        nextUrl: "recommendation/545fc3da946ea453ece17f59"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f07"),
        questionId: ObjectId("545f70d9946ea453ece17e84"),
        text: "Rouleau",
        nextUrl: "recommendation/545fc3da946ea453ece17f60"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f08"),
        questionId: ObjectId("545f70d9946ea453ece17e84"),
        text: "Kit de peinture",
        nextUrl: "recommendation/545fc3da946ea453ece17f61"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f09"),
        questionId: ObjectId("545f70d9946ea453ece17e85"),
        text: "Tonte",
        nextUrl: "recommendation/545fc3da946ea453ece17f62"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f10"),
        questionId: ObjectId("545f70d9946ea453ece17e85"),
        text: "Semer",
        nextUrl: "recommendation/545fc3da946ea453ece17f63"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f11"),
        questionId: ObjectId("545f70d9946ea453ece17e86"),
        text: "Taille",
        nextUrl: "recommendation/545fc3da946ea453ece17f64"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f12"),
        questionId: ObjectId("545f70d9946ea453ece17e86"),
        text: "Coupe",
        nextUrl: "recommendation/545fc3da946ea453ece17f65"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f13"),
        questionId: ObjectId("545f70d9946ea453ece17e87"),
        text: "Préparer la terre",
        nextUrl: "recommendation/545fc3da946ea453ece17f66"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f14"),
        questionId: ObjectId("545f70d9946ea453ece17e87"),
        text: "Serre",
        nextUrl: "recommendation/545fc3da946ea453ece17f67"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f15"),
        questionId: ObjectId("545f70d9946ea453ece17e88"),
        text: "Luminaires",
        nextUrl: "recommendation/545fc3da946ea453ece17f68"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f16"),
        questionId: ObjectId("545f70d9946ea453ece17e88"),
        text: "Pose de lames de terasse",
        nextUrl: "recommendation/545fc3da946ea453ece17f69"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f17"),
        questionId: ObjectId("545f70d9946ea453ece17e89"),
        text: "Tonnelle",
        nextUrl: "recommendation/545fc3da946ea453ece17f70"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f18"),
        questionId: ObjectId("545f70d9946ea453ece17e89"),
        text: "Table et chaises",
        nextUrl: "recommendation/545fc3da946ea453ece17f71"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f19"),
        questionId: ObjectId("545f70d9946ea453ece17e90"),
        text: "Mur en crépis",
        nextUrl: "recommendation/545fc3da946ea453ece17f72"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f20"),
        questionId: ObjectId("545f70d9946ea453ece17e90"),
        text: "Boiseries",
        nextUrl: "recommendation/545fc3da946ea453ece17f73"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f21"),
        questionId: ObjectId("545f70d9946ea453ece17e91"),
        text: "Blanc",
        nextUrl: "recommendation/545fc3da946ea453ece17f74"
      },
      {
        _id: ObjectId("545f70d9946ea453ece17f22"),
        questionId: ObjectId("545f70d9946ea453ece17e91"),
        text: "Rouge",
        nextUrl: "recommendation/545fc3da946ea453ece17f75"
      }
   ]
);
db.products.insert(
   [
     {
        _id: ObjectId("545fc3da946ea453ece17f22"),
        name: "Tondeuse à essence STERWINS 460HSP140-3, 160 cm3",
        img: ["img/products/tondeuse-a-essence-sterwins-460hsp140-3-160-cm3.jpg"],
        info_label: ["Surface conseillé(m²)","Type de propulsion","Type d'éjection"],
        info_text: ["1500","Tractée","2 en 1 : arrière et mulching"],
        price:289.00,
        tags: ["outillage", "gazon", "tonte"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f23"),
        name: "10kg de gazon 4477417 350 m²",
        img: ["img/products/10kg-de-gazon-4477417-350-m2.jpg"],
        info_label: ["Surface couverte(m²)","Enrichi en engrais?","Conseil d'utilisation"],
        info_text: ["350","non","Tondre dès que le gazon atteint 5 à 6 cm."],
        price: 27.90,
        tags: ["outillage", "gazon","semer"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f24"),
        name: "Taille-haies électrique GT 5055, BLACK & DECKER",
        img: ["img/products/taille-haies-electrique-gt-5055-black-decker.jpg"],
        info_label: ["Usage", "Longueur de la lame(cm)", "Capacité de coupe(mm)"],
        info_text: ["Tailler une haie aux branches moyennes","55", "18"],
        price:79.90,
        tags: ["outillage", "arbre", "taille"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f25"),
        name: "Tronçonneuse élagueuse à essence STERWINS PCS26-2 25.4cm3, 27cm de coupe",
        img: ["img/products/tronconneuse-elagueuse-a-essence-sterwins-pcs26-2-25-4cm3-27cm-de-coupe.jpg"],
        info_label: ["Longueur de coupe(cm)","Puissance(cv)","Cylindrée(cm3)"],
        info_text: ["27","1.2","25.4"],
        price:129.00,
        tags: ["outillage", "arbre", "coupe"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f26"),
        name: "Motoculteur à essence JARDIMECA GX 200BH kit labour",
        img: ["img/products/motoculteur-a-essence-jardimeca-gx-200bh-kit-labour.jpg"],
        info_label: ["Profondeur de travail(cm)","Largeur de travail(cm)","Nombre de vitesses avant"],
        info_text: ["28", "55","2"],
        price:1690.00,
        tags: ["outillage", "potager", "terre"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f27"),
        name: "Serre Venus 5000 en verre horticole 4.96 m²",
        img: ["img/products/serre-venus-5000-en-verre-horticole-4-96-m2.jpg"],
        info_label: ["Type de porte","Surface(m²)","Matière de la structure"],
        info_text: ["Simple porte coulissante","4.96","Aluminium"],
        price:399.00,
        tags: ["outillage", "potager", "serre"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f28"),
        name: "Spot à enterrer extérieur Boston INSPIRE, aluminium, 40 watts",
        img: ["img/products/spot-a-enterrer-exterieur-boston-inspire-aluminium-40-watts.jpg"],
        info_label: ["Matière","Matière secondaire","Type de vitrage"],
        info1_text: ["Aluminium","Fonte d'alluminnium","Dépoli"],
        price:44.90,
        tags: ["décoration", "terrasse", "luminaires"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f29"),
        name: "Kit clips de fixation pour lames de terrasses SPAX",
        img: ["img/products/kit-clips-de-fixation-pour-lames-de-terrasses-spax.jpg"],
        info_label: ["Nbr de clips au m²","hauteur du produit(cm)"],
        info_text: ["20","12.5"],
        price:34.50,
        tags: ["décoration", "terrasse", "pose"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f30"),
        name: "Tonnelle autoportante Azay, 10 m²",
        img: ["img/products/tonnelle-autoportante-azay-10-m2.jpg"],
        info_label: ["Forme","Surface(m²)","Surface couverte(m²)"],
        info_text: ["Rectangulaire","12","10"],
        price:539.00,
        tags: ["décoration", "salon de jardin", "tonnelle"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f31"),
        name: "Salon de jardin en résine Balcony KETER, gris/argent",
        img: ["img/products/salon-de-jardin-en-resine-balcony-keter-gris-argent.jpg"],
        info_label: ["Composition du salon de jardin", "Matière","Couleur"],
        info_text: ["2 fauteuils + 1 table basse", "Résine injéctée", "Gris anthracite"],
        price:229.00,
        tags: ["décoration", "salon de jardin", "table", "chaise"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f32"),
        name: "Crépis façade LUXENS, ton pierre, 15 KG",
        img: ["img/products/crepis-facade-luxens-ton-pierre-15-kg.jpg"],
        info_label: ["Type de peinture","Usage","Aspect"],
        info_text: ["Peinture crépi","Décoration et protection des murs","Mat"],
        price:34.90,
        tags: ["peinture", "pot", "extérieur", "crépis"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f33"),
        name: "Vernis BSC mat SYNTILOR, incolore, aspect mat, 0.75 L",
        img: ["img/products/vernis-bsc-mat-syntilor-incolore-aspect-mat-0-75-l.jpg"],
        info_label: ["Usage","Support de destination","Pièces de destination"],
        info_text: ["Protéger et décorer le bois","Volets, portes, fenêtres, abris de jardin, portail, bardage...","Toutes pièces"],
        price:24.95,
        tags: ["peinture", "pot", "extérieur", "boiseries"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f34"),
        name: "Peinture cuisine et bains LUXENS Couleurs intérieures, blanc ivoire n°5, 2.5 L",
        img: ["img/products/peinture-cuisine-et-bains-luxens-couleurs-interieures-blanc-ivoire-n-5-2-5-l.jpg"],
        info_label: ["Type de peinture","Aspect","Pret à l'emploi"],
        info_text: ["Peinture acrylique", "Satin", "Oui"],
        price:36.95,
        tags: ["peinture", "pot", "cuisine", "blanc"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f35"),
        name: "Peinture cuisine et bains LUXENS Couleurs intérieures, rouge rouge n°3, 2.5 L",
        img: ["img/products/peinture-cuisine-et-bains-luxens-couleurs-interieures-rouge-rouge-n-3-2-5-l.jpg"],
        info_label: ["Type de peinture","Aspect","Pret à l'emploi"],
        info_text: ["Peinture acrylique","Satin","Oui"],
        price:36.95,
        tags: ["peinture", "pot", "cuisine", "rouge"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f36"),
        name: "Peinture Plafonds séjour/chambre, DULUX VALENTINE, blanc mat, 6L",
        img: ["img/products/peinture-plafonds-sejour-chambre-dulux-valentine-blanc-mat-6l.jpg"],
        info_label: ["Couleur","Aspect","Opacité en %"],
        info_text: ["Blanc","Mat","98.1"],
        price:69.90,
        tags: ["peinture", "pot", "plafond", "séjour"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f37"),
        name: "Lot de 3 pinceaux plats DEXTER : 20, 40, 60 mm",
        img: ["img/products/lot-de-3-pinceaux-plats-dexter-20-40-60-mm.jpg"],
        info_label: ["Type de peinture", "Matière de la fibre", "Forme du pinceau"],
        info_text: ["Acrylique","Mélange de soie naturelle et synthétique","Plat"],
        price:5.90,
        tags: ["peinture", "matériel", "pinceau"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f38"),
        name: "Rouleau mur et plafond DEXTER largeur 180mm, diam 48mm",
        img: ["img/products/rouleau-mur-et-plafond-dexter-largeur-180mm-diam-48mm.jpg"],
        info_label: ["Usage","Longueur de la lame(cm)", "Capacité de coupe(mm)"],
        info1_text: ["Tailler une haie aux branches moyennes","55","18"],
        price:8.80,
        tags: ["peinture", "matériel", "rouleau"]
     },
     {
        _id: ObjectId("545fc3da946ea453ece17f39"),
        name: "Lot de rouleau 180mm, diam 48mm, 2 pinceaux et un bac DEXTER",
        img: ["img/products/lot-de-rouleau-180mm-diam-48mm-2-pinceaux-et-un-bac-dexter.jpg"],
        info_label: ["Type de peinture", "Matière de la fibre", "Diamètre du manchon"],
        info_text: ["Glycéro et acrylique", "Polyamide","48"],
        price:9.95,
        tags: ["peinture", "matériel", "kit"]
     }


   ]
);
  db.reviews.insert(
     [
      {
        _id: ObjectId("545fc3da946ea453ece17f40"),
        productId: ObjectId("545fc3da946ea453ece17f22"),
        score: 4,
        nickname: "Aanor",
        title: "bonne machine",
        text: "tondeuse achetée début du printemps - utilisation tous les 8-10 jours - fait ce que je lui demande, à savoir couper et ramasser l'herbe - grande surface à tondre (env 600m²), consomme peu d'essence (moins d'1 plein) - aucun problème à noter"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f41"),
        productId: ObjectId("545fc3da946ea453ece17f23"),
        score: 5,
        nickname: "Aaricia",
        title: "gazon",
        text: "un gazon de super qualité, semé il y a une semaine et la pelouse est déjà bien poussée! nous sommes ravis, en plus un bon rapport qualité prix! je recommande se produit les yeux fermés!"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f42"),
        productId: ObjectId("545fc3da946ea453ece17f24"),
        score: 3,
        nickname: "Aaron",
        title: "très pratique",
        text: "Prise en main rapide. Matériel efficace. Petit bémol pour le buit..."
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f43"),
        productId: ObjectId("545fc3da946ea453ece17f25"),
        score: 4,
        nickname: "Abbon",
        title: "Performance et maniabilité",
        text: "Petite machine performante avec beaucoup de maniabilité. Très agréable à utiliser. Reste à voir ce qu'elle donne sur la durée. Achat 26 fév 2014"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f44"),
        productId: ObjectId("545fc3da946ea453ece17f26"),
        score: 5,
        nickname: "Abby",
        title: "très bonne machine",
        text: "je pensse q'avec un plus gros poid sur l'avant cette machine serais irréprochable sinon elle ne manque pas de puissance!!!"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f45"),
        productId: ObjectId("545fc3da946ea453ece17f27"),
        score: 5,
        nickname: "Abdel",
        title: "Je recommande",
        text: "Montage rapide et facile. Pour ce qui est de la qualité, il s'agit d'un bon rapport qualité prix !!"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f46"),
        productId: ObjectId("545fc3da946ea453ece17f28"),
        score: 4,
        nickname: "Abdon",
        title: "Jolies finitions",
        text: "Je ne regrette pas du tout mon achat, ces spots tiennent bien le coup malgré les conditions difficiles auxquelles ils sont exposés !"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f47"),
        productId: ObjectId("545fc3da946ea453ece17f29"),
        score: 5,
        nickname: "Abel",
        title: "Pratique",
        text: "Parfait pour une installation rapide !"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f48"),
        productId: ObjectId("545fc3da946ea453ece17f30"),
        score: 4,
        nickname: "Abélard",
        title: "rapport qualité/prix moyen",
        text: "bonjour, nous avons fait l'acquisition il y a plus de trois ans, et avons changé deux fois les rideaux... (1 fois dès la première année) exposée plein sud, ils n'ont pas résistés au soleil ! et les moustiquaires se déchirent. Là cette année il faut changer le toit et les crochets car tous les élastique n'ont pas tenu. produit très agréable à l'œil mais qui ne dure pas dans le temps, aussi nous avons décidé de ne l'exposer que l'été et de retirer les toiles l'hiver, pour la préserver un peu."
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f49"),
        productId: ObjectId("545fc3da946ea453ece17f31"),
        score: 4,
        nickname: "Abélia",
        title: "Difficile de trouver moins cher",
        text: "bonjour, après avoir comparé dans différentes enseignes, ce salon est le moins cher ! Je l'ai depuis quelques mois et il résiste très bien aux intempéries !"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f50"),
        productId: ObjectId("545fc3da946ea453ece17f32"),
        score: 4,
        nickname: "Abella",
        title: "totalement surpris",
        text: "Bonjour, Je suis totalement surpris de la qualité du produit la facilité de la prise en main. Je pensais que c’était juste une peinture mais non un réel crépi et masque bien les fissures. J'ai mis sur le muret extérieur facile d utilisation, j'ai mis au début au rouleau car pas je ne connaissais pas le couteau; une fois le couteau découvert, j'ai divise par le temps de travail mais il est vrai qu'avec le rouleau c'est plus joli. reste a voir dans le temps la tenue du produit"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f51"),
        productId: ObjectId("545fc3da946ea453ece17f33"),
        score: 4,
        nickname: "Abigaël",
        title: "Bien",
        text: "Je ne sais pas encore ce que ça donnera dans le temps, mais s'étale très bien et donne un joli rendu au bois."
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f52"),
        productId: ObjectId("545fc3da946ea453ece17f34"),
        score: 3,
        nickname: "Abondance",
        title: "Facile d'utilisation.",
        text: "J'ai rénové une cuisine avec du papier intissé et j'ai affiné les jointures entre rouleaux avec de l'enduit puis une couche de peinture blanche. Malheureusement lors du séchage de la première couche de peinture apparaissent toutes les jointures blanches."
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f53"),
        productId: ObjectId("545fc3da946ea453ece17f35"),
        score: 4,
        nickname: "Abraham",
        title: "Jolie couleur !",
        text: "Jolie couleur rouge assez foncé. En revanche, il faut au minimum appliquer trois couches car on voit des traces de rouleau au début. Mais le résultat est joli. Peinture un peu plastifiée, attention donc au papier cache : la peinture fait élastique."
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f54"),
        productId: ObjectId("545fc3da946ea453ece17f36"),
        score: 5,
        nickname: "Acace",
        title: "très bon !",
        text: "Très bonne facilité d'application de cette peinture Adhère très bien Une seule couche suffit Aucune trace Finition parfaite (Peinture appliquée au plafond au rouleau) Je reprendrai celle là sans hésiter"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f55"),
        productId: ObjectId("545fc3da946ea453ece17f37"),
        score: 4,
        nickname: "Achille",
        title: "Aucune perte de poils",
        text: "Ces pinceaux ne perdent aucun poil, et ce malgré une utilisation fréquente !!"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f56"),
        productId: ObjectId("545fc3da946ea453ece17f38"),
        score: 4,
        nickname: "Acmé",
        title: "Facile d'utilisation",
        text: "Je viens de finir 4 jours de peinture, et très satisfait du rouleau. Par contre, j'ai changé chaque jour le rouleau avec la recharge par 3. Je pense que j'aurais pu réutiliser le rouleau. Aucune peluche sur le mur"
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f57"),
        productId: ObjectId("545fc3da946ea453ece17f39"),
        score: 5,
        nickname: "Ada",
        title: "Rouleaux à peinture",
        text: "Un bon rouleau de peinture de qualité prix parfait ..."
      }
   ]
);
db.recommendations.insert(
   [
      {
        _id: ObjectId("545fc3da946ea453ece17f58"),
        answerId: ObjectId("545f70d9946ea453ece17f05"),
        products: [ObjectId("545fc3da946ea453ece17f36")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f59"),
        answerId: ObjectId("545f70d9946ea453ece17f06"),
        products: [ObjectId("545fc3da946ea453ece17f37")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f60"),
        answerId: ObjectId("545f70d9946ea453ece17f07"),
        products: [ObjectId("545fc3da946ea453ece17f38")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f61"),
        answerId: ObjectId("545f70d9946ea453ece17f08"),
        products: [ObjectId("545fc3da946ea453ece17f39")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f62"),
        answerId: ObjectId("545f70d9946ea453ece17f09"),
        products: [ObjectId("545fc3da946ea453ece17f22")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f63"),
        answerId: ObjectId("545f70d9946ea453ece17f10"),
        products: [ObjectId("545fc3da946ea453ece17f23")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f64"),
        answerId: ObjectId("545f70d9946ea453ece17f11"),
        products: [ObjectId("545fc3da946ea453ece17f24")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f65"),
        answerId: ObjectId("545f70d9946ea453ece17f12"),
        products: [ObjectId("545fc3da946ea453ece17f25")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f66"),
        answerId: ObjectId("545f70d9946ea453ece17f13"),
        products: [ObjectId("545fc3da946ea453ece17f26")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f67"),
        answerId: ObjectId("545f70d9946ea453ece17f14"),
        products: [ObjectId("545fc3da946ea453ece17f27")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f68"),
        answerId: ObjectId("545f70d9946ea453ece17f15"),
        products: [ObjectId("545fc3da946ea453ece17f28")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f69"),
        answerId: ObjectId("545f70d9946ea453ece17f16"),
        products: [ObjectId("545fc3da946ea453ece17f29")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f70"),
        answerId: ObjectId("545f70d9946ea453ece17f17"),
        products: [ObjectId("545fc3da946ea453ece17f30")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f71"),
        answerId: ObjectId("545f70d9946ea453ece17f18"),
        products: [ObjectId("545fc3da946ea453ece17f31")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f72"),
        answerId: ObjectId("545f70d9946ea453ece17f19"),
        products: [ObjectId("545fc3da946ea453ece17f32")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f73"),
        answerId: ObjectId("545f70d9946ea453ece17f20"),
        products: [ObjectId("545fc3da946ea453ece17f33")]
      },
       {
        _id: ObjectId("545fc3da946ea453ece17f74"),
        answerId: ObjectId("545f70d9946ea453ece17f21"),
        products: [ObjectId("545fc3da946ea453ece17f34")]
      },
      {
        _id: ObjectId("545fc3da946ea453ece17f75"),
        answerId: ObjectId("545f70d9946ea453ece17f22"),
        products: [ObjectId("545fc3da946ea453ece17f35")]
      }
   ]
);

db.faqs.insert(
  [
    {
     _id:ObjectId("545fc3da946ea453ece17f76"),
     productId:ObjectId("545fc3da946ea453ece17f32"),
     question:"Quantité de pots",
     answer:"1337"
    },
    {
     _id:ObjectId("545fc3da946ea453ece17f77"),
     productId:ObjectId("545fc3da946ea453ece17f34"),
     question:"Quantité de pots",
     answer:"1337"
    },
    {
     _id:ObjectId("545fc3da946ea453ece17f78"),
     productId:ObjectId("545fc3da946ea453ece17f35"),
     question:"Quantité de pots",
     answer:"1337"
    },
    {
     _id:ObjectId("545fc3da946ea453ece17f79"),
     productId:ObjectId("545fc3da946ea453ece17f36"),
     question:"Quantité de pots",
     answer:"1337"
    }
  ]
);