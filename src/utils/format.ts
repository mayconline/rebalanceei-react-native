export const formatNumber = (amount: number) => `R$ ${amount.toFixed(2)}`;

export const formatPercent = (percent: number) =>
  ` (${percent > 0 ? '+' : ''}${percent.toFixed(1)}%)`;

export const formatStatus = (status: string) =>
  status === 'BUY' ? 'Comprar' : status === 'KEEP' ? 'Aguardar' : 'Analizar';

export const formatTicket = (symbol: string) => symbol.split('.')[0];

export const formatFilter = (filter: string) =>
  ({
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
