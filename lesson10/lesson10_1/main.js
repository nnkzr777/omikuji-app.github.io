document.addEventListener('DOMContentLoaded', mount);

function mount() {
    let count = 0;
    setInterval(() => {
        count++;
        document.getElementById('timer').innerText = count.toString();
    }, 1000);
}
