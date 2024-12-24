'use client'

import { useState } from "react";
import "./style/navigation.css";
import { Eye, Loader2 } from 'lucide-react'

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // Handle the sign-up logic here
        console.log("Email:", email);
        console.log("Password:", password);
    }

    return (
        <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold">
                        Create Your Account for <span className="text-[#F97316]">EvoEvent</span>
                    </h1>
                    <p className="text-gray-600">Sign up to get started</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm text-gray-600">
                            Create Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
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

                    <button
                        type="submit"
                        className="w-full bg-[#F97316] text-white py-2 rounded-md hover:bg-[#EA580C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        Sign Up
                    </button>

                    <div className="text-center">
                        <a href="/login" className="text-sm text-[#F97316] hover:underline">
                            Already have an account? Log in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
