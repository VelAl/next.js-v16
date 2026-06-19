import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create an account to explore the blog and publish posts.',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
