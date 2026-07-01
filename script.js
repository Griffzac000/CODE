console.log("Script started");const overlay = document.getElementById('planetOverlay');

const overlayContent = document.getElementById('overlayContent');
const returnBtn = document.getElementById('returnBtn');

function openOverlay(key) {
    const contentSource = document.getElementById(`content-${key}`) || document.getElementById(key);
    
    if (!contentSource) {
        console.error(`System Error: Could not find an HTML element with ID 'content-${key}' or '${key}'`);
        return;
    }
    
    if (!overlay || !overlayContent) {
        console.error("System Error: '#planetOverlay' or '#overlayContent' is missing from your HTML structure.");
        return;
    }
    
    overlayContent.innerHTML = contentSource.innerHTML;
    overlay.classList.add('active');

    if (key === 'case-studies') {
        overlay.classList.add('case-studies');
    } else {
        overlay.classList.remove('case-studies');
    }
}

function closeOverlay() {
    if (!overlay || !overlayContent) return;
    overlay.classList.remove('active', 'case-studies');
    setTimeout(() => {
        if (!overlay.classList.contains('active')) overlayContent.innerHTML = '';
    }, 400);
}

const sunElement = document.getElementById('sun');
if (sunElement) {
    sunElement.style.cursor = 'pointer';
    sunElement.style.pointerEvents = 'all';
    
    sunElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        console.log("Sun clicked! Attempting to open contact overlay...");
        openOverlay('contact');
    });
} else {
    console.error("System Error: Element with ID 'sun' was not found in the DOM.");
}

document.querySelectorAll('.planet[data-planet]').forEach(planet => {
    const label = planet.querySelector('.planet-label');

    planet.addEventListener('mouseenter', () => { if (label) label.style.opacity = '1'; });
    planet.addEventListener('mouseleave', () => { if (label) label.style.opacity = '0'; });

    planet.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const planetKey = planet.getAttribute('data-planet');
        console.log(`Planet clicked: ${planetKey}`);
        openOverlay(planetKey);
    });
});

if (returnBtn) {
    returnBtn.addEventListener('click', closeOverlay);
}

function createStars(count) {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    const fragment = document.createDocumentFragment();
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
        `;
        fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);
}
createStars(1000);

const wrapper = document.querySelector('.space-wrapper');
const canvas = document.querySelector('.space-canvas');
if (wrapper && canvas) {
    let isDragging = false;
    let lastX, lastY;
    let offsetX = -1500, offsetY = -1500;
    let targetX = -1500, targetY = -1500;
    const ease = 0.08;

    function renderLoop() {
        offsetX += (targetX - offsetX) * ease;
        offsetY += (targetY - offsetY) * ease;
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        requestAnimationFrame(renderLoop);
    }
    renderLoop();

    wrapper.addEventListener('mousedown', (e) => {
        if (e.target.closest('.planet[data-planet]') || e.target.closest('#sun')) return;
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        wrapper.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        targetX += e.clientX - lastX;
        targetY += e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });
}

const introScreen = document.getElementById('introScreen');
if (introScreen) {
    setTimeout(() => introScreen.classList.add('fade-out'), 7000);
    setTimeout(() => introScreen.remove(), 8500);
}