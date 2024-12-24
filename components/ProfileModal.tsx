'use client'

import { LogOut, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import "./style/navigation.css";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const [username, setUsername] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    const router = useRouter()

    useEffect(() => {
        // Get email from localStorage and extract username
        const storedEmail = localStorage.getItem('usernameFromEmail'); // Assuming the email is stored as 'authToken'
        if (storedEmail) {
            setEmail(storedEmail);
            const usernameFromEmail = storedEmail.split('@')[0];
            setUsername(usernameFromEmail);
        }
    }, []);

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('authToken');
        localStorage.removeItem('usernameFromEmail'); // Remove the stored username if logging out
        router.push('/login');
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-50"
                onClick={onClose}
            />
            <div className="absolute right-2 top-14 z-50 w-64 rounded-lg border bg-white p-4 shadow-lg">
                <div className="flex flex-col items-center gap-2">
                    {/* Avatar */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <User2 className="h-8 w-8 text-muted-foreground" />
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center">
                        <h3 className="font-semibold">{username}</h3>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>

                    {/* Divider */}
                    <div className="my-2 h-px w-full bg-muted" />

                    {/* Logout Button */}
                    <button onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Log Out
                    </button>
                </div>
            </div>
        </>
    )
}
