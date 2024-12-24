'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import './style/navigation.css';
import { useLanguage } from '@/contexts/LanguageContext';

const baseUlr = "https://s3f8s6q2-5000.inc1.devtunnels.ms";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { t } = useLanguage();

    useEffect(() => {
        //Check if "Remember me" data is saved in localStorage
        const savedEmail = localStorage.getItem('rememberedEmail');
        const savedPassword = localStorage.getItem('rememberedPassword');
        const savedRemember = localStorage.getItem('remember') === 'true';

        if (savedRemember) {
            setEmail(savedEmail || '');
            setPassword(savedPassword || '');
            setRemember(true);
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

            router.push('/home');
        }
    }, [router]);

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = t('emailRequired') || 'Email is required.';
            valid = false;
        }
        if (!password) {
            newErrors.password = t('passwordRequired') || 'Password is required.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return; //Stop execution if validation fails
        }

        console.log('Login attempt:', { email, password, remember });

        try {
            const response = await fetch(`${baseUlr}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login success:', data);

                // Save token
                localStorage.setItem('authToken', data.token);

                // Save credentials if "Remember me" is checked
                if (remember) {
                    localStorage.setItem('rememberedEmail', email);
                    localStorage.setItem('rememberedPassword', password);
                    localStorage.setItem('remember', 'true');
                } else {
                    // Clear stored credentials if "Remember me" is unchecked
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberedPassword');
                    localStorage.removeItem('remember');
                }
                localStorage.setItem('usernameFromEmail', email);
                router.push('/home');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    function RequestPasswordRequest() {

        router.push('/pass-reset-request');
    }
    function singUp() {

        router.push('/signup'); 
    }

    return (
        <div className="bg-[#fff2ef] p-8 rounded-lg w-full max-w-[450px]">
            <h2 className="text-3xl font-medium text-center mb-2 font-inter leading-[48.41px]">
                {t('signTnToEvo')}{/* Sign in to Evo */}
                <span className="text-[#ff6b35]">{t('event')}{/* Event */}</span>
            </h2>
            <p className="text-[#666] text-base text-center mb-8 font-inter leading-8 font-normal">
                {t('welcomeToEvento')}{/* Welcome to evento, please enter your login details below */}
            </p>

            <form onSubmit={loginUser}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-[#666] text-sm mb-2">
                        {t('emailAddress')}{/* Email address */}
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-3 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-[#b8b6b6]'}`}
                        placeholder="Ex. jhondoe@mailsample.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-[#666] text-sm mb-2">
                        {t('Password')}{/* Password */}
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={`w-full px-3 py-3 border rounded-lg ${errors.password ? 'border-red-500' : 'border-[#b8b6b6]'}`}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666]"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2 form-checkbox text-[#ff6b35] rounded border-[#b8b6b6]"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <span className="text-sm text-[#666]">{t('rememberMe')}{/* Remember me */}</span>
                    </label>
                </div>

                <button
                    id="loginbtn"
                    type="submit"
                    className="w-full py-3 rounded-lg text-white font-bold bg-gradient-to-b from-[#FD5900] to-[#FFB48C] hover:from-[#ff5a1f] hover:to-[#FFA070]"
                >
                    {t('logIn')}{/* Log in */}
                </button>

                <div className='signin-forgot flex justify-between w-full'>
                    <a
                        href="#"
                        className="block text-center text-sm text-[#333] mt-4 hover:underline"
                        onClick={singUp}
                    >
                        singUp
                    </a>
                    <a
                        href="#"
                        className="block text-center text-sm text-[#333] mt-4 hover:underline"
                        onClick={RequestPasswordRequest}
                    >
                        {t('forgotThePassword')}{/* Forgot the password? */}
                    </a>
                </div>

            </form>
        </div>
    );
}
