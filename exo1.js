// Exercice 1 - Promesses :
// Créez une Promise simple qui se résout après quelques secondes. Utilisez then pour
// afficher un message de succès.
// Ensuite créez une Promise qui est rejetée après un délai. Utilisez catch pour gérer le rejet et
// afficher un message d'erreur.

// Créer une promesse 1
function attendreSucces(tempo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(tempo);
    }, tempo);
  });
}

// Créer une promesse 2
function attendreFail(tempo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(tempo);
    }, tempo);
  });
}

// Afficher les promesses
attendreSucces(2000) // Attendre 2 secondes
  .then((resultat) => {
    console.log("Succès ! Attente de : " + resultat / 1000 + " s"); // Affiche la promesse en succès
    return attendreFail(3000);
  })
  .catch((erreur) => {
    console.error("Echec ! Attente de : " + erreur / 1000 + " s"); // Affiche la promesse en échec
  });
