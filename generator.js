function handleGenerate() {
    const prompt = document.getElementById('prompt-input').value;
    if(!prompt) return alert("Please describe what you want to generate!");

    // Check Credits
    let credits = parseInt(localStorage.getItem('honey_credits') || '20');
    if(credits <= 0) return alert("❌ Out of credits! Visit the Admin panel to reset or upgrade your plan.");
    
    // Deduct 1 Credit
    localStorage.setItem('honey_credits', credits - 1);
    document.getElementById('credit-count').innerText = credits - 1;

    const outputContainer = document.getElementById('output-container');
    const outputContent = document.getElementById('output-content');
    const generateBtn = document.getElementById('generate-btn');

    outputContainer.style.display = 'flex';
    outputContent.innerText = "🤖 Honey Cloud is thinking... (Simulated AI Generation)";
    generateBtn.disabled = true;
    generateBtn.innerText = "⏳ Generating...";

    setTimeout(() => {
        outputContent.innerText = `✅ [${document.getElementById('model-select').value}]\n\nHere is your generated content based on: "${prompt}"\n\n---\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (This is a simulated result for Phase 1 UI).`;
        generateBtn.disabled = false;
        generateBtn.innerText = "✨ Generate";
    }, 2000);
}

function copyOutput() {
    const text = document.getElementById('output-content').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
}

function downloadOutput() {
    const text = document.getElementById('output-content').innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'honeycloud_output.txt';
    a.click();
}
