// ===== MENU TOGGLE =====
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}

// ===== TAB SWITCH =====
function switchTab(task) {
    document.querySelectorAll('.gen-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.gen-tab[data-task="${task}"]`).classList.add('active');

    const prompts = {
        'photo': 'Describe the image you want... e.g., "A cyberpunk city at night with neon lights"',
        'video': 'Describe the video you want... e.g., "A cinematic travel video of Paris"',
        'website': 'Describe the website you want... e.g., "A modern portfolio for a photographer"',
        'task': 'Describe the task... e.g., "Write a professional email to a client"'
    };

    document.getElementById('promptInput').placeholder = prompts[task] || 'Describe what you want...';
}

// ===== SELECT FEATURE =====
function selectFeature(type) {
    document.querySelectorAll('.gen-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.gen-tab[data-task="${type}"]`).classList.add('active');
    switchTab(type);
    document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
}

// ===== GENERATE CONTENT =====
function generateContent() {
    const prompt = document.getElementById('promptInput').value.trim();
    const model = document.getElementById('modelSelect').value;
    const style = document.getElementById('styleSelect').value;
    const output = document.getElementById('output');

    if (!prompt) {
        alert('🍯 Please describe what you want to generate!');
        return;
    }

    const activeTab = document.querySelector('.gen-tab.active');
    const task = activeTab ? activeTab.dataset.task : 'task';

    const taskNames = {
        'photo': '🖼️ Photo',
        'video': '🎬 Video',
        'website': '🌐 Website',
        'task': '⚡ Task'
    };

    const modelNames = {
        'claude': '🤖 Claude AI',
        'chatgpt': '💬 ChatGPT',
        'honey': '🍯 Honey 1.0',
        'dalle': '🎨 DALL-E'
    };

    output.classList.add('show');
    output.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;color:#818CF8;">
            <span>⏳</span>
            <span>Generating your ${taskNames[task]} with ${modelNames[model]}...</span>
        </div>
    `;

    setTimeout(() => {
        const resultHTML = `
            <div style="background:#14141f;padding:20px;border-radius:10px;border:1px solid rgba(99,102,241,0.05);">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
                    <h4 style="color:#818CF8;font-size:1rem;">✅ ${taskNames[task]} Generated!</h4>
                    <span style="color:#666;font-size:0.7rem;">${modelNames[model]} • ${style} style</span>
                </div>
                <div style="background:#0a0a12;padding:15px;border-radius:8px;margin:10px 0;color:#888;font-size:0.85rem;border:1px solid rgba(255,255,255,0.03);">
                    <p style="color:#e5e5e5;font-weight:500;">📝 "${prompt.substring(0, 80)}${prompt.length > 80 ? '...' : ''}"</p>
                    <p style="color:#666;margin-top:8px;font-size:0.8rem;">${getResultMessage(task)}</p>
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;">
                    <button style="padding:8px 20px;border-radius:50px;border:none;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;font-weight:600;font-size:0.75rem;cursor:pointer;">📥 Download</button>
                    <button style="padding:8px 20px;border-radius:50px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#888;font-weight:600;font-size:0.75rem;cursor:pointer;" onclick="regenerate()">🔄 Regenerate</button>
                    <button style="padding:8px 20px;border-radius:50px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#888;font-weight:600;font-size:0.75rem;cursor:pointer;" onclick="copyResult()">📋 Copy</button>
                </div>
            </div>
        `;

        output.innerHTML = resultHTML;
        output.style.borderColor = 'rgba(99,102,241,0.08)';

        // Deduct credits
        const creditDisplay = document.querySelector('.credits-amount');
        let currentCredits = parseInt(creditDisplay.textContent);
        if (currentCredits > 0) {
            creditDisplay.textContent = currentCredits - 1;
        }

    }, 2000);
}

function getResultMessage(task) {
    const messages = {
        'photo': '🖼️ Your AI-generated image is ready. Preview it above and download.',
        'video': '🎬 Your AI-generated video is ready. Processing complete.',
        'website': '🌐 Your AI-generated website is ready. Preview and deploy with one click.',
        'task': '⚡ Task completed! Check the results above.'
    };
    return messages[task] || '✨ Generation complete!';
}

function regenerate() {
    generateContent();
}

function copyResult() {
    const output = document.getElementById('output');
    const text = output.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('📋 Copied to clipboard!');
    }).catch(() => {
        alert('📋 Select the text and copy manually.');
    });
}

// ===== CREDITS =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍯 Honey Cloud loaded!');
    console.log('⚡ Credits: ' + document.querySelector('.credits-amount').textContent);
    console.log('🤖 AI Models: Claude, ChatGPT, Honey 1.0, DALL-E');
});
