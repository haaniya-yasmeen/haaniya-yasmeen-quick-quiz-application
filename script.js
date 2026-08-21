const questions = [
  {
    question: "Which HTML tag is used to link a CSS file?",
    options: ["<style>", "<link>", "<script>", "<css>"],
    answer: 1
  },
  {
    question: "Which CSS property controls text size?",
    options: ["text-style", "font-size", "text-size", "font-weight"],
    answer: 1
  },
  {
    question: "How do you select an element with id 'main' in CSS?",
    options: [".main", "#main", "*main", "main"],
    answer: 1
  },
  {
    question: "Which JS method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "concat()"],
    answer: 0
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Display Object Manager",
      "Document Oriented Markup"
    ],
    answer: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "// or /* */", "# ", "** **"],
    answer: 1
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["color", "bgcolor", "background-color", "background-tint"],
    answer: 2
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["title", "alt", "src", "longdesc"],
    answer: 1
  },
  {
    question: "Which operator is used for strict equality in JavaScript?",
    options: ["==", "=", "===", "!="],
    answer: 2
  },
  {
    question: "Which CSS layout system arranges items in rows and columns?",
    options: ["Flexbox", "Grid", "Float", "Position"],
    answer: 1
  }
];

let current = 0;
let score = 0;
let answered = false;

const card = document.getElementById("card");

function render() {
  if (current >= questions.length) {
    renderResult();
    return;
  }

  answered = false;
  const q = questions[current];
  const progressPct = (current / questions.length) * 100;

  card.innerHTML = `
    <div class="top-row">
      <span class="progress-label">Question ${current + 1} of ${questions.length}</span>
      <span class="score-pill">Score: ${score}</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${progressPct}%"></div>
    </div>
    <h1>${q.question}</h1>
    <div class="options" id="options"></div>
    <button class="next-btn" id="nextBtn">Next</button>
  `;

  const optionsEl = document.getElementById("options");
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(i));
    optionsEl.appendChild(btn);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    current++;
    render();
  });
}

function selectOption(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) {
      btn.classList.add("correct");
    } else if (i === selectedIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === q.answer) {
    score++;
    document.querySelector(".score-pill").textContent = `Score: ${score}`;
  }

  document.getElementById("nextBtn").style.display = "block";
}

function renderResult() {
  const pct = Math.round((score / questions.length) * 100);
  card.innerHTML = `
    <div class="result">
      <p class="progress-label">Quiz complete</p>
      <div class="big-score">${score} / ${questions.length}</div>
      <p>You scored ${pct}%</p>
      <button class="retry-btn" id="retryBtn">Try Again</button>
    </div>
  `;
  document.getElementById("retryBtn").addEventListener("click", () => {
    current = 0;
    score = 0;
    render();
  });
}

render();
