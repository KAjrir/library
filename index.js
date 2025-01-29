 const inputButton = document.getElementById('inputform')

const booklist = [];

function Book(name, author, pages){
    this.name = name
    this.author = author
    this.pages = pages
};

inputButton.addEventListener('submit', (event) => {
    event.preventDefault();
    addBook();
    inputButton.reset();

})

const bookContainer = document.querySelector('.book-container');

function addBook(){
    const bookName = document.getElementById('name').value;
    const bookAuthor = document.getElementById('author').value;
    const bookPages = document.getElementById('pages').value;


    const newBook = new Book(bookName, bookAuthor, Number(bookPages))

    booklist.push(newBook)
    updateList();
}

function removeBook(index){
    booklist.splice(index, 1);
    updateList();
}

function updateList(){
    bookContainer.innerHTML = '';

    booklist.forEach((book, index) => {
        bookContainer.innerHTML += `
            <div class="book-card">
            <p><strong>${book.name}</strong> by ${book.author}</p>
            <select name="status" id="status">
                <option value="not read yet">not read yet</option>
                <option value="reading">reading</option>
                <option value="read">read</option>
            </select>
            <div class="under-class">
                <button onclick='removeBook(${index})'>Delete</button>
                <p><strong>${book.pages} pages</strong></p>
            </div>
        </div>`
    })
}