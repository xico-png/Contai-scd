export const formatMonthYear = (key: string) => {
  const [year, month] = key.split('-').map(Number);
  const date = new Date(year, month);
  return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
};

