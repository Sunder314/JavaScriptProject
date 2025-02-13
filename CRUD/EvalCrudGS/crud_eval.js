let events = [];
const errorElement = document.querySelector('.error');


function display(params){
        const form = document.querySelector('#events');
        const listEvent = document.querySelector('#listevent');
        listEvent.innerHTML = '';
        events.forEach(eventsunder => {
            listEvent.innerHTML += 
            `<div class="eventsunder">
                <h3>Titre: ${eventsunder.title}</h3>
                <p>Numéro: ${eventsunder.id}</p>
                <p>Localisation: ${eventsunder.localisation}</p>
                <p>Description: ${eventsunder.description}</p>
                <p>Date: ${eventsunder.datetime}</p>
                <button onclick="editeventsunder(${eventsunder.id})">Modifier</button>
                <button onclick="deleteventsunder(${eventsunder.id})">Supprimer</button>
            </div>`
        });
        form.title.value = "";
        form.localisation.value = "";
        form.description.value = "";
        form.dateEvent.value = "";
    // } else {
    //     errorElement.textContent = "la date saisi ne peut être avant celle d'aujourd'hui"
    //     errorElement.style.display = "block"
    //     return false
    // }
}

function editeventsunder(id) {
    const form = document.querySelector('#events');
    const eventToEdit = events.find(eventsunder => eventsunder.id == id);
    form.title.value = eventToEdit.title,
    form.localisation.value = eventToEdit.localisation,
    form.description.value = eventToEdit.description,
    form.dateEvent.value = eventToEdit.datetime;
    events = events.filter(eventsunder => eventsunder.id != id);
}

function deleteventsunder(id) {
    console.log(events);
    events = events.filter(eventsunder => eventsunder.id != id);
    console.log(events);
    display(events);
}

function verifDate() {
    dateofToday = new Date();
    const year = dateofToday.getFullYear();
    const month = dateofToday.getMonth() + 1; // Ajoute un 0 si nécessaire pour le mois
    const day = dateofToday.getDate() // Ajoute un 0 si nécessaire

    events.forEach(eventsunder => {
        const dateevent = new Date(eventsunder.datetime)
        const yeardate = dateevent.getFullYear();
        const monthdate = dateevent.getMonth() + 1 // Ajoute un 0 si nécessaire pour le mois
        const daydate = dateevent.getDate()// Ajoute un 0 si nécessaire
        console.log(daydate,day);
        if (daydate < day) {
            return false;
        }
    })
    return true
}

const form = document.querySelector('#events');
form.addEventListener("submit", function(e){
    e.preventDefault();
    var compt = 0;
    events.forEach(eventsunder => {
        compt = eventsunder.id;
    })
    const eventsunder = {
        id: compt+1,
        title: form.title.value,
        localisation: form.localisation.value,
        description: form.description.value,
        datetime: form.dateEvent.value
    }
    events.push(eventsunder)
    display(events);
})












