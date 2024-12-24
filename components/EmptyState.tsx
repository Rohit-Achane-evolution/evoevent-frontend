import Image from 'next/image'
import "./style/navigation.css";
import { useLanguage } from '@/contexts/LanguageContext';

export default function EmptyState() {
    const { t } = useLanguage();

    return (
        <div id="emptyState" className="empty-state">
            <img src="https://res.cloudinary.com/dc62b2rfa/image/upload/v1734169913/nxot6z1pirhp1esc1gme.svg" alt="Empty state illustration" />
            <h5> {t('noEventsToShowYet')}{/*No Events to show yet !*/}</h5>
            <p className="text-muted">{t('addNewEventHere')}{/*add new event here...*/} </p>
            <button className="btn btn-add-event" data-bs-toggle="modal" data-bs-target="#newEventModal">
                <i className="bi bi-plus"></i> {t('addNewEvent')}{/*Add New Event*/}
            </button>
        </div>
    )
}

