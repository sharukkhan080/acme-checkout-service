// Cart totals for the checkout service.
export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function total(items, taxRate = 0.18) {
  const net = subtotal(items);
  return net + net * taxRate;
}
