import RequestPasswordReset from "@/components/request-reset";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff2ef]">
            <LanguageProvider>
                <RequestPasswordReset />
            </LanguageProvider>
        </div>
    )
}

