function launch(){
    console.log('launch');
}

const buttonElement = document.querySelector("#more") ; // recupere l'element par son id

buttonElement.addEventListener("click", function (){ // permet de faire une action lors du clic sur le bouton
    console.log("click");// affiche click dans la console
    const contentElement = document.querySelector(".content");// recupere l'element par sa class
    contentElement.style.display = "block";// change la propriete display de l'element par block pour l'afficher
});

