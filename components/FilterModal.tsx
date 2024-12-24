'use client'

import { useState } from 'react'
import "./style/navigation.css";

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    onApply: (filters: { categories: string[]; dates: string[] }) => void
}

export default function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])
    const [selectedDates, setSelectedDates] = useState<string[]>(['All'])

    const categories = [
        'All',
        'Singing Concert',
        'Meeting',
        'Dance Performance',
        'Standup Comedy',
        'Magic Show',
        'Movie Show'
    ]

    const dates = [
        'All',
        'Within this month',
        'Last 6 months'
    ]

    const handleCategoryToggle = (category: string) => {
        if (category === 'All') {
            setSelectedCategories(['All'])
        } else {
            setSelectedCategories(prev => {
                if (prev.includes('All')) {
                    return [category]
                }
                const newSelection = prev.includes(category)
                    ? prev.filter(c => c !== category)
                    : [...prev, category]
                return newSelection.length === 0 ? ['All'] : newSelection
            })
        }
    }

    const handleDateToggle = (date: string) => {
        if (date === 'All') {
            setSelectedDates(['All'])
        } else {
            setSelectedDates(prev => {
                if (prev.includes('All')) {
                    return [date]
                }
                const newSelection = prev.includes(date)
                    ? prev.filter(d => d !== date)
                    : [...prev, date]
                return newSelection.length === 0 ? ['All'] : newSelection
            })
        }
    }

    const handleApply = () => {
        onApply({
            categories: selectedCategories.includes('All') ? [] : selectedCategories,
            dates: selectedDates.includes('All') ? [] : selectedDates
        })
        onClose()
    }

    const handleReset = () => {
        setSelectedCategories(['All'])
        setSelectedDates(['All'])
    }

    if (!isOpen) return null

    return (
        <div className="overlay" style={{ display: 'block' }}>
            <div className="filter-modal" style={{ display: 'block', transform: 'translateX(0)' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="m-0">Filter Events</h5>
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="filter-section mb-4">
                    <p className="mb-2">By Categories</p>
                    <div className="d-flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <div
                                key={category}
                                onClick={() => handleCategoryToggle(category)}
                                className={`category-option ${selectedCategories.includes(category) ? 'selected' : ''}`}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="filter-section mb-4">
                    <p className="mb-2">By Date</p>
                    <div className="d-flex flex-wrap gap-2">
                        {dates.map((date) => (
                            <div
                                key={date}
                                onClick={() => handleDateToggle(date)}
                                className={`category-option ${selectedDates.includes(date) ? 'selected' : ''}`}
                            >
                                {date}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="filter-footer">
                    <button id="btnReset" className="btn btn-outline-secondary" onClick={handleReset}>
                        Reset
                    </button>
                    <button id="btnApplyFilter" className="btn btn-primary" onClick={handleApply}>
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    )
}

