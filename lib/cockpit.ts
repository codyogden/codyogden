export const collections = (name: string) => {
  let url = new URL(`${process.env.NEXT_PUBLIC_COCKPIT_URL}/api/collections/get/${name}`);
  url.searchParams.append('token', process.env.COCKPIT_TOKEN);
  return url.href;
};

export const singletons = (name: string) => {
  let url = new URL(`${process.env.NEXT_PUBLIC_COCKPIT_URL}/api/singletons/get/${name}`);
  url.searchParams.append('token', process.env.COCKPIT_TOKEN);
  return url.href;
};
