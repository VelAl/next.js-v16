import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth-server';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in');
  }

  return children;
}
