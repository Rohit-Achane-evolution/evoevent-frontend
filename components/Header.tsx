import React, { useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';
import { useLanguage } from '@/contexts/LanguageContext';


function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function Header({ onSearch }: { onSearch: (query: string) => void }) {
    const { t, language, setLanguage } = useLanguage();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        onSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, onSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };


    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as 'en' | 'hi');
    };

    const toggleMobileSearch = () => {
        setIsMobileSearchVisible(!isMobileSearchVisible);
        if (!isMobileSearchVisible) {
            setTimeout(() => {
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) {
                    (searchInput as HTMLInputElement).focus();
                }
            }, 100);
        }
    };

    return (
        <div className="relative p-1 shadow mb-2 bg-white rounded-4 d-flex justify-content-between align-items-center mb-4">
            {/* Mobile Search View */}
            {isMobileSearchVisible && (
                <div className="d-md-none position-absolute inset-0 bg-white z-10 d-flex align-items-center p-2">
                    <button
                        className="btn btn-link text-dark me-2"
                        onClick={toggleMobileSearch}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <div className="input-group flex-grow-1">
                        <input
                            type="search"
                            className="form-control custom-focus"
                            placeholder={t('search')}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {searchQuery && (
                            <button
                                className="btn btn-link position-absolute end-0 z-10 text-dark"
                                onClick={() => setSearchQuery('')}
                            >
                                <i className="bi bi-x"></i>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Normal View */}
            <div className="ms-1 d-flex align-items-center">
                <img
                    src="https://res.cloudinary.com/dc62b2rfa/image/upload/v1734151684/rrsuvfs4picblttr3qdc.svg"
                    alt="EvoEvent Logo"
                    className="rounded-3 logo"
                />
            </div>
            <div className="d-flex align-items-center">
                {/* Desktop Search */}
                <div className="input-group me-1 d-none d-md-flex">
                    <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-search text-muted" ></i>
                    </span>
                    <input
                        type="search"
                        className="form-control border-start-0 custom-focus"
                        placeholder={t('search')}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* Mobile Search Button */}
                <button
                    className="btn btn-outline-secondary me-1 d-md-none"
                    onClick={toggleMobileSearch}
                >
                    <i className="bi bi-search"></i>
                </button>
                <div className="relative me-1">
                    <select
                        className="appearance-none custom-focus bg-white border border-gray rounded-md py-2 pl-3 pr-8"
                        value={language}
                        onChange={handleLanguageChange}>
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <i className="bi bi-chevron-down text-xs"></i>
                    </div>
                </div>
                <button
                    className="rounded-3 me-1 btn btn-outline-secondary"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                    <i className="bi bi-person"></i>
                </button>
            </div>

            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
        </div>

    );
}

