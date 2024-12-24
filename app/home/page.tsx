'use client';

import EventDashboard from "@/components/EventDashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { jwtDecode } from "jwt-decode";

export default function EventDashboardForm() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const validateToken = (token: string): boolean => {
        try {
            const decoded: { exp: number } = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && validateToken(token)) {
            setIsAuthenticated(true);
        } else {
            router.push('/login');
        }
    }, [router]);

    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#fff2ef]">
                <LanguageProvider>
                    <EventDashboard />
                </LanguageProvider>
            </div>
        );
    }


}
