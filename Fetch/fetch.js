// const reponse = fetch("https://jsonplaceholder.typicode.com/");
// console.log(reponse);


// const loadbutton = document.getElementById('load');

// loadbutton.addEventListener("click", function (e){
//     e.preventDefault();
//     fetch("https://jsonplaceholder.typicode.com/").then(function(reponse){
//         console.log(reponse);
//     }).catch(function(error) {
//         console.log("error");
//         console.error(error);
//     });
// });

const postsListElement = document.querySelector("#posts");
 
async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
 
    postsListElement.innerHTML = "";
 
    for (const post of posts) {
        postsListElement.innerHTML += `
            <div>
                <h2>${post.title}</h2>
                <p>ID: ${post.id}</p>
                <p>${post.body}</p>
            </div>
        `;
    }
}
 
getPosts();
