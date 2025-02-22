import { CardProps } from '../../types/cardTypes';

export const createCSV = (data: CardProps[]): string => {
  const titles = [
    'title_english',
    'title_japanese',
    'url',
    'source',
    'status',
  ].join(',');

  const csv = [];
  csv.push(titles);

  data.forEach((item) => {
    csv.push(
      `${item.title_english ?? 'No title'},${item.title_japanese ?? 'No title'},${item.url ?? 'No url'},${item.source ?? 'Unknown source'},${item.status ?? 'Unknown status'}`
    );
  });

  const values = csv.join('\r\n');

  return values;
};
