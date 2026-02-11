// -----------------------------
// Floating Hearts Background
// -----------------------------
function initFloatingHearts() {
  const holder = document.getElementById("heartsBg");
  if (!holder) return;

  // Prevent double init if called multiple times
  if (holder.dataset.started === "true") return;
  holder.dataset.started = "true";

  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤️";

    // random horizontal position
    heart.style.left = Math.random() * 100 + "vw";

    // random size
    const size = Math.random() * 18 + 10;
    heart.style.fontSize = size + "px";

    // random speed
    const duration = Math.random() * 4 + 6;
    heart.style.animationDuration = duration + "s";

    // random drift
    const drift = Math.random() * 80 - 40;
    heart.style.transform = `translateX(${drift}px)`;

    holder.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  // spawn hearts repeatedly
  setInterval(spawnHeart, 350);

  // initial burst
  for (let i = 0; i < 10; i++) {
    setTimeout(spawnHeart, i * 120);
  }
}


// -----------------------------
// QUIZ
// -----------------------------
function initQuiz() {
  const questions = [
    {
      q: "What is my favourite food?",
      options: [
        "Curd rice with potato",
        "McSpicy",
        "Shreyas cheese baked pasta with popcorn chicken",
        "KFC mac n cheese"
      ],
      correct: 2
    },
    {
      q: "What would be the FIRST thing I buy in a shopping mall?",
      options: [
        "Perfume",
        "Watch",
        "Clothes",
        "Luxury brands"
      ],
      correct: 0
    },
    {
      q: "Who is my favourite Barcelona player right now?",
      options: [
        "Lamine Yamal",
        "Pedri",
        "De Jong",
        "Balde"
      ],
      correct: 0
    },
    {
      q: "Which is my correct favourite artist ranking?",
      options: [
        "Travis → Carti → Laroi → Drake → Kanye",
        "Travis → Laroi → Carti → Drake → Kanye",
        "Kanye → Drake → Carti → Laroi → Travis",
        "Laroi → Travis → Carti → Kanye → Drake"
      ],
      correct: 1
    },
    {
      q: "Am I the best boyfriend ever?",
      options: [
        "YES OBVIOUSLY 😤💘"
      ],
      correct: 0
    }
  ];

  const insults = [
    "WRONG. Be ashamed 😭",
    "NO you failed the Abhitines test 💀",
    "Get better babe 😔"
  ];

  let current = 0;
  let locked = false;

  const questionText = document.getElementById("questionText");
  const answersDiv = document.getElementById("answers");
  const messageDiv = document.getElementById("message");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");

  function renderQuestion() {
    locked = false;
    messageDiv.textContent = "";
    nextBtn.classList.add("hidden");

    progressText.textContent = `Question ${current + 1}/${questions.length}`;
    questionText.textContent = questions[current].q;

    answersDiv.innerHTML = "";
    questions[current].options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.textContent = opt;

      btn.addEventListener("click", () => handleAnswer(idx));
      answersDiv.appendChild(btn);
    });
  }

  function handleAnswer(choice) {
    if (locked) return;
    locked = true;

    const correct = questions[current].correct;

    if (choice === correct) {
      messageDiv.textContent = "Correct 😏💘";
      messageDiv.style.color = "#d7ffcf";

      if (current === questions.length - 1) {
        nextBtn.textContent = "Unlock Valentine Page 💖";
        nextBtn.classList.remove("hidden");
      } else {
        nextBtn.textContent = "Next ➜";
        nextBtn.classList.remove("hidden");
      }
    } else {
      const insult = insults[Math.floor(Math.random() * insults.length)];
      messageDiv.textContent = insult;
      messageDiv.style.color = "#ffd1d1";

      // allow retry
      setTimeout(() => {
        locked = false;
      }, 600);
    }
  }

  nextBtn.addEventListener("click", () => {
    if (current === questions.length - 1) {
      window.location.href = "valentine.html";
      return;
    }
    current++;
    renderQuestion();
  });

  renderQuestion();
}


// -----------------------------
// VALENTINE PAGE
// -----------------------------
function initValentinePage() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  function moveNoButton() {
    const padding = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const btnRect = noBtn.getBoundingClientRect();
    const btnW = btnRect.width;
    const btnH = btnRect.height;

    const newX = Math.random() * (vw - btnW - padding * 2) + padding;
    const newY = Math.random() * (vh - btnH - padding * 2) + padding;

    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("click", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton);

  yesBtn.addEventListener("click", () => {
    fireConfetti(140);
    setTimeout(() => {
      window.location.href = "reveal.html";
    }, 900);
  });
}


// -----------------------------
// REVEAL PAGE
// -----------------------------
function initRevealPage() {
  const revealBtn = document.getElementById("revealBtn");
  revealBtn.addEventListener("click", () => {
    window.location.href = "final.html";
  });
}


// -----------------------------
// CONFETTI
// -----------------------------
function fireConfetti(count = 80) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";

    c.style.left = Math.random() * 100 + "vw";

    const size = Math.random() * 8 + 6;
    c.style.width = size + "px";
    c.style.height = size * 1.2 + "px";

    c.style.animationDuration = (Math.random() * 1.2 + 1.6) + "s";

    c.style.background = `hsl(${Math.random() * 360}, 90%, 65%)`;

    document.body.appendChild(c);

    setTimeout(() => c.remove(), 2500);
  }
}


// -----------------------------
// EASTER EGG (click 5 times anywhere)
// -----------------------------
function initEasterEgg() {
  let clicks = 0;
  const egg = document.getElementById("easterEgg");
  if (!egg) return;

  document.addEventListener("click", () => {
    clicks++;

    if (clicks === 5) {
      egg.classList.remove("hidden");
      fireConfetti(60);

      setTimeout(() => {
        egg.classList.add("hidden");
        clicks = 0;
      }, 4500);
    }
  });
}
