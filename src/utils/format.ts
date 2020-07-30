export const formatNumber = (amount: number, financialCurrency: string) =>
  `${financialCurrency === 'BRL' ? 'R$' : '$'} ${amount.toFixed(2)}`;

export const formatStatus = (status: string) =>
  status === 'BUY' ? 'Comprar' : status === 'KEEP' ? 'Aguardar' : 'Analizar';
