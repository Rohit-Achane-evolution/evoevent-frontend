import RequestPasswordReset from "@/components/request-reset";
import ResetPassword from "@/components/reset-password";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function setNewPassword() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff2ef]">
            <LanguageProvider>
                <ResetPassword />
            </LanguageProvider>
        </div>
    )
}

