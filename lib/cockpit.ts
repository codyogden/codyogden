export const collections = (name: string, params: any = {}) => {
  let url = new URL(`${process.env.NEXT_PUBLIC_COCKPIT_URL}/api/collections/get/${name}`);
  url.searchParams.append('token', process.env.COCKPIT_TOKEN);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.href;
};

export const singletons = (name: string, params: any = {}) => {
  let url = new URL(`${process.env.NEXT_PUBLIC_COCKPIT_URL}/api/singletons/get/${name}`);
  url.searchParams.append('token', process.env.COCKPIT_TOKEN);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.href;
};

export const photoURL = (path: string) => {
  let url = new URL(path, process.env.NEXT_PUBLIC_COCKPIT_URL);
  return url.href;
};
