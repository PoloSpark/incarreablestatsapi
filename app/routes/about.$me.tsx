import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, Outlet, useLoaderData } from '@remix-run/react';

// This is the backend
export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ me: params.me });
};

export default function Me() {
  const { me } = useLoaderData<typeof loader>();

  return (
    <div className='font-sans p-4'>
      <h1 className='text-3xl text-red-500'>This is {me}</h1>
      <Outlet />
    </div>
  );
}
