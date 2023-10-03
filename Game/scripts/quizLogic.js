const textDiv = document.querySelector(".researchAreaText");
const researchAreaContainer = document.querySelector("#researchAreaContainer");
const quizContainer = document.querySelector(".quizContainer");

const questionDiv = document.querySelector("#questionDiv");
const quizButtons = document.querySelector("#quizButtonsDiv");
const quizInput = document.querySelector("#quizInputDiv");

const infoDiv = document.querySelector("#infoDiv");

const cancelQuizBtn = document.querySelector("#cancelQuizBtn");
cancelQuizBtn.addEventListener("click", cancelQuiz);

let currentQuestionIndex;
let currentArea;

AFRAME.registerComponent('quiz-marker', {
    init: function() {
        this.el.addEventListener("markerFound", decideWhichMarkerFound);
        this.el.addEventListener("markerLost", hideResearchAreaDiv);
    }
});

function decideWhichMarkerFound() {
    cancelQuiz();
    const hciMarker = document.querySelector("#hciMarker");
    const xrMarker = document.querySelector("#xrMarker");
    const visMarker = document.querySelector("#visMarker");
    if (hciMarker.object3D.visible) {
        showHCI()
        currentArea = hciQuestions;
    }
    else if (visMarker.object3D.visible){
        showVis();
        currentArea = visQuestions;
    }
    else {
        showXR()
        currentArea = xrQuestions;
    }
}

function showHCI() {
    textDiv.innerHTML = "HCI is a field of study that aims to make to the interaction between humans and machines as seamless as possible by combining the knowledge from multiple disciplines (computer science, psychology, cognitive science,..). The term emerged at the end of 20th century, when personal computers became accessible to regular users.";
    if (userState.gameStarted && !userState.hciQuizCompleted) {
        let btn = document.querySelector(".researchAreaBtn");
        if (btn) {
            btn.parentNode.removeChild(btn);
        }
        btn = document.createElement('button');
        btn.innerHTML = "Start quiz";
        btn.classList.add("researchAreaBtn");
        btn.addEventListener("click", startQuiz);
        researchAreaContainer.appendChild(btn);  
    }
      
    researchAreaContainer.style.display = "block";
}

function showXR() {
    textDiv.innerHTML = "Extended reality (XR) is a term referring to technologies that merge virtual and physical worlds together. This includes virtual reality (VR), augmented reality (AR) and mixed reality (MR). It is one of the main research areas of our laboratory and in the past, we were working on projects like AR Goggles (AR flight support for pilots), IMareCulture (exploration of underwater cultural heritage in AR), or restoring skeleton fragments in VR.";
    let btn = document.querySelector(".researchAreaBtn");
    if (userState.gameStarted && !userState.xrQuizCompleted) {
        if (btn) {
            btn.parentNode.removeChild(btn);
        }
        btn = document.createElement('button');
        btn.innerHTML = "Start quiz";
        btn.classList.add("researchAreaBtn");
        btn.addEventListener("click", startQuiz);
        researchAreaContainer.appendChild(btn);  
    }
      
    researchAreaContainer.style.display = "block";
}

function showVis() {
    textDiv.innerHTML = "In collaboration with Visitlab, our activities involve data visualization for many different areas (geo-data, medical data, or data from games). To our projects belong for example CAVER (visualization of tunnels and channels in protein structures) or Vis4School (methods for improving visualization literacy in schools).";
    let btn = document.querySelector(".researchAreaBtn");
    if (userState.gameStarted && !userState.visQuizCompleted) {
        if (btn) {
            btn.parentNode.removeChild(btn);
        }
        btn = document.createElement('button');
        btn.innerHTML = "Start quiz";
        btn.classList.add("researchAreaBtn");
        btn.addEventListener("click", startQuiz);
        researchAreaContainer.appendChild(btn);  
    }
      
    researchAreaContainer.style.display = "block";
}

function startQuiz() {
    currentQuestionIndex = 0;
    setNextQuestion();
    quizContainer.style.display = "block";
}

function setNextQuestion() {
    resetQuizState();
    showQuestion(currentArea[currentQuestionIndex])
}

function showQuestion(question) {
    questionDiv.innerHTML = question.question;
    if (currentArea == hciQuestions) {
        quizInput.style.display = "block";
        document.querySelector("#quizInptBtn").addEventListener("click", checkInput);       
    }
    else {
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
   
}

function checkInput() {
    if (document.querySelector("#quizInpt").value == "2002") {
        document.querySelector(".researchAreaBtn").style.display = "none";
        setTimeout(cancelQuiz, 1500); 
        userState.hciQuizCompleted = true;
        userState.addKey();
        showInfoDiv("A key has been added to you inventory.", "correct");  
    }
    else {
        showInfoDiv("Incorrect, try again.", "wrong");
    }
}

function resetQuizState() {
    quizInput.style.display = "none";
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

    if (currentArea.length > currentQuestionIndex + 1){
        currentQuestionIndex++;
        setTimeout(setNextQuestion, 1500);
    }
    else if (selectedBtn.classList.contains("correct")){
        userState.addKey();
        if (currentArea == hciQuestions) {
            userState.hciQuizCompleted = true;
        }
        else if (currentArea == visQuestions) {
            userState.visQuizCompleted = true;
        }
        else {
            userState.xrQuizCompleted = true;
        }
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

function hideResearchAreaDiv() {
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

const xrQuestions = [
    {
        question: "Which technology transfers its user to a fully virtual environment?",
        options: [
            {
                text: "AR",
                correct: false
            },
            {
                text: "MR",
                correct: false
            },
            {
                text: "VR",
                correct: true
            }        
        ]
    },
    {
        question: "Which technology enhances user’s physical surrounding with virtual elements and makes it possible for virtual and physical elements to interact?",
        options: [
            {
                text: "AR",
                correct: false
            },
            {
                text: "MR",
                correct: true
            },
            {
                text: "VR",
                correct: false
            }        
        ]
    },
    {
        question: "Which technology enhances user’s surrounding with virtual elements without making it possible for virtual and physical elements to interact?",
        options: [
            {
                text: "AR",
                correct: true
            },
            {
                text: "MR",
                correct: false
            },
            {
                text: "VR",
                correct: false
            }        
        ]
    },
]

const visQuestions = [
    {
        question: "What data is visualized in the CAVER project?",
        options: [
            {
                text: "Tunnels and channels in protein structures",
                correct: true
            },
            {
                text: "Underground tunnels and shafts in Czech cities.",
                correct: false
            },
            {
                text: "Bloodflow patterns in human heart",
                correct: false
            }        
        ]
    },
    {
        question: "What is the name of the laboratory we collaborate with?",
        options: [
            {
                text: "Visitlab",
                correct: true
            },
            {
                text: "Exitlab",
                correct: false
            },
            {
                text: "Vislab",
                correct: false
            }        
        ]
    }
]