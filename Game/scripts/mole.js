const miniGameContainer = document.querySelector(".miniGameContainer");

const infoDiv = document.querySelector("#infoDiv");

let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let gameSet = false;

const scoreRequired = 10;

AFRAME.registerComponent('whack-a-mole', {
    init: function() {
        this.el.addEventListener("markerFound", showMole);
        this.el.addEventListener("markerLost", hideMole);
    }
});

function showMole() {
    if (!gameSet) {
        setGame();
        gameSet = true;
    }
    miniGameContainer.style.display = "block";
}

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("miniGameDiv").appendChild(tile);
    }

    setInterval(setMole, 666);
    setInterval(setPlant, 700);
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./assets/lev.png";

    let num = getRandomTile();
    while (currentPlantTile && currentPlantTile.id == num) {
        num = getRandomTile();
    }
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currentPlantTile) {
        currentPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./assets/coo.png";

    let num = getRandomTile();
    while (currentMoleTile && currentMoleTile.id == num) {
        num = getRandomTile();
    }
    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant);
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function selectTile() {
    if (gameOver) {
        return;
    }
    
    if (this == currentMoleTile && currentMoleTile.innerHTML != "") {
        currentMoleTile.innerHTML = "";
        score += 10;
        document.getElementById("scoreDiv").innerHTML = "Score: " + score.toString() + "/" + scoreRequired.toString();
        if (score == scoreRequired) {
            currentMoleTile.innerHTML = "";
            gameOver = true;
            userState.addKey();
            showInfo("A key has been added to your inventory.")
        }
    }
    else if (this == currentPlantTile) {
        currentPlantTile.innerHTML = "";
        document.getElementById("scoreDiv").innerHTML = "AU, that hurt! GAME OVER: " + score.toString();
        gameOver = true;
    }
}

function showInfo(string) {
    infoDiv.innerHTML = string;
    infoDiv.style.display = "block";
    setTimeout(() => {
        infoDiv.style.display = "none";
    }, 1500);   
}

function hideMole() {
    miniGameContainer.style.display = "none";
}