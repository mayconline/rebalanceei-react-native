export const formatNumber = (amount: number) => `R$ ${amount?.toFixed(2)}`;

export const formatAveragePricePreview = (averagePrice: string) => {
  let preview = '';
  let value = '';

  value = averagePrice.replace(/R?\$/i, '').trim();
  if (value.startsWith('R')) value = value.replace(/R/i, '').trim();

  value = value.replace(',', '.');
  preview = `R$ ${value}`;

  return { value, preview };
};

export const formatPercent = (percent: number) =>
  ` (${percent > 0 ? '+' : ''}${percent.toFixed(1)}%)`;

export const formatProgress = (grade: number, current: number) => {
  if (grade === 0) return 1;

  return current / grade;
};

export const formatStatus = (status: string) =>
  status === 'BUY' ? 'Comprar' : status === 'KEEP' ? 'Aguardar' : 'Analizar';

export const formatTicket = (symbol: string) => symbol?.split('.')[0];

export const formatFilter = (filter: string) =>
  ({
    [filter]: filter,
    symbol: 'Ativo',
    grade: 'Nota',
    status: 'Status',
    currentAmount: 'Saldo Atual',
    currentPercent: '% Atual',
    gradePercent: '% Ideal',
    targetAmount: 'Valor',
    targetPercent: 'Porcentagem',
    costAmount: 'Saldo Aplicado',
    variationPercent: 'Rentabilidade',
  }[filter]);
