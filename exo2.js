// Chargement de données asynchrone :
// Utilisez fetch pour effectuer une requête HTTP GET vers une API publique (par
// exemple:”https://jsonplaceholder.typicode.com/users”) et affichez les données dans la
// console. Gérez les erreurs en utilisant une Promise

const urlUsers = "https://jsonplaceholder.typicode.com/users";

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
  }
}

// requêter et gérer des données public
requeterPublicData(urlUsers)
  .then((data) => {
    console.log("Les données de l'API sont : ", data);
  })
  .catch((erreur) => {
    console.error("Les données ne sont pas disponibles !" + erreur);
  });
