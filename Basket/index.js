let basketArr = [];
let nullCheck = localStorage.getItem("basket");
if (nullCheck === null) {
  basketArr = [];
} else {
  basketArrUpdatedNew = localStorage.getItem("basket");
  basketArr = JSON.parse(basketArrUpdatedNew);
}

let products = [
  {
    names: "Managed IT services",
    description: "Naxly bring the power of data science and artificial",
    price: 1100,
    logo: "fa-boxes-stacked",
    idProduct: 1,
    TotalPrice: 0,
    TotalCount: 0,
  },
  {
    names: "Backup and recovery",
    description: "Naxly bring the power of data science and artificial",
    price: 1200,
    logo: "fa-toolbox",
    idProduct: 2,
    TotalPrice: 0,
    TotalCount: 0,
  },
  {
    names: "Cyber security",
    description: "Naxly bring the power of data science and artificial",
    price: 1500,
    logo: "fa-shield",
    idProduct: 3,
    TotalPrice: 0,
    TotalCount: 0,
  },
];

function productsAddMainPage() {
  let mainPageContainer = document.querySelector("#mainPageContainer");
  let newProducts = "";
  for (let i = 0; i < products.length; i++) {
    let newProduct = `
        <div class="container2_boxes_box">
                    <i class="container2_boxes_box_icon fa-solid ${products[i].logo}"></i>
                    <p class="product_price"><span>Price: </span><span>${products[i].price}</span><span> USD</span></p>
                    <h1 class="container2_boxes_box_header">${products[i].names}</h1>
                    <p class="container2_boxes_box_text">${products[i].description}</p>
                        <button class="addBasket-btn" onclick="addProduct(${products[i].idProduct})">Add to basket</button>
                </div>
        `;
    newProducts += newProduct;
  }
  mainPageContainer.innerHTML = newProducts;
}
productsAddMainPage();

function addProduct(ProductID) {
  let searchOBJ = products.find((obj) => obj.idProduct == ProductID);
  let index = products.indexOf(searchOBJ);
  let searchOBJBasket = basketArr.find((obj) => obj.idProduct == ProductID);
  let indexBasket = basketArr.indexOf(searchOBJBasket);
  if (indexBasket < 0) {
    products[index].TotalCount = 0;
    products[index].TotalPrice = 0;
    basketArr.push(products[index]);
    let searchOBJBasketNew = basketArr.find(
      (obj) => obj.idProduct == ProductID
    );
    let indexBasketNew = basketArr.indexOf(searchOBJBasketNew);
    let basket = document.querySelector("#basketVisible");
    let newBasketProduct = document.createElement("div");
    newBasketProduct.innerHTML = `
                    <i class="container2_boxes_box_icon fa-solid ${products[index].logo}"></i>
                    <p class="product_price"><span>Price: </span><span>${products[index].price}</span><span> USD</span></p>
                    <h1 class="container2_boxes_box_header">${products[index].names}</h1>
                    <p class="container2_boxes_box_text">${products[index].description}</p>
                        <button onclick="increaseProduct(${ProductID})">+</button>
                        <button onclick="decreaseProduct(${ProductID})">-</button>
                        <button class="removeBtn" onclick="RemoveProduct(${ProductID})">Remove</button>
                        <p>Number: <span id="Number${ProductID}">${basketArr[indexBasketNew].TotalCount}</span></p>
                        <p>Total Price: <span id="TotalPrice${ProductID}">${basketArr[indexBasketNew].TotalPrice}</span></p>
    `;
    newBasketProduct.classList.add("container2_boxes_box_basket");
    newBasketProduct.setAttribute("id", `box${ProductID}`);
    basket.appendChild(newBasketProduct);
    increaseProduct(ProductID);
  } else {
    increaseProduct(ProductID);
  }
  basketTableFulfill();
}

function increaseProduct(ProductID) {
  let searchOBJ = basketArr.find((obj) => obj.idProduct == ProductID);
  let index = basketArr.indexOf(searchOBJ);
  basketArr[index].TotalPrice += basketArr[index].price;
  basketArr[index].TotalCount += 1;
  fulfill(ProductID, index);
}

function decreaseProduct(ProductID) {
  let searchOBJ = basketArr.find((obj) => obj.idProduct == ProductID);
  let index = basketArr.indexOf(searchOBJ);
  if (basketArr[index].TotalPrice > 0) {
    basketArr[index].TotalPrice =
      basketArr[index].TotalPrice - basketArr[index].price;
    basketArr[index].TotalCount = basketArr[index].TotalCount - 1;
    fulfill(ProductID, index);
  }
}
function fulfill(ProductID, index) {
  let number = document.querySelector(`#Number${ProductID}`);
  let totalPrice = document.querySelector(`#TotalPrice${ProductID}`);
  number.innerHTML = basketArr[index].TotalCount;
  totalPrice.innerHTML = basketArr[index].TotalPrice;
  let basketStorage = JSON.stringify(basketArr);
  localStorage.setItem("basket", basketStorage);
  basketTableFulfill();
}

function RemoveProduct(ProductID) {
  let searchOBJBasketRemove = basketArr.find(
    (obj) => obj.idProduct == ProductID
  );
  let indexBasketRemove = basketArr.indexOf(searchOBJBasketRemove);
  basketArr.splice(indexBasketRemove, 1);
  let basketStorage = JSON.stringify(basketArr);
  localStorage.setItem("basket", basketStorage);
  basketTableFulfill();
}

function basketTableFulfill() {
  let basketHTML = "";
  let basket = document.querySelector("#basketVisible");
  for (let i = 0; i < basketArr.length; i++) {
    let newBasketProduct = `
    <div class="container2_boxes_box_basket">
      <i class="container2_boxes_box_icon fa-solid ${basketArr[i].logo}"></i>
      <p class="product_price"><span>Price: </span><span>${basketArr[i].price}</span><span> USD</span></p>
      <h1 class="container2_boxes_box_header">${basketArr[i].names}</h1>
      <p class="container2_boxes_box_text">${basketArr[i].description}</p>
      <button class="increaseDecreaseBtn" onclick="increaseProduct(${basketArr[i].idProduct})">+</button>
      <button class="increaseDecreaseBtn" onclick="decreaseProduct(${basketArr[i].idProduct})">-</button>
      <button class="removeBtn" onclick="RemoveProduct(${basketArr[i].idProduct})">Remove</button>
      <p>Number: <span id="Number${basketArr[i].idProduct}">${basketArr[i].TotalCount}</span></p>
      <p>Total Price: <span id="TotalPrice${basketArr[i].idProduct}">${basketArr[i].TotalPrice}</span></p>
    </div>
    `;
    basketHTML += newBasketProduct;
  }
  basket.innerHTML = basketHTML;
}
basketTableFulfill();

function basketShow() {
  let basketShow = document.querySelector("#basketVisible");
  basketShow.classList.toggle("basketVisible");
}


