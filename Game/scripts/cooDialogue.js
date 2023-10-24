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
    if (currentTextNode.id == 12) {
        userState.cooDialogueID = 12;
        window.location.replace("https://hci.fi.muni.cz/");
    }
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
        text: "Oh, I thought that's obvious.. I'm COO, the mascot of the HCI Lab! ",
        answers: [
            {
                text: "Back",
                nextNode: 1
            }
        ]
    },
    {
        id: 3,
        text: "Yeah, well.. That was me. Everyone is always busy around here, working on their project.. I just want to have a little bit of fun!",
        answers: [
            {
                text: "Back",
                nextNode: 1
            }
        ]
    },
    {
        id: 4,
        text: "Well, you need to find four keys to unlock the door. Each of them is hidden behind a marker that corresponds to one of the research areas of HCI Lab. Collect them and you'll be free.",
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
        text: "Congratulations, you got it! You are free to go now, the door's unlocked. But I hope to see you around, you'd be a great addition to our team! Do you have any more questions about the lab?",
        answers: [
            {
                text: "So.. The HCI Lab is open for every student?",
                nextNode: 9
            },
            {
                text: "I've seen some cool equipment around here. Is it available for students?",
                nextNode: 10
            },
            {
                text: "Can I use the laboratory at any time if I join the lab?",
                nextNode: 11
            },
            {
                text: "I don't have any other questions. See ya around! (end the game)",
                nextNode: 12
            }
        ]
    },

    {
        id: 9,
        text: "Yes, for everyone from the first semester of their bachelor's degree. Just enroll in the HCI Lab course and you can choose your supervisor and a project to work on!",
        answers: [
            {
                text: "Back.",
                nextNode: 8
            }
        ]
    },
    {
        id: 10,
        text: "Sure! We have a 3D printer, modern VR glasses, stereoscopic projection screen, and that thing above you? That's for motion capture.. You can try anything, just ask your supervisor for instructions if you don't know how to use something. And if anythink breaks, report it to staff or a PhD student.",
        answers: [
            {
                text: "Back.",
                nextNode: 8
            }
        ]
    },
    {
        id: 11,
        text: "Pretty much. The building is open from 6am to 10pm during working days, but if you report at the porter's lodge, you can stay here even outside of these hours.",
        answers: [
            {
                text: "Back.",
                nextNode: 8
            }
        ]
    },
    {
        id: 12,
        text: "See ya!",
        answers: []
    }
]