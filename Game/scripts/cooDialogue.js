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
        text: "Oh, hello! You're the new student, right? My name is COO, I'm a member of the HCI Lab. I was told to meet you here and introduce you to our laboratory.",
        answers: [
            {
                text: "Why are you inside?",
                nextNode: 2
            },
            {
                text: "What is this thing?",
                nextNode: 3
            },
            {
                text: "My friend would be also interested in joining the lab. Is it open to all students?",
                nextNode: 4
            },
            {
                text: "How can I help you? ",
                nextNode: 5
            },
            {
                text: "Let's start! (end dialogue)",
                nextNode: 6
            }
        ]
    },
    {
        id: 2,
        text: "Well, Lev, my friend from Visitlab, locked me in here.. I was actually hoping you could help me to get out of here.",
        answers: [
            {
                text: "Sure.",
                nextNode: 1
            }
        ]
    },
    {
        id: 3,
        text: "This was a project of one of our former members. I actually don't know what the intended purpose was, but we started to use it as a fun escape room after he left. You need to prove some knowledge of the laboratory to unlock it. ",
        answers: [
            {
                text: "Sounds awesome.",
                nextNode: 1
            }
        ]
    },
    {
        id: 4,
        text: "Of course! People often assume they need some previous experience or that they have to be PhD students, but no.. Any student can join us.",
        answers: [
            {
                text: "Good to hear.",
                nextNode: 1
            }
        ]
    },
    {
        id: 5,
        text: "Well, you could find Lev and convince him to free me, or.. We could have some fun! To unlock this door, we need four keys which are behind four markers that represent HCI Lab research areas. You need to find these markers and complete the tasks that appear when you scan them. Other markers in the room can help you to get some missing knowledge.",
        answers: [
            {
                text: "Got it.",
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
        text: "You got them? Awesome! But there's one more thing - you need to use them in the right order. Look around the lab one more time, you'll find some clues for it there.",
        answers: []
    },
    {
        id: 8,
        text: "Congratulations, you got into the safe! The letter is right there. It's been fun, I hope I'll see you around!",
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