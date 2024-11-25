
function chekifSpam(str) {
    str = str.toLowerCase().trim(); // mettre en minuscule et enlever les espaces   
    if (str.includes("viagra") || str.includes("xxx")){ // si la phrase en str contient viagra ou xxx
        return true;
    } 
    return false;
}
let str = prompt("Entrez une phrase"); // permet à l'utilisateur de saisir une phrase et la place dans la variable str

console.log(chekifSpam(str)); // affiche le résultat de la fonction chekifSpam(str)

const name = "Clément";
const msg = "Bonjour " 
console.log(msg + " " + name); // affiche Bonjour Clément


