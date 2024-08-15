"use client";
import Link from 'next/link';

const FootBar = () => {

  return (
    <footer className="flex mt-10 justify-center bg-gray-800 p-4">
      <div className="flex space-x-4">
          <Link href="/"
              className={`text-white hover:text-gray-400`}
            >
              Footer Text
         </Link>        
      </div>
    </footer>
  );
};

export default FootBar;
