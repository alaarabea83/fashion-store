let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

const products = [];
for (let i = 1; i <= 20; i++) {
    products.push({
        name: `منتج ${i}`,
        price: 100 + i * 10,
        img: `https://picsum.photos/300/280?random=${i}`,
    });
}

const productList = document.getElementById("product-list");
products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src='${p.img}' />
      <div class='info'>
        <div class='title-price'>
          <h3>${p.name}</h3>
          <span class='price'>${p.price} ج</span>
        </div>
        <select id='size${index}'><option>اختر المقاس</option><option>M</option><option>L</option><option>XL</option></select>
        <select id='color${index}'><option>اختر اللون</option><option>أسود</option><option>أبيض</option><option>رمادي</option></select>
        <button class="add-btn" onclick="addToCart('${p.name}',${p.price},'size${index}','color${index}')">
  <span>أضف إلى السلة</span>
  <img src="images/add-to-cart.png" class="btn-icon">
</button>

      </div>
    `;
    productList.appendChild(card);
});

function addToCart(name, price, sizeId, colorId) {
    const size = document.getElementById(sizeId).value;
    const color = document.getElementById(colorId).value;
    if (size.includes("اختر") || color.includes("اختر")) return openModal();
    cart.push({ name, price, size, color });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    cartItemsDiv.innerHTML = "";
    total = 0;
    cart.forEach((i) => {
        total += i.price;
        cartItemsDiv.innerHTML += `<div class='cart-item'><span>${i.name} (${i.size} - ${i.color})</span><span>${i.price} ج</span></div>`;
    });
    document.getElementById("total").innerText = total;
    document.getElementById("count").innerText = cart.length;
}

function toggleCart() {
    const overlay = document.getElementById("cart");
    overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
}

function goCheckout() {
    toggleCart();
    location.href = "#checkout";
}

function sendWhatsApp() {
    if (cart.length === 0) {
        openEmptyCartModal();
        return;
    }
    let msg = "طلب جديد:%0A";
    cart.forEach(
        (i) => (msg += `${i.name} ${i.size} ${i.color} - ${i.price}ج%0A`)
    );
    msg += `الإجمالي: ${total}ج%0Aالاسم: ${name.value}%0Aالهاتف: ${phone.value}%0Aالعنوان: ${address.value}`;
    const whatsappUrl = `whatsapp://send?phone=201019065615&text=${msg}`;
    window.location.href = whatsappUrl;

    localStorage.clear();
    cart = [];
    renderCart();
}

function openModal() {
    document.getElementById("modal").style.display = "flex";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function openEmptyCartModal() {
    document.getElementById("emptyCartModal").style.display = "flex";
}
function closeEmptyCartModal() {
    document.getElementById("emptyCartModal").style.display = "none";
}

renderCart();

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const track = document.getElementById("carouselTrack");
const indicatorsContainer = document.getElementById("indicators");

/* Create indicators */
slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.onclick = () => goToSlide(i);
    indicatorsContainer.appendChild(dot);
});
updateCarousel();

function updateCarousel() {
    track.style.transform = `translateX(${currentSlide * 100}%)`;
    document.querySelectorAll(".indicators span").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

/* Auto play */
setInterval(nextSlide, 5000);
