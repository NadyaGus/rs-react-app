type CardProps = {
  mal_id: number;
  images: { webp: { image_url: string } };
  title_english: string;
  title_japanese: string;
  synopsis: string;
};

type CardsResponse = {
  pagination: { limit: number; total: number; count: number; offset: number };
  data: CardProps[];
};

export type { CardProps, CardsResponse };
