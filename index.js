const loadingButtonState = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
Loading...`;
let booksData = [];
function fetchUrl(event, endpoint) {
  let beforeButtonState = event.target.innerHTML;
  event.target.innerHTML = loadingButtonState;
  fetch(`https://striveschool-api.herokuapp.com/books`)
    .then((response) => response.json())
    .then((data) => {
      event.target.innerHTML = beforeButtonState;
      booksData = data;
      loadCards();
      console.log(booksData);
    })
    .catch((err) => {
      //alertUser("fail");
      console.error(err);
    });
}

const loadBooksButton = document.getElementById("load-books");
loadBooksButton.addEventListener("click", fetchUrl);
mainRow = document.getElementById("main-row");
function loadCards() {
  //alertUser("success");
  mainRow.innerHTML = "";
  booksData.map((elem) => {
    const column = document.createElement("div");
    column.classList.add("col-md-3");
    mainRow.appendChild(column);
    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow");
    column.appendChild(card);
    const cardImage = document.createElement("img");
    card.appendChild(cardImage);
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("src", elem.img);
    const cardBody = document.createElement("div");
    card.appendChild(cardBody);
    const bookName = document.createElement("h5");
    bookName.classList.add("text-truncate");
    bookName.innerText = `${elem.title}`;
    const bookCategory = document.createElement("h6");
    bookCategory.innerHTML = `Category: <i>${elem.category}</i> `;
    const bookPrice = document.createElement("p");
    bookPrice.innerText = `${elem.price} €`;
    cardBody.appendChild(bookName);
    cardBody.appendChild(bookCategory);
    cardBody.appendChild(bookPrice);
    cardBody.classList.add("p-3");
    card.style.maxHeight = "450px";
    card.classList.add("mb-4");
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("d-flex", "justify-content-center", "p-4");
    card.appendChild(buttonsDiv);
    const addToCartButton = document.createElement("button");
    /* addToCartButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="mr-1" fill="none" viewBox="0 0 24 24" style="height:25px" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg> Add to cart`; */
    const cartSymbol = document.createElement("i");
    cartSymbol.classList.add("fas", "fa-shopping-cart");
    addToCartButton.appendChild(cartSymbol);
    const addToCartSpan = document.createElement("span");
    addToCartButton.appendChild(addToCartSpan);
    addToCartSpan.innerText = "Add to cart";
    addToCartButton.classList.add("btn", "btn-info");
    //addToCartButton.setAttribute("data-toggle", "modal");
    //addToCartButton.setAttribute("data-target", "#exampleModal");
    addToCartButton.addEventListener("click", addToCart);
    buttonsDiv.appendChild(addToCartButton);
  });
}

function showModal(event) {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  const modalImg = document.createElement("img");
  modalBody.appendChild(modalImg);
  modalImg.classList.add("img-fluid");
  modalImg.setAttribute("src", event.target.parentNode.parentNode.childNodes[0].src);
}
let cartItems = [];

function addToCart(event) {
  console.log(event);
  let addToCartButton = event.target;
  addToCartButton.classList.remove("btn-info");
  addToCartButton.classList.add("btn-success");
  addToCartButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="height:25px" class="mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg> Added! `;
  addToCartButton.removeEventListener("click", addToCart);
  addToCartButton.addEventListener("click", removeFromCart);
}

function removeFromCart(event) {
  let addToCartButton = event.target;
  addToCartButton.classList.remove("btn-success");
  addToCartButton.classList.add("btn-info");
  addToCartButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="mr-1" fill="none" viewBox="0 0 24 24" style="height:25px" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg> Add to cart `;
  addToCartButton.removeEventListener("click", removeFromCart);
  addToCartButton.addEventListener("click", addToCart);
}

function hideCard(event) {
  event.target.parentNode.parentNode.classList.add("d-none");
}
