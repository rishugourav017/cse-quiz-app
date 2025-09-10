const questions = [
  {q: "Which data structure uses FIFO (First In, First Out)?", a: ["Stack", "Queue", "Tree", "Graph"], correct: 1},
  {q: "What is the time complexity of binary search?", a: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct: 1},
  {q: "Which protocol is used to send emails?", a: ["HTTP", "SMTP", "FTP", "IMAP"], correct: 1},
  {q: "Which layer of OSI model handles routing?", a: ["Transport", "Network", "Data Link", "Application"], correct: 1},
  {q: "Which of these is not an OOP concept?", a: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"], correct: 3},
  {q: "Which scheduling algorithm is used in Round Robin?", a: ["Preemptive", "Non-preemptive", "Priority", "FCFS"], correct: 0},
  {q: "Which of the following is a NoSQL database?", a: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correct: 2},
  {q: "Which HTML tag is used for JavaScript?", a: ["<link>", "<script>", "<style>", "<js>"], correct: 1}
];

let currentQ = 0, score = 0, timer, timeLeft = 15;
const questionEl = document.querySelector(".question");
const answersEl = document.querySelector(".answers");
const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const restartBtn = document.querySelector(".restart-btn");
const scoreEl = document.querySelector("#score");
const scoreBox = document.querySelector(".score");
const progressBar = document.querySelector(".progress-bar");
const timeEl = document.getElementById("time");
const modeToggle = document.querySelector(".mode-toggle");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

function startQuiz() {
  startBtn.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  currentQ = 0;
  score = 0;
  scoreEl.textContent = score;
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  let q = questions[currentQ];
  questionEl.textContent = q.q;
  q.a.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(i));
    answersEl.appendChild(btn);
  });
  updateProgress();
}

function resetState() {
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
}

function selectAnswer(i) {
  clearInterval(timer);
  let q = questions[currentQ];
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    if (idx === q.correct) btn.classList.add("correct");
    else if (idx === i) btn.classList.add("wrong");
    btn.disabled = true;
  });
  if (i === q.correct) {
    score++;
    scoreEl.textContent = score;
  }
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    timeLeft = 15;
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

function updateProgress() {
  progressBar.style.width = ((currentQ+1)/questions.length)*100 + "%";
}

function startTimer() {
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function endQuiz() {
  questionEl.textContent = "🎉 Quiz Completed!";
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
  confetti();
}

function restartQuiz() {
  restartBtn.classList.add("hidden");
  startQuiz();
}

function confetti() {
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement("div");
    conf.style.position = "fixed";
    conf.style.width = "6px";
    conf.style.height = "6px";
    conf.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
    conf.style.left = Math.random()*100 + "vw";
    conf.style.top = "-10px";
    conf.style.borderRadius = "50%";
    conf.style.opacity = 0.9;
    document.body.appendChild(conf);
    let fall = setInterval(() => {
      conf.style.top = (parseFloat(conf.style.top)+3) + "px";
      if (parseFloat(conf.style.top) > window.innerHeight) {
        clearInterval(fall);
        conf.remove();
      }
    }, 20);
  }
}
