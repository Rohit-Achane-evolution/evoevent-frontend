import RequestPasswordReset from "@/components/request-reset";
import SignUp from "@/components/signup";
import { LanguageProvider } from "@/contexts/LanguageContext";


export default function CreateNewUser() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff2ef]">
            <LanguageProvider>
                <SignUp />
            </LanguageProvider>
        </div>
    )
}

