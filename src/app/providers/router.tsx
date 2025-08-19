import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@app/layout/RootLayout';
import BookSearchPage from '@app/pages/BookSearchPage';
import WishListPage from '@app/pages/WishListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <BookSearchPage />,
      },
      {
        path: 'wishlist',
        element: <WishListPage />,
      },
    ],
  },
]);
