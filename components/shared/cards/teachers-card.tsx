'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Send, Instagram, Linkedin } from 'lucide-react'
import type { teachers } from '@/constants'

type Props = {
	teacher: typeof teachers[number]
}

export function TeacherCard({ teacher }: Props) {
	return (
		<motion.article
			whileHover={{ y: -8 }}
			transition={{ duration: 0.25, ease: 'easeOut' }}
			className='group h-full rounded-[28px] border border-slate-200/80 bg-white p-6  transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_25px_80px_rgba(16,185,129,0.18)] dark:border-white/10 dark:bg-slate-950'
		>
			<div className='grid grid-cols-[150px_1fr] gap-6 max-sm:grid-cols-1'>
				<div className='relative h-[170px] w-[150px] overflow-hidden rounded-[26px] bg-emerald-50 max-sm:h-[220px] max-sm:w-full'>
					<Image
						src={teacher.image}
						alt={teacher.name}
						fill
						className='object-cover transition-transform duration-500 group-hover:scale-105'
					/>
				</div>

				<div className='flex min-h-[170px] flex-col'>
					<span className='mb-4 w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600'>
						{teacher.badge}
					</span>

					<h3 className='text-2xl font-bold leading-tight text-slate-950 dark:text-white'>
						{teacher.name}
					</h3>

					<p className='mt-1 text-sm font-medium text-slate-500'>{teacher.role}</p>

					<p className='mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
						{teacher.bio}
					</p>
				</div>
			</div>

			<div className='mt-6 grid grid-cols-2 overflow-hidden rounded-2xl bg-slate-50 dark:bg-white/5'>
				{teacher.stats.map((item: any, index: number) => {
					const Icon = item.icon

					return (
						<div
							key={index}
							className='flex items-center gap-3 border-r border-slate-200/80 p-4 last:border-r-0 dark:border-white/10'
						>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600'>
								<Icon size={20} />
							</div>

							<div>
								<p className='text-sm font-bold text-slate-950 dark:text-white'>{item.value}</p>
								<p className='text-xs text-slate-500'>{item.label}</p>
							</div>
						</div>
					)
				})}
			</div>

			<div className='mt-5 flex items-center justify-center gap-5 text-slate-500'>
				{teacher.socials.telegram && (
					<a
						href={teacher.socials.telegram}
						target='_blank'
						className='transition hover:-translate-y-1 hover:text-emerald-600'
					>
						<Send size={20} />
					</a>
				)}

				{teacher.socials.linkedin && (
					<a
						href={teacher.socials.linkedin}
						target='_blank'
						className='transition hover:-translate-y-1 hover:text-emerald-600'
					>
						<Linkedin size={20} />
					</a>
				)}

				{teacher.socials.instagram && (
					<a
						href={teacher.socials.instagram}
						target='_blank'
						className='transition hover:-translate-y-1 hover:text-emerald-600'
					>
						<Instagram size={20} />
					</a>
				)}
			</div>
		</motion.article>
	)
}
