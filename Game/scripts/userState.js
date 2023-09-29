const keysRequired = 4;

function UserState() {
    this.numOfKeys = 0;
    this.hciQuizCompleted = false;
    this.xrQuizCompleted = false;
    this.gameAreaCompleted = false;
    this.visQuizCompleted = false;
    this.gameStarted = false;
    this.cooDialogueID = 1;
}

UserState.prototype.addKey = function() {
    this.numOfKeys++;
    const userStateDiv = document.querySelector("#userStateDiv");
    userStateDiv.innerHTML = "Keys: " + userState.numOfKeys + "/4";
    if (this.numOfKeys == keysRequired) {
        this.changeDialogue(7);
    }
}

UserState.prototype.startGame = function() {
    this.gameStarted = true;
}

UserState.prototype.changeDialogue = function(id) {
    this.cooDialogueID = id;
}

let userState = new UserState();