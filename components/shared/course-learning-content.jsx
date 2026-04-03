'use client'

import Image from 'next/image'
import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	ChevronDown,
	Clock3,
	GraduationCap,
	Mic,
	Search,
	Sparkles,
	Star,
	Users,
	X
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import courses from '@/constants'

/* ─────────────────────────────────────────────
   Accordion item
───────────────────────────────────────────── */
function AccordionItem({ question, answer, isOpen, onToggle }) {
	return (
		<div className='overflow-hidden rounded-2xl border border-gray-100 dark:border-white/8'>
			<button
				onClick={onToggle}
				className='flex w-full items-center justify-between gap-3 bg-white px-5 py-4 text-left transition hover:bg-gray-50 dark:bg-gray-800/60 dark:hover:bg-gray-800'
			>
				<span className='text-sm font-semibold text-gray-800 dark:text-white'>{question}</span>
				<ChevronDown
					size={16}
					className={`flex-shrink-0 text-emerald-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key='content'
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
					>
						<div className='border-t border-gray-100 bg-gray-50/60 px-5 py-4 dark:border-white/8 dark:bg-white/3'>
							<p className='text-sm leading-relaxed text-gray-600 dark:text-gray-300'>{answer}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

/* ─────────────────────────────────────────────
   Course detail modal
───────────────────────────────────────────── */
function CourseModal({ course, onClose, onCheckout, levelLabel, levelColor }) {
	const [openIdx, setOpenIdx] = useState(null)

	const toggle = idx => setOpenIdx(prev => (prev === idx ? null : idx))

	const faqs = [
		{
			question: 'Kurs kimlar uchun mo\'ljallangan?',
			answer: `"${course.title}" kursi ${levelLabel} darajadagi o'quvchilar uchun mo'ljallangan. ${course.instructor} tomonidan olib boriladigan bu kurs — amaliy bilim va real loyihalar orqali tezkor natija berishga yo'naltirilgan.`
		},
		{
			question: 'Dars davomiyligi va jadvali qanday?',
			answer: `Kurs umumiy davomiyligi ${course.duration}. Darslar haftalik jadval asosida o'tkaziladi: har haftada jonli sessiyalar, vazifalar va mentor tekshiruvlari mavjud. Barcha yozuvlar keyinchalik ham mavjud bo'ladi.`
		},
		{
			question: 'Kursni tugatgandan keyin nima qila olaman?',
			answer: `Kurs yakunida siz amaliy loyiha ishlab chiqasiz va raqamli sertifikat olasiz. Hozirga qadar ${course.students} talaba shu kursni muvaffaqiyatli tugatgan. O'rtacha reyting: ${course.rating}/5.`
		},
		{
			question: 'Kursga qanday yozilish mumkin?',
			answer: `Yozilish uchun "Kursga yozilish" tugmasini bosing va ro'yxatdan o'ting. Birinchi darsga kirish bepul. To'lov faqat to'liq dastur uchun talab qilinadi. Savollar bo'lsa, ${course.instructor} bilan to'g'ridan-to'g'ri bog'lanishingiz mumkin.`
		}
	]

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className='fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center'
			onClick={onClose}
		>
			{/* Backdrop */}
			<div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

			{/* Panel */}
			<motion.div
				initial={{ opacity: 0, y: 40, scale: 0.97 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 40, scale: 0.97 }}
				transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
				onClick={e => e.stopPropagation()}
				className='relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-gray-900'
			>
				{/* Header image */}
				{course.image && (
					<div className='relative h-48 w-full overflow-hidden rounded-t-3xl'>
						<Image src={course.image} alt={course.title} fill className='object-cover' />
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
						<div className='absolute bottom-4 left-4 right-12'>
							<span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${levelColor}`}>
								{levelLabel}
							</span>
							<h2 className='mt-1.5 text-xl font-bold text-white leading-tight'>{course.title}</h2>
						</div>
					</div>
				)}

				{/* Content */}
				<div className='p-6'>
					{/* Close button */}
					<button
						onClick={onClose}
						className='absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50'
					>
						<X size={15} />
					</button>

					{!course.image && (
						<div className='mb-4 flex items-start justify-between gap-3'>
							<h2 className='text-xl font-bold text-gray-900 dark:text-white'>{course.title}</h2>
							<button
								onClick={onClose}
								className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 dark:bg-white/10 dark:text-gray-400'
							>
								<X size={15} />
							</button>
						</div>
					)}

					{/* Category badge */}
					<div className='mb-5 flex flex-wrap items-center gap-2'>
						<span className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300'>
							<BookOpen size={11} />
							{course.category}
						</span>
						{!course.image && (
							<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${levelColor}`}>
								{levelLabel}
							</span>
						)}
					</div>

					{/* Stats grid */}
					<div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
						{[
							{ icon: <GraduationCap size={16} />, label: "O'qituvchi", value: course.instructor },
							{ icon: <Clock3 size={16} />, label: 'Davomiyligi', value: course.duration },
							{ icon: <Users size={16} />, label: 'Talabalar', value: course.students },
							{
								icon: <Star size={16} />,
								label: 'Reyting',
								value: course.rating,
								accent: true
							}
						].map(item => (
							<div
								key={item.label}
								className='flex flex-col gap-1.5 rounded-2xl border border-gray-100 bg-gray-50 p-3 dark:border-white/8 dark:bg-white/5'
							>
								<span
									className={`${item.accent ? 'text-amber-500' : 'text-emerald-500'} dark:${item.accent ? 'text-amber-400' : 'text-emerald-400'}`}
								>
									{item.icon}
								</span>
								<p className='text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500'>
									{item.label}
								</p>
								<p
									className={`text-sm font-bold leading-tight ${item.accent ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'}`}
								>
									{item.value}
								</p>
							</div>
						))}
					</div>

					{/* Divider */}
					<div className='mb-5 flex items-center gap-3'>
						<div className='h-px flex-1 bg-gray-100 dark:bg-white/8' />
						<span className='text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500'>
							Ko&apos;p so&apos;raladigan savollar
						</span>
						<div className='h-px flex-1 bg-gray-100 dark:bg-white/8' />
					</div>

					{/* Accordion */}
					<div className='space-y-2'>
						{faqs.map((faq, idx) => (
							<AccordionItem
								key={idx}
								question={faq.question}
								answer={faq.answer}
								isOpen={openIdx === idx}
								onToggle={() => toggle(idx)}
							/>
						))}
					</div>

				{/* CTA */}
				<div className='mt-6 flex gap-3'>
						<button
							onClick={onCheckout}
							className='flex-1 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)] transition hover:bg-emerald-600 dark:hover:bg-emerald-400'>
							Kursga yozilish
						</button>
						<button
							onClick={onClose}
							className='rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5'
						>
							Yopish
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

/* ─────────────────────────────────────────────
   CertificationCard
───────────────────────────────────────────── */
function CertificationCard({ title, level, description, onExplore }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className='group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/8 dark:bg-gray-800/60'
		>
			<div className='inline-flex w-fit rounded-xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'>
				<Mic size={16} />
			</div>
			<div>
				<h3 className='text-sm font-semibold text-gray-900 dark:text-white'>{title}</h3>
				<p className='mt-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400'>{level}</p>
			</div>
			<p className='flex-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400'>{description}</p>
			<button
				onClick={onExplore}
				className='inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition-all group-hover:gap-2.5 dark:text-emerald-400'
			>
				Batafsil ko&apos;rish
				<ArrowRight size={13} />
			</button>
		</motion.div>
	)
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const sidebarCategoryMap = {
	'all-lessons': 'all',
	'til-kurslari': 'Til kurslari',
	'aniq-fanlar': 'Aniq fanlar',
	'ijtimoiy-fanlar': 'Ijtimoiy fanlar',
	'imtihon-tayyorlov': 'Imtihon tayyorlov',
	'maktab-tayyorlov': 'Maktab tayyorlov',
	'kasbiy-rivojlanish': 'Kasbiy rivojlanish',
	'it-kurslar': 'IT kurslar',
	'bolalar-kurslari': 'Bolalar kurslari'
}

const labelMap = {
	'all-lessons': 'All Lessons',
	'til-kurslari': 'Til kurslari',
	'aniq-fanlar': 'Aniq fanlar',
	'ijtimoiy-fanlar': 'Ijtimoiy fanlar',
	'imtihon-tayyorlov': 'Imtihon tayyorlov',
	'maktab-tayyorlov': 'Maktab tayyorlov',
	'kasbiy-rivojlanish': 'Kasbiy rivojlanish',
	'it-kurslar': 'IT kurslar',
	'bolalar-kurslari': 'Bolalar kurslari'
}

const levelColors = {
	beginner: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
	intermediate: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
	advanced: 'bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300'
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function CourseLearningContent({
	courseId = '1',
	selectedMenuItem = 'all-lessons'
}) {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedLevel, setSelectedLevel] = useState('all-levels')
	const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all-categories')
	const [modalCourse, setModalCourse] = useState(null)
	const router = useRouter()

	const selectedCourse =
		courses.find(course => String(course.id) === String(courseId)) || courses[0]
	const selectedCategory = sidebarCategoryMap[selectedMenuItem] || 'all'
	const listForCategory =
		selectedCategory === 'all'
			? courses
			: courses.filter(course => course.category === selectedCategory)
	const subjects = [...new Set(listForCategory.map(course => course.title))]
	const teachers = [...new Set(listForCategory.map(course => course.instructor))]
	const averageRating = (
		listForCategory.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
		(listForCategory.length || 1)
	).toFixed(1)
	const sectionTitle = labelMap[selectedMenuItem] || selectedCourse?.category || 'All Lessons'
	const courseImage = selectedCourse?.image || '/assets/courses/course-img-1.jpg'
	const isAllLessons = selectedCategory === 'all'
	const allCategories = [...new Set(courses.map(c => c.category))]

	const deriveLevelFromDuration = (durationText = '') => {
		const month = Number(String(durationText).replace(/[^\d]/g, '')) || 0
		if (month >= 6) return 'advanced'
		if (month >= 4) return 'intermediate'
		return 'beginner'
	}

	const levelLabelMap = {
		beginner: "Boshlang'ich",
		intermediate: "O'rta",
		advanced: "Ilg'or"
	}

	const filteredAllLessons = useMemo(() => {
		return courses.filter(course => {
			const normalizedQuery = searchQuery.trim().toLowerCase()
			const courseLevel = deriveLevelFromDuration(course.duration)
			const matchQuery =
				!normalizedQuery ||
				course.title.toLowerCase().includes(normalizedQuery) ||
				course.instructor.toLowerCase().includes(normalizedQuery) ||
				course.category.toLowerCase().includes(normalizedQuery)
			const matchLevel = selectedLevel === 'all-levels' || courseLevel === selectedLevel
			const matchCategory =
				selectedCategoryFilter === 'all-categories' || course.category === selectedCategoryFilter
			return matchQuery && matchLevel && matchCategory
		})
	}, [searchQuery, selectedLevel, selectedCategoryFilter])

	const courseDescription = isAllLessons
		? "Barcha yo'nalishlar bo'yicha kurslar to'plami. Har bir bo'limda real loyihalar, amaliy mashg'ulotlar va mentorlik mavjud."
		: `${sectionTitle} bo'limida ${subjects.length} ta yo'nalish o'qitiladi va ${teachers.length} nafar o'qituvchi dars beradi.`

	return (
		<>
			{/* ─── Course detail modal ─── */}
			<AnimatePresence>
			{modalCourse && (
				<CourseModal
					course={modalCourse}
					onClose={() => setModalCourse(null)}
					onCheckout={() => {
						setModalCourse(null)
						router.push(`/checkout/${modalCourse.id}`)
					}}
					levelLabel={levelLabelMap[deriveLevelFromDuration(modalCourse.duration)]}
					levelColor={levelColors[deriveLevelFromDuration(modalCourse.duration)]}
				/>
			)}
			</AnimatePresence>

			<section className='rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/50 md:p-6'>
				{/* Back button */}
				<div className='mb-5 flex items-center justify-between'>
					<button className='inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/8 dark:hover:text-gray-100'>
						<ArrowLeft size={15} />
						Kurslarga qaytish
					</button>
				</div>

				<div className={`grid gap-6 ${isAllLessons ? '' : 'lg:grid-cols-[minmax(0,1fr)_300px]'}`}>
					{/* ─── Main content ─── */}
					<div className='min-w-0'>
						{isAllLessons ? (
							<motion.div
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35 }}
								className='space-y-6'
							>
								{/* Hero banner */}
								<div className='relative overflow-hidden rounded-3xl border border-emerald-100 p-8 dark:border-white/8 [background:linear-gradient(135deg,#ffffff,#ecfdf5_50%,#f0fdfa)] dark:[background:linear-gradient(135deg,#020617,#0f172a_50%,#022c22)]'>
									<div className='pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/10' />
									<div className='pointer-events-none absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-teal-300/20 blur-3xl dark:bg-indigo-500/10' />

									<div className='relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
										<div className='max-w-xl'>
											<span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-300/25 dark:bg-emerald-500/15 dark:text-emerald-300'>
												<Sparkles size={11} />
												Barcha darslar
											</span>
											<h1 className='mt-5 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-5xl'>
												Bilimingizni
												<br />
												<span className='text-emerald-600 dark:text-emerald-400'>
													yangi bosqichga
												</span>{' '}
												oling
											</h1>
											<p className='mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-300 md:text-base'>
												O&apos;zbekistonning eng sara o&apos;qituvchilari tomonidan tayyorlangan
												interaktiv darslar jamlanmasi.
											</p>
											<div className='mt-7 flex flex-wrap gap-3'>
												<button className='rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(5,150,105,0.3)] transition hover:bg-emerald-700 dark:bg-emerald-400 dark:text-slate-900 dark:hover:bg-emerald-300'>
													Kursga yozilish
												</button>
												<button className='rounded-xl border border-gray-200 bg-white/80 px-6 py-2.5 text-sm font-semibold text-gray-700 backdrop-blur-sm transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10'>
													Kurs haqida
												</button>
											</div>
										</div>

										{/* Stats inside hero */}
										<div className='grid grid-cols-2 gap-3 lg:min-w-[180px] lg:grid-cols-1'>
											{[
												{
													label: 'Jami kurslar',
													value: courses.length,
													icon: <BookOpen size={14} />
												},
												{
													label: "Yo'nalishlar soni",
													value: new Set(courses.map(c => c.category)).size,
													icon: <Sparkles size={14} />
												},
												{
													label: "O'qituvchilar",
													value: [...new Set(courses.map(c => c.instructor))].length,
													icon: <Users size={14} />
												},
												{
													label: "O'rtacha reyting",
													value: averageRating,
													icon: <Star size={14} />
												}
											].map(stat => (
												<div
													key={stat.label}
													className='flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/70 px-4 py-3 backdrop-blur-sm dark:border-white/8 dark:bg-white/5'
												>
													<span className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'>
														{stat.icon}
													</span>
													<div>
														<p className='text-[10px] font-medium text-gray-400 dark:text-slate-400'>
															{stat.label}
														</p>
														<p className='text-xl font-bold text-emerald-700 dark:text-emerald-300'>
															{stat.value}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>

								{/* Filters + course cards */}
								<motion.div
									initial={{ opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.1 }}
									className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-gray-800/50'
								>
									<div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
										<div>
											<h2 className='text-xl font-bold text-gray-900 dark:text-white'>
												Barcha kurslar
											</h2>
											<p className='mt-0.5 text-sm text-gray-500 dark:text-gray-400'>
												{filteredAllLessons.length} ta kurs topildi
											</p>
										</div>
										<span className='rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300'>
											Professional katalog
										</span>
									</div>

									{/* Filters */}
									<div className='mb-5 flex flex-col gap-3 sm:flex-row'>
										<div className='relative flex-1'>
											<Search
												size={15}
												className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
											/>
											<input
												type='text'
												value={searchQuery}
												onChange={e => setSearchQuery(e.target.value)}
												placeholder='Kurs nomi, o`qituvchi yoki yo`nalish...'
												className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-emerald-500 dark:focus:bg-white/8'
											/>
										</div>
										<select
											value={selectedLevel}
											onChange={e => setSelectedLevel(e.target.value)}
											className='rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-200'
										>
											<option value='all-levels'>Barcha darajalar</option>
											<option value='beginner'>Boshlang&apos;ich</option>
											<option value='intermediate'>O&apos;rta</option>
											<option value='advanced'>Ilg&apos;or</option>
										</select>
										<select
											value={selectedCategoryFilter}
											onChange={e => setSelectedCategoryFilter(e.target.value)}
											className='rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-200'
										>
											<option value='all-categories'>Barcha yo&apos;nalishlar</option>
											{allCategories.map(cat => (
												<option key={cat} value={cat}>
													{cat}
												</option>
											))}
										</select>
									</div>

									{/* Cards grid */}
									{filteredAllLessons.length > 0 ? (
										<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
											{filteredAllLessons.map((course, idx) => {
												const level = deriveLevelFromDuration(course.duration)
												return (
													<motion.div
														key={course.id}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: idx * 0.025 }}
													>
														<button
															onClick={() => setModalCourse(course)}
															className='group flex h-full w-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm text-left transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-white/8 dark:bg-gray-800/60 dark:hover:border-emerald-500/30'
														>
															{/* Badges */}
															<div className='flex items-center justify-between gap-2'>
																<span className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:bg-white/8 dark:text-gray-300'>
																	<BookOpen size={11} />
																	{course.category}
																</span>
																<span
																	className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${levelColors[level]}`}
																>
																	{levelLabelMap[level]}
																</span>
															</div>

															{/* Title + instructor */}
															<div className='flex-1'>
																<h3 className='text-sm font-semibold leading-snug text-gray-900 dark:text-white'>
																	{course.title}
																</h3>
																<p className='mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400'>
																	<GraduationCap size={12} />
																	{course.instructor}
																</p>
															</div>

															{/* Meta */}
															<div className='flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-white/8 dark:text-gray-500'>
																<span className='inline-flex items-center gap-1'>
																	<Clock3 size={12} />
																	{course.duration}
																</span>
																<span className='inline-flex items-center gap-1'>
																	<Users size={12} />
																	{course.students}
																</span>
																<span className='inline-flex items-center gap-1 text-amber-500 dark:text-amber-400'>
																	<Star size={12} fill='currentColor' />
																	{course.rating}
																</span>
															</div>

															{/* CTA */}
															<div className='rounded-xl bg-emerald-50 py-2 text-center text-xs font-semibold text-emerald-700 transition group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300 dark:group-hover:bg-emerald-500 dark:group-hover:text-white'>
																Batafsil ko&apos;rish
															</div>
														</button>
													</motion.div>
												)
											})}
										</div>
									) : (
										<div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 py-14 text-center dark:border-white/10'>
											<Search size={32} className='text-gray-300 dark:text-gray-600' />
											<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
												Kurs topilmadi
											</p>
											<p className='text-xs text-gray-400 dark:text-gray-500'>
												Qidiruv yoki filter qiymatlarini o&apos;zgartiring
											</p>
										</div>
									)}
								</motion.div>
							</motion.div>
						) : (
							<motion.div
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35 }}
								className='space-y-6'
							>
								{/* Category header */}
								<div>
									<span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'>
										<BookOpen size={11} />
										{sectionTitle}
									</span>
									<h1 className='mt-3 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl'>
										{`${sectionTitle} bo'limi`}
									</h1>
									<p className='mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
										{courseDescription}
									</p>
								</div>

								{/* Subject cards */}
								<div className='rounded-2xl border border-gray-100 bg-white p-5 dark:border-white/8 dark:bg-gray-800/50'>
									<div className='mb-4 flex items-center justify-between'>
										<div>
											<h2 className='text-lg font-bold text-gray-900 dark:text-white'>
												O&apos;qitiladigan fanlar
											</h2>
											<p className='mt-0.5 text-sm text-gray-500 dark:text-gray-400'>
												Ushbu bo&apos;limdagi asosiy kurslar va o&apos;qituvchilar
											</p>
										</div>
										<span className='rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500 dark:border-white/8 dark:bg-white/5 dark:text-gray-400'>
											{subjects.length} ta fan
										</span>
									</div>
								<div className='grid gap-4 sm:grid-cols-2'>
									{subjects.slice(0, 4).map((subject, idx) => {
										const matchedCourse = listForCategory.find(c => c.title === subject)
										return (
											<CertificationCard
												key={subject}
												title={subject}
												level={
													selectedCategory === 'all'
														? "Ko'p yo'nalishli ta'lim"
														: sectionTitle
												}
												description={`${teachers[idx % teachers.length] || 'Mentor jamoasi'} tomonidan olib boriladi`}
												onExplore={() => matchedCourse && setModalCourse(matchedCourse)}
											/>
										)
									})}
								</div>
								</div>
							</motion.div>
						)}
					</div>

					{/* ─── Sidebar: faqat category rejimida ─── */}
					{!isAllLessons && (
						<aside className='flex flex-col gap-4'>
							<div className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-gray-800/60'>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white'>{sectionTitle}</h3>
								<p className='mt-1.5 text-sm text-gray-500 dark:text-gray-400'>
									{teachers.slice(0, 2).join(', ')} bilan real-time darslar va haftalik
									topshiriqlar.
								</p>
								<div className='mt-5 space-y-3'>
									{[
										{
											icon: <BookOpen size={15} />,
											label: "Yo'nalishlar soni",
											value: subjects.length
										},
										{ icon: <Users size={15} />, label: "O'qituvchilar", value: teachers.length },
										{ icon: <Star size={15} />, label: "O'rtacha reyting", value: averageRating }
									].map(item => (
										<div
											key={item.label}
											className='flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 dark:bg-white/5'
										>
											<div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
												<span className='text-emerald-500 dark:text-emerald-400'>{item.icon}</span>
												{item.label}
											</div>
											<span className='text-sm font-semibold text-gray-900 dark:text-white'>
												{item.value}
											</span>
										</div>
									))}
								</div>
							</div>

							<div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/8 dark:bg-gray-800/60'>
								<div className='relative h-40 w-full'>
									<Image src={courseImage} alt={sectionTitle} fill className='object-cover' />
									<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
									<div className='absolute bottom-3 left-3'>
										<span className='rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'>
											{sectionTitle}
										</span>
									</div>
								</div>
								<div className='p-4'>
									<button className='w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)] transition hover:bg-emerald-600 dark:hover:bg-emerald-400'>
										Kursga yozilish
									</button>
								</div>
							</div>

							<div className='rounded-2xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/8'>
								<p className='text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400'>
									Hafta tavsiyasi
								</p>
								<h4 className='mt-2 text-base font-bold text-gray-900 dark:text-white'>
									IELTS Masterclass: 8.0+ Band Score
								</h4>
								<p className='mt-1.5 text-xs leading-relaxed text-gray-600 dark:text-gray-400'>
									Britaniyalik ekspertlar bilan birgalikda yaratilgan maxsus kurs.
								</p>
								<button className='mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400'>
									Batafsil ko&apos;rish <ArrowRight size={13} />
								</button>
							</div>
						</aside>
					)}
				</div>

			{!isAllLessons && listForCategory.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.15 }}
					className='mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-gray-800/50'
				>
					<div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
						<div>
							<h2 className='text-xl font-bold text-gray-900 dark:text-white'>
								{sectionTitle} kurslari
							</h2>
							<p className='mt-0.5 text-sm text-gray-500 dark:text-gray-400'>
								{listForCategory.length} ta kurs mavjud
							</p>
						</div>
						<span className='rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300'>
							{sectionTitle}
						</span>
					</div>

					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{listForCategory.map((course, idx) => {
							const level = deriveLevelFromDuration(course.duration)
							return (
								<motion.div
									key={course.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: idx * 0.03 }}
								>
									<button
										onClick={() => setModalCourse(course)}
										className='group flex h-full w-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm text-left transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-white/8 dark:bg-gray-800/60 dark:hover:border-emerald-500/30'
									>
										{/* Badges */}
										<div className='flex items-center justify-between gap-2'>
											<span className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:bg-white/8 dark:text-gray-300'>
												<BookOpen size={11} />
												{course.category}
											</span>
											<span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${levelColors[level]}`}>
												{levelLabelMap[level]}
											</span>
										</div>

										{/* Title + instructor */}
										<div className='flex-1'>
											<h3 className='text-sm font-semibold leading-snug text-gray-900 dark:text-white'>
												{course.title}
											</h3>
											<p className='mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400'>
												<GraduationCap size={12} />
												{course.instructor}
											</p>
										</div>

										{/* Meta */}
										<div className='flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-white/8 dark:text-gray-500'>
											<span className='inline-flex items-center gap-1'>
												<Clock3 size={12} />
												{course.duration}
											</span>
											<span className='inline-flex items-center gap-1'>
												<Users size={12} />
												{course.students}
											</span>
											<span className='inline-flex items-center gap-1 text-amber-500 dark:text-amber-400'>
												<Star size={12} fill='currentColor' />
												{course.rating}
											</span>
										</div>

										{/* CTA */}
										<div className='rounded-xl bg-emerald-50 py-2 text-center text-xs font-semibold text-emerald-700 transition group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300 dark:group-hover:bg-emerald-500 dark:group-hover:text-white'>
											Batafsil ko&apos;rish
										</div>
									</button>
								</motion.div>
							)
						})}
					</div>
				</motion.div>
			)}
			</section>
		</>
	)
}
