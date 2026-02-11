const board = document.getElementById('board');
const viewport = document.getElementById('viewport');
const zoomDisplay = document.getElementById('zoom-info');

let scale = 1;
let posX = window.innerWidth / 2 - 2500;
let posY = window.innerHeight / 2 - 2500;
let isDragging = false;
let lastX, lastY;

function update() {
    board.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    zoomDisplay.innerText = `${Math.round(scale * 100)}%`;
}

// Navegação Suave entre seções
function goTo(targetX, targetY) {
    scale = 1;
    posX = window.innerWidth / 2 - targetX;
    posY = window.innerHeight / 2 - targetY;
    board.style.transition = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    update();
    setTimeout(() => { board.style.transition = "none"; }, 800);
}

// Arrastar (Mouse e Touch)
function onStart(e) {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastX = clientX; lastY = clientY;
}

function onMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    posX += (clientX - lastX);
    posY += (clientY - lastY);
    lastX = clientX; lastY = clientY;
    update();
}

viewport.onmousedown = onStart;
window.onmousemove = onMove;
window.onmouseup = () => isDragging = false;

viewport.ontouchstart = onStart;
window.ontouchmove = onMove;
window.ontouchend = () => isDragging = false;

// Zoom
viewport.onwheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.min(Math.max(0.2, scale * delta), 2);
    update();
};

update();
