let currentClickID = 0;
const clickOrderIDs = ["keyBtn1", "keyBtn2", "keyBtn3", "keyBtn4"];

AFRAME.registerComponent('coo-dialogue', {
    init: function() {
        this.el.addEventListener("markerFound", showDialogue);
        this.el.addEventListener("markerLost", hideDialogue);
    }
});

function showDialogue() {
    let currentTextNode = selectText(userState.cooDialogueID);
    let dialogueDiv = document.querySelector("#dialogueDiv");
    dialogueDiv.innerHTML = currentTextNode.text;
    let dialogueButtons = document.querySelector("#answerButtonsDiv");
    while (dialogueButtons.firstChild) {
        dialogueButtons.removeChild(dialogueButtons.firstChild)
    }

    currentTextNode.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerHTML = answer.text;
        btn.classList.add("dialogueBtn");
        btn.addEventListener('click', () => {
            userState.cooDialogueID = answer.nextNode;
            if (userState.cooDialogueID == 6){
                userState.startGame();
                document.querySelector("#userStateDiv").style.display = "flex";
            };
            showDialogue();
        }
        );
        dialogueButtons.appendChild(btn);
    })

    if (userState.cooDialogueID == 7){
        currentClickID = 0;
        document.querySelector("#keysOrderContainer").style.display = "block"; 
        document.querySelector("#keyBtn1").addEventListener("click", () => {
            handleKeysOrder("keyBtn1")
        });
        document.querySelector("#keyBtn2").addEventListener("click", () => {
            handleKeysOrder("keyBtn2")
        });
        document.querySelector("#keyBtn3").addEventListener("click", () => {
            handleKeysOrder("keyBtn3")
        });
        document.querySelector("#keyBtn4").addEventListener("click", () => {
            handleKeysOrder("keyBtn4")
        }); 
    }
  
    let dialogueContainer = document.querySelector(".dialogueContainer");
    dialogueContainer.style.display = "block";
}


function handleKeysOrder(btnClicked) {
    if (currentClickID >= clickOrderIDs.length) {
        return;
    }   

    let btnClickedElement = document.querySelector("#" + btnClicked);
    if (btnClickedElement.style.backgroundColor == "rgb(40, 195, 174)") {
        return;
    }

    btnClickedElement.style.backgroundColor = "#28c3ae";
    
    if(btnClicked == clickOrderIDs[currentClickID]) {
		currentClickID++;
		
		// if there's nothing left, do a specific action
		if(currentClickID == clickOrderIDs.length) {
			// your code goes here... sample:
            infoDiv.innerHTML = "You got it! Go back to COO.";
            userState.cooDialogueID = 8;
            infoDiv.style.display = "block";
                setTimeout(() => {
            infoDiv.style.display = "none";
            document.querySelector("#keysOrderContainer").style.display = "none"; 
            }, 1500);   
		}
	}
    else {
        infoDiv.innerHTML = "Try again.";
        infoDiv.style.display = "block";
            setTimeout(() => {
        infoDiv.style.display = "none";
        }, 1500);   
        document.querySelector("#keyBtn1").style.backgroundColor = "#242424";
        document.querySelector("#keyBtn2").style.backgroundColor = "#242424";
        document.querySelector("#keyBtn3").style.backgroundColor = "#242424";
        document.querySelector("#keyBtn4").style.backgroundColor = "#242424";
        currentClickID = 0;
    }
}

function selectText(index) {
    const textNode = dialogueNodes.find(textNode => textNode.id == index);
    return textNode;
}

function selectAnswer(answer) {
    const nextTextNodeId = answer.nextNode;
    showDialogue(nextTextNodeId);
}

function hideDialogue() {
    let dialogueContainer = document.querySelector(".dialogueContainer");
    dialogueContainer.style.display = "none";
}

const dialogueNodes = [
    {
        id: 1,
        text: "Hello! You're the new student, right? I was told to meet you here. I'm COO.",
        answers: [
            {
                text: "Who are you?",
                nextNode: 2
            },
            {
                text: "I think somebody locked us in here. Do you know something about it?",
                nextNode: 3
            },
            {
                text: "How can I get out!?",
                nextNode: 4
            },
            {
                text: "Okay.. Let's start. (end dialogue)",
                nextNode: 6
            }
        ]
    },
    {
        id: 2,
        text: "Oh, how rude of me. I'm COO, the mascot of the HCI Lab! ",
        answers: [
            {
                text: "Back",
                nextNode: 1
            }
        ]
    },
    {
        id: 3,
        text: "Yeah, well.. That was me. I just wanted to have a little bit of fun.",
        answers: [
            {
                text: "Back",
                nextNode: 1
            }
        ]
    },
    {
        id: 4,
        text: "Well, I used my special HCI Lab lock, for which four keys are needed to unlock it. Each key is hidden behind a marker that corresponds to one of the research areas of HCI Lab. You need to collect them.",
        answers: [
            {
                text: "Back",
                nextNode: 1
            }
        ]
    },
    {
        id: 6,
        text: "Great! Look around the lab and get back to me after you get all the keys.",
        answers: []
    },

    {
        id: 7,
        text: "You got them? Awesome! But there's one more thing - you need to use them in the right order. Look around the lab one more time, I'm sure you can figure it out.",
        answers: []
    },
    {
        id: 8,
        text: "Congratulations, you got into the safe! The letter is right there. Thank you for playing with me, it's been fun. I hope I'll see you around!",
        answers: []
    },

    {
        id: 12,
        text: "I've seen some cool equipment in the lab. Can I use it?",
        answers: [
            {
                text: "Of course! VR systems, motion capture system,.. Our students are allowed to try anything.",
                nextNode: 1
            }
        ]
    },
]