import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Logo = ({white}: {white: boolean}) => {
  return (
		<div>
			<Link href='/'>
				<div
					className={`flex items-center gap-2 font-semibold  text-lg ${white ? 'text-white' : 'text-gray-900 dark:text-white'}`}
				>
					<BookOpenText className='text-white w-10 h-10 p-2 bg-[#10B981] rounded-md' size={20} />
          <span className='font-bold text-2xl'>
					Bilimgoh
          </span>
				</div>
			</Link>
		</div>
	)
}

export default Logo