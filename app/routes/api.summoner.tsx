import { json } from '@remix-run/cloudflare';

export async function loader() {
  return json({ message: 'Hello World' });
}
