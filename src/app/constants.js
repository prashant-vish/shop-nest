export const ITEM_PER_PAGE = 10;

export function discountedPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 1000), 2);
}
