export function formatToUSD(amount) {
  return amount?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const formatToPercentage = num => `${Math.abs(num).toFixed(2)}%`;

export function formatToCurrency(value) {
  // Convert the value to a string with commas and two decimal places
  const formattedValue = value
    ?.toFixed(2)
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Add the dollar sign and return the formatted value
  return `$${formattedValue}`;
}

export function formatNumberWithCommas(value) {
  // Convert the value to a string with commas and two decimal places
  return value?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
