const formbody = document.getElementById("gameSearch");
const singlebody = document.getElementById("singleGame");


formbody.addEventListener('submit', async function(event) {
    event.preventDefault()


    const formdata = new FormData(formbody);
    console.log(formdata)
    const newdata = Object.fromEntries(formdata)
    console.log(newdata)
    const url = this.action;


    try {
        const response = await fetch(url, {
            method: this.method,
            body: JSON.stringify(newdata)
        })

        if(response.ok){
            const result = response.json();
            console.log("Succes")
            await displayGames(result)
        }
        else{
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    }
    catch (error) {
        console.error("Error", error)
    }

})

singlebody.addEventListener('submit', async function(event) {
    event.preventDefault()


    const formdata = new FormData(singlebody);
    console.log(formdata)
    const newdata = Object.fromEntries(formdata)
    const url = this.action;

    console.log(newdata)
    try {
        const response = await fetch(url, {
            method: this.method,
            body: JSON.stringify(newdata)
        })
        console.log(response)
        if(response.ok){
            const result = response.json();
            console.log("Succes")
            await displayGames(result)
            console.log(result)
        }
        else{
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    }
    catch (error) {
        console.error("Error", error)
    }

})


/*document.addEventListener("DOMContentLoaded",() =>{
    fetch("http://localhost:8080/mistralChoice")
        .then(res => res.json())
        .then(data => displayGames(data))
        .catch(err => console.error("Error fetching games:", err));
});*/

async function displayGames(gameinfo){
    console.log(gameinfo)
    const tableCells = document.querySelectorAll("td.game-cell")

    let games = await gameinfo;

    games.forEach((game, index) => {
        if (index >= tableCells.length) return;

        const td = tableCells[index]
        const dealsHTML = Object.entries(game.dealList || {})
            .map(([store,price])=> `<p>${store}: ${price}</p>`)
            .join("")

        td.innerHTML = `
            <div class ="game-wrapper">
            <img src="${game.picture}" alt="${game.name}">
            <div class="hover-info">
            <h3>${game.name}</h3>
            <p><strong>Genres:</strong> ${game.genre.join(", ")}</p>
            <p><strong>Platforms:</strong> ${game.platform.join(", ")}</p>
            ${dealsHTML}
            <p>${game.description}</p>
        </div>
        </div>`;
    });
}

