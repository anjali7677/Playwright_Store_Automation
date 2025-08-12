// tests/locators/laptopLocators.ts

const laptopLocators = {
  laptopsCategoryLink: "//a[text()='Laptops']",
  laptopItems: '#tbodyid .card-title a',
  macBookAirLink: "//a[text()='MacBook air']",
  productName: '.name',
  productPrice: '.price-container',
  productMoreInfo: '#more-information',
  addToCartButton: "//a[text()='Add to cart']",
  cartLink: '#cartur',
  cartTableRows: '#tbodyid tr',
  cartProductNameCell: '#tbodyid tr td:nth-child(2)',
};

export default laptopLocators;
