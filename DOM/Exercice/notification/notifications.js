// Créer l'élement Html
const titleElement = document.createElement("div") ;
console.log(titleElement)

// Metre le texte de la notification 

titleElement.textContent = "Ceci est une notification" ; 
console.log(titleElement);

// Ajouter la classe Notification a l'élement 
titleElement.classList.add("notification") ;


// Se positionner sur le body ou le h1
const t = document.querySelector('h1') ; // Recupére le 1er h1
console.log(t);

// Ajouter l'élement Html crée en js
t.after(titleElement);






