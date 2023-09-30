const miniGameContainer = document.querySelector(".miniGameContainer");

const textDivG = document.querySelector(".researchAreaText");
const researchAreaContainerG = document.querySelector("#researchAreaContainer");

const infoDivG = document.querySelector("#infoDiv");

const restartMiniGameBtn = document.querySelector("#restartMiniGameBtn");
restartMiniGameBtn.addEventListener("click", restartMole);
const cancelMiniGameBtn = document.querySelector("#cancelMiniGameBtn");
cancelMiniGameBtn.addEventListener("click", cancelMole);

let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let gameSet = false;

const scoreRequired = 20;

AFRAME.registerComponent('whack-a-mole', {
    init: function() {
        this.el.addEventListener("markerFound", showGameArea);
        this.el.addEventListener("markerLost", hideGameArea);
    }
});

function showGameArea() {
    textDivG.innerHTML = "Games play a huge part of our laboratory's activities. Besides research, we teach multiple courses on game design, game development, or games user research, and there's a master's degree program on game development too. Some members of our laboratory focus also on esports and how HCI concepts can influence the future of it."
    let btn = document.querySelector(".researchAreaBtn");
    if (userState.gameStarted && !userState.gameAreaCompleted) {
        btn.parentNode.removeChild(btn);
        btn = document.createElement('button');
        btn.innerHTML = "Play Whack-A-Mole";
        btn.classList.add("researchAreaBtn");
        btn.addEventListener("click", showMole);
        researchAreaContainer.appendChild(btn);  
    }
    researchAreaContainerG.style.display = "block"
}

function showMole() {
    if (!gameSet) {
        setGame();
        gameSet = true;
    }
    miniGameContainer.style.display = "block";
    
}

function restartMole() {
    gameOver = false;
    score = 0;
    document.getElementById("scoreDiv").innerHTML = "Score: " + score.toString() + "/" + scoreRequired.toString();
}

function cancelMole() {
    restartMole();
    hideMole();
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
            userState.addKey();
            showInfo("A key has been added to your inventory. Btw, in the game development programm, they will teach you to create much cooler games than a simple Whack A Mole.")
            gameOver = true;
            userState.gameAreaCompleted = true;
            document.querySelector("#miniGameControlDiv").style.display = "none";
            setTimeout(cancelMole, 1500);
            let btn = document.querySelector(".researchAreaBtn");
            btn.parentNode.removeChild(btn);
        }
    }
    else if (this == currentPlantTile) {
        currentPlantTile.innerHTML = "";
        document.getElementById("scoreDiv").innerHTML = "AU, that hurt! GAME OVER: " + score.toString();
        gameOver = true;
    }
}

function endMole() {
    userState.addKey();
    showInfo("A key has been added to your inventory.")
    gameOver = true;
    userState.gameAreaCompleted = true;
    document.querySelector("#miniGameControlDiv").style.display = "none";
    setTimeout(cancelMole, 1500);
    let btn = document.querySelector(".researchAreaBtn");
    btn.parentNode.removeChild(btn);
}

function showInfo(string) {
    infoDivG.innerHTML = string;
    infoDivG.style.display = "block";
    setTimeout(() => {
        infoDivG.style.display = "none";
    }, 1500);   
}

function hideMole() {
    miniGameContainer.style.display = "none";
}

function hideGameArea() {
    researchAreaContainerG.style.display = "none"
}