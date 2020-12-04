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

const UnitsTickets = [
  'TIET11',
  'ALUP11',
  'BIDI11',
  'BPAC11',
  'ENGI11',
  'KLBN11',
  'PPLA11',
  'RNEW11',
  'SAPR11',
  'SANB11',
  'SULA11',
  'TAEE11',
];

export const isUnit = (symbol: string) =>
  UnitsTickets.includes(symbol.toUpperCase());

export const getClassTicket = (ticket: string) =>
  ticket.slice(-2) === '34'
    ? 'BDR'
    : ticket.slice(-1) === '3' || ticket.slice(-1) === '4' || isUnit(ticket)
    ? 'Ação'
    : ticket.slice(-2) === '11' && !isUnit(ticket)
    ? 'FII'
    : 'Outros';

interface IGetgetLengthTicketPerClass {
  name: string;
  percent: number;
}

export const getLengthTicketPerClass = (
  items: IGetgetLengthTicketPerClass[],
) => {
  let unicClass: string[] = [];

  items.map(item => {
    if (!unicClass.includes(item.name)) {
      return unicClass.push(item.name);
    }
  });

  const countClass = unicClass.map(unic => ({
    name: unic,
    count: items.filter(item => item.name === unic).length,
    percent: items
      .filter(item => item.name === unic)
      .reduce((acc, cur) => acc + cur.percent, 0),
  }));

  return countClass;
};
