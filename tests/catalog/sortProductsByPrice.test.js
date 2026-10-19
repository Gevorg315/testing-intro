const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const getProductsByIds = (ids) => products.filter(({ id }) => ids.includes(id));
const getIds = (items) => items.map(({ id }) => id);

describe('sortProductsByPrice', () => {
  test("sorts all products in ascending order with 'asc'", () => {
    expect(getIds(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('sorts all products in ascending order by default', () => {
    expect(getIds(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("sorts products [1, 3, 4] in ascending order", () => {
    expect(getIds(sortProductsByPrice(getProductsByIds([1, 3, 4]), 'asc'))).toEqual([3, 4, 1]);
  });

  test("sorts all products in descending order with 'desc'", () => {
    expect(getIds(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("sorts products [3, 1, 4] in descending order", () => {
    expect(getIds(sortProductsByPrice(getProductsByIds([3, 1, 4]), 'desc'))).toEqual([1, 4, 3]);
  });

  test("sorts products [5, 2, 6] in descending order", () => {
    expect(getIds(sortProductsByPrice(getProductsByIds([5, 2, 6]), 'desc'))).toEqual([2, 5, 6]);
  });

  test("'asc' does not change the original array", () => {
    const selected = getProductsByIds([1, 3, 4]);
    const original = [...selected];

    sortProductsByPrice(selected, 'asc');

    expect(selected).toEqual(original);
    expect(getIds(selected)).toEqual([1, 3, 4]);
  });

  test("'desc' does not change the original array", () => {
    const selected = getProductsByIds([1, 3, 4]);
    const original = [...selected];

    sortProductsByPrice(selected, 'desc');

    expect(selected).toEqual(original);
    expect(getIds(selected)).toEqual([1, 3, 4]);
  });

  test('default direction does not change the original array', () => {
    const original = [...products];

    sortProductsByPrice(products);

    expect(products).toEqual(original);
    expect(getIds(products)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});