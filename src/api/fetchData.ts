import { CardProps, CardsResponse } from '../shared/types/cardTypes';

export const endPoints = {
  search: '/anime?q=',
  details: '/anime/',
};

class fetchAPI {
  url = 'https://api.jikan.moe/v4';

  async getResults(value: string = '', page = 1): Promise<CardsResponse> {
    const data = await fetch(
      `${this.url}${endPoints.search}${value}&limit=5&page=${page}`
    );
    return data.json();
  }

  async getDetails(id: string): Promise<{ data: CardProps }> {
    const data = await fetch(`${this.url}${endPoints.details}${id}`);
    return data.json();
  }
}

const fetchData = new fetchAPI();

export { fetchData };
