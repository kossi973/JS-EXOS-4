// Exercice 4 - Mécanisme de retry (2 pts) :
// Vous devez créer une fonction qui effectue une opération asynchrone (par exemple, une
// requête HTTP à l'API : “https://jsonplaceholder.typicode.com/users”) et met en place un
// mécanisme de réessai automatique (retry) en cas d'échec. Le but est d'améliorer la fiabilité
// des opérations asynchrones en permettant un nombre limité de tentatives de réessai.
// Remarque : Pour cet exercice, votre premier appel HTTP se soldera forcément par un
// échec. À vous d’implémenter ce comportement.
// Créez une fonction “effectuerOperationAsynchrone” qui prend en paramètre une URL à
// requêter.
// Utilisez une Promesse pour effectuer la requête HTTP à l'URL fournie. Si la requête réussit,
// résolvez la Promesse avec les données reçues. Si la requête échoue (par exemple, renvoie
// une erreur 500, chose que vous devrez implémenter lors du premier appel), rejetez la
// Promesse.
// Implémentez un mécanisme de réessai (retry) qui permettra de retenter la requête en cas
// d'échec. Vous pouvez spécifier le nombre maximal de tentatives de réessai et un délai entre
// les tentatives (généralement 3 essais et une seconde).
// Si la première tentative échoue, attendez le délai spécifié, puis réessayez. Continuez ce
// processus jusqu'à atteindre le nombre maximal de tentatives ou jusqu'à ce que la requête
// réussisse.
// Si la requête réussit lors d'une tentative de réessai, résolvez la Promesse avec les données
// reçues.
// Si le nombre maximal de tentatives est atteint sans succès, rejetez la Promesse avec un
// message d'erreur indiquant que le nombre maximal de tentatives a été dépassé.
// Exemple de retour attendu :
// Lors de la première tentative, la Promesse est rejetée.
// Si la première tentative échoue mais que la deuxième réussit, la Promesse est résolue avec
// les données de la deuxième tentative.
// Si le nombre maximal de tentatives est atteint sans succès, la Promesse est rejetée avec un
// message d'erreur.

const url = "https://jsonplaceholder.typicode.com/users";

async function effectuerOperationAsynchrone(
  url,
  maxTentatives,
  delaiTentatives
) {
  let noTentative = 1;

  while (noTentative <= maxTentatives) {
    try {
      const response = await fetch(url); // Effectuer la requête HTTP
      let reponse = response.ok;
      let status = response.status;

      // simuler erreur 500
      if (noTentative == 1) {
        reponse = false;
        status = 500;
      }

      if (reponse === true) {
        console.log(`Tentative ${noTentative} : Requête réussie`);
        const data = await response.json(); // Récupèrer les données
        return data; // Renvoyer la Promesse avec les données récupérées
      } else {
        console.error(
          `Tentative ${noTentative} : Échec de la requête : erreur ${status}`
        );
      }
    } catch (error) {
      console.error(
        `Tentative ${noTentative} : Erreur lors de la requête : ${error.message}`
      );
    }

    // Attendre le délai spécifié avant de réessayer
    await new Promise((resolve) => setTimeout(resolve, delaiTentatives));
    noTentative++;
  }

  throw new Error(
    `Nombre maximal de tentatives (${maxTentatives}) atteint sans succès.`
  );
}

effectuerOperationAsynchrone(url, 3, 1000)
  .then((data) => console.log("Données reçues :", data))
  .catch((error) => console.error("Erreur :", error.message));
