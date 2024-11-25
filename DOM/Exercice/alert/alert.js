// Programme qui affiche une alérte lorsq'un lieu est créée

const lien = document.querySelectorAll("a");
console.log(lien);
for (const i of lien) {
    i.addEventListener("click", function (event){
        const confirmation = confirm('voulez-vous quitter la page ?');
        if (!confirmation){
            event.preventDefault();
        }
})
}
