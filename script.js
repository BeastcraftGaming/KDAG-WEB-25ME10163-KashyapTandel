const questions = [

    {
        text : "who is gay",
        options : [
            {text: "kunal", correct: true},
            {text: "dvij", correct: true},
            {text: "ananya", correct: true},
            {text: "samguy", correct: true}

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
            { text: "Python", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false }
        ],
        points: 4
    },
    {
        text: "Select all web browsers.",
        options: [
            { text: "Google Chrome", correct: true },
            { text: "Mozilla Firefox", correct: true },
            { text: "Microsoft Word", correct: false },
            { text: "Safari", correct: true }
        ],
        points: 4
    }

]

const optionDiv = document.getElementById("options");
const questionElement = document.getElementById("Question");
const nextButton = document.getElementById("nextButton").querySelector("button");

let currentQuestionNumber = 0;
let score = 0;

function startup(){

    score = 0;
    currentQuestionNumber = 0;
    questionElement.innerHTML = "loading...";
    

    showQuestion();
}

function showQuestion(){

    let question = questions[currentQuestionNumber];

    let questionNumber = currentQuestionNumber + 1 ; // since index is from 0

    let buttons = optionDiv.querySelectorAll("button");

    console.log(buttons);
    questionElement.innerHTMl = questionNumber + "> " + question.text;

    let optionCount = 0;
    buttons.forEach((button) =>{

        let option = question.options[optionCount]
        button.innerHTML = option.text;

        button.dataset.number = optionCount + 1;

        if (option.correct) {
            button.dataset.correct = option.correct;
        }

        button.addEventListener("click", selectOption );

        optionCount = optionCount + 1;
    })

    nextButton.innerHTML = "Submit";
}

function selectOption(e){
    let selectedButton = e.target;

    // do visual changes

    //console.log("selected option" + (selectedButton.dataset.number));

}
startup();