export const createCurrencyFormat = (number) =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(number);
