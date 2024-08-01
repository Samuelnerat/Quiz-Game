const questions = [
    {
        id: "Question 1",
        text: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        id: "Question 2",
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        id: "Question 3",
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: "Pacific Ocean"
    },
    {
        id: "Question 4",
        text: "Which is the most widely spoken language in the world?",
        options: ["Spanish", "Mandarin", "English", "German"],
        correct: "Mandarin"
    },
    {
        id: "Question 5",
        text: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: "2"
    },
    {
        id: "Question 6",
        text: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        correct: "Au"
    },
    {
        id: "Question 7",
        text: "Which state in Nigeria is known as the 'Home of Peace and Tourism'?",
        options: ["Borno", "Katsina", "Plateau", "Nasarawa"],
        correct: "Plateau"
    },
    {
        id: "Question 8",
        text: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        correct: "Diamond"
    },
    {
        id: "Question 9",
        text: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correct: "Leonardo da Vinci"
    },
    {
        id: "Question 10",
        text: "What do you call a computer on a network that requests files from another computer?",
        options:  ["A client", "A host", "A router", "A web server"],
        correct: "A client"
    }
];

// let currentQuestionIndex = 0;
// let score = 0;
let score, currentQuestionIndex;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const messageElement = document.getElementById('message');
const submitButton = document.querySelector('#submit')
const startButton = document.querySelector('#start-over')
const retryButton = document.querySelector('#retry')
const questionNumber = document.getElementById('question-number');
const finalScore = document.getElementById('final-score');
const modalElement = document.querySelector('.modal')
const Image = document.querySelector('.image');
const Congrats = document.querySelector('.congrats');
const Yikes = document.querySelector('.yikes');
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector('.close-modal')


document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', refreshGame);
    retryButton.addEventListener('click', () => {
        refreshGame();
        modalElement.classList.add('hidden');
        overlay.classList.add("hidden");
    });
    closeButton.addEventListener('click', () => {
        modalElement.classList.add('hidden');
        overlay.classList.add("hidden");
    });
    overlay.addEventListener("click", () => {
        modalElement.classList.add('hidden');
        overlay.classList.add("hidden");
    });
    refreshGame();
});

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionNumber.textContent = currentQuestion.id;
        questionElement.textContent = currentQuestion.text;
        optionsElement.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            optionsElement.appendChild(button);
        });
        messageElement.textContent = '';
    } else {
        startOver();
        startButton.classList.remove('hidden');
        // startButton.addEventListener('click', function () {refreshGame()})
        // submitButton.classList.add('hidden');
        showModal();
    }
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
        score++;
        messageElement.textContent = 'Correct!';
    } else {
        messageElement.textContent = `Wrong! The correct answer is ${currentQuestion.correct}.`;
    }
    currentQuestionIndex++;
    setTimeout(showQuestion, 2000);
}

function startOver() {
    questionNumber.textContent = '';
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    messageElement.textContent = '';
}

function showModal() {

    // closeButton.addEventListener('click', function () {
    //     modalElement.classList.add('hidden');
    // })
    modalElement.classList.remove('hidden');
    overlay.classList.remove("hidden");
    if (score <= 3) {
        // modalElement.classList.remove('hidden');
        Image.src = './images/sad.jpeg';
        Congrats.textContent= '';
        // finalScore.textContent = `You scored ${score} out of ${questions.length}.`;
    } else {
        Yikes.textContent = '';
        // modalElement.classList.remove('hidden');
        // finalScore.textContent = `You scored ${score} out of ${questions.length}.`;
    }
    finalScore.textContent = `You scored ${score} out of ${questions.length}.`;
    // retryButton.addEventListener('click', function () {refreshGame()
    //     modalElement.classList.add('hidden');
    // })
}

function refreshGame() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    startButton.classList.add('hidden');
}
