document.addEventListener('DOMContentLoaded', mount);

function mount() {
    document.getElementById('button-start').addEventListener('click', start);
}

function start() {
    let count = 0;
    document.getElementById('button-start').setAttribute('disabled','true');
    setInterval(() => {
        count++;
        document.getElementById('timer').innerText = count.toString();
    }, 1000);
}
