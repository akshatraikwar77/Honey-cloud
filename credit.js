function loadCredits() {
    let credits = localStorage.getItem('honey_credits');
    // If never loaded, set to 20 free credits
    if(credits === null) {
        localStorage.setItem('honey_credits', '20');
        credits = '20';
    }
    document.getElementById('credit-count').innerText = credits;
}

// Admin Reset function (Triggered from admin.html)
function resetUserCredits() {
    localStorage.setItem('honey_credits', '20');
    document.getElementById('credit-count').innerText = '20';
    alert("✅ Credits reset to 20! (Local only for now)");
}
