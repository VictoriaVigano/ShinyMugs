//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
function clearHtml(){
    containerBuyCart.innerHTML = '';
}

<div class="popup">
  <h2>Register</h2>
  <p>Please enter your details here</p>
  <form method="get" action="" onsubmit="return store(this);" id="register">
    <label for="email">User Name</label>
    <input type="text" id="username" placeholder="Select A User Name" required value="" /><br />
    <label for="pass">Password</label>
    <input type="password" id="password" placeholder="Select A Password" required value="" /><br />
    <input type="submit" value="Register" />
  </form>
</div>
<br />
<div class="popup">
  <h2>Welcome Guest!</h2>
  <p>Please enter your login and password here</p>
  <form method="get" action="" onsubmit="return login(this);" id="signon">
    <label for="email">User Name </label>
    <input type="text" id="username" placeholder="Your Password" required value="" /><br />
    <label for="password">Password</label>
   <input type="password" id="password" placeholder="Your Password" required value="" /><br />
   <input type="submit" value="Log In" />
  </form>
<a class="close" href="#close"></a>
</div>


$(document).ready(function() {
    ...
    // send API request
    $.ajax({
        url: 'https://api.email-validator.net/api/verify',
        type: 'POST',
        cache: false,
        crossDomain: true,
        data: { EmailAddress: 'email address', APIKey: 'your API key' },
        dataType: 'json',
        success: function (json) {
            // check API result
            if (typeof(json.status) != "undefined") {
                var resultcode = json.status;
                if (typeof(json.info) != "undefined") {
                    // short summary
                    info = json.info;
                } else info = "";
                if (typeof(json.details) != "undefined") {
                    // detailed description
                    details = json.details;
                } else details = "";
                // resultcode 200, 207, 215 - valid
                // resultcode 215 - can be retried to update catch-all status
                // resultcode 114 - greylisting, wait 5min and retry
                // resultcode 118 - api rate limit, wait 5min and retry
                // resultcode 3xx/4xx - bad
            }
        }
    });
});
