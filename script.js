const board = document.getElementById('board');
const viewport = document.getElementById('viewport');
const zoomDisplay = document.getElementById('zoom-level');

let scale = 1;
let posX = window.innerWidth / 2 - 2450;
let posY = window.innerHeight / 2 - 2450;

let isDragging = false;
let lastX, lastY;

// Função unificada para atualizar a tela
function update() {
    board.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    zoomDisplay.innerText = `${Math.round(scale * 100)}%`;
}

// Suporte para Mouse e Touch (Celular)
function onStart(e) {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastX = clientX;
    lastY = clientY;
}

function onMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - lastX;
    const dy = clientY - lastY;
    
    posX += dx;
    posY += dy;
    lastX = clientX;
    lastY = clientY;
    update();
}

function onEnd() { isDragging = false; }

// Eventos de Mouse
viewport.addEventListener('mousedown', onStart);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onEnd);

// Eventos de Toque (Celular)
viewport.addEventListener('touchstart', onStart, {passive: false});
window.addEventListener('touchmove', onMove, {passive: false});
window.addEventListener('touchend', onEnd);

// Zoom no Scroll
viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.min(Math.max(0.3, scale * delta), 2);
    update();
}, {passive: false});

// Centralizar
document.getElementById('reset-view').onclick = () => {
    scale = 1;
    posX = window.innerWidth / 2 - 2450;
    posY = window.innerHeight / 2 - 2450;
    update();
};

update(); // Inicia o site na posição correta
