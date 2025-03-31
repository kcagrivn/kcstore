// Khởi tạo các biến
let currentCategory = 'all';
let currentPage = 1;
let productsPerPage = 12;
let currentView = 'grid';
let currentSort = 'newest';
let minPrice = 0;
let maxPrice = 10000000;

// Lấy sản phẩm từ localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Lọc sản phẩm theo danh mục
function filterProducts() {
    let filteredProducts = products;

    // Lọc theo danh mục
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentCategory
        );
    }

    // Lọc theo giá
    filteredProducts = filteredProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
    );

    // Sắp xếp sản phẩm
    filteredProducts.sort((a, b) => {
        switch (currentSort) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default: // newest
                return b.id - a.id;
        }
    });

    return filteredProducts;
}

// Hiển thị sản phẩm
function displayProducts() {
    const filteredProducts = filterProducts();
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.className = `products-grid ${currentView}-view`;

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <p>Không tìm thấy sản phẩm nào</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="assets/products/${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="buy-button" onclick="viewProduct('${product.id}')">
                    <i class="fas fa-shopping-cart"></i> Mua ngay
                </button>
            </div>
        </div>
    `).join('');

    updatePagination(filteredProducts.length);
}

// Cập nhật phân trang
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    document.getElementById('currentPage').textContent = currentPage;
    
    const prevBtn = document.querySelector('.page-btn:first-child');
    const nextBtn = document.querySelector('.page-btn:last-child');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Thay đổi trang
function changePage(delta) {
    const filteredProducts = filterProducts();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayProducts();
    }
}

// Xem chi tiết sản phẩm
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Event Listeners
document.querySelectorAll('.category-list a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategory = e.target.dataset.category;
        currentPage = 1;
        
        document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active'));
        e.target.classList.add('active');
        
        document.getElementById('categoryTitle').textContent = e.target.textContent.trim();
        displayProducts();
    });
});

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        displayProducts();
    });
});

document.getElementById('sortSelect').addEventListener('change', (e) => {
    currentSort = e.target.value;
    displayProducts();
});

document.getElementById('priceRange').addEventListener('input', (e) => {
    maxPrice = parseInt(e.target.value);
    document.getElementById('maxPrice').value = maxPrice;
    currentPage = 1;
    displayProducts();
});

document.getElementById('minPrice').addEventListener('change', (e) => {
    minPrice = parseInt(e.target.value) || 0;
    currentPage = 1;
    displayProducts();
});

document.getElementById('maxPrice').addEventListener('change', (e) => {
    maxPrice = parseInt(e.target.value) || 10000000;
    currentPage = 1;
    displayProducts();
});

// Khởi tạo trang
displayProducts(); 