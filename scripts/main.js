// Lấy sản phẩm từ localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Hiển thị sản phẩm nổi bật
function displayFeaturedProducts() {
    const featuredProducts = products.slice(0, 8); // Hiển thị 8 sản phẩm đầu tiên
    const productsGrid = document.getElementById('featured-products');

    if (!featuredProducts || featuredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <p>Chưa có sản phẩm nào</p>
                <a href="admin/products.html" class="add-product-link">
                    <i class="fas fa-plus-circle"></i>
                    Thêm sản phẩm mới
                </a>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';">
                ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-meta">
                    ${product.category ? `<span class="product-category">${product.category}</span>` : ''}
                    ${product.stock ? `<span class="product-stock">Còn ${product.stock} sản phẩm</span>` : ''}
                </div>
                <div class="product-price">
                    ${product.discount ? `
                        <span class="original-price">${formatPrice(product.price)}</span>
                        <span class="discounted-price">${formatPrice(product.price * (1 - product.discount/100))}</span>
                    ` : `
                        <span class="current-price">${formatPrice(product.price)}</span>
                    `}
                </div>
                <div class="product-actions">
                    <button class="view-button" onclick="viewProduct('${product.id}')">
                        <i class="fas fa-eye"></i>
                        Chi tiết
                    </button>
                    <button class="buy-button" onclick="addToCart('${product.id}')">
                        <i class="fas fa-shopping-cart"></i>
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Thêm vào giỏ hàng
function addToCart(productId, quantity = 1) {
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
    showNotification('Đã thêm sản phẩm vào giỏ hàng!');
}

// Xem chi tiết sản phẩm
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Hiển thị thông báo
function showNotification(message) {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Hiệu ứng fade in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
}); 