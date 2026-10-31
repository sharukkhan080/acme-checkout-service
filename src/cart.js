// Cart totals for the checkout service.
export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function total(items, taxRate = 0.18, discountPercent = 0) {
  const net = subtotal(items) * (1 - discountPercent / 100);
  return net + net * taxRate;
}
