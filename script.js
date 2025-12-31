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
function changeBackground() {
  const body = document.body;
  // night → fireworks → sunrise
  setTimeout(() => body.style.background = "linear-gradient(135deg, #0b0712, #1b1b40)", 0);
  setTimeout(() => body.style.background = "linear-gradient(135deg, #ff5f6d, #ffc371)", 3000); // fireworks color
  setTimeout(() => body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)", 7000); // sunrise
}

// Call after countdown hits zero
setTimeout(changeBackground, 500);
const messages = [
  "I Love You Omotola ❤️",
  "You are my sunshine ☀️",
  "My heart beats for you ❤️",
  "Happy New Year, my love 🎆",
  "Forever yours, always 💖"
];

let msgIndex = 0;
let charIndex = 0;

function typeMessages() {
  const el = document.getElementById("typingText");
  if(msgIndex >= messages.length) return;
  
  if(charIndex < messages[msgIndex].length) {
    el.innerHTML += messages[msgIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeMessages, 120);
  } else {
    // wait 1s, clear text, go to next message
    setTimeout(() => {
      el.innerHTML = "";
      charIndex = 0;
      msgIndex++;
      typeMessages();
    }, 1000);
  }
}

// Call after showing surprise
typeMessages();

function createSnow() {
  const snowContainer = document.getElementById("snow");
  for (let i = 0; i < 10; i++) { // fewer flakes
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = (Math.random() * 10 + 10) + "px"; // smaller flakes
    snowflake.style.animationDuration = (Math.random() * 8 + 6) + "s"; // slower fall
    snowflake.innerText = "❄";
    snowContainer.appendChild(snowflake);

    // Remove after animation ends
    snowflake.addEventListener("animationend", () => snowflake.remove());
  }
}

// Generate new snowflakes every 800ms (less frequent)
setInterval(createSnow, 800);
// Function to generate particles in text shape
function fireworkText(text, x, y) {
  const offCanvas = document.createElement("canvas");
  offCanvas.width = canvas.width;
  offCanvas.height = canvas.height;
  const offCtx = offCanvas.getContext("2d");

  offCtx.font = "bold 80px Poppins";
  offCtx.fillText(text, x, y);

  const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 128) { // pixel alpha > 128
      const px = (i / 4) % canvas.width;
      const py = Math.floor(i / 4 / canvas.width);
      createFirework(px, py, `hsl(${Math.random() * 360},100%,70%)`);
    }
  }
}

// Trigger example
setTimeout(() => fireworkText("OMOTOLA ❤️", canvas.width/2 - 250, canvas.height/2), 2000);



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

