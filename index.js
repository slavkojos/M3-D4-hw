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

const showCartButton = document.getElementById("load-cart");
showCartButton.onclick = showCart;
showCartButton.setAttribute("data-toggle", "modal");
showCartButton.setAttribute("data-target", "#exampleModal");

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
    const cartSymbol = document.createElement("i");
    cartSymbol.classList.add("fas", "fa-shopping-cart", "mr-1");
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
  console.log(event.currentTarget.parentNode.parentNode);
  let addToCartButton = event.currentTarget;
  addToCartButton.classList.remove("btn-info");
  addToCartButton.classList.add("btn-success");
  addToCartButton.innerHTML = `<i class="fas fa-check mr-1"></i> Added!`;
  addToCartButton.removeEventListener("click", addToCart);
  addToCartButton.addEventListener("click", removeFromCart);
  const cards = document.getElementsByClassName("card");
  cartItems.push(
    parseInt(
      Array.from(event.currentTarget.parentNode.parentNode.parentNode.parentNode.children).indexOf(
        event.currentTarget.parentNode.parentNode.parentNode
      )
    )
  );
  console.log(cartItems);
}

function removeFromCart(event) {
  let addToCartButton = event.currentTarget;
  addToCartButton.classList.remove("btn-success");
  addToCartButton.classList.add("btn-info");
  addToCartButton.innerHTML = `<i class="fas fa-shopping-cart mr-1"></i> Add to cart`;
  addToCartButton.removeEventListener("click", removeFromCart);
  addToCartButton.addEventListener("click", addToCart);
  cartItems.splice(
    cartItems.indexOf(
      Array.from(event.currentTarget.parentNode.parentNode.parentNode.parentNode.children).indexOf(
        event.currentTarget.parentNode.parentNode.parentNode
      )
    ),
    1
  );
  console.log(cartItems);
}

const modalBody = document.getElementById("modal-body");
function showCart() {
  if (cartItems.length === 0) {
    console.log("okk");
    modalBody.innerHTML = `<h3 class="text-center">Cart is empty</h3>`;
  } else loadCart();
}

function loadCart() {
  modalBody.innerHTML = "";
  const cartTable = document.createElement("table");
  cartTable.classList.add("w-100");
  const cartTableHead = document.createElement("thead");
  const cartTableHeadRow = document.createElement("tr");
  const cartTableHeader1 = document.createElement("th");
  const cartTableHeader2 = document.createElement("th");
  const cartTableHeader3 = document.createElement("th");
  const cartTableHeader4 = document.createElement("th");
  const cartTableBody = document.createElement("tbody");
  modalBody.appendChild(cartTable);
  cartTable.appendChild(cartTableHead);
  cartTableHead.appendChild(cartTableHeadRow);
  cartTableHeadRow.appendChild(cartTableHeader1);
  cartTableHeadRow.appendChild(cartTableHeader2);
  cartTableHeadRow.appendChild(cartTableHeader3);
  cartTableHeadRow.appendChild(cartTableHeader4);
  cartTableHeader1.setAttribute("scope", "col");
  cartTableHeader2.setAttribute("scope", "col");
  cartTableHeader3.setAttribute("scope", "col");
  cartTableHeader4.setAttribute("scope", "col");
  cartTable.appendChild(cartTableBody);
  cartTableHeader1.innerText = "#";
  cartTableHeader2.innerText = "Image";
  cartTableHeader3.innerText = "Title";
  cartTableHeader4.innerText = "Price";
  let tableRowID = 0;
  let totalPrice = 0;
  cartItems.map((cartItem) => {
    tableRowID++;
    console.log(booksData[cartItem].title);
    const cartTableBodyRow = document.createElement("tr");
    cartTableBodyRow.classList.add("my-4");
    const cartItemID = document.createElement("td");
    const cartItemImage = document.createElement("td");
    const cartItemPicture = document.createElement("img");
    cartItemImage.appendChild(cartItemPicture);
    const cartItemTitle = document.createElement("td");
    const cartItemPrice = document.createElement("td");
    cartTableBody.appendChild(cartTableBodyRow);
    cartTableBodyRow.appendChild(cartItemID);
    cartTableBodyRow.appendChild(cartItemImage);
    cartTableBodyRow.appendChild(cartItemTitle);
    cartTableBodyRow.appendChild(cartItemPrice);
    cartItemID.innerText = tableRowID;
    cartItemPicture.setAttribute("src", `${booksData[cartItem].img}`);
    cartItemPicture.style.height = "100px";
    cartItemTitle.innerText = booksData[cartItem].title;
    cartItemPrice.innerText = `${booksData[cartItem].price} €`;
    totalPrice += parseFloat(booksData[cartItem].price);
  });
  const total = document.createElement("h5");
  const hr = document.createElement("hr");
  modalBody.appendChild(hr);
  modalBody.appendChild(total);
  total.classList.add("text-right", "pr-3");
  total.innerText = `TOTAL: ${totalPrice.toFixed(2)} €`;
}
