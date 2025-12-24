export function capitalizeFirstLetter(word) {
  return word.split("")[0].toUpperCase() + word.slice(1);
}

export function formatCurrency(
  value,
  localeCode = "en-US",
  currencyCode = "USD",
) {
  return new Intl.NumberFormat(localeCode, {
    style: "currency",
    currency: currencyCode,
  }).format(value);
}
// "https://api.exchangerate-api.com/v4/latest/" + currency + "?symbols=USD";

export function formatNumber(value) {
  return value.toLocaleString("en-US");
}

export function saveAccountToStorage(account, username) {
  if (!username) return;
  localStorage.setItem(`moneyTapAccount_${username}`, JSON.stringify(account));
}

export function getAccountFromStorage(username) {
  if (!username) return null;
  return JSON.parse(localStorage.getItem(`moneyTapAccount_${username}`));
}
