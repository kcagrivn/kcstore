// Lấy giỏ hàng từ localStorage
let cart = [];
const products = [];

try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    products.push(...storedProducts);
} catch (error) {
    console.error('Lỗi khi đọc dữ liệu:', error);
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Lưu giỏ hàng vào localStorage
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    } catch (error) {
        console.error('Lỗi khi lưu giỏ hàng:', error);
        return false;
    }
}

// Hiển thị giỏ hàng
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartActions = document.getElementById('cart-actions');
    
    if (!cartItemsContainer || !totalElement || !emptyCartMessage || !cartActions) {
        console.error('Không tìm thấy các element cần thiết');
        return;
    }
    
    if (!cart || cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartActions.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        totalElement.textContent = formatPrice(0);
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    cartActions.style.display = 'flex';
    
    let total = 0;
    const validItems = [];
    
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        validItems.push(item);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="cart-item-image"
                     onerror="this.src='assets/images/placeholder.jpg'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">${formatPrice(product.price)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${index}, ${item.quantity - 1})"
                                ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, ${item.quantity + 1})"
                                ${item.quantity >= 99 ? 'disabled' : ''}>+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <div class="item-total">${formatPrice(itemTotal)}</div>
                    <button class="remove-item" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Cập nhật giỏ hàng nếu có sản phẩm không hợp lệ
    if (validItems.length !== cart.length) {
        cart = validItems;
        saveCart();
    }
    
    totalElement.textContent = formatPrice(total);
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId, quantity = 1) {
    try {
        // Kiểm tra đầu vào
        if (!productId) {
            console.error('Thiếu productId');
            return false;
        }
        
        quantity = parseInt(quantity);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        } else if (quantity > 99) {
            quantity = 99;
        }
        
        // Kiểm tra sản phẩm có tồn tại không
        const product = products.find(p => p.id === productId);
        if (!product) {
            alert('Sản phẩm không tồn tại!');
            return false;
        }

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            existingItem.quantity = Math.min(newQuantity, 99);
        } else {
            cart.push({
                productId,
                quantity
            });
        }

        // Lưu giỏ hàng
        if (saveCart()) {
            alert('Đã thêm sản phẩm vào giỏ hàng!');
            displayCart();
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        return false;
    }
}

// Cập nhật số lượng
function updateQuantity(index, newQuantity) {
    try {
        if (index < 0 || index >= cart.length) {
            console.error('Index không hợp lệ:', index);
            return;
        }
        
        newQuantity = parseInt(newQuantity);
        if (isNaN(newQuantity) || newQuantity < 1) {
            removeItem(index);
            return;
        }
        
        if (newQuantity > 99) {
            newQuantity = 99;
        }
        
        cart[index].quantity = newQuantity;
        if (saveCart()) {
            displayCart();
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượng:', error);
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    try {
        if (index < 0 || index >= cart.length) {
            console.error('Index không hợp lệ:', index);
            return;
        }
        
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            cart.splice(index, 1);
            if (saveCart()) {
                displayCart();
            }
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
    }
}

// Xóa toàn bộ giỏ hàng
function clearCart() {
    try {
        if (confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
            cart = [];
            localStorage.removeItem('cart');
            displayCart();
        }
    } catch (error) {
        console.error('Lỗi khi xóa giỏ hàng:', error);
    }
}

// Chuyển đến trang thanh toán
function checkout() {
    if (!cart || cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    
    // Kiểm tra tính hợp lệ của giỏ hàng
    const invalidItems = cart.filter(item => !products.find(p => p.id === item.productId));
    if (invalidItems.length > 0) {
        alert('Có sản phẩm không hợp lệ trong giỏ hàng. Vui lòng kiểm tra lại.');
        return;
    }
    
    window.location.href = 'checkout.html';
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
}); 