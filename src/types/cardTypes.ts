type CardProps = {
  mal_id: number;
  images: { webp: { image_url: string } };
  title_english: string;
  title_japanese: string;
  synopsis: string;
  source: string;
  status: string;
};

type CardsResponse = {
  pagination: {
    last_visible_page: number;
    has_next_page: true;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: CardProps[];
};

export type { CardProps, CardsResponse };
