// Khởi tạo biến
let orders = [];
let currentFilter = 'all';

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Format ngày giờ
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Lấy text trạng thái đơn hàng
function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'shipping': 'Đang giao hàng',
        'completed': 'Đã hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

// Lấy class màu cho trạng thái
function getStatusClass(status) {
    const classMap = {
        'pending': 'status-pending',
        'processing': 'status-processing',
        'shipping': 'status-shipping',
        'completed': 'status-completed',
        'cancelled': 'status-cancelled'
    };
    return classMap[status] || '';
}

// Lấy text phương thức thanh toán
function getPaymentMethodText(method) {
    const methodMap = {
        'cod': 'Thanh toán khi nhận hàng',
        'bank': 'Chuyển khoản ngân hàng',
        'momo': 'Ví MoMo'
    };
    return methodMap[method] || method;
}

// Hiển thị danh sách đơn hàng
function displayOrders() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;

    // Lọc đơn hàng theo trạng thái
    let filteredOrders = orders;
    if (currentFilter !== 'all') {
        filteredOrders = orders.filter(order => order.status === currentFilter);
    }

    // Sắp xếp đơn hàng mới nhất lên đầu
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Hiển thị đơn hàng
    ordersList.innerHTML = filteredOrders.map(order => `
        <div class="order-item" data-order-id="${order.orderNumber}">
            <div class="order-header">
                <div class="order-info">
                    <span class="order-number">Đơn hàng: ${order.orderNumber}</span>
                    <span class="order-date">${formatDate(order.createdAt)}</span>
                </div>
                <div class="order-status ${getStatusClass(order.status)}">
                    ${getStatusText(order.status)}
                </div>
            </div>
            <div class="customer-info">
                <p><strong>Khách hàng:</strong> ${order.customerInfo.fullName}</p>
                <p><strong>SĐT:</strong> ${order.customerInfo.phone}</p>
                <p><strong>Địa chỉ:</strong> ${order.customerInfo.address}</p>
                <p><strong>Email:</strong> ${order.customerInfo.email}</p>
                ${order.customerInfo.note ? `<p><strong>Ghi chú:</strong> ${order.customerInfo.note}</p>` : ''}
            </div>
            <div class="order-products">
                ${order.items.map(item => `
                    <div class="order-product">
                        <span class="product-name">${item.name}</span>
                        <span class="product-quantity">x${item.quantity}</span>
                        <span class="product-price">${formatPrice(item.price)}</span>
                        <span class="product-total">${formatPrice(item.total)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-summary">
                <div class="summary-item">
                    <span>Tạm tính:</span>
                    <span>${formatPrice(order.subtotal)}</span>
                </div>
                <div class="summary-item">
                    <span>Phí vận chuyển:</span>
                    <span>${formatPrice(order.shippingFee)}</span>
                </div>
                <div class="summary-item total">
                    <span>Tổng cộng:</span>
                    <span>${formatPrice(order.total)}</span>
                </div>
            </div>
            <div class="order-payment">
                <span><strong>Thanh toán:</strong> ${getPaymentMethodText(order.paymentMethod)}</span>
            </div>
            <div class="order-actions">
                <button onclick="updateOrderStatus('${order.orderNumber}', 'processing')" 
                        ${order.status === 'processing' ? 'disabled' : ''}>
                    Xử lý
                </button>
                <button onclick="updateOrderStatus('${order.orderNumber}', 'shipping')"
                        ${order.status === 'shipping' ? 'disabled' : ''}>
                    Giao hàng
                </button>
                <button onclick="updateOrderStatus('${order.orderNumber}', 'completed')"
                        ${order.status === 'completed' ? 'disabled' : ''}>
                    Hoàn thành
                </button>
                <button onclick="updateOrderStatus('${order.orderNumber}', 'cancelled')"
                        ${order.status === 'cancelled' ? 'disabled' : ''}>
                    Hủy
                </button>
                <button onclick="printOrder('${order.orderNumber}')">
                    In đơn
                </button>
            </div>
        </div>
    `).join('') || '<p class="no-orders">Không có đơn hàng nào</p>';

    // Cập nhật số lượng đơn hàng
    updateOrderCounts();
}

// Cập nhật số lượng đơn hàng
function updateOrderCounts() {
    const counts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        acc.all++;
        return acc;
    }, { all: 0 });

    // Cập nhật số lượng trên các nút lọc
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const status = btn.dataset.status;
        const count = counts[status] || 0;
        const countSpan = btn.querySelector('.count');
        if (countSpan) {
            countSpan.textContent = count;
        }
    });
}

// Cập nhật trạng thái đơn hàng
function updateOrderStatus(orderNumber, newStatus) {
    try {
        // Tìm đơn hàng cần cập nhật
        const orderIndex = orders.findIndex(order => order.orderNumber === orderNumber);
        if (orderIndex === -1) {
            throw new Error('Không tìm thấy đơn hàng');
        }

        // Cập nhật trạng thái
        orders[orderIndex].status = newStatus;

        // Lưu vào localStorage
        localStorage.setItem('orders', JSON.stringify(orders));

        // Cập nhật giao diện
        displayOrders();

        // Hiển thị thông báo
        alert('Cập nhật trạng thái đơn hàng thành công!');
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    }
}

// In đơn hàng
function printOrder(orderNumber) {
    // Tìm đơn hàng cần in
    const order = orders.find(order => order.orderNumber === orderNumber);
    if (!order) {
        alert('Không tìm thấy đơn hàng');
        return;
    }

    // Tạo nội dung in
    const printContent = `
        <div class="print-order">
            <div class="print-header">
                <h1>ĐƠN HÀNG ${order.orderNumber}</h1>
                <p>Ngày đặt: ${formatDate(order.createdAt)}</p>
            </div>
            <div class="print-customer">
                <h2>Thông tin khách hàng</h2>
                <p><strong>Họ tên:</strong> ${order.customerInfo.fullName}</p>
                <p><strong>Số điện thoại:</strong> ${order.customerInfo.phone}</p>
                <p><strong>Địa chỉ:</strong> ${order.customerInfo.address}</p>
                <p><strong>Email:</strong> ${order.customerInfo.email}</p>
                ${order.customerInfo.note ? `<p><strong>Ghi chú:</strong> ${order.customerInfo.note}</p>` : ''}
            </div>
            <div class="print-products">
                <h2>Chi tiết đơn hàng</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>${formatPrice(item.price)}</td>
                                <td>${formatPrice(item.total)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">Tạm tính:</td>
                            <td>${formatPrice(order.subtotal)}</td>
                        </tr>
                        <tr>
                            <td colspan="3">Phí vận chuyển:</td>
                            <td>${formatPrice(order.shippingFee)}</td>
                        </tr>
                        <tr class="total">
                            <td colspan="3">Tổng cộng:</td>
                            <td>${formatPrice(order.total)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="print-footer">
                <p><strong>Phương thức thanh toán:</strong> ${getPaymentMethodText(order.paymentMethod)}</p>
                <p><strong>Trạng thái:</strong> ${getStatusText(order.status)}</p>
            </div>
        </div>
    `;

    // Tạo cửa sổ in
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>In đơn hàng ${order.orderNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .print-order { max-width: 800px; margin: 0 auto; }
                .print-header { text-align: center; margin-bottom: 20px; }
                .print-header h1 { margin: 0; }
                .print-customer { margin-bottom: 20px; }
                .print-products table { width: 100%; border-collapse: collapse; }
                .print-products th, .print-products td { 
                    border: 1px solid #ddd; 
                    padding: 8px; 
                    text-align: left; 
                }
                .print-products th { background-color: #f5f5f5; }
                .print-products .total { font-weight: bold; }
                .print-footer { margin-top: 20px; }
                @media print {
                    body { margin: 0; }
                    .print-order { max-width: none; }
                }
            </style>
        </head>
        <body>
            ${printContent}
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() {
                        window.close();
                    }
                }
            </script>
        </body>
        </html>
    `);
}

// Lọc đơn hàng
function filterOrders(status) {
    currentFilter = status;
    displayOrders();

    // Cập nhật trạng thái active của nút lọc
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.status === status);
    });
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Lấy danh sách đơn hàng từ localStorage
        orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Hiển thị danh sách đơn hàng
        displayOrders();

        // Lắng nghe sự kiện lọc
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filterOrders(btn.dataset.status);
            });
        });
    } catch (error) {
        console.error('Lỗi khi khởi tạo trang:', error);
        alert('Có lỗi xảy ra khi tải trang. Vui lòng thử lại.');
    }
}); 