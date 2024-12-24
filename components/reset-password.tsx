'use client'

import { useEffect, useState } from "react"
import { Eye, Loader2 } from 'lucide-react'

const baseUrl = "https://s3f8s6q2-5000.inc1.devtunnels.ms";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token') || '');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.')
            return
        }
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${baseUrl}/auth/set-new-password?token=${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: password, newEmail: email }),
            });

            const data = await response.json();
            if (response.ok) {
                setIsSuccess(true);
                setMessage(data.message);
            } else {
                setMessage(data.message || 'Error updating account information.');
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6 text-center">
                    <h2 className="text-2xl font-semibold text-green-600">Account Updated Successfully!</h2>
                    <p>{message}</p>
                    {/* <a href="/login" className="text-[#F97316] hover:underline">
                        Return to Login
                    </a> */}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold">
                        Update Account for <span className="text-[#F97316]">EvoEvent</span>
                    </h1>
                    <p className="text-gray-600">
                        Please enter your new password below
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm text-gray-600">
                            New Email (optional)
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div> */}

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm text-gray-600">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm text-gray-600">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {message && (
                        <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#F97316] text-white py-2 rounded-md hover:bg-[#EA580C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Updating...
                            </>
                        ) : (
                            'Update Account'
                        )}
                    </button>

                    <div className="text-center">
                        <a href="/login" className="text-sm text-[#F97316] hover:underline">
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

