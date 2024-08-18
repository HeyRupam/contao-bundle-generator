"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/"
              className={`hover:text-gray-400 ${
                pathname === '/' ? 'text-blue-500' : 'text-white'
              }`}
            >
              Bundle Generator
         </Link>
        </li>
        <li>|</li>
        <li>
          <Link href="/database"
              className={`hover:text-gray-400 ${
                pathname === '/database' ? 'text-blue-500' : 'text-white'
              }`}
            >
              Database
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
