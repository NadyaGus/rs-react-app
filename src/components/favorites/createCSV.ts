import { CardProps } from '../../types/cardTypes';

export const createCSV = (data: CardProps[]): string => {
  const titles =
    ['title_english', 'title_japanese', 'link', 'source', 'status'].join(',') +
    '\n';

  const values = data
    .map((card) => {
      console.log(card.synopsis);
      return [
        card.title_english,
        card.title_japanese,
        card.url,
        card.source,
        card.status,
      ];
    })
    .join('\n');

  return titles + values;
};
