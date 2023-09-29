const textDiv = document.querySelector(".researchAreaText");
const researchAreaContainer = document.querySelector("#researchAreaContainer");
const quizContainer = document.querySelector(".quizContainer");

const questionDiv = document.querySelector("#questionDiv");
const quizButtons = document.querySelector("#quizButtonsDiv");

const infoDiv = document.querySelector("#infoDiv");

const cancelQuizBtn = document.querySelector("#cancelQuizBtn");
cancelQuizBtn.addEventListener("click", cancelQuiz);

let currentQuestionIndex;

AFRAME.registerComponent('xr-marker', {
    init: function() {
        this.el.addEventListener("markerFound", showXR);
        this.el.addEventListener("markerLost", hideXR);
    }
});

function showXR() {
    textDiv.innerHTML = "-	Extended reality (XR) is a term referring to technologies that merge virtual and physical worlds together. This includes virtual reality (VR), augmented reality (AR) and mixed reality (MR). It is one of the main research areas of our laboratory and in the past, we were working on projects like AR Goggles or IMareCulture.";
    let btn = document.querySelector(".researchAreaBtn");
    if (userState.gameStarted && !userState.xrQuizCompleted) {
        btn.parentNode.removeChild(btn);
        btn = document.createElement('button');
        btn.innerHTML = "Start quiz";
        btn.classList.add("researchAreaBtn");
        btn.addEventListener("click", startXrQuiz);
        researchAreaContainer.appendChild(btn);  
    }
      
    researchAreaContainer.style.display = "block";
}

function startXrQuiz() {
    currentQuestionIndex = 0;
    setNextQuestionXr();
    quizContainer.style.display = "block";
}

function setNextQuestionXr() {
    resetQuizState();
    showQuestion(xrQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionDiv.innerHTML = question.question;
    question.options.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("quizBtn");
        if (answer.correct) {
           btn.dataset.correct = answer.correct; 
        }
        btn.addEventListener("click", selectQuizAnswer);
        quizButtons.appendChild(btn);
    });
}

function resetQuizState() {
    while (quizButtons.firstChild) {
        quizButtons.removeChild(quizButtons.firstChild);
    }
}

function selectQuizAnswer(e) {
    const selectedBtn = e.target;
    if (selectedBtn.dataset.correct) {
        selectedBtn.classList.add("correct");
    }
    else {
        selectedBtn.classList.add("wrong");
        setTimeout(cancelQuiz, 1500); 
        showInfoDiv("Incorrect, try again.", "wrong");
    }

    if (hciQuestions.length > currentQuestionIndex + 1){
        currentQuestionIndex++;
        setTimeout(setNextQuestionXr, 1500);
    }
    else if (selectedBtn.classList.contains("correct")){
        userState.addKey();
        userState.xrQuizCompleted = true;
        document.querySelector(".researchAreaBtn").style.display = "none";
        setTimeout(cancelQuiz, 1500); 
        showInfoDiv("A key has been added to you inventory.", "correct");     
    }
}

function hideXR() {
    researchAreaContainer.style.display = "none";
}

const xrQuestions = [
    {
        question: "When was the HCI Laboratory established?",
        options: [
            {
                text: "1998",
                correct: false
            },
            {
                text: "2002",
                correct: true
            },
            {
                text: "2004",
                correct: false
            },
            {
                text: "2020",
                correct: false
            }         
        ]
    },
]

