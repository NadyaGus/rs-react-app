import { regions, Regions } from '../types/regions';

export function isRegion(value: string): value is Regions {
  return regions.includes(value as Regions);
}

export function isPopulation(
  value: string
): value is 'asc' | 'desc' | 'default' {
  return value === 'asc' || value === 'desc' || value === 'default';
}
