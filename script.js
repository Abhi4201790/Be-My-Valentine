// -----------------------------
// FLOATING HEARTS BACKGROUND
// -----------------------------
function initFloatingHearts() {
  const holder = document.getElementById("heartsBg");
  if (!holder || holder.dataset.started === "true") return;

  holder.dataset.started = "true";

  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 18 + 10;
    heart.style.fontSize = size + "px";
    const duration = Math.random() * 4 + 6;
    heart.style.animationDuration = duration + "s";
    const drift = Math.random() * 80 - 40;
    heart.style.transform = `translateX(${drift}px)`;

    holder.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  setInterval(spawnHeart, 350);
  for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 120);
}


// -----------------------------
// QUIZ
// -----------------------------
function initQuiz() {
  const questions = [
    { q: "What is my favourite food?", options: ["Curd rice with potato","McSpicy","Shreyas cheese baked pasta with popcorn chicken","KFC mac n cheese"], correct: 2 },
    { q: "What would be the FIRST thing I buy in a shopping mall?", options: ["Perfume","Watch","Clothes","Luxury brands"], correct: 0 },
    { q: "Who is my favourite Barcelona player right now?", options: ["Lamine Yamal","Pedri","De Jong","Balde"], correct: 0 },
    { q: "Which is my correct favourite artist ranking?", options: ["Travis → Carti → Laroi → Drake → Kanye","Travis → Laroi → Carti → Drake → Kanye","Kanye → Drake → Carti → Laroi → Travis","Laroi → Travis → Carti → Kanye → Drake"], correct: 1 },
    { q: "Am I the best boyfriend ever?", options: ["YES OBVIOUSLY 😤💘"], correct: 0 }
  ];

  const insults = ["WRONG. Be ashamed 😭","NO you failed the Abhitines test 💀","Get better babe 😔"];

  let current = 0, locked = false;

  const questionText = document.getElementById("questionText");
  const answersDiv = document.getElementById("answers");
  const messageDiv = document.getElementById("message");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");
  const premiumBtn = document.getElementById("premiumBtn");

  function renderQuestion() {
    locked = false;
    messageDiv.textContent = "";
    nextBtn.classList.add("hidden");
    if (premiumBtn) premiumBtn.classList.add("hidden");

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
        nextBtn.textContent = "Unlock Memories 💖";
        nextBtn.classList.remove("hidden");
        if (premiumBtn) setTimeout(() => premiumBtn.classList.remove("hidden"), 500);
      } else {
        nextBtn.textContent = "Next ➜";
        nextBtn.classList.remove("hidden");
      }
    } else {
      messageDiv.textContent = insults[Math.floor(Math.random() * insults.length)];
      messageDiv.style.color = "#ffd1d1";
      setTimeout(() => { locked = false; }, 600);
    }
  }

  nextBtn.addEventListener("click", () => {
    if (current === questions.length - 1) {
      window.location.href = "memories.html";
      return;
    }
    current++;
    renderQuestion();
  });

  renderQuestion();
}


// -----------------------------
// LOVE LETTER MODAL
// -----------------------------
function initLoveModal() {
  const loveModal = document.getElementById("loveModal");
  const premiumBtn = document.getElementById("premiumBtn");
  const closeModal = document.getElementById("closeModal");

  if (!loveModal || !premiumBtn || !closeModal) return;

  loveModal.classList.add("hidden"); // ensure hidden on load

  premiumBtn.addEventListener("click", () => {
    loveModal.classList.remove("hidden");
    fireConfetti(80);
  });

  closeModal.addEventListener("click", () => loveModal.classList.add("hidden"));

  loveModal.addEventListener("click", e => {
    if (e.target === loveModal) loveModal.classList.add("hidden");
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
// EASTER EGG
// -----------------------------
function initEasterEgg() {
  let clicks = 0;
  const egg = document.getElementById("easterEgg");
  if (!egg) return;

  document.addEventListener("click", () => {
    clicks++;
    if (clicks === 7) {
      egg.classList.remove("hidden");
      fireConfetti(60);
      setTimeout(() => { egg.classList.add("hidden"); clicks = 0; }, 4500);
    }
  });
}
