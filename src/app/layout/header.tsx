import NAV_ITEMS from '@shared/constants/nav';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 flex items-center bg-white py-6 z-10">
      <h1 className="absolute left-10">
        <a href="/" className="text-2xl font-bold">
          CERTICOS BOOKS
        </a>
      </h1>
      <div className="container mx-auto">
        <nav>
          <ul className="flex gap-14 justify-center">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative t-body-1 border-primary pb-1 font-bold ${
                      isActive ? 'border-b' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
