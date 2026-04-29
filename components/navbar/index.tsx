import Link from 'next/link';

export const NavBar = () => {
  return (
    <nav className='w-full py-5 items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link href={'/'} className='text-3xl font-bold'>
          Next.js<span className='text-blue-500'>16</span>
        </Link>

        <div className='flex items-center gap-2'>
          <Link href={'/'}>Home</Link>
          <Link href={'/blog'}>Blog</Link>
          <Link href={'/create'}>Create</Link>
        </div>
      </div>
    </nav>
  );
};
