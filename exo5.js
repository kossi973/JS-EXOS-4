const fileAttente = []; // Créer la file d'attente

// initier une promesse
function maPromesse({ noPromesse, priority }) {
  return new Promise((resolve) => {
    resolve({ noPromesse, priority });
    console.log(`Promesse ${noPromesse} exécutée !`);
  });
}

// Créer une temporisation
function attendreTempo(tempo) {
  const t = Date.now();
  console.log(`Tempo de ${tempo / 1000} s`);
  while (Date.now() - t < tempo) {}
}

// Ajouter une Promise à la file d'attente avec une priorité donnée (1 à 5)
function ajouterFileAttente(noPromesse, priority) {
  fileAttente.push({ noPromesse, priority });
}

// Ajouter les no de promesses à la file d'attente
ajouterFileAttente(1, 2);
ajouterFileAttente(2, 4);
ajouterFileAttente(3, 1);
ajouterFileAttente(4, 5);
ajouterFileAttente(5, 3);

// Trier la file d'attente par priorité (5 --> 1)
fileAttente.sort((a, b) => b.priority - a.priority);

attendreTempo(1000);

Promise.allSettled(fileAttente.map(maPromesse))
  .then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log(
          "Promesse : " + result.value.noPromesse,
          "Priorité : " + result.value.priority + " OK"
        );
      } else {
        console.log("Promesse " + result.value.noPromesse + "KO");
      }
    });
  })
  .catch((results) => console.log("KO : ", results));
