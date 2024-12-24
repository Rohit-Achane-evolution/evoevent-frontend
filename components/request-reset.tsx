'use client'

import { useState } from "react"
import { Loader2 } from 'lucide-react'

export default function RequestPasswordReset() {
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        setMessage('') // Clear previous message

        // Prepare the data for the API request
        const data = { email }

        try {
            const response = await fetch('http://localhost:5000/auth/reset-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to send reset link')
            }
            // Update the state on success
            setEmailSent(true)
            setMessage('Password reset instructions have been sent to your email address.')
        } catch (error) {
            // Handle errors here if needed
            console.error(error)
            setMessage('Failed to send the reset link. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#fff2ef] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold">
                        Reset Password for <span className="text-[#F97316]">EvoEvent</span>
                    </h1>
                    <p className="text-gray-600">
                        Enter your email address and we'll send you a link to reset your password
                    </p>
                </div>

                {/* Show message (success or error) */}
                {message && (
                    <div className={`p-4 rounded-md text-center space-y-4 ${emailSent ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        <p className="text-sm">{message}</p>
                    </div>
                )}

                {!emailSent ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm text-gray-600">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="Ex. jhondoe@mailsample.com"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Capture email input
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#F97316] text-white py-2 rounded-md hover:bg-[#EA580C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Sending...
                                </>
                            ) : (
                                'Request Password Reset'
                            )}
                        </button>

                        <div className="text-center">
                            <a href="/login" className="text-sm text-[#F97316] hover:underline">
                                Back to Login
                            </a>
                        </div>
                    </form>
                ) : (
                    <div className="pt-2 text-center">
                        <a
                            href="/login"
                            className="text-[#F97316] hover:underline text-sm"
                        >
                            Back to Login
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
