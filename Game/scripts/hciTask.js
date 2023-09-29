const textDiv = document.querySelector(".researchAreaText");
const researchAreaContainer = document.querySelector("#researchAreaContainer");
const quizContainer = document.querySelector(".quizContainer");

const questionDiv = document.querySelector("#questionDiv");
const quizButtons = document.querySelector("#quizButtonsDiv");

const infoDiv = document.querySelector("#infoDiv");

const cancelQuizBtn = document.querySelector("#cancelQuizBtn");
cancelQuizBtn.addEventListener("click", cancelQuiz);

let currentQuestionIndex;

AFRAME.registerComponent('hci-marker', {
    init: function() {
        this.el.addEventListener("markerFound", showHCI);
        this.el.addEventListener("markerLost", hideHCI);
    }
});

function showHCI() {
    textDiv.innerHTML = "HCI is a field of study that aims to make to the interaction between humans and machines as seamless as possible by combining the knowledge from multiple disciplines (computer science, psychology, cognitive science,..). The term emerged at the end of 20th century, when personal computers became accessible to regular users.";
    let btn = document.querySelector(".researchAreaBtn");
    if (userState.gameStarted && !userState.hciQuizCompleted) {
        btn.parentNode.removeChild(btn);
        btn = document.createElement('button');
        btn.innerHTML = "Start quiz";
        btn.classList.add("researchAreaBtn");
        btn.addEventListener("click", startHciQuiz);
        researchAreaContainer.appendChild(btn);  
    }
      
    researchAreaContainer.style.display = "block";
}

function startHciQuiz() {
    currentQuestionIndex = 0;
    setNextQuestion();
    quizContainer.style.display = "block";
}

function setNextQuestion() {
    resetQuizState();
    showQuestion(hciQuestions[currentQuestionIndex])
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
        setTimeout(setNextQuestion, 1500);
    }
    else if (selectedBtn.classList.contains("correct")){
        userState.addKey();
        userState.hciQuizCompleted = true;
        document.querySelector(".researchAreaBtn").style.display = "none";
        setTimeout(cancelQuiz, 1500); 
        showInfoDiv("A key has been added to you inventory.", "correct");     
    }
}

function showInfoDiv(string, wantedClass = null) {
    if (wantedClass != null) {
        infoDiv.classList.add(wantedClass);
    }
    infoDiv.innerHTML = string;
    infoDiv.style.display = "block";
    setTimeout(() => {
        infoDiv.style.display = "none";
    }, 1500);   
    if (wantedClass != null) {
        setTimeout(() => {
            infoDiv.classList.remove(wantedClass);
        }, 1500); 
    }
}

function cancelQuiz() {
    currentQuestionIndex = 0;
    quizContainer.style.display = "none";
}

function hideHCI() {
    researchAreaContainer.style.display = "none";
}

const hciQuestions = [
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

