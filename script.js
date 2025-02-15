let productssection = document.getElementById("productssection");

async function getProducts() {
  try {
    let response = await fetch("https://fakestoreapi.in/api/products");
    let data = await response.json();
    // console.log(data.products);
    displayAllProducts(data.products); // sending products as an arguement
  } catch (error) {
    console.log("error while fetching products", error);
  }
}
getProducts();

function displayAllProducts(allProducts) {
  //   console.log(allProducts);

  allProducts.map((ele) => {
    // console.log(ele);

    //! create elements
    let cardContainer = document.createElement("article");
    

    //! setting attributes
    cardContainer.setAttribute("class", "cardcontainer");
   


    cardContainer.innerHTML = `
    <div>
      <img src = '${ele.image}'>
      <h2>${ele.title.slice(0,60)}...</h2>
    </div>

    <h4>Rs.${ele.price}</h4>
    <button onclick ='handleAddtoCart(${JSON.stringify(ele)})'">ADD to CART</button>
    `;


    productssection.append(cardContainer);
  });
}

function handleAddtoCart(products){
  console.log("Add Item : ",products);

  // initilization cart variables

  let cart = JSON.parse(localStorage.getItem("cart")) || []

  // finding index of existing products  
  let existingProductsIndex = cart.findIndex((ele)=>ele.id === products.id);

  if (existingProductsIndex !== -1) {
    cart[existingProductsIndex].quantity +=1;
  } else {
    cart.push({...products,quantity:1})
  }

  // store cart in localStorage
  localStorage.setItem("cart",JSON.stringify(cart))
  // alert 
  alert(`${products.title},add to cart`)
  displayCartItems();
}

function displayCartItems(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);

  let cartsection = document.getElementById("cartsection");
  cartsection.innerHTML = "<h1 class='cartHeading'>My Cart</h1>";

  if(cart.length === 0){
    cartsection.innerHTML = "<h1>Cart is Empty</h1>";
  }
  else{
    cart.map((item,index)=>{
      let div = document.createElement("div");
      div.innerHTML = `
      <img class="removeTitle" src='${item.image}'>
      <h2 class="removeTitle">${item.title}</h2>
      <p>Quantity : ${item.quantity}</p>
      <p>Price : ${item.quantity * item.price}</p>
      <button onclick ='removeCartItem(${index})'>Remove</button>
      `;
      cartsection.append(div); 
    })
  }
}

function removeCartItem(index){
  alert("item remove",index)
  let cart  = JSON.parse(localStorage.getItem("cart"));

  if (cart[index].quantity > 1) {
    cart[index].quantity-= 1;
  } else {
    cart.splice(index,1)
  }
  localStorage.setItem("cart",JSON.stringify(cart))

  displayCartItems();
}

window.addEventListener("load",()=>{
  displayCartItems()
});



