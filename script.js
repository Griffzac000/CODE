function createStars(count) {

    const stars = document.getElementById('stars');

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: absolute;
      width: ${Math.random() * 2}px;
      height: ${Math.random() * 2}px;
      background: white;
      border-radius: 50%;
      top: ${Math.random() * 100}vh;
      left: ${Math.random() * 100}vw;
      opacity: ${Math.random() * 0.8 + 0.2};
      z-index: -1
    `;
    document.body.appendChild(star);
  }
}

createStars(1500);


const wrapper = document.querySelector('.space-wrapper');
const canvas = document.querySelector('.space-canvas');

let isDragging = false;
let lastX, lastY;
let offsetX = -1500, offsetY = -1500;
let targetX = -1500, targetY = -1500;

// smoothing factor - lower = smoother/slower, higher = snappier
const ease = 0.08;

function animate() {
    // gradually move current position towards target position
    offsetX += (targetX - offsetX) * ease;
    offsetY += (targetY - offsetY) * ease;

    canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    requestAnimationFrame(animate);
}
animate(); // start the loop

wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    wrapper.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;

    targetX += deltaX;  // update target, not offset directly
    targetY += deltaY;

    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
});

wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetX -= e.deltaX;
    targetY -= e.deltaY;
}, { passive: false });

const introScreen = document.getElementById('introScreen');

// total intro time: roughly when both text lines finish their animation
setTimeout(() => {
    introScreen.classList.add('fade-out');
}, 7000); // adjust this to match how long you want the intro visible

// fully remove it from the page after the fade-out finishes
setTimeout(() => {
    introScreen.remove();
}, 8500);