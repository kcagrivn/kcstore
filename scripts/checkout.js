// Lấy giỏ hàng và sản phẩm từ localStorage
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

// Hiển thị thông tin đơn hàng
function displayOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (!orderItems || !subtotalElement || !totalElement) {
        console.error('Không tìm thấy các element cần thiết');
        return;
    }
    
    // Kiểm tra nếu giỏ hàng trống
    if (!cart || cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let subtotal = 0;
    const shippingFee = 30000;
    const validItems = [];
    
    // Hiển thị sản phẩm
    orderItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        validItems.push(item);
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="order-item">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     onerror="this.src='assets/images/placeholder.jpg'">
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <p>Số lượng: ${item.quantity}</p>
                    <p>Đơn giá: ${formatPrice(product.price)}</p>
                </div>
                <div class="item-price">${formatPrice(itemTotal)}</div>
            </div>
        `;
    }).join('');
    
    // Kiểm tra nếu có sản phẩm không hợp lệ
    if (validItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Cập nhật giỏ hàng nếu có sản phẩm không hợp lệ
    if (validItems.length !== cart.length) {
        cart = validItems;
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Lỗi khi lưu giỏ hàng:', error);
        }
    }
    
    // Hiển thị tổng tiền
    subtotalElement.textContent = formatPrice(subtotal);
    totalElement.textContent = formatPrice(subtotal + shippingFee);
}

// Xử lý chọn phương thức thanh toán
function handlePaymentMethodChange() {
    const paymentMethodsContainer = document.querySelector('.payment-methods');
    if (!paymentMethodsContainer) {
        console.error('Không tìm thấy container phương thức thanh toán');
        return;
    }
    
    const bankDetails = document.querySelector('.bank-details');
    const momoDetails = document.querySelector('.momo-details');
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
    
    // Ẩn tất cả thông tin thanh toán
    if (bankDetails) bankDetails.remove();
    if (momoDetails) momoDetails.remove();
    
    if (paymentMethod === 'bank') {
        // Hiển thị thông tin chuyển khoản
        const bankInfo = document.createElement('div');
        bankInfo.className = 'bank-details payment-info';
        bankInfo.innerHTML = `
            <div class="bank-info">
                <strong>Ngân hàng:</strong> Vietcombank
            </div>
            <div class="bank-info">
                <strong>Số tài khoản:</strong> 1234567890
            </div>
            <div class="bank-info">
                <strong>Chủ tài khoản:</strong> NGUYEN VAN A
            </div>
            <div class="bank-info">
                <strong>Nội dung:</strong> KC${Date.now()}
            </div>
        `;
        paymentMethodsContainer.appendChild(bankInfo);
    } else if (paymentMethod === 'momo') {
        // Hiển thị thông tin MoMo
        const momoInfo = document.createElement('div');
        momoInfo.className = 'momo-details payment-info';
        momoInfo.innerHTML = `
            <div class="momo-info">
                <strong>Số điện thoại:</strong> 0987654321
            </div>
            <div class="momo-info">
                <strong>Tên tài khoản:</strong> NGUYEN VAN A
            </div>
            <div class="momo-info">
                <strong>Nội dung:</strong> KC${Date.now()}
            </div>
        `;
        paymentMethodsContainer.appendChild(momoInfo);
    }
}

// Kiểm tra dữ liệu form
function validateForm(formData) {
    const errors = [];

    // Kiểm tra giỏ hàng
    if (!cart || cart.length === 0) {
        errors.push('Giỏ hàng của bạn đang trống');
        return errors;
    }

    // Kiểm tra họ tên
    const fullName = formData.get('fullName')?.trim();
    if (!fullName) {
        errors.push('Vui lòng nhập họ và tên');
    } else if (fullName.length < 2) {
        errors.push('Họ tên phải có ít nhất 2 ký tự');
    }

    // Kiểm tra số điện thoại
    const phone = formData.get('phone')?.trim();
    if (!phone) {
        errors.push('Vui lòng nhập số điện thoại');
    } else if (!/^(0|84|\+84)([0-9]{9})$/.test(phone)) {
        errors.push('Số điện thoại không hợp lệ (phải có 10 số và bắt đầu bằng 0)');
    }

    // Kiểm tra email
    const email = formData.get('email')?.trim();
    if (!email) {
        errors.push('Vui lòng nhập email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email không hợp lệ');
    }

    // Kiểm tra địa chỉ
    const address = formData.get('address')?.trim();
    if (!address) {
        errors.push('Vui lòng nhập địa chỉ');
    } else if (address.length < 10) {
        errors.push('Vui lòng nhập địa chỉ chi tiết hơn');
    }

    return errors;
}

// Xử lý đặt hàng
async function handleCheckout(event) {
    event.preventDefault();
    
    try {
        // Kiểm tra giỏ hàng
        if (!cart || cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống');
            window.location.href = 'cart.html';
            return;
        }

        // Kiểm tra sản phẩm
        const invalidProducts = cart.filter(item => !products.find(p => p.id === item.productId));
        if (invalidProducts.length > 0) {
            alert('Có sản phẩm không hợp lệ trong giỏ hàng');
            window.location.href = 'cart.html';
            return;
        }
        
        const form = event.target;
        if (!form) {
            throw new Error('Không tìm thấy form thanh toán');
        }
        
        const formData = new FormData(form);
        
        // Tạo mã đơn hàng
        const orderNumber = 'KC' + Date.now();
        
        // Tính tổng tiền
        const subtotal = cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product.price * item.quantity);
        }, 0);
        
        // Lấy thông tin đơn hàng
        const orderData = {
            orderNumber,
            customerInfo: {
                fullName: formData.get('fullName')?.trim() || 'Khách hàng',
                phone: formData.get('phone')?.trim() || 'Chưa có',
                email: formData.get('email')?.trim() || 'Chưa có',
                address: formData.get('address')?.trim() || 'Chưa có',
                note: formData.get('note')?.trim() || ''
            },
            paymentMethod: formData.get('payment') || 'cod',
            items: cart.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                    productId: item.productId,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                    total: product.price * item.quantity
                };
            }),
            subtotal: subtotal,
            shippingFee: 30000,
            total: subtotal + 30000,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        // Lưu đơn hàng vào localStorage
        try {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Xóa giỏ hàng
            localStorage.removeItem('cart');
            cart = [];
            
            // Hiển thị thông báo thành công
            showSuccessMessage(orderData);
        } catch (error) {
            throw new Error('Không thể lưu đơn hàng: ' + error.message);
        }
        
    } catch (error) {
        console.error('Lỗi khi xử lý đơn hàng:', error);
        alert('Có lỗi xảy ra khi xử lý đơn hàng: ' + error.message);
    }
}

// Hiển thị thông báo đặt hàng thành công
function showSuccessMessage(orderData) {
    const checkoutContent = document.querySelector('.checkout-content');
    if (!checkoutContent) {
        console.error('Không tìm thấy container checkout');
        return;
    }
    
    checkoutContent.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Đặt hàng thành công!</h3>
            <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
            <div class="order-details">
                <p class="order-number">Mã đơn hàng: ${orderData.orderNumber}</p>
                <p>Người nhận: ${orderData.customerInfo.fullName}</p>
                <p>Số điện thoại: ${orderData.customerInfo.phone}</p>
                <p>Địa chỉ: ${orderData.customerInfo.address}</p>
                <p>Tổng tiền: ${formatPrice(orderData.total)}</p>
                <p>Phương thức thanh toán: ${getPaymentMethodText(orderData.paymentMethod)}</p>
            </div>
            <div class="success-actions">
                <a href="index.html" class="continue-shopping">
                    <i class="fas fa-home"></i>
                    Về trang chủ
                </a>
                <a href="javascript:void(0)" onclick="window.print()" class="print-order">
                    <i class="fas fa-print"></i>
                    In đơn hàng
                </a>
            </div>
        </div>
    `;
}

// Lấy text phương thức thanh toán
function getPaymentMethodText(method) {
    switch (method) {
        case 'cod':
            return 'Thanh toán khi nhận hàng';
        case 'bank':
            return 'Chuyển khoản ngân hàng';
        case 'momo':
            return 'Ví MoMo';
        default:
            return method;
    }
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Kiểm tra giỏ hàng
        if (!cart || cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }
        
        // Hiển thị thông tin đơn hàng
        displayOrderSummary();
        
        // Lắng nghe sự kiện thay đổi phương thức thanh toán
        const paymentMethods = document.querySelectorAll('input[name="payment"]');
        if (paymentMethods.length > 0) {
            paymentMethods.forEach(method => {
                method.addEventListener('change', handlePaymentMethodChange);
            });
        }
        
        // Lắng nghe sự kiện submit form
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', handleCheckout);
        } else {
            console.error('Không tìm thấy form thanh toán');
        }
        
        // Hiển thị thông tin thanh toán mặc định
        handlePaymentMethodChange();
    } catch (error) {
        console.error('Lỗi khi khởi tạo trang:', error);
        alert('Có lỗi xảy ra khi tải trang. Vui lòng thử lại.');
    }
}); 