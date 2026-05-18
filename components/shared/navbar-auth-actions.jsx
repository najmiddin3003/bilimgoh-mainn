'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/components/providers/auth-provider'
import UserAvatar from '@/components/shared/user-avatar'

/**
 * @param {{ onNavigate?: () => void; compact?: boolean }} props
 */
export function NavbarAuthActions({ onNavigate, compact = false }) {
	const { t } = useTranslation()
	const { user, isLoading, isAuthenticated } = useAuth()

	if (isLoading) {
		return (
			<div
				className={
					compact
						? 'h-10 w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-800'
						: 'size-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800'
				}
				aria-hidden
			/>
		)
	}

	if (isAuthenticated && user) {
		return (
			<div className={compact ? 'flex justify-center pt-1' : undefined}>
				<UserAvatar
					user={user}
					size={compact ? 'sm' : 'md'}
					href='/dashboard'
					onClick={onNavigate}
				/>
			</div>
		)
	}

	if (compact) {
		return (
			<div className='flex flex-col gap-2'>
				<Link href='/auth' onClick={onNavigate}>
					<button className='w-full border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 py-3 rounded-full font-medium transition'>
						{t('navbar.signIn')}
					</button>
				</Link>
				<Link href='/auth' onClick={onNavigate}>
					<button className='w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-medium transition inline-flex items-center justify-center gap-2'>
						{t('buttons.getStarted')}
						<ArrowRight size={16} />
					</button>
				</Link>
			</div>
		)
	}

	return (
		<>
			<Link
				href='/auth'
				className='text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-500 transition px-3 py-2 w-20 text-center'
			>
				{t('navbar.signIn')}
			</Link>
			<Link href='/auth'>
				<button className='bg-green-500 hover:bg-green-600 text-white pl-4 pr-3 py-2 rounded-full text-sm font-medium inline-flex items-center w-34 text-center justify-center gap-1.5 transition shadow-md shadow-green-500/25'>
					{t('buttons.getStarted')}
					<ArrowRight size={14} />
				</button>
			</Link>
		</>
	)
}
