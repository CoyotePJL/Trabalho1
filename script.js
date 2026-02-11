// Lógica simples para abrir/fechar o chat
const chatTrigger = document.getElementById('chat-trigger');
const chatWindow = document.getElementById('chat-window');

chatTrigger.onclick = () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
};

// Smooth Scroll para links da navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
