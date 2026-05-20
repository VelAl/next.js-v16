export const authRouteMeta = {
  '/auth/sign-in': {
    subtitle: 'Enter your credentials to access your account',
    footer: {
      prompt: "Don't have an account?",
      href: '/auth/sign-up',
      label: 'Sign up',
    },
  },
  '/auth/sign-up': {
    subtitle: 'Create an account to get started',
    footer: {
      prompt: 'Already have an account?',
      href: '/auth/sign-in',
      label: 'Sign in',
    },
  },
} as const;

export function getAuthRouteMeta(pathname: string) {
  return (
    authRouteMeta[pathname as keyof typeof authRouteMeta] ??
    authRouteMeta['/auth/sign-in']
  );
}
