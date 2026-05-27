const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("#modal-title");
const modalCopy = document.querySelector("[data-modal-copy]");
const cartDot = document.querySelector(".cart-dot");
const wishlistButton = document.querySelector('[data-action="wishlist"]');
const collectionGrid = document.querySelector(".collection-grid");
const newsletterForm = document.querySelector("#newsletter-form");
const formStatus = document.querySelector(".form-status");

let cartCount = 0;

const modalMessages = {
  search: {
    title: "Search Blue Sky collections",
    copy: "Try browsing plates, cutlery, drinkware, serveware, or complete sets. The full product catalog can plug into this same interface when your store data is ready."
  },
  wishlist: {
    title: "Wishlist saved",
    copy: "Your favorites are highlighted. In a full store build, this action can sync to customer accounts or browser storage."
  },
  cart: {
    title: "Your sample cart",
    copy: "Use Shop Now on any collection to add samples. This is ready to connect to Shopify, Stripe, or another checkout flow."
  },
  story: {
    title: "Watch our story",
    copy: "Blue Sky New York creates elevated disposable tableware for weddings, events, and wholesale buyers who need luxury presentation without stress."
  },
  gallery: {
    title: "Event gallery",
    copy: "Browse real event inspiration, save visual references, and imagine each collection styled for your own tablescape."
  }
};

function openModal(type, customTitle) {
  const message = modalMessages[type] || modalMessages.cart;
  modalTitle.textContent = customTitle || message.title;
  modalCopy.textContent = message.copy;
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

function addToCart(productName) {
  cartCount += 1;
  cartDot.textContent = String(cartCount);
  cartDot.classList.add("pulse");
  window.setTimeout(() => cartDot.classList.remove("pulse"), 450);
  openModal("cart", `${productName} added to your sample cart`);
}

document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  const productTarget = event.target.closest("[data-product]");
  const galleryImage = event.target.closest(".gallery-grid img");

  if (productTarget) {
    addToCart(productTarget.dataset.product);
    return;
  }

  if (galleryImage) {
    openModal("gallery", galleryImage.alt);
    return;
  }

  if (!actionTarget) return;

  const action = actionTarget.dataset.action;

  if (action === "close-modal") {
    closeModal();
    return;
  }

  if (action === "wishlist") {
    wishlistButton.classList.toggle("is-active");
    openModal("wishlist");
    return;
  }

  if (action === "slide-prev" || action === "slide-next") {
    const amount = action === "slide-next" ? 210 : -210;
    collectionGrid.scrollBy({ left: amount, behavior: "smooth" });
    return;
  }

  openModal(action);
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(newsletterForm).get("email") || document.querySelector("#email").value;
  formStatus.textContent = email ? "You are on the list." : "Enter your email to subscribe.";
  if (email) newsletterForm.reset();
});
