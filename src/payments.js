// Charges a card through the payment gateway.
export async function charge(gateway, order) {
  const result = await gateway.charge({ amount: order.total, currency: order.currency });
  if (!result.ok) throw new Error('Payment failed');
  return result.id;
}
