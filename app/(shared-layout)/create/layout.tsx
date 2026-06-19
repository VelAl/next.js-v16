import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Post',
  description: 'Create and publish a new blog article.',
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
