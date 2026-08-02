const questions = [
    {question: "What is Java?", answers: ["A programming language", "A database", "An operating system"], correctAnswer: 0},
    {question: "Which keyword creates a class in Java?", answers: ["function", "class", "create"], correctAnswer: 1},
    {question: "Which method starts a Java program?", answers: ["main", "start", "run"], correctAnswer: 0},
    {question: "Which symbol ends most Java statements?", answers: [":", ";", "."], correctAnswer: 1},
    {question: "Which type stores whole numbers?", answers: ["String", "int", "boolean"], correctAnswer: 1},
    {question: "Which type stores true or false?", answers: ["boolean", "double", "char"], correctAnswer: 0},
    {question: "Which keyword creates a new object?", answers: ["make", "new", "object"], correctAnswer: 1},
    {question: "Which collection can store many values?", answers: ["ArrayList", "Scanner", "System"], correctAnswer: 0},
    {question: "Which keyword is used for inheritance?", answers: ["extends", "imports", "inherits"], correctAnswer: 0},
    {question: "Which loop checks the condition before running?", answers: ["while", "switch", "try"], correctAnswer: 0},
    {question: "Which access modifier allows access everywhere?", answers: ["private", "protected", "public"], correctAnswer: 2},
    {question: "Which method prints text to the console?", answers: ["System.out.println", "console.write", "print.text"], correctAnswer: 0}
];

let questionNumber = 0;
let score = 0;
let answerSelected = false;
let currentPlayerName = "";

function startQuiz() {
    currentPlayerName = document.getElementById("playerName").value.trim();

    if (currentPlayerName === "") {
        document.getElementById("message").textContent = "Please enter your name";
        return;
    }

    questionNumber = 0;
    score = 0;
    document.getElementById("playerName").disabled = true;
    document.getElementById("startButton").classList.add("hidden");
    document.getElementById("saveButton").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    answerSelected = false;
    const currentQuestion = questions[questionNumber];

    document.getElementById("questionNumber").textContent = "Question " + (questionNumber + 1) + " of " + questions.length;
    document.getElementById("questionText").textContent = currentQuestion.question;
    document.getElementById("message").textContent = "";

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const answerButton = document.createElement("button");
        answerButton.textContent = currentQuestion.answers[i];
        answerButton.className = "answerButton";
        answerButton.onclick = function () { checkAnswer(i); };
        answersDiv.appendChild(answerButton);
    }
}

function checkAnswer(selectedAnswer) {
    if (answerSelected === true) return;
    answerSelected = true;

    const answerButtons = document.getElementsByClassName("answerButton");
    for (let i = 0; i < answerButtons.length; i++) answerButtons[i].disabled = true;

    if (selectedAnswer === questions[questionNumber].correctAnswer) {
        score++;
        document.getElementById("message").textContent = "Correct!";
    } else {
        document.getElementById("message").textContent = "Incorrect!";
    }

    document.getElementById("nextButton").classList.remove("hidden");
}

function nextQuestion() {
    questionNumber++;
    document.getElementById("nextButton").classList.add("hidden");

    if (questionNumber < questions.length) showQuestion();
    else finishQuiz();
}

function finishQuiz() {
    document.getElementById("answers").innerHTML = "";
    document.getElementById("questionNumber").textContent = "";
    document.getElementById("questionText").textContent = "Quiz finished";
    document.getElementById("message").textContent = "Your score is " + score + " out of " + questions.length;
    document.getElementById("saveButton").classList.remove("hidden");
}

function saveResult() {
    const saveButton = document.getElementById("saveButton");
    saveButton.disabled = true;

    const gameResult = {playerName: currentPlayerName, score: score};

    fetch("/api/results", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(gameResult)
    })
    .then(function (response) {
        if (!response.ok) return response.text().then(function (errorMessage) { throw new Error(errorMessage); });
        return response.json();
    })
    .then(function () {
        document.getElementById("message").textContent = "Result saved";
        saveButton.classList.add("hidden");
        saveButton.disabled = false;
        document.getElementById("startButton").classList.remove("hidden");
        document.getElementById("playerName").disabled = false;
        loadLeaderboard();
    })
    .catch(function (error) {
        document.getElementById("message").textContent = error.message || "Could not save result";
        saveButton.disabled = false;
    });
}

function loadLeaderboard() {
    fetch("/api/results")
    .then(function (response) {
        if (!response.ok) throw new Error("Could not load leaderboard");
        return response.json();
    })
    .then(function (gameResults) {
        const leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "";

        if (gameResults.length === 0) {
            leaderboard.textContent = "No results yet";
            return;
        }

        for (let i = 0; i < gameResults.length; i++) {
            const resultRow = document.createElement("div");
            resultRow.className = "resultRow";
            resultRow.textContent = (i + 1) + ". " + gameResults[i].playerName + " - " + gameResults[i].score;
            leaderboard.appendChild(resultRow);
        }
    })
    .catch(function () {
        document.getElementById("leaderboard").textContent = "Could not load leaderboard";
    });
}

loadLeaderboard();
