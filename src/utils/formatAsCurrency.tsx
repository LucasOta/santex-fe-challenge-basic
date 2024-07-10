const formatAsCurrency = (price: number) => {
  const currency = 'USD';
  const locale = 'en-US';
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

  return currencyFormatter.format(price);
};

export default formatAsCurrency;
