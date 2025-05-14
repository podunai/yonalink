/**
 * Clears unnecessary whitespace from a string and symbols
 *
 * @param price
 * @returns The clean price.
 */
export function clearPrice(price: string): number {
  const clearPrice = price?.replace(/[^0-9.]/g, "") ?? "";
  return Number(clearPrice);
}

/**
 * Clears unnecessary whitespace from a string and symbols
 *
 * @param name
 * @returns The cleaned string.
 */
export function clearName(name: string): string {
  return name?.trim().replace(/\s+/g, " ") ?? "";
}
