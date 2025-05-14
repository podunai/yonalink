/**
 * Format a price in USD, with two decimal places of precision.
 *
 * @example
 * formatPriceUSD(12.3456) // "$12.35 USD"
 *
 * @param amount - The price to format.
 * @return A string with the formatted price.
 */
export function formatPriceUSD(amount: number): string {
  return `$${amount.toFixed(2)} USD`;
}
