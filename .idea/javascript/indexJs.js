document.addEventListener("DOMContentLoaded",() =>{
    fetch("http://localhost:8080/mistralChoice")
        .then(res => res.json())
        .then(data => displayGames(data))
        .catch(err => console.error("Error fetching games:", err));
});

function displayGames(games){

    const tableCells = document.querySelectorAll("td.game-cell")

    games.forEach((game, index) => {
        if (index >= tableCells.length) return;

        const td = tableCells[index]
        const dealsHTML = Object.entries(game.dealList || {})
            .map(([store,price])=> `<p>${store}: $${price}</p>\\`)
            .join("")

        td.innerHTML = `
            <div class ="game-wrapper">
            <img src="${game.picture}" alt="${game.name}">
            <div class="hover-info">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Genres:</strong> ${game.genre.join(", ")}</p>
            <p><strong>Platforms:</strong> ${game.platform.join(", ")}</p>
            ${dealsHTML}
        </div>
        </div>`;
    });
}