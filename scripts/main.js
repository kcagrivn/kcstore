const products = [
    {
        id: 1,
        name: "Phân bón NPK 20-20-15",
        price: 150000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Phân bón",
        stock: 100,
        description: "Phân bón NPK cao cấp, phù hợp cho cây trồng giai đoạn sinh trưởng"
    },
    {
        id: 2,
        name: "Thuốc trừ sâu sinh học",
        price: 85000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thuốc bảo vệ thực vật",
        stock: 50,
        description: "Thuốc trừ sâu sinh học an toàn cho môi trường và người sử dụng"
    },
    {
        id: 3,
        name: "Hạt giống cà chua F1",
        price: 45000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Hạt giống",
        stock: 200,
        description: "Hạt giống cà chua F1 chất lượng cao, tỷ lệ nảy mầm >95%"
    },
    {
        id: 4,
        name: "Dây tưới nhỏ giọt",
        price: 120000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị tưới",
        stock: 150,
        description: "Dây tưới nhỏ giọt tiết kiệm nước, độ bền cao"
    },
    {
        id: 5,
        name: "Bình xịt 8 lít",
        price: 250000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị phun",
        stock: 30,
        description: "Bình xịt chuyên dụng, áp suất cao"
    },
    {
        id: 6,
        name: "Phân hữu cơ vi sinh",
        price: 95000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Phân bón",
        stock: 80,
        description: "Phân hữu cơ vi sinh cải tạo đất, tăng độ phì nhiêu"
    },
    {
        id: 7,
        name: "Thuốc kích thích ra rễ",
        price: 75000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thuốc bảo vệ thực vật",
        stock: 60,
        description: "Thuốc kích thích ra rễ, giúp cây phát triển bộ rễ khỏe mạnh"
    },
    {
        id: 8,
        name: "Hạt giống dưa hấu",
        price: 55000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Hạt giống",
        stock: 180,
        description: "Hạt giống dưa hấu F1, quả to, ngọt"
    },
    {
        id: 9,
        name: "Vòi tưới phun sương",
        price: 45000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị tưới",
        stock: 100,
        description: "Vòi tưới phun sương, tiết kiệm nước"
    },
    {
        id: 10,
        name: "Bình xịt 5 lít",
        price: 180000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị phun",
        stock: 40,
        description: "Bình xịt nhỏ gọn, dễ sử dụng"
    },
    {
        id: 11,
        name: "Phân bón lá 30-10-10",
        price: 120000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Phân bón",
        stock: 70,
        description: "Phân bón lá chuyên dụng cho cây trồng"
    },
    {
        id: 12,
        name: "Thuốc trừ cỏ sinh học",
        price: 95000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thuốc bảo vệ thực vật",
        stock: 45,
        description: "Thuốc trừ cỏ sinh học, an toàn cho môi trường"
    },
    {
        id: 13,
        name: "Hạt giống ớt cay",
        price: 35000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Hạt giống",
        stock: 150,
        description: "Hạt giống ớt cay, năng suất cao"
    },
    {
        id: 14,
        name: "Đầu tưới phun mưa",
        price: 65000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị tưới",
        stock: 90,
        description: "Đầu tưới phun mưa, bán kính phun rộng"
    },
    {
        id: 15,
        name: "Bình xịt 12 lít",
        price: 320000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị phun",
        stock: 25,
        description: "Bình xịt dung tích lớn, phù hợp cho diện tích rộng"
    },
    {
        id: 16,
        name: "Phân bón hữu cơ",
        price: 85000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Phân bón",
        stock: 95,
        description: "Phân bón hữu cơ 100% từ thiên nhiên"
    },
    {
        id: 17,
        name: "Thuốc trừ sâu thảo mộc",
        price: 110000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thuốc bảo vệ thực vật",
        stock: 55,
        description: "Thuốc trừ sâu từ thảo mộc, an toàn cho người dùng"
    },
    {
        id: 18,
        name: "Hạt giống rau muống",
        price: 25000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Hạt giống",
        stock: 220,
        description: "Hạt giống rau muống, năng suất cao"
    },
    {
        id: 19,
        name: "Van điều chỉnh nước",
        price: 35000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị tưới",
        stock: 75,
        description: "Van điều chỉnh nước, dễ sử dụng"
    },
    {
        id: 20,
        name: "Bình xịt 16 lít",
        price: 380000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị phun",
        stock: 20,
        description: "Bình xịt chuyên nghiệp, dung tích lớn"
    },
    {
        id: 21,
        name: "Phân bón vi lượng",
        price: 95000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Phân bón",
        stock: 65,
        description: "Phân bón vi lượng, bổ sung dinh dưỡng thiết yếu"
    },
    {
        id: 22,
        name: "Thuốc trừ nấm sinh học",
        price: 85000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thuốc bảo vệ thực vật",
        stock: 50,
        description: "Thuốc trừ nấm sinh học, hiệu quả cao"
    },
    {
        id: 23,
        name: "Hạt giống cải bắp",
        price: 40000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Hạt giống",
        stock: 170,
        description: "Hạt giống cải bắp F1, năng suất cao"
    },
    {
        id: 24,
        name: "Bộ lọc nước tưới",
        price: 55000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị tưới",
        stock: 85,
        description: "Bộ lọc nước tưới, ngăn tắc nghẽn"
    },
    {
        id: 25,
        name: "Bình xịt 20 lít",
        price: 420000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị phun",
        stock: 15,
        description: "Bình xịt công nghiệp, dung tích lớn"
    },
    {
        id: 26,
        name: "Phân bón đạm",
        price: 75000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Phân bón",
        stock: 110,
        description: "Phân bón đạm, kích thích sinh trưởng"
    },
    {
        id: 27,
        name: "Thuốc trừ rầy sinh học",
        price: 90000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thuốc bảo vệ thực vật",
        stock: 45,
        description: "Thuốc trừ rầy sinh học, an toàn cho môi trường"
    },
    {
        id: 28,
        name: "Hạt giống cà rốt",
        price: 30000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Hạt giống",
        stock: 190,
        description: "Hạt giống cà rốt, năng suất cao"
    },
    {
        id: 29,
        name: "Đầu tưới phun sương",
        price: 40000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị tưới",
        stock: 95,
        description: "Đầu tưới phun sương, tiết kiệm nước"
    },
    {
        id: 30,
        name: "Bình xịt 25 lít",
        price: 480000,
        image: "assets/products/product_1743441511115.jpg",
        category: "Thiết bị phun",
        stock: 10,
        description: "Bình xịt công nghiệp, dung tích lớn"
    }
];

// Lưu sản phẩm vào localStorage
localStorage.setItem('products', JSON.stringify(products));

// Hàm lấy sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Hàm hiển thị sản phẩm
function displayProducts(productsToShow = products) {
    const productsContainer = document.querySelector('.products-grid');
    if (!productsContainer) return;

    productsContainer.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.stock < 10 ? '<span class="low-stock">Sắp hết hàng</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-stock">Còn lại: ${product.stock}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="showAddToCartPopup(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        Thêm vào giỏ
                    </button>
                    <button class="btn-details" onclick="showProductDetails(${product.id})">
                        <i class="fas fa-info-circle"></i>
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Hàm định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Hàm hiển thị chi tiết sản phẩm
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const popup = document.createElement('div');
    popup.className = 'product-details-popup';
    popup.innerHTML = `
        <div class="product-details-content">
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="product-details-grid">
                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details-info">
                    <h2>${product.name}</h2>
                    <div class="product-details-price">${formatPrice(product.price)}</div>
                    <div class="product-details-stock">Còn lại: ${product.stock}</div>
                    <div class="product-details-category">${product.category}</div>
                    <div class="product-details-description">${product.description}</div>
                    <button class="btn-add-cart" onclick="showAddToCartPopup(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

// Khởi tạo hiển thị sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
}); 