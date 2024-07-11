const myLibrary = [];
let container = document.querySelector(".container");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    if(this.read === "no"){
        return this.title + " by " + this.author + ", " + this.pages + " pages, not read yet";
    }
    else{
        return this.title + " by " + this.author + ", " + this.pages + " pages, has been read ";
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
    container.innerHTML="";
    displayBooksInLibrary();
}

// let deleteButton = document.querySelector(".delete");
// deleteButton.addEventListener("click",()=>{
//     myLibrary.splice(deleteButton.getAttribute("index")-1,1);
// })


// const display = document.querySelector(".display-books");
// display.addEventListener("click",displayBooksInLibrary);

const dialog = document.querySelector("dialog");
const showDialogButton = document.querySelector(".new-book");
const closeDialogButton = document.querySelector(".close-dialog");
const confirmDialogButton = document.querySelector(".confirm-dialog")

showDialogButton.addEventListener("click", ()=>{
    dialog.showModal();
})

closeDialogButton.addEventListener("click", ()=>{
    dialog.close();
})

confirmDialogButton.addEventListener("click", (event)=>{
    event.preventDefault();
    const form = document.querySelector("form");
    const bookTitle = document.querySelector("form #title").value;
    const bookAuthor = document.querySelector("form #author").value;
    const bookPages = document.querySelector("form #pages").value;
    const bookRead = document.querySelector("form #read").value;
    let newBook = new Book(bookTitle,bookAuthor,bookPages,bookRead);
    addBookToLibrary(newBook);
    form.reset();
    dialog.close();
    
})


// function displayBooksInLibrary(){
//     myLibrary.forEach((book)=>{
//         let h2 = document.createElement("h2");
//         h2.textContent = book.info();
//         container.appendChild(h2);
//     })
// }

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
        placementOfBook.appendChild(deleteButton);

        let readButton = document.createElement("button");
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
        placementOfBook.appendChild(readButton)
        
        container.appendChild(placementOfBook);
    }
}