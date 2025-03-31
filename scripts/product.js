// Lấy sản phẩm từ localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Lấy ID sản phẩm từ URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Hiển thị chi tiết sản phẩm
function displayProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'index.html';
        return;
    }
    
    // Cập nhật tiêu đề trang
    document.title = `${product.name} - KC Store`;
    
    // Hiển thị thông tin sản phẩm
    const productDetails = document.querySelector('.product-details');
    productDetails.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" id="mainImage">
        </div>
        <div class="product-info">
            <h1 class="product-name">${product.name}</h1>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-description">${product.description || 'Chưa có mô tả'}</div>
            <div class="product-actions">
                <div class="quantity-selector">
                    <button onclick="updateQuantity(-1)">-</button>
                    <input type="number" id="quantity" value="1" min="1" onchange="validateQuantity(this)">
                    <button onclick="updateQuantity(1)">+</button>
                </div>
                <button class="add-to-cart" onclick="addToCart()">
                    <i class="fas fa-shopping-cart"></i>
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `;
}

// Cập nhật số lượng
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    const newValue = parseInt(quantityInput.value) + change;
    if (newValue >= 1) {
        quantityInput.value = newValue;
    }
}

// Kiểm tra số lượng hợp lệ
function validateQuantity(input) {
    if (input.value < 1) {
        input.value = 1;
    }
}

// Thêm vào giỏ hàng
function addToCart() {
    const productId = getProductIdFromUrl();
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Kiểm tra sản phẩm
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('Sản phẩm không tồn tại!');
        return;
    }
    
    // Lấy giỏ hàng hiện tại
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity
        });
    }
    
    // Lưu giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Hiển thị thông báo
    alert('Đã thêm sản phẩm vào giỏ hàng!');
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
}); 