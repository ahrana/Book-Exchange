// Simulated database using localStorage
var bookDatabase = JSON.parse(localStorage.getItem("bookDatabase")) || [];

// Function to save book data to the database
function saveBookToDatabase(book) {
  bookDatabase.push(book);
  localStorage.setItem("bookDatabase", JSON.stringify(bookDatabase));
}

// Function to remove book from the database
function removeBookFromDatabase(index) {
  bookDatabase.splice(index, 1);
  localStorage.setItem("bookDatabase", JSON.stringify(bookDatabase));
}

// Function to render the book list
function renderBookList() {
  var bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  bookDatabase.forEach(function (book, index) {
    var bookItem = document.createElement("li");
    bookItem.classList.add("book-item");

    var bookInfo = document.createElement("div");
    bookInfo.innerHTML = `
      <span><i class="fas fa-book"></i> ${book.title}</span><br>
      <span><i class="fas fa-user"></i> ${book.author}</span><br>
      </br><span><i class="fas fa-user"></i> ${book.contactPerson}</span><br>
      <span><i class="fas fa-phone"></i> ${book.contactNumber}</span><br>
      <span><i class="fas fa-map-marker-alt"></i> ${book.location}</span><br>
      <img src="${book.cover}" alt="Book Cover" width="100">
    `;

    var removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "btn-sm", "ml-3");
    removeButton.innerHTML = '<i class="fas fa-trash"></i> Remove';
    removeButton.addEventListener("click", function () {
      removeBookFromDatabase(index);
      renderBookList();
    });

    bookItem.appendChild(bookInfo);
    bookItem.appendChild(removeButton);

    bookList.appendChild(bookItem);
  });
}

// Render the initial book list
renderBookList();

// Add book form submit event listener
document.getElementById("add-book-form").addEventListener("submit", function (event) {
  event.preventDefault();

  var titleInput = document.getElementById("book-title");
  var authorInput = document.getElementById("book-author");
  var contactPersonInput = document.getElementById("contact-person");
  var contactNumberInput = document.getElementById("contact-number");
  var locationInput = document.getElementById("location");
  var coverInput = document.getElementById("book-cover");

  var newBook = {
    title: titleInput.value,
    author: authorInput.value,
    contactPerson: contactPersonInput.value,
    contactNumber: contactNumberInput.value,
    location: locationInput.value,
    cover: coverInput.value || "default-cover.jpg" // Default cover if no value provided
  };

  saveBookToDatabase(newBook);
  renderBookList();

  titleInput.value = "";
  authorInput.value = "";
  contactPersonInput.value = "";
  contactNumberInput.value = "";
  locationInput.value = "";
  coverInput.value = "";
});
