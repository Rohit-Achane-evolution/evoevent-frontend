//EventCards
'use client'

import { formatDate } from "../utils/dateUtils";
import "./style/navigation.css";

import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
interface Event {
    id: number;
    images: string | null; // Allow `null` for missing images
    name: string;
    category: string;
    date: string; // Or `Date` depending on your input format
}
interface EventCardsProps {
    events: Event[];
    onDelete: (id: number) => void;
    onEdit: (event: Event) => void;

}

export default function EventCards({ events, onDelete, onEdit }: EventCardsProps) {
    return (
        <div className="row g-4" id="cardContainer">
            {events.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                    <div className="card event-card">
                        <img src={event.images || '/placeholder.svg'} className="event-image card-img-top" alt="no img" />
                        <div className="card-body">
                            <div className="d-flex w-100 justify-content-between align-items-start">
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="card-title text-truncate">{event.name}</h5>
                                    <span className="rounded-4 event-type-badge">{event.category}</span>
                                </div>
                                <div className="d-flex flex-shrink-1 gap-2">
                                    <button
                                        className="btn btn-sm btn-light flex-grow-1 flex-md-grow-0"
                                        data-bs-toggle="modal" data-bs-target="#deleteModal"
                                        onClick={() => onDelete(event.id)} >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-light flex-grow-1 flex-md-grow-0"
                                        onClick={() => onEdit(event)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </div>
                            </div>
                            <p className="card-text mt-2 text-muted">{formatDate(event.date)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}