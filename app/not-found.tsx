'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const GlitchText = ({ children }: { children: string }) => {
    const [glitch, setGlitch] = useState(false) 

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true)
            setTimeout(() => setGlitch(false), 200)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.span
            className="relative inline-block"
            animate={glitch ? {
                x: [0, -2, 2, -2, 2, 0],
                y: [0, 2, -2, 2, -2, 0],
            } : {}}
            transition={{ duration: 0.2 }}
        >
            {children}
            {glitch && (
                <>
                    <motion.span
                        className="absolute left-0 top-0 text-orange-400 clip-text"
                        animate={{ x: [-1, 1, -1, 1, 0], opacity: [1, 0.8, 0.9, 0.7, 1] }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.span>
                    <motion.span
                        className="absolute left-0 top-0 text-gray-300 clip-text"
                        animate={{ x: [1, -1, 1, -1, 0], opacity: [1, 0.8, 0.9, 0.7, 1] }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.span>
                </>
            )}
        </motion.span>
    )
}

const FloatingElement = ({ delay }: { delay: number }) => (
    <motion.div
        className="absolute w-4 h-4 bg-orange-500 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -100, -100, -200],
            x: [0, 50, -50, 0],
        }}
        transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            repeatType: 'loop',
        }}
    />
)

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
            <div className="text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-9xl font-bold text-white mb-8"
                >
                    <GlitchText>404</GlitchText>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <h2 className="text-4xl font-semibold text-orange-500 mt-4">Page Not Found</h2>
                    <p className="text-xl text-gray-400 mt-4">Oops! The page you're looking for doesn't exist.</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Link
                        href="/"
                        className="inline-block mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
                    >
                        Go Home
                    </Link>
                </motion.div>
                <div className="relative w-64 h-64 mx-auto mt-12">
                    <FloatingElement delay={0} />
                    <FloatingElement delay={1} />
                    <FloatingElement delay={2} />
                    <motion.div
                        className="absolute inset-0 border-4 border-orange-500 rounded-full"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>
        </div>
    )
}

