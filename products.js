// داده‌های کامل محصولات
const allProducts = [
    {
        id: 1,
        name: "گردنبند فیروزه یلدایی",
        description: "گردنبند دست‌ساز با سنگ فیروزه طبیعی و طراحی منحصربه‌فرد یلدایی",
        price: "۲۹۰,۰۰۰",
        fakePrice: "۳۵۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=گردنبند+فیروزه",
        category: "necklace",
        discount: 17,
        inStock: true
    },
    {
        id: 2,
        name: "دستبند عقیق یلدایی",
        description: "دستبند زیبا با سنگ عقیق قرمز و مهره‌های دست‌ساز",
        price: "۱۸۰,۰۰۰",
        fakePrice: "۲۲۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/C41E3A/FFFFFF?text=دستبند+عقیق",
        category: "bracelet",
        discount: 18,
        inStock: true
    },
    {
        id: 3,
        name: "گوشواره الماس یلدایی",
        description: "گوشواره شیک با سنگ الماس مصنوعی و طراحی مدرن",
        price: "۱۴۰,۰۰۰",
        fakePrice: "",
        image: "https://via.placeholder.com/300x300/2E8B57/FFFFFF?text=گوشواره+الماس",
        category: "earring",
        discount: 0,
        inStock: true
    },
    {
        id: 4,
        name: "انگشتر یاقوت یلدایی",
        description: "انگشتر طلا با سنگ یاقوت طبیعی و حکاکی خاص",
        price: "۴۲۰,۰۰۰",
        fakePrice: "۵۰۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/0C2D48/FFFFFF?text=انگشتر+یاقوت",
        category: "ring",
        discount: 16,
        inStock: true
    },
    {
        id: 5,
        name: "گردنبند مروارید یلدایی",
        description: "گردنبند کلاسیک با مروارید طبیعی و پندنت طلا",
        price: "۳۲۰,۰۰۰",
        fakePrice: "۳۸۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/FFFFFF/000000?text=گردنبند+مروارید",
        category: "necklace",
        discount: 16,
        inStock: false
    },
    {
        id: 6,
        name: "دستبند نقره یلدایی",
        description: "دستبند نقره با سنگ‌های رنگارنگ و طراحی سنتی",
        price: "۲۱۰,۰۰۰",
        fakePrice: "۲۵۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/C0C0C0/000000?text=دستبند+نقره",
        category: "bracelet",
        discount: 16,
        inStock: true
    }
];

let currentPage = 1;
const productsPerPage = 6;
let filteredProducts = [...allProducts];
let currentCategory = 'all';

// لود محصولات
function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    let html = '';

    productsToShow.forEach(product => {
        html += `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    
                    ${!product.inStock ? `
                        <div class="position-absolute top-0 start-0 m-2">
                            <span class="badge bg-secondary fs-6">ناموجود</span>
                        </div>
                    ` : ''}
                    
                    ${product.fakePrice && product.inStock ? `
                        <div class="position-absolute top-0 end-0 m-2">
                            <span class="badge bg-danger fs-6">تخفیف یلدایی</span>
                        </div>
                    ` : ''}
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted small flex-grow-1">${product.description}</p>
                        
                        ${product.fakePrice && product.inStock ? `
                            <div class="d-flex align-items-center mb-2">
                                <span class="fake-price text-muted me-2">${product.fakePrice} تومان</span>
                                <span class="discount-badge badge bg-success fs-7">%${product.discount}</span>
                            </div>
                        ` : ''}
                        
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="real-price fw-bold">${product.price} تومان</span>
                            <button class="btn btn-yaldai btn-sm" onclick="viewProduct(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-eye me-1"></i>${product.inStock ? 'مشاهده' : 'ناموجود'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html || '<div class="col-12 text-center"><p class="text-muted">محصولی یافت نشد.</p></div>';
    updatePagination();
}

// فیلتر محصولات
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }
    
    currentPage = 1;
    loadProducts();
}

// فیلتر بر اساس دسته‌بندی
function filterByCategory(category) {
    currentCategory = category;
    filteredProducts = category === 'all' 
        ? [...allProducts] 
        : allProducts.filter(product => product.category === category);
    
    currentPage = 1;
    loadProducts();
    
    // آپدیت استایل دکمه‌های فیلتر
    document.querySelectorAll('.category-filters .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// صفحه‌بندی
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (!pagination || totalPages <= 1) {
        if (pagination) pagination.innerHTML = '';
        return;
    }

    let html = '';
    
    // دکمه قبلی
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">قبلی</a>
        </li>
    `;
    
    // صفحات
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
    
    // دکمه بعدی
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">بعدی</a>
        </li>
    `;
    
    pagination.innerHTML = html;
}

// تغییر صفحه
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// مشاهده محصول
function viewProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        // شبیه‌سازی رفتن به صفحه محصول
        const modalHtml = `
            <div class="modal fade" id="productModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${product.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                                </div>
                                <div class="col-md-6">
                                    <p>${product.description}</p>
                                    <div class="price-section">
                                        ${product.fakePrice ? `
                                            <div class="d-flex align-items-center mb-2">
                                                <span class="fake-price text-muted me-2">${product.fakePrice} تومان</span>
                                                <span class="discount-badge badge bg-success">%${product.discount}</span>
                                            </div>
                                        ` : ''}
                                        <h4 class="real-price">${product.price} تومان</h4>
                                    </div>
                                    <button class="btn btn-yaldai w-100 mt-3" onclick="orderProduct(${product.id})">
                                        <i class="fas fa-shopping-cart me-2"></i>سفارش از طریق واتساپ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // ایجاد modal
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer);
        
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
        
        // حذف modal بعد از بسته شدن
        document.getElementById('productModal').addEventListener('hidden.bs.modal', function () {
            modalContainer.remove();
        });
    }
}

// سفارش محصول
function orderProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        const message = `سلام! می‌خوام محصول "${product.name}" رو سفارش بدم.`;
        const whatsappUrl = `https://wa.me/989123456789?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // جستجو با اینتر
    document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });
});