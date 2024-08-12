document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter(); 

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.closest('.product-item').querySelector('.product-name').textContent;
            if (confirm(`¿Seguro que quieres agregar "${productName}" al carrito de deseos?`)) {
                addToCart(productName);
            }
        });
    });

    document.querySelector('.cart-icon').addEventListener('click', () => {
        document.getElementById('cart-popup').style.display = 'flex';
    });
    document.querySelector('.cart-popup .close').addEventListener('click', () => {
        document.getElementById('cart-popup').style.display = 'none';
    });
});

function updateCartCounter() {
    const cartCounter = localStorage.getItem('cartCounter') || 0;
    document.querySelector('.cart-icon').textContent = `🛒 (${cartCounter})`;
}

function addToCart(productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (!cartItems.includes(productName)) {
        cartItems.push(productName);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        let cartCounter = parseInt(localStorage.getItem('cartCounter')) || 0;
        cartCounter += 1;
        localStorage.setItem('cartCounter', cartCounter);
        updateCartCounter();
        updateCartPopup();
    }
}

function updateCartPopup() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotalPrice = cartItems.length * 50; 
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item} <button onclick="removeFromCart('${item}')">Eliminar</button>
        `;
        cartItemsContainer.appendChild(listItem);
    });

    document.getElementById('cart-total-price').textContent = cartTotalPrice;
}

function removeFromCart(productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item !== productName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    let cartCounter = parseInt(localStorage.getItem('cartCounter')) || 0;
    cartCounter -= 1;
    localStorage.setItem('cartCounter', cartCounter);
    updateCartCounter();
    updateCartPopup();
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
