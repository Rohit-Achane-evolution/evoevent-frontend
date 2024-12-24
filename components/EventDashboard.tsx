'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Header from './Header';
import EmptyState from './EmptyState';
import EventList from './EventList';
import EventCards from './EventCards';
import Pagination from './Pagination';
import NewEventModal from './NewEventModal';
import DeleteEventModal from './DeleteEventModal';
import FilterModal from './FilterModal';
import "./style/navigation.css";
import { Modal } from 'bootstrap';
import SearchEmptyState from './SearchEmptyState';
import { useLanguage } from '@/contexts/LanguageContext';

const baseUrl = "https://s3f8s6q2-5000.inc1.devtunnels.ms/event";
const ITEMS_PER_PAGE = 6;

export default function EventDashboard() {
    const [allEvents, setAllEvents] = useState<any[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
    const [viewMode, setViewMode] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<number | null>(null);
    const [eventToEdit, setEventToEdit] = useState<any | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useLanguage();
    const [activeFilters, setActiveFilters] = useState<{ categories: string[]; dates: string[] }>({
        categories: [],
        dates: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }
            const response = await fetch(`${baseUrl}?page=1&limit=1000`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch events: ${errorMessage}`);
            }

            const apiResponse = await response.json();
            const fetchedEvents = Array.isArray(apiResponse.data) ? apiResponse.data : [];
            setAllEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents);
        } catch (error) {
            console.error('Error fetching all events:', error);
            showToastMessage('Error fetching events');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllEvents();
    }, [fetchAllEvents]);

    const applyFilters = useCallback((events: any[], search: string, filters: { categories: string[]; dates: string[] }) => {
        return events.filter(event => {
            const matchesSearch = search === '' || event.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = filters.categories.length === 0 || filters.categories.includes(event.category);
            const matchesDate = filters.dates.length === 0 || filters.dates.some(dateRange => {
                const eventDate = new Date(event.date);
                const now = new Date();
                if (dateRange === 'Within this month') {
                    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    return eventDate >= startOfMonth && eventDate <= endOfMonth;
                } else if (dateRange === 'Last 6 months') {
                    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return eventDate >= sixMonthsAgo && eventDate < today;
                }
                return false;
            });
            return matchesSearch && matchesCategory && matchesDate;
        });
    }, []);

    useEffect(() => {
        const filtered = applyFilters(allEvents, searchQuery, activeFilters);
        setFilteredEvents(filtered);
        setCurrentPage(1);
    }, [searchQuery, activeFilters, allEvents, applyFilters]);

    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredEvents, currentPage]);

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

    const handleAddEvent = (newEvent: { id: number; name: string; date: string; category: string; images: string }) => {
        const newEventWithId = { ...newEvent, id: Date.now(), images: '/placeholder.svg?height=200&width=300' };
        setAllEvents(prevEvents => [...prevEvents, newEventWithId]);
        closeModal('newEventModal');
        showToastMessage('Event added successfully');
    };

    const handleUpdateEvent = (updatedEvent: any) => {
        const updateEvents = (events: any[]) =>
            events.map(event => event.id === updatedEvent.id ? updatedEvent : event);
        setAllEvents(updateEvents);
        closeModal('newEventModal');
        showToastMessage('Event updated successfully');
    };

    const handleDeleteEvent = async (id: number) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setAllEvents(prevEvents => prevEvents.filter(event => event.id !== id));
                setEventToDelete(null);
                closeModal('deleteModal');
                showToastMessage('Event deleted successfully');
            } else {
                const errorMessage = await response.text();
                console.error(`Failed to delete event: ${errorMessage}`);
                showToastMessage('Failed to delete event');
            }
        } catch (error) {
            console.error('Error while deleting event:', error);
            showToastMessage('Error while deleting event');
        }
    };

    const handleEditEvent = (event: any) => {
        setEventToEdit(event);
        openModal('newEventModal');
    };

    const handleFilterApply = (filters: { categories: string[]; dates: string[] }) => {
        setActiveFilters(filters);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const closeModal = (modalId: string) => {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modalInstance = Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    };

    const openModal = (modalId: string) => {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
            modalInstance.show();
        }
    };

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };
    const areFiltersApplied = activeFilters.categories.length > 0 || activeFilters.dates.length > 0;

    return (
        <div className="container py-3">
            <Header onSearch={handleSearch} />
            <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
                <div className="text-start mb-2 mb-md-0">
                    <h3 className="text-start">{t('events')}</h3>
                    <p className="text-start">{t('eventsDescription')}</p>
                </div>
                <div className="height d-flex flex-wrap gap-3">
                    <button
                        className={`btn btn-outline-secondary flex-grow-1 flex-md-grow-0 ${areFiltersApplied ? 'active' : ''}`}
                        onClick={() => setIsFilterModalOpen(true)}
                    >
                        <i className="bi bi-funnel"></i> {t('filter')}
                    </button>
                    <div className="btn-group flex-grow-1 flex-md-grow-0" role="group">
                        <button className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                            <i className="bi bi-list"></i>
                        </button>
                        <button className={`btn btn-outline-secondary ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}>
                            <i className="bi bi-grid"></i>
                        </button>
                    </div>
                    <button className="btn btn-add-event flex-grow-1 flex-md-grow-0" onClick={() => { setEventToEdit(null); openModal('newEventModal'); }}>
                        <i className="bi bi-plus"></i> {t('addNewEvent')}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : searchQuery && filteredEvents.length === 0 ? (
                <SearchEmptyState />
            ) : filteredEvents.length === 0 ? (
                <EmptyState />
            ) : viewMode === 'list' ? (
                <EventList
                    events={paginatedEvents}
                    onDelete={(id: number) => setEventToDelete(id)}
                    onEdit={handleEditEvent}
                />
            ) : (
                <EventCards
                    events={paginatedEvents}
                    onDelete={(id: number) => setEventToDelete(id)}
                    onEdit={handleEditEvent}
                />
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

            <NewEventModal onAddEvent={handleAddEvent} onUpdateEvent={handleUpdateEvent} eventToEdit={eventToEdit} />
            <DeleteEventModal eventId={eventToDelete} onDelete={handleDeleteEvent} onClose={() => setEventToDelete(null)} />
            <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} onApply={handleFilterApply} />

            {showToast && (
                <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">Notification</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">{toastMessage}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

