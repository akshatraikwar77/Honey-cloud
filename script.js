document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    loadCredits();
    setupTabs();
});

// Particle System (Professional Glow)
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX; p.y += p.speedY;
            if(p.x > canvas.width) p.x = 0; if(p.x < 0) p.x = canvas.width;
            if(p.y > canvas.height) p.y = 0; if(p.y < 0) p.y = canvas.height;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function openAuth() {
    alert("🔐 Login with Google / Honey Cloud is coming soon!");
}

// Tabs logic
function setupTabs() {
    const tabs = document.querySelectorAll('.gen-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}
