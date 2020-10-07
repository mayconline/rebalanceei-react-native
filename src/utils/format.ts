export const formatNumber = (amount: number) => `R$ ${amount.toFixed(2)}`;

export const formatStatus = (status: string) =>
  status === 'BUY' ? 'Comprar' : status === 'KEEP' ? 'Aguardar' : 'Analizar';

export const formatTicket = (symbol: string) => symbol.split('.')[0];
