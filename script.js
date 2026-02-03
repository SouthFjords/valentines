const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const container = document.getElementById("buttons");
const content = document.getElementById("content");
const celebrate = document.getElementById("celebrate");

const prefersHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function moveNoButton() {
  const padding = 12;
  const maxX = Math.max(padding, container.clientWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(padding, container.clientHeight - noBtn.offsetHeight - padding);
  const x = padding + Math.random() * Math.max(0, maxX - padding);
  const y = padding + Math.random() * Math.max(0, maxY - padding);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function showCelebrate() {
  content.hidden = true;
  celebrate.hidden = false;
}

yesBtn.addEventListener("click", showCelebrate);

if (prefersHover) {
  let raf = null;
  let lastEvent = null;
  const threshold = 90;

  const evaluateMove = () => {
    raf = null;
    if (!lastEvent) return;
    const rect = noBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = lastEvent.clientX - cx;
    const dy = lastEvent.clientY - cy;
    const distance = Math.hypot(dx, dy);
    if (distance < threshold) {
      moveNoButton();
    }
  };

  container.addEventListener("pointermove", (event) => {
    lastEvent = event;
    if (!raf) raf = requestAnimationFrame(evaluateMove);
  });

  noBtn.addEventListener("pointerenter", moveNoButton);
} else {
  const handleNoTap = (event) => {
    event.preventDefault();
    moveNoButton();
  };

  noBtn.addEventListener("click", handleNoTap);
  noBtn.addEventListener("touchstart", handleNoTap, { passive: false });
  noBtn.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") handleNoTap(event);
  });
}

window.addEventListener("resize", () => {
  moveNoButton();
});

requestAnimationFrame(() => {
  moveNoButton();
});
