$(() => refresh());

/**
 * 入力チェック
 * @returns {boolean}
 */
function validate() {
    const elements = getElements();
    $('#error-title').html('');
    $('#error-author').html('');
    if (elements.get('title').prop('value').length === 0) {
        $('#error-title').html('タイトルが空です');
        //$('#add-button').prop({disabled: true}); これでも表示される
        $('#add-button').attr('disabled', 'true');
        return false;
    }
    if (elements.get('author').prop('value').length === 0) {
        $('#error-author').html('著者が空です');
        $('#add-button').prop({disabled: true});
        //$('#add-button').attr('disabled','true'); これでも表示される
        return false;
    }
    $('#add-button').removeAttr('disabled');
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

/**
 * 追加ボタンをクリックしたときのイベントハンドラー
 */
function add() {
    const elements = getElements();
    addBook({
        author: elements.get('author').prop('value'),
        isbn13: elements.get('isbn13').prop('value'),
        title: elements.get('title').prop('value'),
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
    $('#book-title').html(books[index].title);
    $('#book-author').html(books[index].author);
    $('#book-isbn13').html(books[index].isbn13);
}

/**
 * ユーザーが入力したinput要素をMapで取得する
 * @returns {Map<string, JQuery<HTMLElement>>}
 */
function getElements() {
    const elements = new Map();
    elements.set('title', $('#input-title'));
    elements.set('author', $('#input-author'));
    elements.set('isbn13', $('#input-isbn13'));
    return elements;
}

/**
 * 本の一覧表を更新し、テキストボックスを空にする
 */
function refresh() {
    $('#book-list').html('');
    books.forEach((book, index) => {
        // li要素作成
        const elementBook = $('<li>', {onclick: `disp(${index})`});
        // div要素作成
        const elementDiv = $('<div>', {class: 'd-flex'});
        // span要素1作成
        const elementSpan1 = $('<span>', {class: 'book-title', html: book.title});
        // span要素2作成
        const elementSpan2 = $('<span>', {onclick: `remove(${index})`});
        // i要素作成
        const elementI = $('<i>', {class: 'fas fa-trash'});
        // 要素を入れ子にする
        $('#book-list').append(elementBook.append(elementDiv.append(elementSpan1, elementSpan2.append(elementI))));
    });
    getElements().forEach((value) => {
        value.prop({value: ''});
    });
    $('#add-button').attr('disabled', 'true');
}

/**
 * 削除ボタンが押された本を一覧から削除する
 * @param {number} index
 */
function remove(index) {
    books.splice(index, 1);
    refresh();
}
