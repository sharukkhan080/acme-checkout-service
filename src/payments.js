// Charges a card through the payment gateway, retrying temporary failures.
const RETRYABLE = new Set(['timeout', 'rate_limited', 'gateway_unavailable']);

export async function charge(gateway, order, { attempts = 3, baseDelayMs = 200 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const result = await gateway.charge({ amount: order.total, currency: order.currency });
    if (result.ok) return result.id;
    lastError = result.error;
    if (!RETRYABLE.has(result.error)) break;
    await new Promise((r) => setTimeout(r, baseDelayMs * 2 ** (attempt - 1)));
  }
  throw new Error(`Payment failed: ${lastError}`);
}
