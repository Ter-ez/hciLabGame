const dialogueContainer = document.querySelector(".dialogueContainer");
const dialogueDiv = document.querySelector("#dialogueDiv");
const answerButtonsDiv = document.querySelector("#answerButtonsDiv");


AFRAME.registerComponent('model-info', {
    init: function() {
        this.el.addEventListener("markerFound", showText);
        this.el.addEventListener("markerLost", hideText);
    }
});

function showText() {
    dialogueDiv.innerHTML = "The HCI Lab was established in 2002 by prof. Jiří Sochor."
    answerButtonsDiv.style.display = "none";
    dialogueContainer.style.display = "block";
}

function hideText() {
    dialogueContainer.style.display = "none";
    answerButtonsDiv.style.display = "block";
}