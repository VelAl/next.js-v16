import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account to access the blog and create posts.',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
