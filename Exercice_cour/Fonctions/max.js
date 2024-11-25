function max(a, b) { 
    if (a > b) { // si a est plus grand que b
        return a;
    } else if (a === b) { // si a est égal à b
        return "a est égal à b";
    } 
    return b; // si a est plus petit que b
}
let a = Number(prompt("Entrez un nombre")); // permet à l'utilisateur de saisir un nombre et le place dans la variable a
let b = Number(prompt("Entrez un nombre")); // permet à l'utilisateur de saisir un nombre et le place dans la variable b
console.log(max(a, b)); // affiche le résultat de la fonction max(a, b)

