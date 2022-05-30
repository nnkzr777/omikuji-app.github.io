// ## 課題3
//
// 以下のようなタイマーアプリを作りましょう。
//
// 1. まず画面にスタートボタン，ストップボタンと0を表示します。このとき，スタートボタンは押せる状態，ストップボタンは押せない状態にします。
// 2. スタートボタンを押すと1秒ごとにカウントアップを始めます。このとき，スタートボタンは押せない状態，ストップボタンは押せる状態にします。
// 3. ストップボタンを押すとその数字で止まります。このとき，スタートボタンは押せる状態，ストップボタンは押せない状態にします。
// 4. スタートボタンを押すとその数字から再びカウントアップが始まります。2の状態に戻ります。
//
// デザインは`style.css`に書いてあります。お好みで書き換えてください。
//
// ※ タイマーを0にする機能がないので，0に戻すにはブラウザのタブをリロードしてください。
//
// ### 実行例
// ![実行例](assets/movgif/lesson10-03-01.gif)
//
// ### HINT
//
// 繰り返し処理を止めるには，以下のように書きます。
//
// ```js
// let timerId;
// ・・・略・・・
// timerId = setInterval(繰り返したい処理を書いた関数, 繰り返し間隔);
// ・・・略・・・
// clearInterval(timerId);
// ```
//
//     [答え](samples/lesson10/lesson10-03)

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
    timerId = setInterval(() => {
        count++;
        document.getElementById('timer').innerText = count.toString();
    }, 1000);
}

function stop() {
    document.getElementById('button-start').removeAttribute('disabled');
    document.getElementById('button-stop').disabled = true;
    clearInterval(timerId);
}
