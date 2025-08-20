import { Outlet } from 'react-router-dom';
import Header from '@app/layout/header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto pt-40 pb-36">
        <Outlet />
      </main>
    </>
  );
}
