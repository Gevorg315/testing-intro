function addToCart(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError("Quantity must be a positive integer.");
  }

  if (!product || quantity > product.stock) {
    throw new RangeError("Quantity exceeds available stock.");
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;

  if (newQuantity > product.stock) {
    throw new RangeError("Quantity exceeds available stock.");
  }

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item,
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  const existingItem = cart.find((item) => item.id === productId);

  if (!existingItem) {
    return cart;
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError("Quantity must be a positive integer.");
  }

  if (quantity > existingItem.stock) {
    throw new RangeError("Quantity exceeds available stock.");
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0,
  );
}

function calculateOrderTotal(cart, promoCode = "") {
  const subtotal = calculateCartSubtotal(cart);

  const discount =
    promoCode === "SAVE10" && subtotal >= 20000
      ? Math.round(subtotal * 0.1)
      : 0;

  const delivery = subtotal < 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
