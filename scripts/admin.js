// Khởi tạo các biến
let products = JSON.parse(localStorage.getItem('products')) || [];
const modal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const addProductBtn = document.getElementById('addProductBtn');
const closeBtn = document.querySelector('.close');
const productsTableBody = document.getElementById('productsTableBody');

// Hiển thị sản phẩm trong bảng
function displayProducts() {
    productsTableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" class="product-thumbnail"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProduct(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        productsTableBody.appendChild(row);
    });
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Mở modal thêm sản phẩm
addProductBtn.addEventListener('click', () => {
    productForm.reset();
    productForm.dataset.mode = 'add';
    modal.style.display = 'block';
});

// Đóng modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Đóng modal khi click bên ngoài
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Xử lý submit form
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(productForm);
    const imageFile = formData.get('productImage');
    
    try {
        // Tạo URL cho hình ảnh
        const imageUrl = URL.createObjectURL(imageFile);
        
        // Tạo một thẻ img tạm thời để lấy kích thước thật của ảnh
        const img = new Image();
        img.src = imageUrl;
        
        await new Promise((resolve) => {
            img.onload = () => {
                // Tạo canvas với kích thước mong muốn
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Đặt kích thước tối đa cho ảnh
                const maxWidth = 800;
                const maxHeight = 800;
                
                // Tính toán tỷ lệ để giữ nguyên tỷ lệ khung hình
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth) {
                    height = (maxWidth * height) / width;
                    width = maxWidth;
                }
                
                if (height > maxHeight) {
                    width = (maxHeight * width) / height;
                    height = maxHeight;
                }
                
                // Đặt kích thước canvas
                canvas.width = width;
                canvas.height = height;
                
                // Vẽ ảnh đã resize lên canvas
                ctx.drawImage(img, 0, 0, width, height);
                
                // Chuyển canvas thành base64
                const base64Image = canvas.toDataURL('image/jpeg', 0.8);
                
                // Lưu thông tin sản phẩm
                const productData = {
                    id: Date.now().toString(),
                    name: formData.get('productName'),
                    category: formData.get('productCategory'),
                    price: Number(formData.get('productPrice')),
                    description: formData.get('productDescription'),
                    image: base64Image
                };
                
                if (productForm.dataset.mode === 'add') {
                    products.push(productData);
                } else if (productForm.dataset.mode === 'edit') {
                    const index = parseInt(productForm.dataset.editIndex);
                    products[index] = productData;
                }
                
                // Lưu vào localStorage
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
                modal.style.display = 'none';
                
                resolve();
            };
        });
    } catch (error) {
        console.error('Lỗi khi xử lý hình ảnh:', error);
        alert('Có lỗi xảy ra khi xử lý hình ảnh. Vui lòng thử lại.');
    }
});

// Chỉnh sửa sản phẩm
function editProduct(index) {
    const product = products[index];
    productForm.dataset.mode = 'edit';
    productForm.dataset.editIndex = index;

    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;

    modal.style.display = 'block';
}

// Xóa sản phẩm
function deleteProduct(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

// Khởi tạo trang
displayProducts(); 