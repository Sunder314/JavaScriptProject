// Tableaux
let myData = "manchester,Londre,toulouse" ;
let englishCity = myData.split(","); // Créer un tableau avec les valeurs de myData séparées par des virgules
console.log(englishCity); // créer un tableau avec les valeurs de myData séparées par des virgules
englishCity.push("Toulouse"); // ajoute Toulouse à la fin du tableau
englishCity.pop(); // supprime le dernier élément du tableau
englishCity.shift(); // supprime le premier élément du tableau
englishCity.unshift("Paris"); // ajoute Paris au début du tableau
console.log(englishCity);

// Switch case
let day = "Monday"; // on déclare une variable day et on lui assigne la valeur "Monday"
switch (day) { // on utilise un switch case pour vérifier la valeur de day  
    case "Monday": // si day est égal à "Monday"
        console.log("Je vais faire du vélo"); // on affiche "Je vais faire du vélo"     
        break; // on sort du switch case            
    case "Tuesday": // si day est égal à "Tuesday"
        console.log("Je vais faire du vélo"); // on affiche "Je vais faire du vélo"
        break; // on sort du switch case            
    default: // si day n'est égal à aucune des valeurs précédentes
        console.log("Je ne sais pas quoi faire"); // on affiche "Je ne sais pas quoi faire"
}

const name = "Clément";
const msg = "Bonjour"

console.log(msg + " " + name); // concaténation de variable
console.log(`${msg} ${name}`); // interpolation de variable

