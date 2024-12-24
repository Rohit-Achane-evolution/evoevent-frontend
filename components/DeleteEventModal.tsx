import React from 'react';
import "./style/navigation.css";
import { useLanguage } from '@/contexts/LanguageContext';

interface DeleteEventModalProps {
    eventId: number | null;
    onDelete: (id: number) => void;
    onClose: () => void;
}

export default function DeleteEventModal({ eventId, onDelete, onClose }: DeleteEventModalProps) {
    const { t } = useLanguage();

    const handleDelete = () => {
        if (eventId) {
            onDelete(eventId);
        }
    };

    return (
        <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title" id="deleteModalLabel">{t('deleteQ')}{/*Delete */}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body d-flex flex-column align-items-center">
                        <h3>{t('deleteConfirm')}{/*Are you sure you want to delete this event? */}</h3>
                        <img
                            className="rounded-3 p-1"
                            src="https://res.cloudinary.com/dc62b2rfa/image/upload/v1734158744/nvrxo62pw983udtmirsv.svg"
                            alt="Delete Logo"
                        />
                    </div>
                    <div className="modal-footer border-0">
                        <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                        >
                            {t('cancel')}{/* Cancel */}

                        </button>
                        <button
                            type="button"
                            className="btn btn-add-event"
                            data-bs-dismiss="modal" // This ensures the modal closes like the Cancel button
                            onClick={handleDelete}
                        >
                            {t('deleteButton')}{/* Delete */}

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
