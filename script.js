const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    answer: "France",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
    answer: "Mount Everest",
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: [
      "Pacific Ocean",
      "Indian Ocean",
      "Atlantic Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    answer: "Au",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Uranus"],
    answer: "Mars",
  },
  {
    question: "What is the largest species of shark?",
    options: [
      "Great White Shark",
      "Whale Shark",
      "Tiger Shark",
      "Hammerhead Shark",
    ],
    answer: "Whale Shark",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Lion", "Tiger", "Elephant", "Giraffe"],
    answer: "Lion",
  },
];

const qnoElement = document.getElementById("qno");
const countElement = document.getElementById("count");
const quesElement = document.getElementById("ques");
const optionsElement = document.getElementById("opt");
const nextElement = document.getElementById("next");
const backElement = document.getElementById("back");

let actualCurr = 0;
let curr = 0;
let score = 0;
let selected = [];

function startQuiz() {
  selected = [];
  actualCurr = 0;
  curr = 0;
  score = 0;
  nextElement.innerHTML = "Next";
  showQuestion();
}

function showOldQuestion() {
  nextElement.innerHTML = "Next";
  nextElement.disabled = false;
  resetState();
  let currQuestion = quizData[curr];
  let qustionNo = curr + 1;
  countElement.innerHTML = qustionNo + "/" + quizData.length;
  qnoElement.innerHTML = "Question " + qustionNo;
  quesElement.innerHTML = currQuestion.question;

  for (let i = 0; i < currQuestion.options.length; i++) {
    const btn = document.createElement("button");
    btn.innerHTML = currQuestion.options[i];
    btn.classList.add("btn");
    optionsElement.appendChild(btn);
    if (selected.includes(currQuestion.options[i])) {
      btn.classList.add("selectionMade");
    }
    if (currQuestion.options[i] == currQuestion.answer) {
      btn.dataset.correct = true;
      btn.classList.add("correct");
    } else {
      btn.dataset.correct = false;
      if (selected.includes(currQuestion.options[i])) {
        btn.classList.add("incorrect");
      }
    }
    btn.disabled = "true";
  }
}

function showQuestion() {
  if (curr < actualCurr) {
    showOldQuestion();
    return;
  }
  resetState();
  nextElement.disabled = true;
  let currQuestion = quizData[curr];
  let qustionNo = curr + 1;
  countElement.innerHTML = qustionNo + "/" + quizData.length;
  qnoElement.innerHTML = "Question " + qustionNo;
  quesElement.innerHTML = currQuestion.question;

  for (let i = 0; i < currQuestion.options.length; i++) {
    const btn = document.createElement("button");
    btn.innerHTML = currQuestion.options[i];
    btn.classList.add("btn");
    optionsElement.appendChild(btn);
    if (currQuestion.options[i] == currQuestion.answer) {
      btn.dataset.correct = true;
    } else {
      btn.dataset.correct = false;
    }
    btn.addEventListener("click", answerSelect);
  }
}

function resetState() {
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function answerSelect(e) {
  actualCurr++;
  const selection = e.target;
  selected.push(selection.innerHTML);
  nextElement.disabled = false;
  selection.classList.add("selectionMade");
  const isCorrect = selection.dataset.correct === "true";
  if (isCorrect) {
    selection.classList.add("correct");
    score++;
  } else {
    selection.classList.add("incorrect");
  }
  Array.from(optionsElement.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = "true";
  });
}

function showScore() {
  resetState();
  countElement.innerHTML = "";
  qnoElement.innerHTML = "";
  quesElement.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  nextElement.innerHTML = "Reset";
}

function nextFunction() {
  curr++;
  if (curr < quizData.length) {
    if (curr == quizData.length - 1) {
      nextElement.innerHTML = "Finish";
    }
    showQuestion();
  } else {
    showScore();
  }
}

nextElement.addEventListener("click", () => {
  if (curr < quizData.length) {
    nextFunction();
  } else {
    startQuiz();
  }
});

function backFunction() {
  curr--;
  showOldQuestion();
}

backElement.addEventListener("click", () => {
  if (curr >= 1) {
    backFunction();
  }
});

startQuiz();
