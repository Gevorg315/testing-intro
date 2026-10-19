const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  test('returns products[0] for ID 1', () => {
    expect(getProductById(products, 1)).toEqual(products[0]);
  });

  test('returns products[3] for ID 4', () => {
    expect(getProductById(products, 4)).toEqual(products[3]);
  });

  test('returns products[5] for ID 6', () => {
    expect(getProductById(products, 6)).toEqual(products[5]);
  });

  test('returns null for ID 0', () => {
    expect(getProductById(products, 0)).toBeNull();
  });

  test('returns null for ID 999', () => {
    expect(getProductById(products, 999)).toBeNull();
  });

  test('returns null for ID -1', () => {
    expect(getProductById(products, -1)).toBeNull();
  });

  test("returns null for string ID '1'", () => {
    expect(getProductById(products, '1')).toBeNull();
  });

  test('returns null for undefined ID', () => {
    expect(getProductById(products, undefined)).toBeNull();
  });

  test('returns null for NaN ID', () => {
    expect(getProductById(products, NaN)).toBeNull();
  });
});