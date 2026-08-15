document.addEventListener('DOMContentLoaded', () => {
    const credits = localStorage.getItem('honey_credits') || '20';
    document.getElementById('admin-credit-count').innerText = credits;
});

function setCustomLimit() {
    const limit = document.getElementById('limit-input').value;
    localStorage.setItem('honey_daily_limit', limit);
    alert(`Daily limit set to ${limit} tasks!`);
}
