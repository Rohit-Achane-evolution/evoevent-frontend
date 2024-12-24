import { LanguageProvider } from "@/contexts/LanguageContext";
import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fff2ef]">
      <LanguageProvider>

        <LoginForm />
      </LanguageProvider>
    </main>
  )
}

