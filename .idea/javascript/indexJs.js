const formbody = document.getElementById("gameSearch");
const singlebody = document.getElementById("singleGame");


formbody.addEventListener('submit', async function(event) {
    event.preventDefault()

    resetGameCells()
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

    resetGameCells()
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

        let x = 0;
        if(games.length <= 1){
            x = 1
        }
        const td = tableCells[index + x]

        const dealsHTML = Object.entries(game.dealList || {})
            .map(([store,price])=> `<p>${store}: ${price}</p>`)
            .join("")

        td.innerHTML = `
            <div class ="game-wrapper">
             <img src="${game.picture}" 
             alt="Game image" 
             onerror="this.onerror=null; this.src='https://imgur.com/PpPeFtR.jpg';">
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


function resetGameCells() {
    const cells = document.querySelectorAll(".game-cell");
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
}

// Add this to your JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Create the world container
    const world = document.createElement('div');
    world.className = 'pixel-world';

    // Create the ground
    const ground = document.createElement('div');
    ground.className = 'ground';

    // Create the blob character
    const blob = document.createElement('div');
    blob.className = 'blob';

    // Add elements to the page
    document.querySelector('.upperSection').appendChild(world);
    world.appendChild(ground);
    world.appendChild(blob);

    // Create stars in the background
    for (let i = 0; i < 20; i++) {
        createStar(world);
    }

    // Create clouds
    for (let i = 0; i < 3; i++) {
        createCloud(world);
    }

    // Create mountains in the background
    for (let i = 0; i < 3; i++) {
        createMountain(world);
    }

    // Create initial trees
    for (let i = 0; i < 5; i++) {
        createTree(world, i * 300 + Math.random() * 100);
    }

    // Animate the blob (bouncing effect)
    animateBlob(blob);

    // Start the world animation
    animateWorld(world);

    // Function to create a tree
    function createTree(container, xPosition) {
        const tree = document.createElement('div');
        tree.className = 'tree';
        tree.style.right = -xPosition + 'px';

        const treeTop = document.createElement('div');
        treeTop.className = 'tree-top';

        const treeTrunk = document.createElement('div');
        treeTrunk.className = 'tree-trunk';

        tree.appendChild(treeTop);
        tree.appendChild(treeTrunk);
        container.appendChild(tree);

        return tree;
    }

    // Function to create a cloud
    function createCloud(container) {
        const cloudGroup = document.createElement('div');
        cloudGroup.style.position = 'absolute';
        cloudGroup.style.right = -Math.random() * 500 + 'px';
        cloudGroup.style.top = Math.random() * 60 + 20 + 'px';
        cloudGroup.className = 'cloud-group';

        // Create multiple cloud parts
        const cloudParts = 4 + Math.floor(Math.random() * 3);
        for (let i = 0; i < cloudParts; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            const size = 15 + Math.random() * 20;
            cloud.style.width = size + 'px';
            cloud.style.height = size + 'px';
            cloud.style.left = i * 10 + 'px';
            cloud.style.top = Math.random() * 10 + 'px';
            cloudGroup.appendChild(cloud);
        }

        container.appendChild(cloudGroup);
        return cloudGroup;
    }

    // Function to create a star
    function createStar(container) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 70 + '%';
        container.appendChild(star);

        // Make stars twinkle
        setInterval(() => {
            star.style.opacity = 0.3 + Math.random() * 0.7;
        }, 1000 + Math.random() * 2000);

        return star;
    }

    // Function to create a mountain
    function createMountain(container) {
        const mountain = document.createElement('div');
        mountain.className = 'mountain';
        mountain.style.right = -Math.random() * 800 + 'px';

        const mountainShape = document.createElement('div');
        mountainShape.className = 'mountain-shape';
        mountain.appendChild(mountainShape);

        container.appendChild(mountain);
        return mountain;
    }

    // Animate the blob with a bouncing effect
    function animateBlob(blob) {
        let frame = 0;

        setInterval(() => {
            // Bouncing animation
            const bounce = Math.abs(Math.sin(frame / 5) * 5);
            blob.style.bottom = (50 + bounce) + 'px';

            // Squash and stretch
            const squash = 1 - Math.sin(frame / 5) * 0.2;
            const stretch = 1 / squash;
            blob.style.transform = `translateX(-50%) scaleX(${stretch}) scaleY(${squash})`;

            frame++;
        }, 50);
    }

    // Animate the world elements
    function animateWorld() {
        const speed = 3;
        const trees = document.querySelectorAll('.tree');
        const clouds = document.querySelectorAll('.cloud-group');
        const mountains = document.querySelectorAll('.mountain');

        // Main animation loop
        setInterval(() => {
            // Move trees
            trees.forEach(tree => {
                let rightPos = parseFloat(tree.style.right);
                rightPos += speed;
                tree.style.right = rightPos + 'px';

                // Reset tree position when it moves off screen
                if (rightPos > window.innerWidth) {
                    tree.style.right = -100 + 'px';
                }
            });

            // Move clouds slower
            clouds.forEach(cloud => {
                let rightPos = parseFloat(cloud.style.right);
                rightPos += speed * 0.5;
                cloud.style.right = rightPos + 'px';

                // Reset cloud position
                if (rightPos > window.innerWidth) {
                    cloud.style.right = -200 + 'px';
                }
            });

            // Move mountains very slowly
            mountains.forEach(mountain => {
                let rightPos = parseFloat(mountain.style.right);
                rightPos += speed * 0.2;
                mountain.style.right = rightPos + 'px';

                // Reset mountain position
                if (rightPos > window.innerWidth) {
                    mountain.style.right = -300 + 'px';
                }
            });

            // Randomly add new trees
            if (Math.random() < 0.02) {
                createTree(world, -100);
            }
        }, 50);
    }
});
