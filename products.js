const cartitemsonpage = document.getElementById('products');    //for showing items on html page
const itemspage = document.getElementById('cartBtn');             //for going to shopping cart page
let cartitemslist;
let listofitems = [];
function getcartitems(){         //getting cart items to local storage
    const temp = localStorage.getItem('cartArr');
    const temp2 = JSON.parse(temp);
    if (temp2 === null || temp2 === undefined) {
        cartitemslist = [];
        localStorage.setItem('cartArr', JSON.stringify(cartitemslist));
    } else {
        cartitemslist = temp2;
    }
}

function getitemsinfo(){       //getting items from api
    const baseUrl = "https://dummyproducts-api.herokuapp.com";
    const mykey = "CrLqTfmXE_7t";
    $.ajax({
        url: `${baseUrl}/api/v1/products?apikey=${mykey}`,
        method: "GET",
        success(res){
            listofitems = res.data;
            itemsonhtml(res.data);
        },
        error(err){
            alert('items not from api');
        }
    });
};

function itemsonhtml(products){        //showing items on html page
    cartitemsonpage.innerHTML = products.map(product=>`
        <div class="product">
            <div class="product-info">
                <img src="${product.product_image_md}" alt="product-image">
                <h4>${product.product_name}</h4>
                <h5>Item Price: $ ${product.product_price}</h5>
                <h5>Item Rating: ${product.product_ratings}</h5>
                <button id="${product._id}" class="addBtn">add to cart</button>
            </div>
        </div>
    `).join('');
    $(".addBtn").on('click', addToCart);
}

function itemspurchased(currId){         //updating item quanitity if already purchased in cart
    for (const product of cartitemslist){
        if (currId === product._id){
            product['qty'] += 1;
            return true;
        }
    }
    return false;
}

function addToCart(e){      //adding items to shopping cart
    const currId = this.id;
    let cartiteminfo = {};
    if(!itemspurchased(currId)){
        for(const product of listofitems){
            if (product._id === currId){
                cartiteminfo['name'] = product.product_name;
                cartiteminfo['price'] = product.product_price;
                cartiteminfo['img'] = product.product_image_sm;
                cartiteminfo['_id'] = product._id;
                cartiteminfo['qty'] = 1;
                cartitemslist.push(cartiteminfo);
            }
        }
    }
    alert('item is in the shopping cart');
}
function showcartitems(){     //for showing shopping cart html page
    localitems();
    window.location.href = "./cart.html";
}

function localitems(){           //for getting items list to local storage
    localStorage.setItem('cartArr', JSON.stringify(cartitemslist));
}

itemspage.addEventListener('click', showcartitems);     //for going to shopping cart html page
getitemsinfo();         //getting products from api
getcartitems();               //getting shopping cart items



