// tests/locators/phonesLocator.ts

const phonesLocator = {
  phonesCategoryLink: "//a[text()='Phones']",
  phoneItems: '#tbodyid .card-title a',
  samsungGalaxyS6Link: "//a[text()='Samsung galaxy s6']",
  productName: '.name',
  productPrice: '.price-container',
  productMoreInfo: '#more-information',
  addToCartButton: "//a[text()='Add to cart']",
  cartLink: '#cartur',
  cartTableRows: '#tbodyid tr',
  cartProductNameCell: '#tbodyid tr td:nth-child(2)',
};

export default phonesLocator;
