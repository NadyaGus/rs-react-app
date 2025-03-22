export const LS_KEY = 'visited_by_NadyaGus';

export function getLocalStorageData() {
  const data = localStorage.getItem(LS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}
