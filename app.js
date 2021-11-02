//variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-content");
const cartContent = document.querySelector(".cart-total");
const productsDOM = document.querySelector('.products-center');


//cart
let cart = []

//getting the products
class Products{
    async getProduct(){
        try {
            const res = await fetch("products.json")
            const data = await res.json();
            return data.items
        } catch (error) {
            console.log(error);
        }
    }
}

// display products
class UI {
    displayProducts(products){
        let result = '';
        products.forEach(product => {
            result += `
            <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${product.fields.image.fields.file.url} alt="product" class="product-img">
                    <button class="bag-btn" data-id="1">
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                    </button>
                </div>
                <h3>${product.fields.title}</h3>
                <h4>$${product.fields.price}</h4>
            </article>
            <!-- end of  single product-->
            `
        })
        productsDOM.innerHTML = result
    }

    getBagButtons(){
        const buttons = [...document.querySelectorAll('.bag-btn')];
        console.log(buttons);
    }
}

//local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products))
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProduct().then(products => {
         ui.displayProducts(products);
         Storage.saveProducts(products)
    }).then(() => {
        ui.getBagButtons()
    })
})

cartBtn.addEventListener('click', () => {
    cartOverlay.style.visibility = "visible";
    cartDOM.style.transform = "translateX(0%)"
})

closeCartBtn.addEventListener('click', () => {
    cartOverlay.style.visibility = "hidden";
    cartDOM.style.transform = "translateX(101%)"
})