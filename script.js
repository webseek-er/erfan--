// داده‌های نمونه برای محصولات
const products = [
    {
        id: 1,
        name: "گردنبند فیروزه یلدایی",
        description: "گردنبند دست‌ساز با سنگ فیروزه طبیعی",
        price: "۲۹۰,۰۰۰",
        fakePrice: "۳۵۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=محصول+۱",
        discount: 17
    },
    {
        id: 2,
        name: "دستبند عقیق یلدایی",
        description: "دستبند زیبا با سنگ عقیق قرمز",
        price: "۱۸۰,۰۰۰",
        fakePrice: "۲۲۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/C41E3A/FFFFFF?text=محصول+۲",
        discount: 18
    },
    {
        id: 3,
        name: "گوشواره الماس یلدایی",
        description: "گوشواره شیک با سنگ الماس مصنوعی",
        price: "۱۴۰,۰۰۰",
        fakePrice: "",
        image: "https://via.placeholder.com/300x300/2E8B57/FFFFFF?text=محصول+۳",
        discount: 0
    },
    {
        id: 4,
        name: "انگشتر یاقوت یلدایی",
        description: "انگشتر طلا با سنگ یاقوت طبیعی",
        price: "۴۲۰,۰۰۰",
        fakePrice: "۵۰۰,۰۰۰",
        image: "https://via.placeholder.com/300x300/0C2D48/FFFFFF?text=محصول+۴",
        discount: 16
    }
];

// لود محصولات ویژه در صفحه اصلی
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = products.slice(0, 3); // 3 محصول اول
    let html = '';

    featuredProducts.forEach(product => {
        html += `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted small flex-grow-1">${product.description}</p>
                        
                        ${product.fakePrice ? `
                            <div class="d-flex align-items-center mb-2">
                                <span class="fake-price text-muted me-2">${product.fakePrice} تومان</span>
                                <span class="discount-badge badge bg-success fs-7">%${product.discount}</span>
                            </div>
                        ` : ''}
                        
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="real-price fw-bold">${product.price} تومان</span>
                            <button class="btn btn-yaldai btn-sm" onclick="viewProduct(${product.id})">
                                <i class="fas fa-eye me-1"></i>مشاهده
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// مشاهده محصول
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // در حالت واقعی به صفحه محصول هدایت می‌شود
        alert(`مشاهده محصول: ${product.name}\nقیمت: ${product.price} تومان`);
    }
}

// اسکرول نرم
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// انیمیشن اسکرول
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.product-card, .feature-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    initSmoothScroll();
    initScrollAnimations();
    
    // نمایش پیام خوش آمدگویی
    setTimeout(() => {
        if (!localStorage.getItem('welcomeShown')) {
            console.log('🎄 به گالری سنگ‌های یلدایی خوش آمدید! ✨');
            localStorage.setItem('welcomeShown', 'true');
        }
    }, 1000);
});

// مدیریت فرم تماس
function handleContactForm(event) {
    event.preventDefault();
    alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.');
    event.target.reset();
}