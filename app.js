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

console.log(productsDOM)


//cart
let cart = []

//getting the products
class Products{
    async getProduct(){
        try {
            const res = await fetch("products.json")
            const data = await res.json();
            return data
        } catch (error) {
            console.log(error);
        }
    }
}

// display products
class UI {
    displayProducts(products)
}

//local storage
class Storage{

}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProduct().then(data => {
        data.items.map(item =>{
            let article = ` 
            <article class="product">
                <div class="img-container">
                    <img src=${item.fields.image.fields.file.url} alt="product" class="product-img">
                    <button class="bag-btn" data-id="1">
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                    </button>
                </div>
                <h3>${item.fields.title}</h3>
                <h4>$${item.fields.price}</h4>
            </article>`;

            productsDOM.append(article);
        })
    });
})