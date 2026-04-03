'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
	ArrowLeft,
	BookOpen,
	CheckCircle2,
	ChevronRight,
	Clock3,
	CreditCard,
	GraduationCap,
	Lock,
	ShieldCheck,
	Star,
	Users
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import courses from '@/constants'

/* ── card number formatter ── */
function formatCardNumber(val) {
	return val
		.replace(/\D/g, '')
		.slice(0, 16)
		.replace(/(.{4})/g, '$1 ')
		.trim()
}

function formatExpiry(val) {
	const digits = val.replace(/\D/g, '').slice(0, 4)
	if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
	return digits
}

/* ── Animated bank card preview ── */
function CardPreview({ number, name, expiry, flipped }) {
	const displayNumber = number.replace(/\s/g, '').padEnd(16, '•')
	const chunks = [
		displayNumber.slice(0, 4),
		displayNumber.slice(4, 8),
		displayNumber.slice(8, 12),
		displayNumber.slice(12, 16)
	]

	return (
		<div className='perspective-1000 h-44 w-full'>
			<motion.div
				animate={{ rotateY: flipped ? 180 : 0 }}
				transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
				className='relative h-full w-full'
				style={{ transformStyle: 'preserve-3d' }}
			>
				{/* Front */}
				<div
					className='absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-6 shadow-[0_20px_60px_rgba(16,185,129,0.4)]'
					style={{ backfaceVisibility: 'hidden' }}
				>
					<div className='pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10' />
					<div className='pointer-events-none absolute -bottom-6 left-12 h-28 w-28 rounded-full bg-white/10' />

					<div className='relative flex h-full flex-col justify-between'>
						<div className='flex items-center justify-between'>
							<div className='flex h-8 w-12 items-center justify-center rounded-md bg-white/20'>
								<div className='h-4 w-4 rounded-full bg-yellow-300/90' />
								<div className='-ml-2 h-4 w-4 rounded-full bg-orange-400/70' />
							</div>
							<CreditCard size={22} className='text-white/70' />
						</div>

						<div>
							<p className='mb-3 font-mono text-lg font-bold tracking-[0.2em] text-white'>
								{chunks.join(' ')}
							</p>
							<div className='flex items-end justify-between'>
								<div>
									<p className='text-[10px] uppercase tracking-widest text-white/60'>
										Karta egasi
									</p>
									<p className='text-sm font-semibold uppercase tracking-wider text-white'>
										{name || 'TO\'LIQ ISM'}
									</p>
								</div>
								<div className='text-right'>
									<p className='text-[10px] uppercase tracking-widest text-white/60'>Muddat</p>
									<p className='text-sm font-semibold text-white'>{expiry || 'MM/YY'}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Back */}
				<div
					className='absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
					style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
				>
					<div className='mt-6 h-10 w-full bg-slate-900' />
					<div className='mx-6 mt-5'>
						<p className='mb-1 text-[10px] uppercase tracking-widest text-slate-400'>CVV</p>
						<div className='flex items-center justify-end rounded-lg bg-white/90 px-4 py-2.5'>
							<p className='font-mono text-base font-bold tracking-[0.3em] text-slate-700'>•••</p>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

/* ── Main checkout page ── */
export default function CheckoutPage() {
	const { courseId } = useParams()
	const router = useRouter()
	const course = courses.find(c => String(c.id) === String(courseId)) || courses[0]

	const [cardNumber, setCardNumber] = useState('')
	const [cardName, setCardName] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const [flipped, setFlipped] = useState(false)
	const [paying, setPaying] = useState(false)
	const [success, setSuccess] = useState(false)

	const isValid =
		cardNumber.replace(/\s/g, '').length === 16 &&
		cardName.trim().length > 2 &&
		expiry.length === 5 &&
		cvv.length >= 3

	const handlePay = async () => {
		if (!isValid) return
		setPaying(true)
		await new Promise(r => setTimeout(r, 1800))
		setPaying(false)
		setSuccess(true)
	}

	return (
		<main className='min-h-screen bg-gray-50 dark:bg-[#0b0f14]'>
			{/* Header */}
			<div className='border-b border-gray-100 bg-white dark:border-white/8 dark:bg-gray-900'>
				<div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-4'>
					<button
						onClick={() => router.back()}
						className='inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/8'
					>
						<ArrowLeft size={15} />
						Orqaga
					</button>
					<div className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200'>
						<Lock size={14} className='text-emerald-500' />
						Xavfsiz to&apos;lov
					</div>
					<div className='flex items-center gap-1.5'>
						<ShieldCheck size={16} className='text-emerald-500' />
						<span className='text-xs text-gray-400'>SSL himoyalangan</span>
					</div>
				</div>
			</div>

			<div className='mx-auto max-w-5xl px-4 py-8 md:py-12'>
				<AnimatePresence mode='wait'>
					{success ? (
						/* ── Success state ── */
						<motion.div
							key='success'
							initial={{ opacity: 0, scale: 0.92 }}
							animate={{ opacity: 1, scale: 1 }}
							className='flex flex-col items-center justify-center gap-6 py-20 text-center'
						>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
								className='flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20'
							>
								<CheckCircle2 size={48} className='text-emerald-500' />
							</motion.div>
							<div>
								<h2 className='text-2xl font-extrabold text-gray-900 dark:text-white'>
									To&apos;lov muvaffaqiyatli!
								</h2>
								<p className='mt-2 text-gray-500 dark:text-gray-400'>
									<span className='font-semibold text-emerald-600 dark:text-emerald-400'>
										{course.title}
									</span>{' '}
									kursiga yozildingiz.
								</p>
								<p className='mt-1 text-sm text-gray-400 dark:text-gray-500'>
									Tasdiqlash xati elektron pochtangizga yuborildi.
								</p>
							</div>
							<div className='flex gap-3'>
								<a
									href='https://admin-bilimgoh.vercel.app/'
									target='_blank'
									rel='noopener noreferrer'
									className='rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition hover:bg-emerald-600'
								>
									Kursni boshlash
								</a>
								<button
									onClick={() => router.push('/')}
									className='rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300'
								>
									Bosh sahifa
								</button>
							</div>
						</motion.div>
					) : (
						/* ── Checkout form ── */
						<motion.div
							key='form'
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							className='grid gap-6 lg:grid-cols-[1fr_380px]'
						>
							{/* ── Left: payment form ── */}
							<div className='space-y-5'>
								<div>
									<h1 className='text-2xl font-extrabold text-gray-900 dark:text-white'>
										To&apos;lov ma&apos;lumotlari
									</h1>
									<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
										Karta ma&apos;lumotlarini kiriting
									</p>
								</div>

								{/* Card preview */}
								<CardPreview
									number={cardNumber}
									name={cardName}
									expiry={expiry}
									flipped={flipped}
								/>

								{/* Form */}
								<div className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-gray-800/60'>
									{/* Card number */}
									<div className='mb-4'>
										<label className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400'>
											Karta raqami
										</label>
										<div className='relative'>
											<CreditCard
												size={16}
												className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
											/>
											<input
												type='text'
												inputMode='numeric'
												placeholder='0000 0000 0000 0000'
												value={cardNumber}
												onChange={e => setCardNumber(formatCardNumber(e.target.value))}
												className='w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 font-mono text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-emerald-500'
											/>
										</div>
									</div>

									{/* Cardholder name */}
									<div className='mb-4'>
										<label className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400'>
											Karta egasining ismi
										</label>
										<input
											type='text'
											placeholder='ALISHER UMAROV'
											value={cardName}
											onChange={e => setCardName(e.target.value.toUpperCase())}
											className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm uppercase text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-emerald-500'
										/>
									</div>

									{/* Expiry + CVV */}
									<div className='grid grid-cols-2 gap-4'>
										<div>
											<label className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400'>
												Amal qilish muddati
											</label>
											<input
												type='text'
												inputMode='numeric'
												placeholder='MM/YY'
												value={expiry}
												onChange={e => setExpiry(formatExpiry(e.target.value))}
												className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-emerald-500'
											/>
										</div>
										<div>
											<label className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400'>
												CVV
											</label>
											<input
												type='text'
												inputMode='numeric'
												placeholder='•••'
												maxLength={4}
												value={cvv}
												onFocus={() => setFlipped(true)}
												onBlur={() => setFlipped(false)}
												onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
												className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-emerald-500'
											/>
										</div>
									</div>
								</div>

								{/* Security badges */}
								<div className='flex flex-wrap items-center gap-3'>
									{['256-bit SSL', 'PCI DSS', "3D Secure"].map(badge => (
										<div
											key={badge}
											className='flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 shadow-sm dark:border-white/8 dark:bg-white/5 dark:text-gray-400'
										>
											<ShieldCheck size={12} className='text-emerald-500' />
											{badge}
										</div>
									))}
								</div>
							</div>

							{/* ── Right: order summary ── */}
							<div className='space-y-4'>
								{/* Course card */}
								<div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/8 dark:bg-gray-800/60'>
									{course.image && (
										<div className='relative h-36 w-full'>
											<Image
												src={course.image}
												alt={course.title}
												fill
												className='object-cover'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
											<div className='absolute bottom-3 left-3'>
												<span className='rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm'>
													{course.category}
												</span>
											</div>
										</div>
									)}
									<div className='p-4'>
										<h3 className='font-bold text-gray-900 dark:text-white'>{course.title}</h3>
										<p className='mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400'>
											<GraduationCap size={13} />
											{course.instructor}
										</p>
										<div className='mt-3 flex flex-wrap gap-3 text-xs text-gray-400 dark:text-gray-500'>
											<span className='flex items-center gap-1'>
												<Clock3 size={12} />
												{course.duration}
											</span>
											<span className='flex items-center gap-1'>
												<Users size={12} />
												{course.students} talaba
											</span>
											<span className='flex items-center gap-1 text-amber-500'>
												<Star size={12} fill='currentColor' />
												{course.rating}
											</span>
											<span className='flex items-center gap-1'>
												<BookOpen size={12} />
												{course.category}
											</span>
										</div>
									</div>
								</div>

								{/* Price breakdown */}
								<div className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-gray-800/60'>
									<h4 className='mb-4 text-sm font-bold text-gray-900 dark:text-white'>
										To&apos;lov tafsiloti
									</h4>
									<div className='space-y-2.5 text-sm'>
										<div className='flex justify-between text-gray-600 dark:text-gray-400'>
											<span>Kurs narxi</span>
											<span>{course.price}</span>
										</div>
										<div className='flex justify-between text-emerald-600 dark:text-emerald-400'>
											<span>Chegirma (10%)</span>
											<span>- 20 000 so&apos;m</span>
										</div>
										<div className='flex justify-between text-gray-600 dark:text-gray-400'>
											<span>Xizmat to&apos;lovi</span>
											<span>Bepul</span>
										</div>
									</div>
									<div className='mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/8'>
										<span className='text-sm font-semibold text-gray-900 dark:text-white'>
											Jami
										</span>
										<span className='text-lg font-extrabold text-emerald-600 dark:text-emerald-400'>
											{course.price}
										</span>
									</div>
								</div>

								{/* What's included */}
								<div className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-gray-800/60'>
									<h4 className='mb-3 text-sm font-bold text-gray-900 dark:text-white'>
										Kurs tarkibi
									</h4>
									<ul className='space-y-2'>
										{[
											'Barcha dars materiallari',
											'Jonli sessiyalar (haftalik)',
											'Mentor bilan aloqa',
											'Sertifikat (kurs oxirida)',
											"Doimiy kirish (muddat yo'q)"
										].map(item => (
											<li key={item} className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
												<CheckCircle2 size={13} className='flex-shrink-0 text-emerald-500' />
												{item}
											</li>
										))}
									</ul>
								</div>

								{/* Pay button */}
								<button
									onClick={handlePay}
									disabled={!isValid || paying}
									className='group flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition hover:bg-emerald-600 hover:shadow-[0_8px_32px_rgba(16,185,129,0.5)] disabled:cursor-not-allowed disabled:opacity-50'
								>
									{paying ? (
										<>
											<motion.div
												animate={{ rotate: 360 }}
												transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
												className='h-4 w-4 rounded-full border-2 border-white/30 border-t-white'
											/>
											Tekshirilmoqda...
										</>
									) : (
										<>
											<Lock size={15} />
											{course.price} — To&apos;lash
											<ChevronRight
												size={15}
												className='transition group-hover:translate-x-0.5'
											/>
										</>
									)}
								</button>

								<p className='text-center text-[11px] text-gray-400 dark:text-gray-500'>
									To&apos;lov xavfsiz va shifrlangan. Istalgan vaqt bekor qilish mumkin.
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</main>
	)
}
