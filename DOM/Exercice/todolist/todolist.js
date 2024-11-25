// // Crée un fromulaire qui ajoute et supprime des taches
const form = document.querySelectorAll("form"); 
console.log(form);
const nb = document.querySelector("#nombre");
nb.textContent = 0 + " ";
const body = document.querySelector('body');
const from0 = form[0];
let compt = 0;
from0.addEventListener("submit", function(event){
    event.preventDefault();
    if (!from0.task.value.trim()){
        alert("rentrer une tache valide")
        return false;
    }
    compt += 1;
    nb.textContent = compt + " ";
    const li = document.createElement('div');
    li.setAttribute('id',"div")
    const del = document.createElement('a');
    del.setAttribute("href","#");
    del.textContent = "Delete";
    const chekbox = document.createElement('input');
    chekbox.setAttribute('type',"checkbox");
    chekbox.setAttribute("id","checkb");
    li.append(chekbox);
    li.append(from0.task.value);
    // li.append(" ",del);
    const ul  = document.querySelector('#tasks');
    ul.append(li);
    // del.addEventListener("click", function (event){
    //     compt = compt - 1;
    //     nb.textContent = compt + " ";
    //     const confirmation = confirm('voulez-vous supprimer la tache ?');
    //     if (!confirmation){
    //         console.log("ahh");
    //     } else {
    //         li.remove();
    //     }
    
    //     })

    from0.task.value = ""; // permet de reset le formulaire
    console.log(from0);
})

function deleteSelectedTasks() {
    const nb = document.querySelector("#nombre");
    let c = document.querySelectorAll('#checkb');
    c.forEach(checkbox => {
        if (checkbox.checked) {
                checkbox.parentElement.remove();
                nb.textContent = ((nb.textContent) - 1) + " ";
                return false;
        }
    });
}






const form1 = form[1];
form1.addEventListener("submit", function(e){
    e.preventDefault();
    nb.textContent = 0 + " ";
    const task = document.querySelectorAll('li');
    for (li of task) {
        li.remove();
    }
})






// const tab = ['task1','task2','task3'];
// const ul = document.querySelector('#tasks');
// for (task of tab) {
//     const li = document.createElement("ul"); // Crée un élement button
//     li.textContent = task;
//     console.log(li);
//     ul.append(li);
// }

