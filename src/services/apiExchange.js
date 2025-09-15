export const API_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rI6ZC3g09V5pyWlSwq6edPxjHrlGT1KNZ7dV4zc3";

export async function getExchangeRate() {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error(`${res.status}: Failed to fetch exchange rates`);

  const { data } = await res.json();

  return data;
}
