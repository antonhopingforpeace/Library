const myLibrary = [];
let container = document.querySelector(".container");

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info(){
        if(this.read === "no"){
            return this.title + " by " + this.author + ", " + this.pages + " pages, not read yet";
        }
        else{
            return this.title + " by " + this.author + ", " + this.pages + " pages, has been read ";
        }
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
    container.innerHTML="";
    storeInLocalStorage();
    displayBooksInLibrary();
}

const dialog = document.querySelector("dialog");
const showDialogButton = document.querySelector(".new-book");
const closeDialogButton = document.querySelector(".close-dialog");
const confirmDialogButton = document.querySelector(".confirm-dialog");

const bookTitle = document.querySelector("form #title");
const bookAuthor = document.querySelector("form #author");
const bookPages = document.querySelector("form #pages");
const bookRead = document.querySelector("form #read");


showDialogButton.addEventListener("click", ()=>{
    dialog.showModal();
})

closeDialogButton.addEventListener("click", ()=>{
    dialog.close();
})

confirmDialogButton.addEventListener("click", (event)=>{

    const form = document.querySelector("form");

    //With this i can check validity!!!
    if (!form.checkValidity()) {

        if (bookTitle.validity.tooShort) {
            bookTitle.setCustomValidity("I am expecting a Title at least three letters long!");
        }
        else if(bookTitle.validity.valueMissing){
            bookTitle.setCustomValidity("I am expecting a Title!");
        }
        else{
            bookTitle.setCustomValidity("");
        }

        if (bookAuthor.validity.tooShort) {
            bookAuthor.setCustomValidity("I am expecting an Authors name at least three letters long!");
        }
        else if(bookAuthor.validity.valueMissing){
            bookAuthor.setCustomValidity("I am expecting an Authors name!");
        }
        else{
            bookAuthor.setCustomValidity("");
        }

        if (bookPages.validity.rangeUnderflow) {
            bookPages.setCustomValidity("I am expecting a book that has more than 5 pages");
        }
        else if(bookPages.validity.valueMissing){
            bookPages.setCustomValidity("I am expecting the books length in pages!");
        }
        else{
            bookPages.setCustomValidity("");
        }

        form.reportValidity();
        return;
    }
    

    let newBook = new Book(bookTitle.value,bookAuthor.value,bookPages.value,bookRead.value);
    addBookToLibrary(newBook);
    form.reset();
    dialog.close();
})

function displayBooksInLibrary(){
    
    for(let i = 0; i< myLibrary.length; i++){
        let placementOfBook = document.createElement("div");
        
        let h2 = document.createElement("h2");
        h2.textContent = myLibrary[i].info();
        placementOfBook.appendChild(h2);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent="DEL";
        deleteButton.addEventListener("click",(element)=>{
            element.target.parentElement.remove();
            myLibrary.splice(i,1);
            container.innerHTML="";
            displayBooksInLibrary();
        });
        

        let readButton = document.createElement("button");
        readButton.classList.add("read");
        readButton.textContent="READ";
        readButton.addEventListener("click",()=>{
            if(myLibrary[i].read==="yes"){
                myLibrary[i].read="no";
            }
            else{
                myLibrary[i].read="yes";
            }
                h2.textContent = myLibrary[i].info();
        });
        placementOfBook.appendChild(readButton);
        placementOfBook.appendChild(deleteButton);
        
        container.appendChild(placementOfBook);
    }
}

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } 
    catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

function storeInLocalStorage() {
    const libraryArray = [];
  
    myLibrary.forEach((element) => {
      libraryArray.push(element);
    });
  
    let libraryArrayString = JSON.stringify(libraryArray);
    localStorage.setItem("__libraryArray", libraryArrayString);
}

function loadDataOfLocalStorage() {
    const savedLibrary = JSON.parse(localStorage.getItem("__libraryArray"));
  
    savedLibrary.forEach((book, index) => {
      let title = book.title;
      let author = book.author;
      let pages = book.pages;
      let read = book.read;
  
      myLibrary.push(new Book(title,author,pages,read));
    });
}

if (storageAvailable("localStorage")) {
    if (localStorage.getItem("__libraryArray")){
      loadDataOfLocalStorage();
      displayBooksInLibrary()
    }     
} 
