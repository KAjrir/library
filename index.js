class Book {
    constructor(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;
    }
}

class Library {
    constructor() {
        this.booklist = JSON.parse(localStorage.getItem("library")) || [];
    }

    saveBooks() {
        localStorage.setItem("library", JSON.stringify(this.booklist));
    }

    addBook(name, author, pages) {
        const newBook = new Book(name, author, Number(pages));
        this.booklist.push(newBook);
        this.saveBooks();
        this.updateList();
    }

    removeBook(index) {
        this.booklist.splice(index, 1);
        this.saveBooks();
        this.updateList();
    }

    updateList() {
        const bookContainer = document.querySelector('.book-container');
        bookContainer.innerHTML = '';

        this.booklist.forEach((book, index) => {
            bookContainer.innerHTML += `
                <div class="book-card">
                    <p><strong>${book.name}</strong> by ${book.author}</p>
                    <select name="status" id="status">
                        <option value="not read yet">not read yet</option>
                        <option value="reading">reading</option>
                        <option value="read">read</option>
                    </select>
                    <div class="under-class">
                        <button onclick='library.removeBook(${index})'>Delete</button>
                        <p><strong>${book.pages} pages</strong></p>
                    </div>
                </div>`;
        });
    }
}

const library = new Library();
library.updateList();

const inputButton = document.getElementById('inputform');
inputButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const bookName = document.getElementById('name').value;
    const bookAuthor = document.getElementById('author').value;
    const bookPages = document.getElementById('pages').value;
    library.addBook(bookName, bookAuthor, bookPages);
    inputButton.reset();
});