const cartitemsonpage = document.getElementById('cartList');   //showing cart items on html page
const overallitemsamount = document.getElementById('total');     //showing amount total on html page
const cartitemspurchase = document.getElementById('checkout');      //going to items purchased html page
let cartitems = [];
function getitems(){      //getting items from local storage
    const temp = localStorage.getItem('cartArr');
    const cartArr = JSON.parse(temp);
    if (cartArr === null || cartArr === undefined) {
        alert('Could not get cart');
    } else {
        cartitems = cartArr;
        productsonpage();
        overallcartamount();
    }
};
function productsonpage(){     //showing items on html page
    cartitemsonpage.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount of Items</th>
            <th></th>
        </tr>
    `; 
                                                            //showing cart items on html page
    cartitemsonpage.innerHTML += cartitems.map(product=>`
        <tr>
            <td><img src="${product.img}" alt="product-image"></td>
            <td><h4>${product.name}</h4></td>
            <td><h5>${product.price}</h5></td>
            <td>${product.qty}</td>
            <td><button id="${product._id}" class="removeBtn">Remove</button></td>
        </tr>
    `).join('');
    $(".removeBtn").on('click', itemsfromcart);    //for items not in cart
};

function itemsfromcart(){     //updating quantity and list of cart items if item is not in the cart
    currId = this.id;
    for (const i in cartitems){
        if (cartitems[i]._id === currId){
            if(cartitems[i].qty > 1){
                cartitems[i].qty -= 1;
            }else{
                cartitems.splice(i,1);
            }
        }
    }
    localitems();
    getitems();
}

function localitems(){       //getting cart items list into local storage
    localStorage.setItem('cartArr', JSON.stringify(cartitems));
}

function overallcartamount(){    //getting overall cart items amount
    let cartTotal = 0;
    for (const product of cartitems){
        let currTotal = product.price* product.qty;
        cartTotal += currTotal; 
    }
    changecartamount(cartTotal);
}
function changecartamount(cartTotal){    //showing cart items amount on html page and in local storage
    overallitemsamount.innerHTML = ` TOTAL : $ ${cartTotal}`;
    localStorage.setItem('cartTotal', cartTotal);
}
cartitemspurchase.addEventListener('click', function(){window.location.href = "./checkout.html";}); //going to items purchased html page
getitems();
