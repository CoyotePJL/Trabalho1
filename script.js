const viewport = document.getElementById('viewport');
const board = document.getElementById('board');
const zoomDisplay = document.getElementById('zoom-level');
const resetBtn = document.getElementById('reset-view');

let scale = 1;
// Inicializa a posição para focar no centro onde estão os cards (2500px)
let posX = window.innerWidth / 2 - 2500;
let posY = window.innerHeight / 2 - 2500;

let isDragging = false;
let startX, startY;

// Aplica posição inicial
updateTransform();

viewport.onmousedown = (e) => {
    if (e.target !== viewport && e.target !== board) return;
    isDragging = true;
    startX = e.pageX - posX;
    startY = e.pageY - posY;
};

window.onmousemove = (e) => {
    if (!isDragging) return;
    posX = e.pageX - startX;
    posY = e.pageY - startY;
    updateTransform();
};

window.onmouseup = () => isDragging = false;

viewport.onwheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    
    // Zoom relativo ao mouse
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    const boardX = (mouseX - posX) / scale;
    const boardY = (mouseY - posY) / scale;

    scale *= delta;
    scale = Math.min(Math.max(0.1, scale), 3);

    posX = mouseX - boardX * scale;
    posY = mouseY - boardY * scale;

    updateTransform();
};

function updateTransform() {
    board.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    zoomDisplay.innerText = `${Math.round(scale * 100)}%`;
}

resetBtn.onclick = () => {
    scale = 1;
    posX = window.innerWidth / 2 - 2500;
    posY = window.innerHeight / 2 - 2500;
    updateTransform();
};
