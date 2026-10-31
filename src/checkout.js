import { total } from './cart.js';
import { charge } from './payments.js';

// Places an order: totals the cart and charges the customer.
export async function placeOrder(gateway, cart, currency = 'USD') {
  const amount = total(cart.items);
  const order = { total: amount, currency, display: new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount) };
  const paymentId = await charge(gateway, order);
  return { ...order, paymentId, status: 'paid' };
}
