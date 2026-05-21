import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';

export const NavBar = () => {
  return (
    <nav className='w-full p-5 flex items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link href={'/'} className='text-3xl font-bold'>
          Next.js<span className='text-blue-500'>16</span>
        </Link>

        <div className='flex items-center gap-2'>
          <Link className={buttonVariants({ variant: 'ghost' })} href={'/'}>
            Home
          </Link>
          <Link className={buttonVariants({ variant: 'ghost' })} href={'/blog'}>
            Blog
          </Link>
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            href={'/create'}
          >
            Create
          </Link>
        </div>
      </div>

      <div className='flex items-center gap-2 ml-auto'>
        <Link className={buttonVariants()} href={'/auth/sign-up'}>
          Sign Up
        </Link>
        <Link
          className={buttonVariants({ variant: 'secondary' })}
          href={'/auth/sign-in'}
        >
          Sign In
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
};
