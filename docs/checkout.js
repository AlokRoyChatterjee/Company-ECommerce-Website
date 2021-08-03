const cartitemshtml = document.getElementById('outer');   //going to items purchased page
const homepage = document.getElementById('home');    //going to homepage

function overallcartitemsamount(){     //getting overall amount for items in shopping cart
    const temp = localStorage.getItem('cartTotal');
    const total = parseInt(temp);
    const cartArr = [];
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
    localStorage.setItem('cartTotal', 0);
    itemspurchase(total);
}

function itemspurchase(total){  //going to overall items amount page
    cartitemshtml.innerHTML = `
        <h3 style="font-size:80px;">Your overall items amount is ${total}</h3>
    `;
}
homepage.addEventListener('click', function(){window.location.href = "./index.html"}); //going to homepage
overallcartitemsamount();  //getting overall amount for shopping cart items
