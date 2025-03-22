document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});

window.addEventListener('load', () => {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const percentage = progressBar.getAttribute('data-percentage');
        progressBar.style.width = `${percentage}%`;
    }
});