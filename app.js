const addItem = document.querySelector("button.add");
const removeItem = document.querySelector("button.minuse");
const output = document.querySelector("div.output");
const cart = document.querySelector("nav > section.user div.cart");
const cartAlert = document.querySelector("nav > section.user div.cart > div");
const cartDashboard = document.querySelector("nav > div.dashboard");
const cartData = document.querySelector("nav > div.dashboard > div.data");
const addToCart = document.querySelector(
  "header > main > section.data  section.count > button"
);
const card = document.querySelectorAll(".card");
const showcase = document.querySelectorAll("header > figure > div > img");
const btnNext = document.querySelector("button.right");
const btnPrev = document.querySelector("button.left");

// usable data
let itemCount = 0;
let orderCount = 0
let isCartOpen = false;
let orderList = [
  {
    Id: 1,
    name: "snecker",
    title: "Fall limited edition sneckers",
    price: 250,
    // size: "",
    pic: "./images/image-product-1.jpg",
    discount: 50,
  },
];
let orderPicked = [];
let template = `<div class="container"></div>
                <button>Checkout</button>`;
let activeShow = 0;

// usable functionalities
function updateCartDB(){
  // updating cart dashboard
  if (orderPicked.length > 0) {
    cartData.innerHTML = template;
    // element = document.createElement("p")

    let cart = cartData.querySelector("div.container");
    orderPicked.forEach(() => {
      cart.appendChild(createItemCard(orderPicked[0]));
    });
    // cartData.appendChild()
  } else {
    element = document.createElement("p");

    element.innerText = "your cart is empty";
    cartData.innerHTML = "";
    cartData.appendChild(element);
  }
  if (orderCount == 0) {
    cartAlert.classList.remove("picked")    
  } else {
    cartAlert.classList.add("picked")
    cartAlert.innerText = orderCount   
  }
}
function getDiscount(data) {
  return {
    newPrice: data.price - (50 / 100) * data.price,
    total: (data.price - (50 / 100) * data.price) * data.count,
  };
}
function createItemCard(data) {
  // let template = `<div class="item">
  //             <div class="preview">
  //               <img src="" alt="">
  //             </div>
  //             <p>uhuhuhuhuhuuhu</p>
  //             <div class="remove-item">
  //               <img src="" alt="">
  //             </div>
  //           </div>`
  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const preview = document.createElement("div");
  const icon = document.createElement("div");
  const context = document.createElement("p");

  // implementing created elements

  // creating preview
  const previewImg = document.createElement("img");
  previewImg.src = data.pic;
  previewImg.alt = "preview card";
  preview.appendChild(previewImg);

  // creating context
  let cost = getDiscount(data);
  context.innerHTML = `${data.title} <br/> \$${cost.newPrice} * ${data.count} <b>\$${cost.total}</b> `;

  // creating delete
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./images/icon-delete.svg";
  deleteIcon.alt = "Delete icon";
  deleteIcon.setAttribute("key", data.Id);
  icon.appendChild(deleteIcon);

  // adding event listener to delete item button

  icon.addEventListener("click", (e) => {
    let ID = e.target.attributes[2].value;
    let newOrderPicked = orderPicked.filter((order) => order.Id != ID);
    orderPicked = newOrderPicked;

    // updating cart dashboard
    orderCount--
    updateCartDB()

    // console.log()
  });

  item.appendChild(preview);
  item.appendChild(context);
  item.appendChild(icon);

  return item;
}



addItem.addEventListener("click", () => {
  itemCount++;
  output.textContent = itemCount;
});

removeItem.addEventListener("click", () => {
  if (itemCount > 0) {
    itemCount--;
    output.textContent = itemCount;
  }
});

cart.addEventListener("click", () => {
  if (!isCartOpen) {
    updateCartDB()
    cartDashboard.style.display = "flex";
    isCartOpen = true;
  } else {
    cartDashboard.style.display = "none";
    isCartOpen = false;
  }
});

addToCart.addEventListener("click", (e) => {
  let order = addToCart.getAttribute("data-title");
  order = orderList.filter((item) => item.name == order)[0];
  order.count = itemCount;
  let isOldOrder = orderPicked.findIndex(data=> data.Id == order.Id)
  isOldOrder = (isOldOrder == -1)? false : true
  console.log(orderPicked,order,isOldOrder);
  if (!isOldOrder & itemCount != 0) {
    orderCount++ 
    orderPicked.push(order);
    updateCartDB()
  }else {
    let position = orderPicked.findIndex(data=> data.Id == order.Id)
    if (itemCount == 0 & position > -1) {
      orderPicked = orderPicked.filter((data, i, a)=> i != position)
      orderCount--
      // alert(position)
    }
    updateCartDB()
  }
  
  // cartAlert.classList.toggle("picked")
  console.log(e.target.attributes[0].value);
});

card.forEach((element) => {
  element.addEventListener("click", () => {
    let key = Number.parseInt(element.id) - 1;
    showcase[activeShow].removeAttribute("class");
    showcase[key].setAttribute("class", "show");
    card[activeShow].classList.remove("active");
    card[key].classList.add("active");
    activeShow = key;
  });
});
btnNext.addEventListener("click", () => {
  let key = activeShow + 1;
  let isLast = key == 3 ? true : false;

  // alert(activeShow)
  if (isLast) {
    btnNext.style.display = "none";
  } else {
    showcase[activeShow].removeAttribute("class");
    showcase[key].setAttribute("class", "show");
    card[activeShow].classList.remove("active");
    card[key].classList.add("active");
    activeShow = key;
    btnPrev.style.display = "flex";
  }
});

btnPrev.addEventListener("click", () => {
  let key = activeShow - 1;
  let isFirst = key == -1 ? true : false;

  // alert(activeShow)
  if (isFirst) {
    btnPrev.style.display = "none";
  } else {
    showcase[activeShow].removeAttribute("class");
    showcase[key].setAttribute("class", "show");
    card[activeShow].classList.remove("active");
    card[key].classList.add("active");
    activeShow = key;
    btnNext.style.display = "flex";
  }
});
