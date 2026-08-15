// ===== MENU TOGGLE =====
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.background = ['#6366F1', '#8B5CF6', '#A78BFA', '#818CF8'][Math.floor(Math.random() * 4)];
        container.appendChild(particle);
    }
}
document.addEventListener('DOMContentLoaded', createParticles);

// ===== SECTION SCROLL ACTIVE =====
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// ===== TAB SWITCH =====
function switchTab(task) {
    document.querySelectorAll('.gen-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.gen-tab[data-task="${task}"]`).classList.add('active');

    const prompts = {
        'photo': 'Describe the image you want... e.g., "A cyberpunk city at night with neon lights"',
        'video': 'Describe the video you want... e.g., "A cinematic travel video of Paris"',
        'website': 'Describe the website you want... e.g., "A modern portfolio for a photographer"',
        'code': 'Describe the code you want... e.g., "A Python script to scrape data from a website"',
        'write': 'Describe what you want to write... e.g., "A blog post about AI in 2026"',
        'translate': 'Enter text to translate... e.g., "Hello, how are you?"',
        'chat': 'Ask anything... e.g., "Explain quantum computing in simple terms"',
        'audio': 'Describe the audio you want... e.g., "A calm piano melody"',
        'design': 'Describe the design you want... e.g., "A modern mobile app UI for a fitness app"',
        'seo': 'Enter your content for SEO optimization...'
    };

    document.getElementById('promptInput').placeholder = prompts[task] || 'Describe what you want...';
}

// ===== SELECT FEATURE =====
function selectFeature(type) {
    document.querySelectorAll('.gen-tab').forEach(tab => tab.classList.remove('active'));
    const tab = document.querySelector(`.gen-tab[data-task="${type}"]`);
    if (tab) tab.classList.add('active');
    switchTab(type);
    document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
}

// ===== SELECT MODEL =====
function selectModel(model) {
    document.getElementById('modelSelect').value = model;
    document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
    // Highlight the selected model card
    document.querySelectorAll('.ai-card').forEach(c => c.style.borderColor = 'rgba(255,255,255,0.04)');
    const cards = document.querySelectorAll('.ai-card');
    const modelMap = { 'claude': 0, 'chatgpt': 1, 'honey': 2, 'dalle': 3, 'midjourney': 4, 'gemini': 5 };
    if (cards[modelMap[model]]) {
        cards[modelMap[model]].style.borderColor = 'rgba(99,102,241,0.3)';
    }
    document.getElementById('promptInput').focus();
}

// ===== GENERATE CONTENT =====
function generateContent() {
    const prompt = document.getElementById('promptInput').value.trim();
    const model = document.getElementById('modelSelect').value;
    const style = document.getElementById('styleSelect').value;
    const length = document.getElementById('lengthSelect').value;
    const tone = document.getElementById('toneSelect').value;
    const output = document.getElementById('output');

    if (!prompt) {
        alert('🍯 Please describe what you want to generate!');
        document.getElementById('promptInput').focus();
        return;
    }

    const activeTab = document.querySelector('.gen-tab.active');
    const task = activeTab ? activeTab.dataset.task : 'photo';

    const taskNames = {
        'photo': '🖼️ Photo',
        'video': '🎬 Video',
        'website': '🌐 Website',
        'code': '💻 Code',
        'write': '✍️ Writing',
        'translate': '🌍 Translation',
        'chat': '💬 Chat',
        'audio': '🎵 Audio',
        'design': '🎨 Design',
        'seo': '📈 SEO'
    };

    const modelNames = {
        'claude': '🤖 Claude AI',
        'chatgpt': '💬 ChatGPT',
        'honey': '🍯 Honey 1.0',
        'dalle': '🎨 DALL-E 3',
        'midjourney': '🎭 Midjourney',
        'gemini': '⭐ Google Gemini'
    };

    output.classList.add('show');
    output.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;color:#818CF8;padding:10px 0;">
            <span>⏳</span>
            <span>Generating your ${taskNames[task]} with ${modelNames[model]}... (${style} style, ${length} length, ${tone} tone)</span>
        </div>
    `;

    // Deduct credits animation
    const creditDisplay = document.querySelector('.credits-amount');
    let currentCredits = parseInt(creditDisplay.textContent);

    setTimeout(() => {
        const resultHTML = `
            <div style="background:#14141f;padding:20px;border-radius:10px;border:1px solid rgba(99,102,241,0.05);">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
                    <h4 style="color:#818CF8;font-size:1rem;">✅ ${taskNames[task]} Generated!</h4>
                    <span style="color:#666;font-size:0.7rem;">${modelNames[model]} • ${style} style • ${length} length</span>
                </div>
                <div style="background:#0a0a12;padding:15px;border-radius:8px;margin:10px 0;color:#888;font-size:0.85rem;border:1px solid rgba(255,255,255,0.03);">
                    <p style="color:#e5e5e5;font-weight:500;">📝 "${prompt.substring(0, 80)}${prompt.length > 80 ? '...' : ''}"</p>
                    <p style="color:#666;margin-top:8px;font-size:0.8rem;">${getResultMessage(task, style, tone)}</p>
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;">
                    <button style="padding:8px 20px;border-radius:50px;border:none;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;font-weight:600;font-size:0.75rem;cursor:pointer;" onclick="alert('📥 Download feature coming soon!')">📥 Download</button>
                    <button style="padding:8px 20px;border-radius:50px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#888;font-weight:600;font-size:0.75rem;cursor:pointer;" onclick="regenerate()">🔄 Regenerate</button>
                    <button style="padding:8px 20px;border-radius:50px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#888;font-weight:600;font-size:0.75rem;cursor:pointer;" onclick="copyResult()">📋 Copy</button>
                    <button style="padding:8px 20px;border-radius:50px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#888;font-weight:600;font-size:0.75rem;cursor:pointer;" onclick="exportResult()">💾 Export</button>
                </div>
                <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.03);display:flex;gap:10px;flex-wrap:wrap;">
                    <span style="font-size:0.6rem;color:#444;">🔹 ${taskNames[task]} • ${modelNames[model]}</span>
                    <span style="font-size:0.6rem;color:#444;">🔹 ${style} • ${length} • ${tone}</span>
                    <span style="font-size:0.6rem;color:#444;">🔹 ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;

        output.innerHTML = resultHTML;
        output.style.borderColor = 'rgba(99,102,241,0.08)';

        // Deduct credits
        if (currentCredits > 0) {
            creditDisplay.textContent = currentCredits - 1;
            // Show credit deduction animation
            creditDisplay.style.color = '#EF4444';
            setTimeout(() => creditDisplay.style.color = '#818CF8', 500);
        } else {
            alert('⚠️ You have 0 credits! Please add more credits to continue.');
        }

        // Add to history
        addToHistory(prompt, taskNames[task]);

    }, 1500 + Math.random() * 1000);
}

function getResultMessage(task, style, tone) {
    const messages = {
        'photo': `🖼️ Your AI-generated image is ready. Style: ${style}. Tone: ${tone}. Preview and download above.`,
        'video': `🎬 Your AI-generated video is ready. Style: ${style}. Tone: ${tone}. Processing complete.`,
        'website': `🌐 Your AI-generated website is ready. Style: ${style}. Tone: ${tone}. Preview and deploy with one click.`,
        'code': `💻 Your code is ready. Style: ${style}. Tone: ${tone}. Review and copy above.`,
        'write': `✍️ Your content is ready. Style: ${style}. Tone: ${tone}. Review and edit as needed.`,
        'translate': `🌍 Translation complete. Style: ${style}. Tone: ${tone}. Check accuracy above.`,
        'chat': `💬 Chat response ready. Style: ${style}. Tone: ${tone}. Review the answer above.`,
        'audio': `🎵 Audio generated. Style: ${style}. Tone: ${tone}. Preview and download.`,
        'design': `🎨 Design ready. Style: ${style}. Tone: ${tone}. Review and export.`,
        'seo': `📈 SEO optimized. Style: ${style}. Tone: ${tone}. Check suggestions above.`
    };
    return messages[task] || `✨ Generation complete! Style: ${style}. Tone: ${tone}.`;
}

function regenerate() {
    generateContent();
}

function copyResult() {
    const output = document.getElementById('output');
    const text = output.innerText || output.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        btn.textContent = '✅ Copied!';
        setTimeout(() => btn.textContent = '📋 Copy', 2000);
    }).catch(() => {
        alert('📋 Select the text and copy manually.');
    });
}

function exportResult() {
    const output = document.getElementById('output');
    const text = output.innerText || output.textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `honeycloud-export-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function addToHistory(prompt, task) {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    const item = document.createElement('div');
    item.className = 'history-item';
    const now = new Date();
    const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    item.innerHTML = `
        <span>${task}: ${prompt.substring(0, 40)}${prompt.length > 40 ? '...' : ''}</span>
        <span class="history-time">${time}</span>
    `;
    historyList.prepend(item);
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// ===== CREDITS =====
function addCredits() {
    const creditDisplay = document.querySelector('.credits-amount');
    let current = parseInt(creditDisplay.textContent);
    creditDisplay.textContent = current + 10;
    // Animation
    creditDisplay.style.color = '#22C55E';
    setTimeout(() => creditDisplay.style.color = '#818CF8', 500);
    alert('🍯 10 credits added! Total: ' + creditDisplay.textContent + ' credits');
}

// ===== AUTH MODAL =====
function openAuth(type) {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const switchText = document.getElementById('authSwitchText');
    const switchLink = document.getElementById('authSwitchLink');

    if (type === 'signin') {
        title.textContent = 'Welcome Back!';
        subtitle.textContent = 'Sign in to continue to Honey Cloud';
        switchText.textContent = "Don't have an account?";
        switchLink.textContent = 'Sign Up';
        switchLink.setAttribute('onclick', 'openAuth("signup")');
    } else {
        title.textContent = 'Create Your Account';
        subtitle.textContent = 'Start building with AI — it\'s free!';
        switchText.textContent = 'Already have an account?';
        switchLink.textContent = 'Sign In';
        switchLink.setAttribute('onclick', 'openAuth("signin")');
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeAuth() {
    document.getElementById('authModal').classList.remove('show');
    document.body.style.overflow = '';
}

function switchAuth() {
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const switchText = document.getElementById('authSwitchText');
    const switchLink = document.getElementById('authSwitchLink');

    if (title.textContent.includes('Welcome Back')) {
        title.textContent = 'Create Your Account';
        subtitle.textContent = 'Start building with AI — it\'s free!';
        switchText.textContent = 'Already have an account?';
        switchLink.textContent = 'Sign In';
        switchLink.setAttribute('onclick', 'openAuth("signin")');
    } else {
        title.textContent = 'Welcome Back!';
        subtitle.textContent = 'Sign in to continue to Honey Cloud';
        switchText.textContent = "Don't have an account?";
        switchLink.textContent = 'Sign Up';
        switchLink.setAttribute('onclick', 'openAuth("signup")');
    }
}

function handleAuth() {
    const modal = document.getElementById('authModal');
    const btn = event.target;
    btn.textContent = '⏳ Processing...';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = '✅ Success!';
        btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
        setTimeout(() => {
            closeAuth();
            alert('🎉 Welcome to Honey Cloud! Start generating with AI.');
            btn.textContent = 'Continue';
            btn.style.background = 'linear-gradient(135deg, #6366F1, #8B5CF6)';
            btn.disabled = false;
            document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }, 1500);
}

// ===== DEMO VIDEO =====
function playDemo() {
    alert('🎬 Demo video coming soon!\n\nHoney Cloud can generate:\n🖼️ Photos\n🎬 Videos\n🌐 Websites\n💻 Code\n✍️ Writing\n🌍 Translation\n💬 Chat\n🎵 Audio\n🎨 Design\n📈 SEO');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to generate
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        generateContent();
    }
    // Escape to close modal
    if (e.key === 'Escape') {
        closeAuth();
    }
});

// ===== CONSOLE WELCOME =====
console.log('🍯 HONEY CLOUD — Ultimate AI Platform');
console.log('🤖 AI Models: Claude, ChatGPT, Honey 1.0, DALL-E 3, Midjourney, Google Gemini');
console.log('⚡ Features: Photos, Videos, Websites, Code, Writing, Translation, Chat, Audio, Design, SEO');
console.log('📢 Created by Akshat & Huzaifa ❤️');
console.log('🚀 Press Ctrl+Enter to generate!');
