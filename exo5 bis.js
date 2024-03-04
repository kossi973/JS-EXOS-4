const fileAttente = []; // Créer la file d'attente

// initier une promesse
function maPromesse(noPromesse) {
  return new Promise((resolve) => {
    resolve(noPromesse);
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
function ajouterFileAttente(promise, noPromesse, priority) {
  fileAttente.push({ promise, noPromesse, priority });
}

// Initier les promesses
const maPromesse1 = maPromesse(1);
const maPromesse2 = maPromesse(2);
const maPromesse3 = maPromesse(3);
const maPromesse4 = maPromesse(4);
const maPromesse5 = maPromesse(5);

// Ajouter les promesses à la file d'attente
ajouterFileAttente(maPromesse1, 1, 2);
ajouterFileAttente(maPromesse2, 2, 4);
ajouterFileAttente(maPromesse3, 3, 1);
ajouterFileAttente(maPromesse4, 4, 5);
ajouterFileAttente(maPromesse5, 5, 3);

// Trier la file d'attente par priorité (5 --> 1)
fileAttente.sort((a, b) => b.priority - a.priority);

attendreTempo(1000);

Promise.allSettled(fileAttente)
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
