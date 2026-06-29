import { NavBar } from '@/components/navbar';

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <NavBar />
      <div className='min-h-0 flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
};

export default SharedLayout;
