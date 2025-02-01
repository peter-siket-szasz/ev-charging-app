// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}
