import { program } from 'commander';

export async function getUserData(user: string) {
  const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);
  try {
    const URL_GITHUB = `https://api.github.com/users/${user}/events`;
    const response = await fetch(URL_GITHUB);
    const data = await response.json();
    const res = groupBy(data, (item: any) => item.type);
    const result = Object.entries(res).map(([key, value]) => ({
      type: key,
      count: value.length,
    }));

    return result;
  } catch (error) {
    console.error('usuario no encontrado');
  }
}
