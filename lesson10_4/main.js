// ## 課題4
//
// 以下のようなタイマーアプリを作りましょう。
//
// 1. まず画面にスタートボタン，ストップボタン，リセットボタンと0を表示します。このとき，スタートボタンは押せる状態，ストップボタンとリセットボタンは押せない状態にします。
// 2. スタートボタンを押すと1秒ごとにカウントアップを始めます。このとき，スタートボタンとリセットボタンは押せない状態，ストップボタンは押せる状態にします。
// 3. ストップボタンを押すとその数字で止まります。このとき，スタートボタンとリセットボタンは押せる状態，ストップボタンは押せない状態にします。
// 4. スタートボタンを押すとその数字から再びカウントアップが始まります。2の状態に戻ります。
// 5. 3の状態のあと，リセットボタンを押すと数字が0に戻り，1の状態になります。
//
// デザインは`style.css`に書いてあります。お好みで書き換えてください。
//
// ### 実行例
// ![実行例](assets/movgif/lesson10-04-01.gif)
//
//     [答え](samples/lesson10/lesson10-04)

document.addEventListener('DOMContentLoaded', mount);

function mount() {
    document.getElementById('button-start').onclick = start;
    document.getElementById('button-stop').onclick = stop;
}

let count = 0;
let timerId;

function start() {
    document.getElementById('button-start').disabled = true;
    document.getElementById('button-stop').removeAttribute('disabled');
    document.getElementById('button-reset').disabled = true;
    timerId = setInterval(() => {
        count++;
        document.getElementById('timer').innerText = count.toString();
    }, 1000);
}

function stop() {
    document.getElementById('button-start').removeAttribute('disabled');
    document.getElementById('button-stop').disabled = true;
    document.getElementById('button-reset').removeAttribute('disabled');
    clearInterval(timerId);
}

function reset() {
    count = 0;
    document.getElementById('timer').innerText = count.toString();
}
