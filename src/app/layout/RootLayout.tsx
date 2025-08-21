import { Outlet } from 'react-router-dom';
import Header from '@app/layout/header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto pt-25 md:pt-40 px-4 pb-36 lg:px-0 lg:pt-48 lg:pb-40">
        <Outlet />
      </main>
    </>
  );
}
