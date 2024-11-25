
const articleListElement = document.querySelector("#article");
let articleList = []

const ErrorElement = document.querySelector('.error');

const form = document.querySelector("#FormArticle");
console.log(form);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    if ((!form.name.value.trim()) || (!form.description.value.trim()) || (!form.description.value.trim()) || (!form.description.value.trim()))   {
        ErrorElement.textContent = "Attention";
        ErrorElement.style.display = "block";
        return false;
    } 
    ErrorElement.style.display = "none"
    function createArticle() {
        const createArticle = {name: form.name.value, description: form.description.value, price: form.price.value, quantity: form.quantity.value}
        articleList.push(createArticle);
        console.log(articleList);
        form.name.value = "";
        form.description.value = "";
        form.price.value = "";
        form.quantity.value = "";
    }



    
})