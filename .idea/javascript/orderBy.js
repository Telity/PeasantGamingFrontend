import{ displayGames } from './indexJs.js';

const dropDGenres = document.getElementById("dropDGenre")
const dropPlatforms = document.getElementById("dropDPlatforms")
let btnSubmitForm = document.getElementById("formId");
console.log(btnSubmitForm)

function hoeligans(event){
    event.preventDefault()
    const formData = new FormData(btnSubmitForm)
    console.log(formData)
    const data = Object.fromEntries(formData)
    console.log(data)

    const response = fetch(this.action,{
        method : "post",
        body : JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        displayGames(response.json());
    }
}
btnSubmitForm.addEventListener("submit",hoeligans)

let genres=[]
let platforms = []

document.addEventListener("DOMContentLoaded", async () =>{
     await fetch("http://localhost:8080/genres")
        .then(res => res.json())
         .then(result => genres = [...result])
        fillGenreDropdown()
        .catch(err => console.error("Error fetching games:", err));
});
document.addEventListener("DOMContentLoaded", async () =>{
    await fetch("http://localhost:8080/platforms")
        .then(res => res.json())
        .then(result => platforms = [...result])
    fillPlatformDropdown()
        .catch(err => console.error("Error fetching games:", err));
});

async function fillGenreDropdown(){
   await genres.forEach(genre => {
        let element = document.createElement("option")
    element.textContent = genre;
    element.value = genre;
    dropDGenres.appendChild(element)
        }
    )
}
async function fillPlatformDropdown(){
    await platforms.forEach( platform => {
        let platformOption = document.createElement("option")
        platformOption.textContent = platform;
        platformOption.value = platform;
        dropPlatforms.appendChild(platformOption)
        }
    )
}




