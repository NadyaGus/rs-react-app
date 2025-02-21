import { CardProps } from '../../types/cardTypes';

export const createCSV = (data: CardProps[]): string => {
  const titles = Object.keys(data[0] ?? {});

  const csv = [];
  csv.push(titles);

  data.forEach((item) => {
    csv.push(Object.values(item));
  });

  let csvContent = '';

  csv.forEach((row) => {
    csvContent += row.join(';') + '\r\n';
  });

  return csvContent;
};
