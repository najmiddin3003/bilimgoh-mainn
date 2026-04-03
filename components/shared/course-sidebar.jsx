'use client'

import {
	BarChart3,
	Bell,
	BookOpen,
	ChevronRight,
	Code2,
	Globe,
	GraduationCap,
	Layers,
	Rocket,
	Star,
	Trophy,
	Zap
} from 'lucide-react'

const menuItems = [
	{ id: 'all-lessons', label: 'All Lessons', icon: Globe, badge: 'Yangi' },
	{ id: 'til-kurslari', label: 'Til kurslari', icon: BookOpen },
	{ id: 'aniq-fanlar', label: 'Aniq fanlar', icon: Layers },
	{ id: 'ijtimoiy-fanlar', label: 'Ijtimoiy fanlar', icon: Globe },
	{ id: 'imtihon-tayyorlov', label: 'Imtihon tayyorlov', icon: GraduationCap, badge: 'Top' },
	{ id: 'maktab-tayyorlov', label: 'Maktab tayyorlov', icon: BookOpen },
	{ id: 'kasbiy-rivojlanish', label: 'Kasbiy rivojlanish', icon: BarChart3 },
	{ id: 'it-kurslar', label: 'IT kurslar', icon: Code2, badge: 'Hot' },
	{ id: 'bolalar-kurslari', label: 'Bolalar kurslari', icon: Star }
]

const badgeColors = {
	Yangi: 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300',
	Top: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300',
	Hot: 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300'
}

export default function CourseSidebar({ activeItem = 'all-lessons', onSelectItem = () => {} }) {
	return (
		<aside className='sticky top-20 self-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/8 dark:bg-gray-900'>
			{/* Header card */}
			<div className='relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 p-5'>
				<div className='pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10' />
				<div className='pointer-events-none absolute -bottom-4 right-8 h-16 w-16 rounded-full bg-white/10' />

				<div className='relative flex items-center gap-3'>
					<div className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm'>
						<Trophy size={20} className='text-white' />
					</div>
					<div>
						<p className='text-[11px] font-medium uppercase tracking-wider text-emerald-100'>
							Learning Path
						</p>
						<p className='text-base font-bold text-white'>Academic Level 02</p>
					</div>
				</div>

				{/* Progress bar */}
				<div className='relative mt-4'>
					<div className='flex items-center justify-between text-[11px] text-emerald-100'>
						<span>Umumiy progress</span>
						<span className='font-semibold'>64%</span>
					</div>
					<div className='mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20'>
						<div className='h-full rounded-full bg-white' style={{ width: '64%' }} />
					</div>
				</div>
			</div>

			{/* Menu label */}
			<div className='px-4 pb-1 pt-4'>
				<p className='text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500'>
					Yo&apos;nalishlar
				</p>
			</div>

			{/* Nav items */}
			<nav className='space-y-0.5 p-2'>
				{menuItems.map(item => {
					const Icon = item.icon
					const isActive = activeItem === item.id

					return (
						<button
							key={item.id}
							onClick={() => onSelectItem(item.id)}
							className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
								isActive
									? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
									: 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5'
							}`}
						>
							<span
								className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
									isActive
										? 'bg-emerald-500 text-white'
										: 'bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 dark:bg-white/8 dark:text-gray-400 dark:group-hover:bg-emerald-500/15 dark:group-hover:text-emerald-400'
								}`}
							>
								<Icon size={14} />
							</span>

							<span className='flex-1 font-medium'>{item.label}</span>

							{item.badge ? (
								<span
									className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${badgeColors[item.badge]}`}
								>
									{item.badge}
								</span>
							) : isActive ? (
								<ChevronRight size={14} className='text-emerald-500' />
							) : null}
						</button>
					)
				})}
			</nav>

			{/* Footer banner */}
			<div className='relative m-2 mt-1 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-4'>
				{/* decorative blobs */}
				<div className='pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10' />
				<div className='pointer-events-none absolute -bottom-3 right-6 h-12 w-12 rounded-full bg-white/10' />

				{/* icon row */}
				<div className='relative mb-3 flex items-center gap-2'>
					<span className='flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm'>
						<Rocket size={15} className='text-white' />
					</span>
					<span className='flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm'>
						<Zap size={15} className='text-white' />
					</span>
					<span className='flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm'>
						<Bell size={15} className='text-white' />
					</span>
				</div>

				<p className='relative text-xs font-bold leading-snug text-white'>
					Yangi kurslar muntazam
					<br />
					qo&apos;shib boriladi!
				</p>
				<p className='relative mt-1 text-[11px] text-emerald-100'>
					Bildirishnoma olish uchun obuna bo&apos;ling
				</p>

				<button className='relative mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-xs font-bold text-emerald-700 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition hover:bg-emerald-50'>
					<Bell size={12} />
					Obuna bo&apos;lish
				</button>
			</div>
		</aside>
	)
}
