import { NavBar } from '@/components/navbar';

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default SharedLayout;
