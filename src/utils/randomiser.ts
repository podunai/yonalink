import { Locator } from "@playwright/test";

/**
 * Returns a random element from the given locator.
 *
 * @param locator - Locator to select a random element from.
 * @returns A Locator pointing to the randomly selected element.
 * @throws Error if the provided locator does not contain any elements.
 */
export async function getRandomElement(locator: Locator): Promise<Locator> {
  const count = await locator.count();
  if (count === 0) {
    throw new Error("No elements found in the provided locator.");
  }

  const randomIndex = Math.floor(Math.random() * count);
  return locator.nth(randomIndex);
}
