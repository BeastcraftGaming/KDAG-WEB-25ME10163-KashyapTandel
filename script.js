const questions = [

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
    }
]

const motivations = [

    { 
        head: "Keep Going!",
        text: "You’re doing amazing — stay focused 🔥"
    },
    { 
        head: "Great Job!", 
        text: "That was awesome, keep up the momentum 🚀" 
    },
    { 
        head: "Stay Strong!", 
        text: "Even tough questions make you smarter 💡" 
    },
    { 
        head: "Believe!", 
        text: "You’ve got the skills to ace this ✨" 
    },
    { 
        head: "Don’t Stop!", 
        text: "Every click takes you closer to mastery 🎯" 
    },
    { 
        head: "Well Done!", 
        text: "Your hard work is paying off 🌟" 
    },
    { 
        head: "Stay Sharp!", 
        text: "Focus now, celebrate later 🏆" 
    },
    { 
        head: "Never Give Up!", 
        text: "Persistence always beats difficulty 💪" 
    },
    { 
        head: "Fantastic!", 
        text: "You’re smashing through this quiz 🔥" 
    },
    { 
        head: "Almost There!", 
        text: "The finish line is closer than you think 🏁" 
    }

]
const optionDiv = document.getElementById("options");

let buttons = optionDiv.querySelectorAll("button");


const questionElement = document.getElementById("Question");
const nextButton = document.getElementById("nextButton").querySelector("button");

const motivHead = document.getElementById("motiv-head");
const motivText = document.getElementById("motiv-text");

const typeWriterSpeed = 50;

let selectedButtonElement;

let currentQuestionNumber = 0;
let score = 0;

function startup(){


    score = 0;
    currentQuestionNumber = 0;

    optionDiv.style.display = "grid";
    
    nextButton.removeEventListener("click", startup);
    
    motivationWrite("GEAR UP!!", "QUIZ HAS JUST STARTED!");
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

        optionDiv.style.display = "none";


        nextButton.addEventListener("click", startup);
        return;
    }
    
    let question = questions[currentQuestionNumber];


    let questionNumber = currentQuestionNumber + 1 ; // since index is from 0

    //console.log(questionElement.innerHTML);
    let text = questionNumber + "> " + question.text;

    typeWriter(questionElement, text, typeWriterSpeed)
    //console.log(questionNumber + "> " + question.text);

    var optionCount = 0;

    buttons.forEach((button) =>{

        let option = question.options[optionCount]
        //button.innerHTML = option.text;

        typeWriter(button, option.text, typeWriterSpeed);
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

    // show motivation text

    if (currentQuestionNumber === 1) {return}
    const rand = Math.floor(Math.random()*motivations.length);

    console.log(motivations.length); 
    motivationWrite(motivations[rand].head, motivations[rand].text);
}

function selectOption(e){
    let selectedButton = e.target;

    if (selectedButton.classList.contains("selected")){

        selectedButton.classList.remove("selected");
        return;
    }
    console.log(selectedButton.isEqualNode(selectedButtonElement));
    if (selectedButtonElement && !selectedButton.isEqualNode(selectedButtonElement)){

        selectedButtonElement.classList.remove("selected")
        selectedButtonElement = null
    }
    selectedButton.classList.add("selected");
    
    selectedButtonElement = selectedButton;
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

function typeWriter(element, text, speed = 100) {
  let i = 0;
  //const element = document.getElementById(elementId);
  element.innerHTML = ""; // Clear existing text

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

function motivationWrite(head, text){

    typeWriter(motivHead, head);
    typeWriter(motivText, text);

}
startup();