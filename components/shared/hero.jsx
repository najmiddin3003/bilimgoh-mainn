'use client'

import { ArrowRight, Check, Dot, Star, BookOpen, Users, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import Courses from '../shared/cards/courses-card'
import Mentors from '../shared/cards/mentors-card'
import Community from '../shared/cards/community-card'
import Testimonials from '../shared/cards/testimonials'
import TopStudents from '../shared/cards/top-students-card'
import Blog from '../shared/cards/blog-card'
import CtaSection from './cta-section'
import Footer from '../shared/footer'
import Navbar from './navbar'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import CompanyLogoSlider from './our-partners'
import TeachersGrid from './teachers-grid'

const NOTIFICATIONS = [
	{
		name: 'Diyora R.',
		action: 'Andijondan Pro tarifni faollashtirdi',
		time: '8 daqiqa oldin',
		letter: 'D',
		color: 'from-pink-400 to-rose-500'
	},
	{
		name: 'Aziz K.',
		action: 'Toshkentdan Web Dev kursiga yozildi',
		time: '2 daqiqa oldin',
		letter: 'A',
		color: 'from-blue-400 to-indigo-500'
	},
	{
		name: 'Malika S.',
		action: 'Buxorodan UI/UX kursini tugatdi',
		time: '5 daqiqa oldin',
		letter: 'M',
		color: 'from-purple-400 to-violet-500'
	},
	{
		name: 'Bobur T.',
		action: 'Samarqanddan sertifikat oldi',
		time: '12 daqiqa oldin',
		letter: 'B',
		color: 'from-emerald-400 to-teal-500'
	},
	{
		name: 'Nilufar A.',
		action: "Farg'onadan Data Science kursini boshladi",
		time: '1 daqiqa oldin',
		letter: 'N',
		color: 'from-amber-400 to-orange-500'
	},
	{
		name: 'Jasur M.',
		action: 'Namangandan Pro tarifni faollashtirdi',
		time: '15 daqiqa oldin',
		letter: 'J',
		color: 'from-cyan-400 to-sky-500'
	},
	{
		name: 'Shaxnoza O.',
		action: 'Xorazmdan Marketing kursini boshladi',
		time: '3 daqiqa oldin',
		letter: 'S',
		color: 'from-fuchsia-400 to-pink-500'
	}
]

export default function Hero() {
	const { t } = useTranslation()

	const [notifIndex, setNotifIndex] = useState(0)
	const [notifVisible, setNotifVisible] = useState(true)

	useEffect(() => {
		const hideTimer = setTimeout(() => setNotifVisible(false), 7000)
		const nextTimer = setTimeout(() => {
			setNotifIndex(i => (i + 1) % NOTIFICATIONS.length)
			setNotifVisible(true)
		}, 30000)

		return () => {
			clearTimeout(hideTimer)
			clearTimeout(nextTimer)
		}
	}, [notifIndex])

	const container = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.12
			}
		}
	}

	const fadeUp = {
		hidden: { opacity: 0, y: 30 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' }
		}
	}

	return (
		<>
			<Navbar />

			<section className='relative w-full overflow-hidden pt-28 md:pt-32 pb-20 transition-colors duration-500'>
				{/* Soft green gradient backdrop on the right */}
				<div className='pointer-events-none absolute inset-0 -z-10'>
					<div className='absolute right-[-10%] top-[-10%] h-[80%] w-[70%] rounded-full bg-gradient-to-br from-green-200/60 via-emerald-100/50 to-teal-100/40 blur-3xl dark:from-green-500/15 dark:via-emerald-500/10 dark:to-teal-500/10' />
					<div className='absolute left-[-5%] bottom-[-15%] h-[50%] w-[50%] rounded-full bg-gradient-to-tr from-green-100/40 to-transparent blur-3xl dark:from-green-500/5' />
				</div>

				<motion.div
					variants={container}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true, amount: 0.2 }}
					className='max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center'
				>
					{/* LEFT */}
					<motion.div variants={fadeUp} className='relative'>
						<motion.div
							variants={fadeUp}
							className='inline-flex items-center border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 font-semibold pr-4 pl-2 py-1.5 rounded-full text-sm mb-6'
						>
							<Dot size={28} className='-mr-1' />
							{t('hero.badge')}
						</motion.div>

						<motion.h1
							variants={fadeUp}
							className='text-4xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white'
						>
							{t('hero.titleLine1')}.
							<br />
							<span className='relative inline-block text-green-500'>{t('hero.titleLine2')}</span>
							<br />
							{t('hero.titleLine3')}.
						</motion.h1>

						<motion.p
							variants={fadeUp}
							className='text-gray-600 dark:text-gray-400 mt-6 max-w-lg text-base md:text-lg leading-relaxed'
						>
							{t('hero.description')}
						</motion.p>

						{/* Buttons */}
						<motion.div variants={fadeUp} className='flex flex-wrap gap-3 mt-8'>
							<Link href='/auth'>
								<button className='bg-green-500 hover:bg-green-600 text-white pl-6 pr-5 py-3 rounded-full font-medium inline-flex items-center gap-2 transition shadow-lg shadow-green-500/25'>
									{t('buttons.start')}
									<ArrowRight size={16} />
								</button>
							</Link>

							<Link href='/pricing'>
								<button className='border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition text-gray-800 dark:text-gray-100 font-medium'>
									{t('buttons.youtubeChanel')}
								</button>
							</Link>
						</motion.div>

						{/* Stats */}
						<motion.div variants={fadeUp} className='flex flex-wrap gap-8 mt-10 text-sm'>
							<div className='flex items-center gap-2'>
								<span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500'>
									<Users size={16} />
								</span>
								<span className='font-bold text-gray-900 dark:text-white'>
									{t('hero.stats.students')}
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500'>
									<BookOpen size={16} />
								</span>
								<span className='font-bold text-gray-900 dark:text-white'>
									{t('hero.stats.courses')}
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-500'>
									<Star size={16} className='fill-amber-500' />
								</span>
								<span className='font-bold text-gray-900 dark:text-white'>
									{t('hero.stats.rating')}
								</span>
							</div>
						</motion.div>
					</motion.div>

					{/* RIGHT — floating cards on green glow */}
					<motion.div variants={fadeUp} className='relative h-[420px] md:h-[480px] lg:h-[520px]'>
						{/* rotating glow */}
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
							className='absolute inset-10 -z-10 rounded-full bg-gradient-to-r from-green-300/40 via-emerald-300/30 to-teal-300/40 blur-3xl dark:from-green-500/20 dark:via-emerald-500/15 dark:to-teal-500/20'
						/>

						{/* Sparkles decoration */}
						<motion.div
							animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
							transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
							className='absolute top-6 left-1/2 -translate-x-1/2 text-emerald-400 dark:text-emerald-300'
						>
							<Sparkles size={28} className='opacity-70' />
						</motion.div>

						{/* Rating card (top-right) */}
						<motion.div
							initial={{ opacity: 0, x: 30, y: -10 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}
							className='absolute top-6 right-2 md:right-6'
						>
							<motion.div
								animate={{ y: [0, -8, 0] }}
								transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
								className='bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 px-4 py-3 flex items-center gap-3'
							>
								<div className='h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center'>
									<Star size={20} className='fill-amber-500 text-amber-500' />
								</div>
								<div className='leading-tight'>
									<div className='font-bold text-gray-900 dark:text-white text-sm'>
										{t('hero.cards.ratingValue')}
									</div>
									<div className='text-xs text-gray-500 dark:text-gray-400'>
										{t('hero.cards.ratingLabel')}
									</div>
								</div>
							</motion.div>
						</motion.div>

						{/* Big center check icon */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.8, duration: 0.6 }}
							className='absolute top-[42%] right-[28%] md:right-[32%]'
						>
							<motion.div
								animate={{ y: [0, -12, 0] }}
								transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
								className='h-16 w-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl shadow-green-500/40 flex items-center justify-center'
							>
								<Check size={32} className='text-white' strokeWidth={3} />
							</motion.div>
						</motion.div>

						{/* Certificate card (bottom-right) */}
						<motion.div
							initial={{ opacity: 0, x: 30, y: 10 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{ delay: 1, duration: 0.6 }}
							className='absolute bottom-10 right-0 md:right-4'
						>
							<motion.div
								animate={{ y: [0, 8, 0] }}
								transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
								className='bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 px-4 py-3 flex items-center gap-3'
							>
								<div className='h-10 w-10 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center'>
									<Check size={20} className='text-green-500' strokeWidth={3} />
								</div>
								<div className='leading-tight'>
									<div className='font-bold text-gray-900 dark:text-white text-sm'>
										{t('hero.cards.certValue')}
									</div>
									<div className='text-xs text-gray-500 dark:text-gray-400'>
										{t('hero.cards.certLabel')}
									</div>
								</div>
							</motion.div>
						</motion.div>

						{/* Small floating dots */}
						<motion.span
							animate={{ y: [0, -16, 0], opacity: [0.4, 1, 0.4] }}
							transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
							className='absolute top-1/3 left-12 h-3 w-3 rounded-full bg-[#10B981]/70'
						/>
						<motion.span
							animate={{ y: [0, 14, 0], opacity: [0.3, 0.9, 0.3] }}
							transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
							className='absolute bottom-1/3 left-20 h-2 w-2 rounded-full bg-emerald-400/70'
						/>
						<motion.span
							animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
							className='absolute top-20 right-1/2 h-2.5 w-2.5 rounded-full bg-teal-400/60'
						/>
					</motion.div>
				</motion.div>
			</section>

			<Courses />
			<TeachersGrid />
			<TopStudents />
			<Community />
			<Testimonials />
			<CompanyLogoSlider />
			<Mentors />
			<Blog />
			<CtaSection />
			<Footer />

			{/* Fixed notification card (bottom-left of viewport) — cycles every 30s */}
			<div className='hidden md:block fixed bottom-6 left-6 z-40 pointer-events-none'>
				<AnimatePresence mode='wait'>
					{notifVisible && (
						<motion.div
							key={notifIndex}
							initial={{ opacity: 0, x: -120 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -120 }}
							transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
							className='pointer-events-auto flex items-center gap-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 px-4 py-3 max-w-xs backdrop-blur-xl'
						>
							<div
								className={`h-10 w-10 shrink-0 rounded-full bg-gradient-to-br ${NOTIFICATIONS[notifIndex].color} text-white flex items-center justify-center font-bold`}
							>
								{NOTIFICATIONS[notifIndex].letter}
							</div>
							<div className='text-xs leading-tight'>
								<div className='text-gray-900 dark:text-white'>
									<span className='font-semibold'>{NOTIFICATIONS[notifIndex].name} </span>
									<span className='text-gray-600 dark:text-gray-400'>
										{NOTIFICATIONS[notifIndex].action}
									</span>
								</div>
								<div className='mt-1 flex items-center gap-1 text-green-500'>
									<span className='h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse' />
									<span>{NOTIFICATIONS[notifIndex].time}</span>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}
