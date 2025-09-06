const questions = [

    {
        text : "who is gay",
        options : [
            {text: "kunal", correct: true},
            {text: "dvij", correct: false},
            {text: "ananya", correct: false},
            {text: "samguy", correct: false}

        ],
        points : 4
    },

    {
        text: "Who is the CEO of OpenAI?",
        options: [
            { text: "Sam Altman", correct: true },
            { text: "Elon Musk", correct: false },
            { text: "Sundar Pichai", correct: false },
            { text: "Mark Zuckerberg", correct: false }
        ],
        points: 4
    },
    {
        text: "What language is primarily used for web development?",
        options: [
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false },
            { text: "Java", correct: false }
        ],
        points: 4
    },
    {
        text: "Which of the following are programming languages?",
        options: [
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false }
        ],
        points: 4
    },
    {
        text: "Select all web browsers.",
        options: [
            { text: "Google Chrome", correct: true },
            { text: "Mozilla Firefox", correct: false },
            { text: "Microsoft Word", correct: false },
            { text: "Safari", correct: false }
        ],
        points: 4
    }

]

const optionDiv = document.getElementById("options");

let buttons = optionDiv.querySelectorAll("button");


const questionElement = document.getElementById("Question");
const nextButton = document.getElementById("nextButton").querySelector("button");

let currentQuestionNumber = 0;
let score = 0;

function startup(){


    score = 0;
    currentQuestionNumber = 0;

    optionDiv.hidden = false;
    
    nextButton.removeEventListener("click", startup);
    
    showQuestion();
}


function resetState(){

    buttons.forEach((button) =>{

        button.disabled = false;


        button.classList.remove("selected");
        button.classList.remove("correct");
        button.classList.remove("incorrect");

    })

    console.log(score);
    showQuestion();

}

function showQuestion(){

    nextButton.removeEventListener("click", resetState);

    if (currentQuestionNumber >= questions.length) {
        questionElement.innerHTML = "Quiz completed! Your score: " + score;
        nextButton.innerHTML = "Restart";
        optionDiv.hidden = true;


        nextButton.addEventListener("click", startup);
        return;
    }
    
    let question = questions[currentQuestionNumber];


    let questionNumber = currentQuestionNumber + 1 ; // since index is from 0

    //console.log(questionElement.innerHTML);
    questionElement.innerHTML = (questionNumber + "> " + question.text);
    //console.log(questionNumber + "> " + question.text);

    var optionCount = 0;

    buttons.forEach((button) =>{

        let option = question.options[optionCount]
        button.innerHTML = option.text;

        button.dataset.number = optionCount + 1;

        if (option.correct === true) {
            button.dataset.correct = option.correct;
           
        }

        button.dataset.points = question.points;
        //console.log(option.points);

        button.addEventListener("click", selectOption );

        
        optionCount = optionCount + 1;
    })
    nextButton.addEventListener("click", submit);

    currentQuestionNumber = currentQuestionNumber + 1;

    nextButton.innerHTML = "Submit";
}

function selectOption(e){
    let selectedButton = e.target;

    if (selectedButton.classList.contains("selected")){

        selectedButton.classList.remove("selected");
        return;
    }
    selectedButton.classList.add("selected");
   
    //console.log("selected option" + (selectedButton.dataset.number));

}

function submit(){

    let anySelected = false;
    let anyIncorrect = false;

    var pointsAdded = 0;

    buttons.forEach((button) =>{
        
        if (button.classList.contains("selected")){

            if (anySelected === false){
                anySelected = true;
            }

            if (button.dataset.correct) {

                button.classList.add("correct");
                
                pointsAdded = parseInt(button.dataset.points);

                console.log("correct");
            } else {
                button.classList.add("incorrect");
                console.log("incorrect");

                if (!anyIncorrect) {
                    anyIncorrect = true;
                }
            }


        }
    })

    console.log(anySelected);
    if(!anySelected){

        alert("select an option");
        return;
    }

    if (!anyIncorrect) {
        score = score + pointsAdded;

    }

    buttons.forEach((button) =>{

        button.disabled = true;
        
        button.removeEventListener("click", selectOption);
    })
    

    nextButton.removeEventListener("click", submit);
    nextButton.innerHTML = "Next";

    nextButton.addEventListener("click", resetState);
}

startup();