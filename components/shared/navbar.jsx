'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Gift } from 'lucide-react'
import Link from 'next/link'
import ModeToggle from './mode-toggle'
import LanguageSwitcher from './language-dropdown'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Logo from './logo'
import { NavbarAuthActions } from './navbar-auth-actions'

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const [activeHash, setActiveHash] = useState('#')

	const { t } = useTranslation()

	const pathname = usePathname()

	const menu = [
		{ name: t('navbar.home'), link: '#', id: '#' },
		{ name: t('navbar.courses'), link: '/all-courses', id: '#courses' },
		{ name: t('navbar.mentor'), link: '#mentors', id: '#mentors' },
		{ name: t('navbar.group'), link: '#community', id: '#community' },
		{ name: t('navbar.testimonials'), link: '#testimonial', id: '#testimonial' },
		{ name: t('navbar.blog'), link: '#blog', id: '#blog' },
		{ name: t('navbar.offer'), link: '#offer', id: '#offer', icon: true }
	]

	useEffect(() => {
		const onHash = () => setActiveHash(window.location.hash || '#')
		onHash()
		window.addEventListener('hashchange', onHash)
		return () => window.removeEventListener('hashchange', onHash)
	}, [])

	const isMenuItemActive = item => {
		if (item.link === '/all-courses') {
			return pathname === '/all-courses' || pathname.startsWith('/courses/')
		}

		// Section/hash links faqat bosh sahifada active bo'ladi.
		if (item.link.startsWith('#')) {
			if (pathname !== '/') return false
			if (item.id === '#') return activeHash === '' || activeHash === '#'
			return activeHash === item.id
		}

		return pathname === item.link
	}

	return (
		<div className='fixed top-0 inset-x-0 z-50 w-full border-b border-gray-200/70 dark:border-gray-800/80 bg-white/95 dark:bg-[#0b1117]/90 backdrop-blur-xl shadow-sm shadow-black/5 dark:shadow-black/20'>
			<motion.nav
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className='mx-auto w-full max-w-7xl px-3 sm:px-4'
			>
				<div className='py-6 grid grid-cols-[1fr_auto] items-center gap-2 lg:grid-cols-[1fr_auto_1fr]'>
					{/* LOGO */}
					<div className='pl-1 justify-self-start'>
						<Logo />
					</div>

					{/* DESKTOP MENU — markazda */}
					<ul className='hidden lg:flex col-start-2 justify-self-center items-center gap-1 text-sm font-medium'>
						{menu.map((item, i) => {
							const isActive = isMenuItemActive(item)
							return (
								<li key={i}>
									<Link
										href={pathname === '/pricing' ? '/' : item.link}
										className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full transition ${
											isActive
												? 'text-gray-900 dark:text-white'
												: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
										}`}
									>
										{item.icon && <Gift size={14} className='text-amber-500' />}
										{item.name}
										{isActive && (
											<motion.span
												layoutId='activeNavUnderline'
												className='absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[3px] w-5 rounded-full bg-green-500'
												transition={{ type: 'spring', stiffness: 380, damping: 30 }}
											/>
										)}
									</Link>
								</li>
							)
						})}
					</ul>

					{/* DESKTOP RIGHT */}
					<div className='hidden lg:flex col-start-3 justify-self-end items-center gap-1.5'>
						<LanguageSwitcher />
						<ModeToggle />

						<NavbarAuthActions />
					</div>

					{/* MOBILE RIGHT */}
					<div className='lg:hidden col-start-2 justify-self-end flex items-center gap-1'>
						<ModeToggle />
						<button
							onClick={() => setOpen(!open)}
							aria-label='Toggle menu'
							className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition'
						>
							{open ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>

				{/* MOBILE MENU */}
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className='lg:hidden mt-2 bg-white/95 dark:bg-[#0b1117]/95 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800/80 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 overflow-hidden'
					>
						<div className='px-5 py-5 flex flex-col gap-4'>
							{menu.map((item, i) =>
								(() => {
									const isActive = isMenuItemActive(item)
									return (
										<Link
											key={i}
											href={pathname === '/pricing' ? '/' : item.link}
											onClick={() => setOpen(false)}
											className={`font-medium transition inline-flex items-center gap-2 ${
												isActive
													? 'text-green-600 dark:text-green-400'
													: 'text-gray-700 dark:text-gray-200 hover:text-green-500'
											}`}
										>
											{item.icon && <Gift size={16} className='text-amber-500' />}
											{item.name}
										</Link>
									)
								})()
							)}

							<div className='flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-800'>
								<LanguageSwitcher />
							</div>

							<NavbarAuthActions compact onNavigate={() => setOpen(false)} />

						</div>
					</motion.div>
				)}
			</motion.nav>
		</div>
	)
}
