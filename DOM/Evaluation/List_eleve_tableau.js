
// Création d'un tableu d'eleve
let eleve = [
    //{id: 1, body: valeur de l'input, estpasse: fasle / true}
];

// Recupére le formulaire (<form></form>)
const formElement = document.querySelector('form')

// Recupere l'element de class error
const ErrorElement = document.querySelector(".error")

// Recupere la liste (<ul></ul>)
const list = document.querySelector('#eleves');

// Création d'un balise span (text)
const message = document.createElement('span');
message.setAttribute('class','mess');

// Modifie le contenu de message et l'ajoute dans list
message.textContent = "Pas d'éleve(s) enregistré(e)(s)";
list.append(message);

// Creation d'un compteur
const compteur = document.querySelector('#count');

// fonction qui crée un eleve et l'ajoute a la liste
function creatEleve(eleveObject) {

    // Duplication du compteur dans la fonction
    const compteur = document.querySelector('#count');

    // Création d'un element div
    const div = document.createElement('div');
    div.setAttribute('id','div');


    // Creation d'un checkbox
    const chekbox = document.createElement('input');
    chekbox.setAttribute('type',"checkbox");
    chekbox.setAttribute("id","checkb");
    
    // Creation d'un élement span (<span></span>)
    const ElevePrenom = document.createElement('span');
    // ajouter le nom de l'eleve dans l'element span
    ElevePrenom.textContent = eleveObject.body;

    // Ajout de l'eleve dans li (li)
    div.appendChild(chekbox);
    div.appendChild(ElevePrenom);

    // Ajout de l'element li dans la liste
    list.appendChild(div);



}

formElement.addEventListener("submit", function(event){
    event.preventDefault();

    // recuperé la valuer de l'input(prenom de l'eleve)
    const prenom = formElement.eleve.value;

    // Verifie si l'input est vide
    if (!prenom.trim()){
        ErrorElement.textContent = "Veuillez entrez un éleve"
        ErrorElement.style.display = "block"
        formElement.eleve.value = "";
        return false;
    }

    // Selection tout les elements de la liste eleve un à un    
    for (let i = 0; i < eleve.length; i++) {
        // Si un le prenom d'un element est égale a celui que l'on veut rentrer
        if (eleve[i].body.toLowerCase() == prenom.toLowerCase()) {
            // On affiche un message pour dire que ce prenom est déjà dans la liste
            ErrorElement.textContent = "L'éleve : '" + eleve[i].body + "' est déja présent dans la liste";
            ErrorElement.style.display = "block"
            formElement.eleve.value = "";
            // Cloture l'action du submit
            return false;
        }
    }

    // Efface le contenu de message (car un éleve a été ajouté)
    message.textContent = "";

    // N'affiche pas le message d'erreur
    ErrorElement.style.display = "none";

    // Ajoute l'ement avec le prenom renté dasn l'input dans eleve 
    const Addeleve = {id : Date.now(), body: prenom, estpasse: false};
    eleve.push(Addeleve);


    // Compteur affiche la taille de la list eleve (le nombre d'eleve dans la liste)
    compteur.textContent = eleve.length;

    // Execution de la fonction creatEleve 
    //qui permet d'ajouter le prenom de l'eleve a la liste
    creatEleve(Addeleve);


    // Vider l'input
    formElement.eleve.value = "";
    
})

// Recupere le button qui permet de supprimer les eleve cocher
var supprelv = document.getElementById('suppreleve');
// Crée un evenement lors que l'utilisateur click sur le boutton
supprelv.addEventListener("click", function(e){
    e.preventDefault();

    // recupére tout les checkbox
    let c = document.querySelectorAll('#checkb');

    len = eleve.length;

    // Verfie si il y'a des eleves dans la liste
    if (eleve.length > 0) { 
        var compt = 0
        c.forEach(chekbox=> {
            if (chekbox.checked){
                compt += 1;
            }
        });

        // verfie si une seule checbox a était coché
        if (compt > 1){
            // renvoie une alerte
            alert('un seul éléve peut être supprimer à la fois');
            // on décheck toute les checkbox
            c.forEach(chekbox=> {
                if (chekbox.checked){
                    chekbox.checked = false;
                }
            });
            return false;
        }

        // regarde les checkbox une à une   
        for (let i = 0; i < c.length; i++) {
            // si le checkboc est cocher
            if (c[i].checked) {
                let indice = i;
                eleve.splice(indice,1);
                // on supprime div de la liste (donc la checkboc + le prenom de l'éleve)
                c[i].parentElement.remove();
                // on supprime l'element dans la liste eleve 
                console.log(eleve);
            }
        }
        
        // si aucun éleve n'a été suprrimé alors aucune case n'a été cocher
        if (eleve.length == len) {
            // On retourne donc un message d'erreur où on demande
            // a l'utilisateur de selectionner un éleve
            ErrorElement.textContent = "Veuillez selectionner un éleve a supprimer";
            ErrorElement.style.display = "block";
            // Cloture l'action du click
            return false;
        }
    }
    // Si la liste d'éleve est vide
        else {
        // On renvoie une message d'erreur pour 
        // signaler qu'il n'y aucun éleve a supprimer
        message.textContent = "Pas d'éleve(s) enregistré(e)(s)"
        ErrorElement.textContent = "Aucun éleve à supprimer";
        ErrorElement.style.display = "block";
        // Cloture l'action du click
        return false;  
    }
    // Si tout les elements de la liste eleve ont été supprimé
    if (eleve.length == 0) {
        // Renvoie que aucun éleves n'est enregistrer
        message.textContent = "Pas d'éleve(s) enregistré(e)(s)"
    }

    // cache le message d'erreur
    ErrorElement.style.display = "none";

    // On met a jour le compteur 
    compteur.textContent = eleve.length;

    console.log(eleve);
});


// On recupére le boutton qui permet de reset ('Effacer tout les eleves)
var reset = document.getElementById('reset');
// supprime tour les éléments de la liste
reset.addEventListener("click", function(event){
    event.preventDefault();


    let divElement = document.querySelectorAll('#div');
    console.log(divElement);
    

    if (eleve.length > 0) {
        const confirmation = confirm('Êtes vous sur de vouloir supprimer tous les éleves de la liste ?')
        if (!confirmation){
            return false;
        } 
        var i = 0;
        while (eleve.length != 0 ) {

                // on supprime tout les div de la liste 
                divElement[i].remove();

                // on suppime l'éleve correspondant du tableau des éleves
                eleve.pop(i);

                // on passe a l'element suivant 
                i += 1;
        }
        
        // On remet puisse que tout les eleves ont été supprimé
        message.textContent = "Pas d'éleve(s) enregistré(e)(s)"

    } else {        
        // On renvoie une message d'erreur pour signaler qu'il n'y aucun éleve a supprimer
        ErrorElement.textContent = "Aucun éleve à supprimer";
        ErrorElement.style.display = "block";
        // Cloture l'action du click
         return false;
    }

    
    // cache le message d'erreur
    ErrorElement.style.display = "none";
    
    // On met a jour le compteur 
    compteur.textContent = eleve.length;

})



// On recupére le boutton qui permet de choisir une eleve 
var choix = document.getElementById('choixeleve');
// recupére l'element p qui servira à afficher l'erreur 
const err = document.querySelector(".err");
choix.addEventListener('click', function(e){
    e.preventDefault();

    // récupéré l'element p qui servira a fficher l'erreur
    const elevechoisi = document.querySelector('#choix');

    // Verfie si la liste d'éleve est vide
    if (eleve.length == 0){
        // On affiche seulement le message d'erreur
        elevechoisi.textContent = "";
        // On renvoie une message d'erreur pour signaler qu'il n'y aucun éleve a supprimer
        err.textContent = "Aucun éleve à faire passé au tableau";
        err.style.display = "block";
        // Cloture l'action du click
         return false;       
    }

    // on instanci une variable eleve2 qui sera réinisialialiser à chaque tour 
    let eleve2 = [];

    
    for (k=0; k< eleve.length; k++) {
        let e = eleve[k]
            if (e.estpasse == false) {
                eleve2.push(e)
            }
    }

    if (eleve2.length == 0){
        // On affiche seulement le message d'erreur
        elevechoisi.textContent = "";
        // On renvoie une message d'erreur pour signaler qu'il n'y aucun éleve a supprimer
        err.textContent = "Tout les éléves sont déjà passé(e)s";
        err.style.display = "block";
        // Cloture l'action du click
         return false; 
    }
    // on cache le message d'erreur
    err.style.display = "none";

    // Crée un indice aléatoire en 0 et l'indice max de la liste d'éleve 
    var min = 0;
    var max = (eleve2.length -1);
    let indice = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(indice);
    console.log(eleve2);

    // choisi l'éléve aléatoirement grace a son indice
    var eleveAuTableau = eleve2[indice];

    // Affiche l'éléve choisi
    elevechoisi.textContent = "éléve au tableau : " + eleveAuTableau.body;


    // Montre que l'éléve est passé au tableau
    for (k=0; k<eleve.length; k++) {
        let e = eleve[k]
        if (e.body == eleveAuTableau.body){
            e.estpasse = true;
        }
    };
})


// On recupére le boutton qui permet de choisir une eleve 
var reschoix = document.getElementById('reschoix');
// Permet pouvoir faire en sorte que chaque éleve puisse repasser 
reschoix.addEventListener('click', function(v){
    v.preventDefault();
    var v = 0;
    if (eleve.length == 0 ){
        alert('aucun éleve dans la liste');
        return false;
    }
    const conf = confirm('Confirmez vous que chaque éléves pourra repasser ?');
    if (!conf){
        return false;
    } else {
        err.style.display = "none";
        while (v < eleve.length) {
            let ele = eleve[v]; 
            ele.estpasse = false;
            v += 1;
    }
    }
    
});





