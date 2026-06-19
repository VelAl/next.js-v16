import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Explore the blog, create posts, and practice Next.js 16 with Convex.',
};

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
