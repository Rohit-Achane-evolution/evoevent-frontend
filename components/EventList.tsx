import { formatDate } from '@/utils/dateUtils'
import "./style/navigation.css";
import { useLanguage } from '@/contexts/LanguageContext';

interface Event {
    id: number;
    images: string | null;
    name: string;
    category: string;
    date: string;
}

interface EventListProps {
    events: Event[];
    onDelete: (id: number) => void;
    onEdit: (event: Event) => void;
}

export default function EventList({ events, onDelete, onEdit }: EventListProps) {
    const { t } = useLanguage();

    return (
        <div className="list-view ">
            <div className="rounded-2 table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t('tableEventName')}{/*Event Name*/}</th>
                            <th>{t('tableDate')}{/*Date*/}</th>
                            <th>{t('tableEventType')}{/*Event Type*/}</th>
                            <th>{t('tableActions')}{/*Actions*/}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id} className="listy rounded-2">
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <img src={event.images || '/placeholder.svg'} className="event-image rounded" alt="no img" />
                                        <span className="text-truncate">{event.name}</span>
                                    </div>
                                </td>
                                <td>{formatDate(event.date)}</td>
                                <td><span className="rounded-4 event-type-badge">{event.category}</span></td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-light flex-grow-1 flex-md-grow-0"
                                            data-bs-toggle="modal" data-bs-target="#deleteModal"
                                            onClick={() => onDelete(event.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button className="btn btn-sm btn-light flex-grow-1 flex-md-grow-0" onClick={() => onEdit(event)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

