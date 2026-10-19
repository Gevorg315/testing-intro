const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  test("'all' returns all products", () => {
    expect(filterByCategory(products, 'all').map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('undefined returns all products', () => {
    expect(filterByCategory(products, undefined).map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('an empty string returns all products', () => {
    expect(filterByCategory(products, '').map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('filters electronics', () => {
    expect(filterByCategory(products, 'electronics').map(({ id }) => id)).toEqual([1, 2]);
  });

  test('filters books', () => {
    expect(filterByCategory(products, 'books').map(({ id }) => id)).toEqual([3, 6]);
  });

  test('filters home products', () => {
    expect(filterByCategory(products, 'home').map(({ id }) => id)).toEqual([4, 5]);
  });

  test('returns an empty array for clothes', () => {
    expect(filterByCategory(products, 'clothes')).toEqual([]);
  });

  test('returns an empty array for toys', () => {
    expect(filterByCategory(products, 'toys')).toEqual([]);
  });

  test('returns an empty array for sports', () => {
    expect(filterByCategory(products, 'sports')).toEqual([]);
  });
});