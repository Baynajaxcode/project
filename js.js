// 1. ข้อมูลสินค้า (เพิ่ม Category และ Description)
const allProducts = [
    { id: 1, name: "ไม้ถูพื้นรีดน้ำ Microfiber", price: 350, category: "kitchen", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80", description: "ผ้าม็อบไมโครไฟเบอร์ ซับน้ำได้ดีเยี่ยม รีดน้ำง่ายไม่ต้องใช้มือบิด" },
    { id: 2, name: "หุ่นยนต์ดูดฝุ่นอัจฉริยะ V2", price: 2900, category: "all", img: "https://images.unsplash.com/photo-1589127077225-45ff7be4241c?auto=format&fit=crop&w=500&q=80", description: "ทำงานอัตโนมัติด้วยระบบเซ็นเซอร์ เข้าถึงทุกซอกมุม แม้ใต้โซฟา" },
    { id: 3, name: "น้ำยาอเนกประสงค์สูตรเข้มข้น", price: 120, category: "kitchen", img: "https://images.unsplash.com/photo-1558523038-0812256f5055?auto=format&fit=crop&w=500&q=80", description: "ขจัดคราบมันและคราบสกปรกได้หมดจด กลิ่นหอมสดชื่น" },
    { id: 4, name: "ชุดแปรงขัดห้องน้ำดีไซน์โมเดิร์น", price: 180, category: "bathroom", img: "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&w=500&q=80", description: "ขนแปรงแข็งแรงทนทาน เข้าถึงซอกมุมห้องน้ำได้ดี" }
];

const bestSellers = [
    { id: 5, name: "ถังขยะอัจฉริยะระบบเซ็นเซอร์", price: 890, img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=500&q=80", description: "เปิด-ปิดฝาอัตโนมัติด้วยระบบเซ็นเซอร์ สะดวก สะอาด ไร้สัมผัส" },
    { id: 6, name: "สเปรย์ฆ่าเชื้อ Hygiene", price: 199, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80", description: "ฆ่าเชื้อแบคทีเรียและไวรัสได้ 99.9% ภายใน 30 วินาที" }
];

// เพิ่มข้อมูลสินค้าโปรโมชั่น
const promoProducts = [
    { id: 7, name: "Set คู่กู้บ้านสะอาด", price: 450, img: "https://images.unsplash.com/photo-1558523038-0812256f5055?auto=format&fit=crop&w=500&q=80", description: "โปรโมชั่นแพ็คคู่สุดคุ้ม เฉพาะเดือนนี้เท่านั้น!" }
];

// 2. ระบบตะกร้าสินค้าแบบสมบูรณ์
let cart = [];

function addToCart(productId) {
    const allAvailable = [...allProducts, ...bestSellers, ...promoProducts];
    const item = allAvailable.find(p => p.id === productId);
    
    if (item) {
        cart.push(item);
        updateCartUI();
        
        // แอนิเมชั่นเขย่าตะกร้า
        const cartBadge = document.getElementById('cart-count');
        if (cartBadge) {
            cartBadge.classList.add('badge-pulse');
            setTimeout(() => cartBadge.classList.remove('badge-pulse'), 300);
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-items-list');
    const totalPriceEl = document.getElementById('cart-total-price');
    
    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="text-center text-muted py-4">ไม่มีสินค้าในตะกร้า</p>';
        totalPriceEl.innerText = '฿0';
    } else {
        let total = 0;
        cartList.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `
                <div class="d-flex align-items-center mb-3 p-2 bg-light rounded-3">
                    <img src="${item.img}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;" class="me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 small fw-bold text-truncate" style="max-width: 150px;">${item.name}</h6>
                        <span class="text-primary small fw-bold">฿${item.price.toLocaleString()}</span>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        }).join('');
        totalPriceEl.innerText = `฿${total.toLocaleString()}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 3. ฟังก์ชันเรนเดอร์สินค้า
function renderItems(data, containerId, isHot = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data.map(item => `
        <div class="col-6 col-md-6 col-lg-3 d-flex align-items-stretch mb-4">
            <div class="card product-card shadow-sm p-3 text-center w-100 position-relative border-0">
                ${isHot ? '<span class="best-seller-badge"><i class="fas fa-crown"></i> HOT</span>' : ''}
                <div class="img-wrapper mb-3">
                    <img src="${item.img}" class="card-img-top h-100 w-100" alt="${item.name}">
                    <div class="product-overlay">
                        <p class="small m-0 text-white">${item.description || 'สินค้าคุณภาพพรีเมียมเพื่อบ้านคุณ'}</p>
                    </div>
                </div>
                <h6 class="fw-bold mb-2 text-dark text-truncate px-2">${item.name}</h6>
                <p class="text-primary fw-bold mb-3 fs-5">฿${item.price.toLocaleString()}</p>
                <button class="btn btn-primary rounded-pill w-100 mt-auto py-2 fw-bold shadow-sm" onclick="addToCart(${item.id})">
                    <i class="fas fa-shopping-cart me-2"></i>ใส่ตะกร้า
                </button>
            </div>
        </div>
    `).join('');
}

// 4. ระบบค้นหาและกรอง (แก้ไขให้รองรับ Promotion ด้วย)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(item => item.name.toLowerCase().includes(keyword));
        const filteredBest = bestSellers.filter(item => item.name.toLowerCase().includes(keyword));
        
        renderItems(filteredProducts, 'product-container');
        renderItems(filteredBest, 'best-seller-container', true);
    });
}

// 5. ชำระเงิน
function checkout() {
    if (cart.length === 0) return alert('กรุณาเลือกสินค้าก่อนชำระเงิน');
    alert('ขอบคุณที่สั่งซื้อ! ยอดชำระทั้งหมดคือ ' + document.getElementById('cart-total-price').innerText);
    cart = [];
    updateCartUI();
}

// 6. เริ่มทำงานเมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    renderItems(allProducts, 'product-container');
    renderItems(bestSellers, 'best-seller-container', true);
    renderItems(promoProducts, 'promotion-container'); // เรนเดอร์ส่วนโปรโมชั่น
});