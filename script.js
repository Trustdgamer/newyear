const music = document.getElementById("bgMusic");
let countdownInterval;
let fireworksInterval;

/* START EXPERIENCE */
function startExperience() {
  music.play();
  document.querySelector(".hero").style.display = "none";
  document.getElementById("countdown").classList.remove("hidden");

  showToast("✨ Get ready Omotola… something special is coming 💖");
  startCountdown();
}


/* COUNTDOWN */
function startCountdown() {
  // Get current UTC time
  const nowUTC = new Date(
    new Date().toISOString().slice(0, -1)
  ).getTime();

  // New Year in Lagos (UTC+1)
  // Jan 1, 2026 00:00 Lagos = Dec 31, 2025 23:00 UTC
  const newYearLagosUTC = Date.UTC(2025, 11, 31, 23, 0, 0);

  countdownInterval = setInterval(() => {
    const diff = newYearLagosUTC - Date.now();

    if (diff <= 0) {
      clearInterval(countdownInterval);
      showToast("🎆 Happy New Year Omotola 💖");
      showSurprise();
      return;
    }

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
      `${hrs}h ${mins}m ${secs}s (Lagos time 🇳🇬)`;
  }, 1000);
}


/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let fireworksRunning = false;

/* PARTICLE */
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = (Math.random() - 0.5) * 6;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.05; // gravity
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/* CREATE FIREWORK */
function createFirework(x, y) {
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(x, y));
  }
}

/* ANIMATION LOOP */
function animateFireworks() {
  if (!fireworksRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateFireworks);
}
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* START FIREWORKS */
function launchFireworks() {
  canvas.style.display = "block";
  fireworksRunning = true;
  animateFireworks();

  // auto fireworks
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    createFirework(x, y);
  }, 700);
}

/* TAP / CLICK FIREWORKS (🔥🔥🔥) */
canvas.addEventListener("click", e => {
  createFirework(e.clientX, e.clientY);
});

canvas.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  createFirework(touch.clientX, touch.clientY);
});


/* TYPING LOVE */
const loveText = "I Love You Omotola ❤️";
let loveIndex = 0;

function typeLove() {
  const el = document.getElementById("typingText");
  el.innerHTML = "";
  loveIndex = 0;

  function type() {
    if (loveIndex < loveText.length) {
      el.innerHTML += loveText.charAt(loveIndex);
      loveIndex++;
      setTimeout(type, 120);
    }
  }
  type();
}


/* FLOATING HEARTS */
setInterval(() => {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "0px";
  heart.style.fontSize = "22px";
  heart.style.animation = "floatUp 4s linear";
  heart.style.pointerEvents = "none";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}, 900);

/* GIFT MESSAGE */

const gift = document.getElementById("gift");
if (gift) {
  gift.onclick = () => {
    showToast("🎁 Omotola 💖 you are my greatest gift. Happy New Year 🎆");
  };
}


/* FINAL SURPRISE */
function showSurprise() {
  document.getElementById("countdown").style.display = "none";
  document.getElementById("gallery").classList.remove("hidden");
  document.getElementById("video").classList.remove("hidden");
  document.getElementById("message").classList.remove("hidden");

  launchFireworks();
  typeLove();
}

