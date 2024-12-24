'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';

// Define type for translations to allow dynamic keys
type Translations = Record<string, string>;

type Language = 'en' | 'hi';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');
    const [translations, setTranslations] = useState<Translations>(enTranslations);

    // Change translations when language changes
    useEffect(() => {
        setTranslations(language === 'en' ? enTranslations : hiTranslations);
    }, [language]);

    // Translation function
    const t = (key: string): string => {
        return translations[key] || key; // Return translation or the key if not found
    };
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
