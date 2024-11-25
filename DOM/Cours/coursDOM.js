// getElement(s)By*

// console.log(document.querySelector("h2")); 

// const titre = document.getElementById("title"); // Récupération de l'élément par son id
// console.log(titre.textContent); // Récupération du contenu de l'élément

// const title = document.getElementsByTagName("h1"); // Récupération de l'élément par son sélecteur
// console.log(title[0]); // Récupération du 1ére élément dans la balise h1

// const subtitle = document.getElementsByClassName(""); // Récupération de l'élément par sa class


// querySelector(*) 
const t = document.querySelector('h1') ; // Recupére le 1er h1
console.log(t);

const sst = document.querySelectorAll('h1') ;  // recuépre tout les h1
console.log(sst);


const titElement = document.querySelector("#title") ;  // recuépre l'element en de id title
console.log(titElement);

const a = document.querySelector(".alert") ; // Récupére tout les class="alert"
console.log(a);


// Créer des elements Html

const button = document.createElement("button"); // Crée un élement button
console.log(button);

// titElement.append(button); // Ajoute le bouton dans la balise titre
// titElement.prepend(button); // Ajoute le bouton au dessus du titre 
// titElement.after(button); // Ajoute le bouton aprés le titre  

console.log(titElement.textContent);// Affcihe le contenu du titElement

titElement.textContent = "OUI"; // Modifie le contenu de titElement

titElement.innerHTML =  "<div style='color : red'>Mon Titre</div>" // Interpréte l'html

titElement.style.textAlign = 'center' ; // de centrer le texte

titElement.classList.add("alert") ; // Ajoute titElement a la classe alert
titElement.classList.remove("alert"); // Supprime titElement de la classe alert

