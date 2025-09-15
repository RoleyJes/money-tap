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

// const data = await res.json();
// const rate = data.rates.USD;
// const convertedAmount = Math.round(amount * rate * 100) / 100;
