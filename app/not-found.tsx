import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className='py-20 text-center'>
      <h1 className='text-3xl font-bold'>404 — Page not found</h1>
    </div>
  );
}
