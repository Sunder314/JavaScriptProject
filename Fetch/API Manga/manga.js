const search = document.getElementById('search'); // Recupére le bouton Search 
const form = document.querySelector('form');
console.log(form);
search.addEventListener('click', async function(event){

    // recupére la div pour tout afficher dedants
    const allanimes = document.getElementById('allanimes'); 

    event.preventDefault();

    // Recupére la valeur rentrer dans l'input
    const inputanime = document.querySelector('#searchAnime');

    // Recupére l'erreur
    const errorElement = document.querySelector('.error');

    // Prends la valeur de l'input sans les espace
    const inputanimetrim = inputanime.value.trim();
    
    // Efface la valeur rentré
    inputanime.value = '';
    
    if (inputanimetrim === '') {
        // Place le texte dans l'erreur
        errorElement.textContent = 'Le champ de recherche doit être rempli';
        // Affiche l'erreur
        errorElement.style.display = "block";
        // Arrete la fonction 
        return false;
    }

    let reponse;

    try{
        reponse = await fetch(`https://api.jikan.moe/v4/anime?q=${inputanimetrim}`);
    } catch {
        // Place le texte adapté dans l'erreur
        errorElement.textContent = `Vous n'êtes pas connecté à internet`;
        // Affiche l'erreur
        errorElement.style.display = "block";

        return false;
    }

    // Cache l'erreur
    errorElement.style.display = "none";


    // met la valeur retournés dans animes
    const result = await reponse.json();
    const animes = result.data;




    // Réinisialise la liste des animés
    allanimes.innerHTML = "" ; 

    // Crée un compteur pour afficher le nombre d'animée trouvé
    var compt = 0;

    for (const anime of animes) {
        // Ajoute +1 au compteur pour chaque animé trouvé
        compt += 1 ;
        // Création d'un elements div pour mettre chaque info de l'animés
        const animeCard = document.createElement('div') ; 
        animeCard.ClassName = 'anime-Card'; 



    // Recupére toutes les données possible de l'anime (titre note image etc..) grace au fetch et les affiches

        // Création d'un element titre pour afficher le titre l'anime
        const titreAnime = document.createElement("h3");
        // Lui ajoute une class
        titreAnime.className = 'anime-titre';
        // Met le titre de l'anime grace au fetch dedans
        titreAnime.textContent = anime.title;

        
        // Créatiom d'un element img pour aficher l'image de l'animés
        const imgAnime = document.createElement("img");
        // Recupére l'image grace au fetch 
        imgAnime.src = anime.images.jpg.image_url;
        // Affiche l'image 
        imgAnime.alt = `Poster de ${anime.title}`;


        // Création d'un element p pour afficher la note 
        const noteAnime = document.createElement("p");
        // Ajoute une class
        noteAnime.className = 'anime-note';
        // Affiche la note
        noteAnime.textContent = `Note by user : ${anime.score}`;


        // Création d'un element p pour le satus de l'animé (en cours, terminé ..p)
        const statusAnime = document.createElement('p');
        // Classe pour le style
        statusAnime.className = 'anime-status'; 
        // Affiche l'etat de l'animé
        statusAnime.innerText = `État : ${anime.status}`;


        // Création d'un paragraphe pour le nombre d'épisodes
        const episodesAnime = document.createElement("p");
        // Ajout de la classe pour le nombre d'épisodes
        episodesAnime.className = 'anime-episode'; 
        // Affiche les episodes
        episodesAnime.textContent = `Épisodes : ${anime.episodes}`;


        // Fromatez les date de diffusion grace a la fonction formatDate
        const animeDiffusion = document.createElement('p');
        // Ajout d'un class pr le style
        animeDiffusion.className = 'anime-diffusion';
        // On formate la date de debut
        const fromDate = formatDate(anime.aired.from);
        // On formate la date de fin
        const toDate = formatDate(anime.aired.to);
        // On affiche sa date de diffusion
        animeDiffusion.innerText = `Diffusé le : ${fromDate}`;
        

        // Création d'un conteneur pour la description et le lien "Voir plus"
        const Description = document.createElement("div");


        // Création d'un lien pour affichier la description si on click sur le lien 
        const lienDescrption = document.createElement('a');
        // Ajoute le texte 
        lienDescrption.textContent = "Show description"
        // Fait en sort que lien soit 'clickable'
        lienDescrption.href = "#"

        // Crée un element pour mettre la description
        const animeDescription = document.createElement('p');

        // Ajoute un evenement lorsque le lien est cliqué
        lienDescrption.addEventListener('click', function(e) {
            e.preventDefault();
            // si le lien n'a été cliqué (le texte est toujours le meme)
            if (lienDescrption.textContent === "Show description") {
                // Affiche la description 
                animeDescription.textContent = anime.synopsis;
                // Change le texte du lien
                lienDescrption.textContent = "Hide";
            } 
            // Si le lien a changé de nom (à été cliquer)
            else {
                // Cache la descrption
                animeDescription.textContent = "";
                // Remet le lien orginal
                lienDescrption.textContent = "Show description";
            }
            
        });


        // Ajoute la description et le lien dans le containeur Description
        Description.appendChild(animeDescription);
        Description.appendChild(lienDescrption);


        // Ajoute tout les info dans le conteneur animeCard
        animeCard.appendChild(titreAnime);
        animeCard.appendChild(noteAnime);
        animeCard.appendChild(statusAnime);
        animeCard.appendChild(episodesAnime);
        animeCard.appendChild(animeDiffusion);
        animeCard.appendChild(Description);


        // Affiche l'anim dans la div de html
        allanimes.appendChild(animeCard);

        // Affiche l'image dans la div html
        allanimes.appendChild(imgAnime)



    }

    
    // Recupére le paragraphe pour afficher les animés ;
    const nbanime = document.querySelector('.nombreanime');
    nbanime.textContent = `Number of animés find : ${compt}`;

    if (compt == 0 ) {
        // Cache le nombre d'animés trouvé
        nbanime.style.display = "none"
        // Affiche l'erreur que l'on à pas trouvé d'anime de ce nom
        errorElement.textContent = `Impossible de récupérer les informations de ${inputanimetrim}`;
        // Affiche l'erreur
        errorElement.style.display = "block";
        // Arrete la fonction
        return false;
    } else {
        // Affiche le nombre d'animé trouvé
        nbanime.style.display = "block"
    }

});

// Fonction pour formater les dates
function formatDate(dateString) {
    const date = new Date(dateString); // Crée un objet Date à partir de la chaîne
    const day = String(date.getUTCDate()).padStart(2, '0'); // ajoute un zéro devant le jour si nécessaire
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // ajoute 1
    const year = date.getUTCFullYear(); // Récupère l'année
    return `${day}/${month}/${year}`; // Retourne le nouveau format
}



