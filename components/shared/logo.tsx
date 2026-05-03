import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Logo = ({white}: {white: boolean}) => {
  return (
    <div>
      <Link href="/">
        <div className={`flex items-center gap-2 font-semibold text-lg ${white ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          <BookOpenText className="text-green-500" />
          Bilimgoh
        </div>
      </Link>
    </div>
  );
}

export default Logo