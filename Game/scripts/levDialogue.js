const dialogueContainer2 = document.querySelector(".dialogueContainer");
const dialogueDiv2 = document.querySelector("#dialogueDiv");
const answerButtonsDiv2 = document.querySelector("#answerButtonsDiv");


AFRAME.registerComponent('lev-dialogue', {
    init: function() {
        this.el.addEventListener("markerFound", showText);
        this.el.addEventListener("markerLost", hideText);
    }
});

function showText() {
    dialogueDiv2.innerHTML = "COO's making you play his stupid game again? Well.. I'm Lev, the mascot of Visitlab. Our laboratories cooperate with each other, so you'll see me here often if you'll stay."
    answerButtonsDiv2.style.display = "none";
    dialogueContainer2.style.display = "block";
}

function hideText() {
    dialogueContainer2.style.display = "none";
    answerButtonsDiv2.style.display = "block";
}