/**
 * 入力チェック
 * @returns {boolean}
 */
function validate() {
    const elements = getElements();
    document.getElementById('error-title').innerHTML = '';
    document.getElementById('error-author').innerHTML = '';
    if (elements.get('title').value.length === 0) {
        document.getElementById('error-title').innerHTML = 'タイトルが空です';
        document.getElementById('add-button').setAttribute('disabled', 'true');
        return false;
    }
    if (elements.get('author').value.length === 0) {
        document.getElementById('error-author').innerHTML = '著者が空です';
        document.getElementById('add-button').setAttribute('disabled', 'true');
        return false;
    }

    document.getElementById('add-button').removeAttribute('disabled');
}

function Book({author, isbn13, title}) {
    this.author = author;
    this.isbn13 = isbn13;
    this.title = title;
}

const books = [];
books.push(new Book({
    author: '久保田 光則',
    isbn13: '978-4774189673',
    title: 'Webフロントエンド ハイパフォーマンス チューニング'
}));
books.push(new Book({
    author: '仙塲 大也',
    isbn13: '978-4297127831',
    title: '良いコード/悪いコードで学ぶ設計入門 ―保守しやすい 成長し続けるコードの書き方'
}));
books.push(new Book({
    author: '上田 勲',
    isbn13: '978-4798046143',
    title: 'プリンシプル オブ プログラミング3年目までに身につけたい一生役立つ101の原理原則'
}));

$(() => {
    $('#box').html('jQueryを使っています');
});
document.addEventListener("DOMContentLoaded", () => refresh());

/**
 * 追加ボタンをクリックしたときのイベントハンドラー
 */
function add() {
    const elements = getElements();
    addBook({
        author: elements.get('author').value,
        isbn13: elements.get('isbn13').value,
        title: elements.get('title').value,
    });
    refresh();
}

/**
 * 本をBooks配列に追加します
 * @param {string} author
 * @param {string} isbn13
 * @param {string} title
 * @returns {Book}
 */
function addBook({author, isbn13, title}) {
    const book = new Book({
        author: author,
        isbn13: isbn13,
        title: title,
    });
    books.push(book);
}

/**
 * クリックされた本の詳細を表示します
 * @param {number} index
 */
function disp(index) {
    //console.log(`${index}番目がクリックされました`); 動作チェック用
    const bookTitle = document.getElementById('book-title');
    bookTitle.innerHTML = books[index].title;
    const bookAuthor = document.getElementById('book-author');
    bookAuthor.innerHTML = books[index].author;
    const bookIsbn = document.getElementById('book-isbn13');
    bookIsbn.innerHTML = books[index].isbn13;
}

/**
 * ユーザーが入力したinput要素をMapで取得する
 * @returns {Map<string, HTMLElement>}
 */
function getElements() {
    const elements = new Map();
    elements.set('title', document.getElementById('input-title'));
    elements.set('author', document.getElementById('input-author'));
    elements.set('isbn13', document.getElementById('input-isbn13'));
    return elements;
}

/**
 * 本の一覧表を更新し、テキストボックスを空にする
 */
function refresh() {
    const elementBookList = document.getElementById('book-list');
    elementBookList.innerHTML = '';
    books.forEach((book, index) => {
        // li要素作成
        const elementBook = document.createElement('li');
        elementBook.setAttribute('onclick', `disp(${index})`);
        // div要素作成
        const elementDiv = document.createElement('div');
        elementDiv.className = 'd-flex';
        // span要素1作成
        const elementSpan1 = document.createElement('span');
        elementSpan1.className = 'book-title';
        elementSpan1.innerHTML = book.title;
        // span要素2作成
        const elementSpan2 = document.createElement('span');
        elementSpan2.setAttribute('onclick', `remove(${index})`);
        // i要素作成
        const elementI = document.createElement('i');
        elementI.className = 'fas fa-trash';
        // 要素を入れ子にする
        elementSpan2.appendChild(elementI);
        elementDiv.appendChild(elementSpan1);
        elementDiv.appendChild(elementSpan2);
        elementBook.appendChild(elementDiv);
        elementBookList.appendChild(elementBook);
    });
    getElements().forEach((value) => {
        value.value = '';
    });
    document.getElementById('add-button').setAttribute('disabled', 'true');
}

/**
 * 削除ボタンが押された本を一覧から削除する
 * @param {number} index
 */
function remove(index) {
    books.splice(index, 1);
    refresh();
}
