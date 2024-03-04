// Chargement multiple :
// Créez un gestionnaire de promesses pour effectuer plusieurs requêtes GET en parallèle
// vers différentes API :
// - “https://jsonplaceholder.typicode.com/users”,
// - ”https://jsonplaceholder.typicode.com/comments”,
// - ”https://jsonplaceholder.typicode.com/photos”,
// - ”https://jsonplaceholder.typicode.com/todos”)
// Une fois toutes les données récupérées, affichez-les.
// En cas d’erreur sur un appel api, utilisez un “fallback” (api de secours, par exemple ici
// celle-ci : ”https://jsonplaceholder.typicode.com/albums”), autrement dit appeler une autre api
// pour récupérer les données, même si les données sont différentes cela ne fait rien il faudra
// juste logger les données..

// urls des API à requeter
const urlUsers = "https://jsonplaceholder.typicode.com/users";
const urlComments = "https://jsonplaceholder.typicode.com/comments";
const urlPhotos = "https://jsonplaceholder.typicode.com/photos";
const urlTodos = "https://jsonplaceholder.typicode.com/todos";
const urlAlbums = "https://jsonplaceholder.typicode.com/albums";

const urls = [urlUsers, urlComments, urlPhotos, urlTodos];

// récupérer les données d'une API
async function requeterPublicData(url) {
  // requêter les données publiques
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Réponse réseau invalide : " + response.status);
    }
    console.log("Réponse OK !");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur de la requête : ${error.message}`);
    //récupérer les données de l'API de secours
    return requeterPublicData(urlAlbums);
  }
}

// lancer les requêtes et afficher les résultats
Promise.allSettled([
  requeterPublicData(urlUsers),
  requeterPublicData(urlComments),
  requeterPublicData(urlPhotos),
  requeterPublicData(urlTodos),
])
  .then((results) => {
    console.log(results);
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`La requête ${index + 1} est résolue : `, result.value); //afficher les données de l'API
      } else {
        console.log(`La requête ${index + 1} est en erreur : ` + result.reason); //afficher l'erreur
      }
    });
  })
  .catch((error) => {
    console.error("Une requête est en erreur !!!", error);
  });
