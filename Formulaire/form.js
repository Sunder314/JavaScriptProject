const from = document.querySelector("form"); 


from.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = from.name.value; // permet de recuperer la valeur de l'input
    console.log(name); // permet d'afficher la valeur de l'input
    document.querySelector("#display").textContent=" " + name; // permet de remplacer le contenu de l'element par la variable name 
    result.style.display="block"; // permet de rendre visible l'element
    from.name.value = ""; // permet de reset le formulaire
});
