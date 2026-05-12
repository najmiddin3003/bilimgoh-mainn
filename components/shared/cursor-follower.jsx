'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PremiumCursor() {
	const pathname = usePathname()
	const glow = useRef(null)

	const disabled = pathname?.startsWith('/auth')

	useEffect(() => {
		if (disabled) return

		const move = e => {
			if (!glow.current) return

			const x = e.clientX
			const y = e.clientY

			glow.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
		}

		window.addEventListener('mousemove', move)

		return () => window.removeEventListener('mousemove', move)
	}, [disabled])

	if (disabled) return null

	return (
		<div
			ref={glow}
			className='pointer-events-none fixed z-40 h-[400px] w-[400px] rounded-full bg-[#10B981]/20 blur-[160px] transition-transform duration-100'
		/>
	)
}
