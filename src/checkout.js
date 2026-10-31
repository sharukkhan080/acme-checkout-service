import { total } from './cart.js';
import { charge } from './payments.js';

// Places an order: totals the cart and charges the customer.
export async function placeOrder(gateway, cart, currency = 'USD') {
  const order = { total: total(cart.items), currency };
  const paymentId = await charge(gateway, order);
  return { ...order, paymentId, status: 'paid' };
}
