import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { Form, useActionData, useLoaderData } from '@remix-run/react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title');
  console.log(title);
  return json({ title });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ me: params.me, info: params.info });
};

export default function Info() {
  const { me, info } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className='font-sans p-4'>
      <h1 className='text-3xl'>
        This is INFO: {me} - {info}
      </h1>
      {actionData?.title && <h3>{actionData.title as string}</h3>}
      <Form method='post' className='flex gap-2'>
        <input name='title' className='border border-gray-300 p-2' />
        <button type='submit' className='bg-indigo-400 text-white p-2'>
          {'Create New Project'}
        </button>
      </Form>
    </div>
  );
}
