import React from 'react';
import "./style/navigation.css";
import { useLanguage } from '@/contexts/LanguageContext';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const { t } = useLanguage();

    const handlePageClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <nav className='gap-2 mt-2'>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>

                        {t('previous')}{/*Previous*/}
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageClick(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>

                        {t('next')}{ /*Next*/}

                    </button>
                </li>
            </ul>
        </nav>
    );
}
