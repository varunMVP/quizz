let score = 0;
let streak = 0;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
const questions = [
    {
        question: "What is the preamble of the Indian Constitution?",
        options: [
            "A brief introduction",
            "A set of guidelines",
            "A declaration of goals"
        ],
        correctAnswerIndex: 2
    },
    {
        question: "Which part of the Constitution deals with Fundamental Rights?",
        options: [
            "Part I",
            "Part II",
            "Part III"
        ],
        correctAnswerIndex: 2
    },
    {
        question: "The Directive Principles of State Policy are enshrined in which part of the Constitution?",
        options: [
            "Part IV",
            "Part V",
            "Part VI"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Who is known as the Father of the Indian Constitution?",
        options: [
            "Mahatma Gandhi",
            "Dr. B.R. Ambedkar",
            "Jawaharlal Nehru"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "The Fundamental Duties are incorporated in which part of the Constitution?",
        options: [
            "Part III",
            "Part IVA",
            "Part VI"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "How many Fundamental Rights are guaranteed by the Indian Constitution?",
        options: [
            "Six",
            "Seven",
            "Eight"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Which article of the Constitution abolishes untouchability?",
        options: [
            "Article 15",
            "Article 17",
            "Article 19"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Which part of the Constitution deals with the Union and its Territory?",
        options: [
            "Part I",
            "Part II",
            "Part III"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Which Schedule of the Indian Constitution contains the list of States and Union Territories?",
        options: [
            "First Schedule",
            "Second Schedule",
            "Third Schedule"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "The Constitution of India was adopted on which date?",
        options: [
            "15th August 1947",
            "26th January 1950",
            "26th November 1949"
        ],
        correctAnswerIndex: 2
    },
    {
        question: "Which amendment is known as the Mini Constitution?",
        options: [
            "42nd Amendment",
            "44th Amendment",
            "86th Amendment"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Which article of the Constitution deals with the Right to Education?",
        options: [
            "Article 19",
            "Article 21A",
            "Article 32"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Who was the first President of India?",
        options: [
            "Dr. Rajendra Prasad",
            "S. Radhakrishnan",
            "Zakir Husain"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Which part of the Constitution of India deals with the Panchayats?",
        options: [
            "Part IX",
            "Part X",
            "Part XI"
        ],
        correctAnswerIndex: 0
    }
];

window.onload = function() {
    loadQuestion();
};

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        displayResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-box').innerText = currentQuestion.question;

    document.querySelectorAll('.option-card').forEach((optionCard, index) => {
        optionCard.querySelector('.card-front').innerText = currentQuestion.options[index];
        optionCard.dataset.index = index; // Set the data-index attribute
        optionCard.classList.remove('flipped'); // Ensure cards are in the back state
        optionCard.querySelector('.card-front').style.backgroundColor = '#ffebf5'; // Reset color
        optionCard.onclick = function() { checkAnswer(this); }; // Add click event listener
    });

    // Delay the card reveal
    setTimeout(() => {
        revealCards();
    }, 3000);
}

function revealCards() {
    document.querySelectorAll('.option-card').forEach((optionCard, index) => {
        setTimeout(() => {
            optionCard.classList.add('flipped');
        }, 500 * index); // Staggered flip timing
    });
}

function checkAnswer(element) {
    const selectedIndex = parseInt(element.dataset.index);
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswerIndex;

    document.querySelectorAll('.option-card').forEach(option => {
        option.onclick = null;
    });

    if (selectedIndex === correctAnswerIndex) {
        score += 10;
        streak += 1;
        correctAnswersCount++;
        element.querySelector('.card-front').style.backgroundColor = 'green';
        moveCar(); // Move the car for every correct answer
    } else {
        streak = 0;
        element.querySelector('.card-front').style.backgroundColor = 'red';
    }

    document.getElementById('score').innerText = score;
    document.getElementById('streak').innerText = streak;

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function moveCar() {
    const car = document.getElementById('car');
    const containerWidth = document.querySelector('.car-container').offsetWidth;
    const carWidth = car.offsetWidth;
    const maxDistance = containerWidth - carWidth; // Maximum distance for the car to move

    // Move 100px for each correct answer
    const moveAmount = Math.min(correctAnswersCount * 100, maxDistance); // Move 100px for each correct answer

    car.style.transform = `translateX(${moveAmount}px)`;
}

function displayResults() {
    document.getElementById('question-box').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.streak-meter').style.display = 'none';

    const resultContainer = document.createElement('div');
    resultContainer.style.textAlign = 'center';
    resultContainer.style.marginTop = '50px';

    const finalScore = document.createElement('h2');
    finalScore.innerText = `Final Score: ${score}`;
    finalScore.style.color = 'white'; // Set color to white
    resultContainer.appendChild(finalScore);

    const answersList = document.createElement('ul');
    answersList.style.listStyleType = 'none';
    answersList.style.padding = '0';

    questions.forEach((q, index) => {
        const listItem = document.createElement('li');
        listItem.style.margin = '10px 0';
        listItem.style.color = 'white'; // Set color to white
        listItem.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question} <br/><em>Correct Answer: ${q.options[q.correctAnswerIndex]}</em>`;
        answersList.appendChild(listItem);
    });

    resultContainer.appendChild(answersList);

    const tryAgainButton = document.createElement('button');
    tryAgainButton.innerText = 'Try Again';
    tryAgainButton.style.marginTop = '20px';
    tryAgainButton.onclick = function() {
        location.reload(); // Reload the page to restart the quiz
    };
    resultContainer.appendChild(tryAgainButton);

    document.body.appendChild(resultContainer);
}
