var ReviewBuilder = {
  title: [
    "Excellent !",
    "Très bon produit !",
    "Plutôt pas mal",
    "Je ne pouvais pas trouver mieux",
    "Pas de soucis",
    "Garantie au top !",
    "Je recommande !",
    "Bon rapport qualité prix !"
  ],
  reviewerName: ['Sébastien', 'Laurence', 'Ludovic', 'Pauline', 'Guillaume', 'Sarah', "Natasha", "Eric", "Rémi", "Mathieu", "Philippe", "Hélène", "Kévin", "Alice"],
  score: [3,4,5],
  comment: [
    "Bien que je l'utilise intensément, ce produit tient bien le coup ! On en a vraiment pour notre argent, je recommande vivement !",
    "J'ai acheté ce produit suite à des conseils de qualité recueillis auprès d'un vendeur de Leroy Merlin ! Je le remercie vivement car il correspond exactement à mon besoin !",
    "Le prix reste élevé pour ce produit mais la qualité est vraiment au rendez-vous ! J'ai hésité à l'acheter mais vous pouvez céder les yeux fermés !",
    "Très simple d'utilisation ! Je recommande.",
    "Après un petit problème, je me suis dirigé vers le SAV qui m'a remplacé de produit instantanément ! Merci Leroy Merlin ! ",
    "Acheté pour mes enfants qui en sont très satisfaits.",
    "Je n'ai pas trouvé moins cher ailleurs !",
    "La longévité de ce produit est surprenante !",
    "Je l'ai commandé en ligne et reçu deux jours plus tard, bonne réactivité !"
  ],

  getReview: function(){
    var randomTitle = this.title[Math.floor((Math.random() * this.title.length))];
    var randomReviewerName = this.reviewerName[Math.floor((Math.random() * this.reviewerName.length))];
    var randomScore = this.score[Math.floor((Math.random() * this.score.length))];
    var randomComment = this.comment[Math.floor((Math.random() * this.comment.length))];
    return {title: randomTitle, reviewerName: randomReviewerName, score: randomScore, comment: randomComment};
  }
}

module.exports = ReviewBuilder;
