const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
};


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = ''; // Clear existing books

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.index = index; // Store index as data-attribute

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="removeBtn">Remove</button>
      <button class="toggleReadBtn">Toggle Read</button>
    `;
    libraryDiv.appendChild(bookCard);
  });

  // Add event listeners to buttons after they are created
  addEventListeners();
}

function addEventListeners() {
    const removeButtons = document.querySelectorAll('.removeBtn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeBook);
    });

    const toggleReadButtons = document.querySelectorAll('.toggleReadBtn');
    toggleReadButtons.forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });
}


function removeBook(event) {
    const bookCard = event.target.parentElement;
    const index = bookCard.dataset.index;
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(event) {
    const bookCard = event.target.parentElement;
    const index = bookCard.dataset.index;
    myLibrary[index].toggleReadStatus();
    displayBooks();
}



// Sample books (for initial display)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);


const newBookBtn = document.getElementById('newBookBtn');
const newBookForm = document.getElementById('newBookForm');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
  newBookForm.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
    newBookForm.style.display = 'none';
    bookForm.reset(); // Clear form fields
});


bookForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from actually submitting

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  newBookForm.style.display = 'none';
  bookForm.reset(); // Clear the form after submission
});

displayBooks(); // Initial display of books
