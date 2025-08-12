// locators/homePageLocators.ts

const homePageLocators = {
  loginButton: '#login2',
  loginUsernameInput: '#loginusername',
  loginPasswordInput: '#loginpassword',
  loginSubmitButton: "//button[text()='Log in']",
  logoutLink: "//a[text()='Log out']",
  cartLink: '#cartur',
  placeOrderButton: "//button[text()='Place Order']",
  purchaseNameInput: '#name',
  purchaseCountryInput: '#country',
  purchaseCityInput: '#city',
  purchaseCardInput: '#card',
  purchaseMonthInput: '#month',
  purchaseYearInput: '#year',
  purchaseButton: "//button[text()='Purchase']",
  sweetAlertPopup: '.sweet-alert',
  loginPageLogin2Button: '#login2',  // (for verification after logout)
};

export default homePageLocators;
