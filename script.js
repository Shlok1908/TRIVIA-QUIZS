```javascript
// ================================
// SCREEN REFERENCES
// ================================

const homeScreen = document.getElementById("homeScreen");
const mapScreen = document.getElementById("mapScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const timer = document.getElementById("timer");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const countryTitle = document.getElementById("countryTitle");
const progressBar = document.getElementById("progressBar");
const finalScore = document.getElementById("finalScore");

// ================================
// COUNTRY BUTTONS
// ================================

const indiaBtn = document.getElementById("indiaBtn");
const russiaBtn = document.getElementById("russiaBtn");
const chinaBtn = document.getElementById("chinaBtn");
const brazilBtn = document.getElementById("brazilBtn");
const southAfricaBtn = document.getElementById("southAfricaBtn");

// ================================
// VARIABLES
// ================================

let score = 0;

let currentCountry = "";

let currentQuestion = 0;

let timerValue = 10;

let timerInterval;

// ================================
// START BUTTON
// ================================

startBtn.addEventListener("click", function(){

    homeScreen.classList.remove("active");

    mapScreen.classList.add("active");

});

// ================================
// COUNTRY CLICK EVENTS
// ================================

indiaBtn.addEventListener("click", function(){

    startCountry("India");

});

russiaBtn.addEventListener("click", function(){

    startCountry("Russia");

});

chinaBtn.addEventListener("click", function(){

    startCountry("China");

});

brazilBtn.addEventListener("click", function(){

    startCountry("Brazil");

});

southAfricaBtn.addEventListener("click", function(){

    startCountry("South Africa");

});
```
```javascript
// ================================
// START A COUNTRY QUIZ
// ================================

function startCountry(country){

    currentCountry = country;

    currentQuestion = 0;

    mapScreen.classList.remove("active");

    quizScreen.classList.add("active");

    countryTitle.innerHTML = country;

    loadQuestion();

}

// ================================
// LOAD QUESTION
// ================================

function loadQuestion(){

    clearInterval(timerInterval);

    timerValue = 10;

    timer.innerHTML = timerValue;

    startTimer();

    optionsContainer.innerHTML = "";

    const data = questions[currentCountry][currentQuestion];

    questionNumber.innerHTML =
    "Question " +
    (currentQuestion + 1) +
    " of " +
    questions[currentCountry].length;

    questionText.innerHTML = data.question;

    progressBar.style.width =
    ((currentQuestion + 1) /
    questions[currentCountry].length) * 100 + "%";

    data.options.forEach(function(option,index){

        const btn = document.createElement("button");

        btn.classList.add("option");

        btn.innerHTML = option;

        btn.onclick = function(){

            checkAnswer(index);

        };

        optionsContainer.appendChild(btn);

    });

}
```

```javascript
// ================================
// TIMER
// ================================

function startTimer(){

    timerInterval = setInterval(function(){

        timerValue--;

        timer.innerHTML = timerValue;

        if(timerValue <= 5){

            timer.style.background = "orange";

        }

        if(timerValue <= 3){

            timer.style.background = "red";

        }

        if(timerValue <= 0){

            clearInterval(timerInterval);

            nextQuestion();

        }

    },1000);

}

// ================================
// CHECK ANSWER
// ================================

function checkAnswer(selectedIndex){

    clearInterval(timerInterval);

    const data = questions[currentCountry][currentQuestion];

    const buttons =
    document.querySelectorAll(".option");

    buttons.forEach(function(button){

        button.disabled = true;

    });

    if(selectedIndex === data.answer){

        score++;

        buttons[selectedIndex]
        .classList.add("correct");

    }else{

        buttons[selectedIndex]
        .classList.add("wrong");

        buttons[data.answer]
        .classList.add("correct");

    }

    setTimeout(function(){

        nextQuestion();

    },1000);

}
```
```javascript
// ================================
// SHOW RESULT
// ================================

function showResult(){

    mapScreen.classList.remove("active");

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    let totalQuestions = 0;

    for(let country in questions){

        totalQuestions += questions[country].length;

    }

    finalScore.innerHTML = score + " / " + totalQuestions;

}

// ================================
// PLAY AGAIN
// ================================

playAgainBtn.addEventListener("click", function(){

    score = 0;

    currentCountry = "";

    currentQuestion = 0;

    completedCountries = [];

    clearInterval(timerInterval);

    timer.style.background = "red";

    // Reset country buttons

    [
        indiaBtn,
        russiaBtn,
        chinaBtn,
        brazilBtn,
        southAfricaBtn

    ].forEach(function(button){

        button.disabled = false;

        button.style.background = "#1976d2";

    });

    indiaBtn.innerHTML = "India";
    russiaBtn.innerHTML = "Russia";
    chinaBtn.innerHTML = "China";
    brazilBtn.innerHTML = "Brazil";
    southAfricaBtn.innerHTML = "South Africa";

    resultScreen.classList.remove("active");

    homeScreen.classList.add("active");

});

// ================================
// OPTIONAL NEXT BUTTON
// ================================

nextBtn.addEventListener("click", function(){

    clearInterval(timerInterval);

    nextQuestion();

});

// ================================
// INITIAL SCREEN SETUP
// ================================

homeScreen.classList.add("active");

mapScreen.classList.remove("active");

quizScreen.classList.remove("active");

resultScreen.classList.remove("active");
