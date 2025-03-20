import { Regions } from '../types/regions';

export function isRegion(value: string): value is Regions {
  const actionTypes: Regions[] = [
    'all',
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  return actionTypes.includes(value as Regions);
}

export function isPopulation(
  value: string
): value is 'asc' | 'desc' | 'default' {
  return value === 'asc' || value === 'desc' || value === 'default';
}
