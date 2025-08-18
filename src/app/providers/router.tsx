import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@app/layout/RootLayout';
import BookSearchPage from '@features/books/page';

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
        element: <div>Wishlist Page</div>,
      },
    ],
  },
]);
