import { RouterProvider } from 'react-router-dom';
import { router } from '@app/providers/router';
import QueryProvider from '@app/providers/queryClient';

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
