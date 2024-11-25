let d = confirm("avez-vous des douleurs ?"); // Definir la variable d qui est une confirmation de la question "avez-vous des douleurs ?"
console.log(d);

if (d == true) { // Si d est true, alors on demande où est la douleur
        t = String(prompt("où ça ? / (Abdomen, Gorge)")); // On demande où est la douleur
        t = t.toLowerCase().trim(); // On convertit la réponse en minuscule et on enlève les espaces
if (t == "abdomen" ) { // Si la douleur est au niveau de l'abdomen
    alert('Apendicite') ; 
} else if (t.includes("gorge")) { // Si la douleur est au niveau de la gorge
    f = confirm("fievre"); // On demande si la personne a de la fièvre
}
if (f == true) {  // Si la personne a de la fièvre
    alert('Rhume') ; 
} else if (f == false) { // Si la personne n'a pas de fièvre
    alert('mal de gorge') // On affiche "mal de gorge"
} } 
else { // Si la personne n'a pas de douleur
        v = confirm("tousser vous ?") ; // On demande si la personne a de la fièvre
        console.log(v);
if (v == true ) { // Si la personne a de la fièvre
    f = confirm('fievre') ; 
if (f == true) { // Si la personne a de la fièvre
    alert('Rhume'); // On affiche "Rhume"
} else if (f == false) { // Si la personne n'a pas de fièvre
    alert('Refroidissement'); // On affiche "Refroidissement"
} }
else { // Si la personne n'a pas de fièvre
    alert('Rien'); // On affiche "Rien"
}}





