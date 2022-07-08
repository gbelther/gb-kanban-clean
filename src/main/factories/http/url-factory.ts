export const makeUrl = (path: string): string =>
  `${process.env.API_URL}${path}`;
