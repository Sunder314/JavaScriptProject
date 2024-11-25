let tasks = [
    { id: 1, body: "Task 1", completed: false }
];

// Récuperer la liste ul (via l'id)
const list = document.querySelector("#tasks");

function createTask(taskObject) {
    // Cacher le message "vide"
    document.querySelector(".empty").style.display = "none";

    // Créer un element li
    const li = document.createElement("li");

    // Créer un element span pour afficher la tâche
    const taskText = document.createElement("span");
    taskText.textContent = taskObject.body;

    // Créer un element "a" pour delete
    const deleteElement = document.createElement("a");
    deleteElement.textContent = "Delete";
    deleteElement.setAttribute("href", "#");
    deleteElement.classList.add("delete");

    // Mettre la valeur de task dans le text de li
    //li.innerHTML = `${value} <a href="#">Delete</a>`;
    li.appendChild(taskText);
    li.appendChild(deleteElement);

    // Ajouter la tâche dans l'élément liste ul
    list.appendChild(li);

    deleteElement.addEventListener("click", function (event) {
        event.preventDefault();
        li.remove();
        tasks = tasks.filter(function (t) {
            if (t.body != taskObject.body) {
                return true;
            }
        });

        console.log(tasks);

        if (!tasks.length) {
            document.querySelector(".empty").style.display = "block";
        }
    });
}

if (tasks.length) {
    for (const task of tasks) {
        createTask(task);
    }
} else {
    document.querySelector(".empty").style.display = "block";
}

// Récupérer l'élement "form"
const formElement = document.querySelector("form");

// Récupérer l'élement "div.error"
const errorElement = document.querySelector(".error");

// Créer un évènement "submit" sur le formulaire
formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    // Récupérer la valeur de l'input du formulaire
    const value = formElement.task.value;
    // Vérifier si l'input est vide
    if (!value.trim()) {
        errorElement.textContent = "Please enter a task";
        errorElement.style.display = "block";
        formElement.task.value = "";
        return false;
    }
    // Cacher le message d'erreur
    errorElement.style.display = "none";

    // Ajouter la tâche à la liste (tableau)
    const t = { id: Date.now(), body: value };
    tasks.unshift(t);

    // Créer la tâche (comme lors du chargement de la page => function)
    createTask(t);

    // Vider l'input
    formElement.task.value = "";
});