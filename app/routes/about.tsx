import { Outlet } from '@remix-run/react';

export default function About() {
  return (
    <div className='font-sans p-4'>
      <h1 className='text-3xl'>Incarreables Stats - About</h1>
      <ul className='list-disc mt-4 pl-6 space-y-2'>
        <li>
          <a
            className='text-blue-700 underline visited:text-purple-900'
            target='_blank'
            href='https://remix.run/docs'
            rel='noreferrer'>
            Polo
          </a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
