//variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items");
const cartContent  = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
const productsDOM = document.querySelector('.products-center');


// function displayCart(carts){
//     let result = '';
//     carts.forEach(cart => {
//         result += `
//         <div class="cart-item">
//             <img src=${cart.image} alt="product">
//             <div>
//                 <h4>${cart.title}</h4>
//                 <h5>$${cart.price}</h5>
//                 <span class="remove-item">remove</span>
//             </div>
//             <div>
//                 <i class="fas fa-chevron-up"></i>
//                 <p class="item-amount">${cart.amount}</p>
//                 <i class="fas fa-chevron-down"></i>
//             </div>
//         </div>
//         `
//     });
//     cartContent.innerHTML = result;
//     // console.log(result)
// }

// function totalPrice(){
//     let carts = JSON.parse(localStorage.getItem('cart'));
//     let total = 0;
//     carts.forEach((cart) => {
//         total += cart.price * cart.amount;
//     })
//     return Math.round(total)
// }


//cart
let cart = []

//buttons
let buttonsDOM = []

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

//local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products))
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.sys.id === id)
    }

    static saveCart(){
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')) : []
    }

    // static getCartDel(id){
    //     let carts = this.getCart();
    //     let cartDel = carts.find(cart => cart.id === id);
    //     let indexCartDel = carts.indexOf(cartDel);
    //     cart.splice(indexCartDel, 1)
    //     console.log(cart);
    // }
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
                    <button class="bag-btn" data-id=${product.sys.id}>
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
        buttonsDOM = buttons;
       buttons.forEach(button => {
           let id = button.dataset.id;
           let inCart = cart.find(item => item.id === id);
           if(inCart){
               button.innerText = "In Cart";
               button.disabled = true;
           }
            button.addEventListener('click', e => {
                e.target.innerText = "In Cart";
                e.target.disabled = true;

                // get product from products
                let cartItem = {...Storage.getProduct(id).fields, image:Storage.getProduct(id).fields.image.fields.file.url, id , amount:1};
                // add product to the cart
                cart = [...cart, cartItem];
                // save cart in local storage
                Storage.saveCart(cart);
                // set cart values
                this.setCartValue(cart);
                // display cart item
                this.addCartItem(cartItem);
                // displayCart(JSON.parse(localStorage.getItem('cart')));
                // show the cart
                this.showCart();
                // cartTotal.innerText = totalPrice();
            })
       })
    }

    setCartValue(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.amount * item.price;
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    addCartItem(cartItem){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src=${cartItem.image} alt="product">
        <div>
            <h4>${cartItem.title}</h4>
            <h5>$${cartItem.price}</h5>
            <span class="remove-item">remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
            <p class="item-amount">${cartItem.amount}</p>
            <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
        </div>
        `;
        cartContent.appendChild(div)
    }
    
    showCart(){
        cartDOM.classList.add('showCart');
        cartOverlay.classList.add('transparentBcg')
    }

    setupAPP(){
        cart = Storage.getCart();
        this.setCartValue(cart)
        Storage.getCart().forEach(cart => {
            this.addCartItem(cart)
        })
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', () => {
            cartDOM.classList.remove('showCart');
            cartOverlay.classList.remove('transparentBcg')
        })
        // this.removeCart()
    }

    // removeCart(){
    //     // Get carts from localStorage
    //     // Add event to cart
    //     // const removeBtn = cartContent.querySelector('.remove-item');
    //     // console.log(removeBtn);

    //     Storage.getCart().forEach(cart => {
    //         const removeBtn = cartContent.querySelector('.remove-item');
    //         removeBtn.addEventListener('click', () => {
    //             Storage.getCartDel(cart.id)
                
    //         })
    //     })


    //     // Find the cart when click and delete it, update the cart
    // }

    cartLogic(){
        clearCartBtn.addEventListener('click',this.clearCart)
    }

    clearCart(){
        console.log(this);
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();
    // setup app
    ui.setupAPP();
    // get all products
    products.getProduct().then(products => {
         ui.displayProducts(products);
         Storage.saveProducts(products)
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    })
})


