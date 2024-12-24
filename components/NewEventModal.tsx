import React, { useState, useEffect } from 'react';
import "./style/navigation.css";
import { useLanguage } from '@/contexts/LanguageContext';
const baseUlr = "https://s3f8s6q2-5000.inc1.devtunnels.ms/event";

interface NewEventModalProps {
    onAddEvent: (event: any) => void;
    onUpdateEvent: (event: any) => void;
    eventToEdit: any | null;
}

export default function NewEventModal({ onAddEvent, onUpdateEvent, eventToEdit }: NewEventModalProps) {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // New loading state
    const { t } = useLanguage();


    useEffect(() => {
        if (eventToEdit) {
            setEventName(eventToEdit.name);
            setEventDate(new Date(eventToEdit.date).toISOString().split('T')[0]);
            setEventCategory(eventToEdit.category);
            setPreviewImage(eventToEdit.images);
            setUploadedImage(null);
        } else {
            resetForm();
        }
    }, [eventToEdit]);

    const resetForm = () => {
        setEventName('');
        setEventDate('');
        setEventCategory('');
        setUploadedImage(null);
        setPreviewImage(null);
        setLoading(false); // Reset loading state
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!eventName || !eventDate || !eventCategory) {
            alert('Please fill all fields');
            return;
        }
        const isEventDate = new Date(eventDate).toISOString();
        const formData = new FormData();
        formData.append('name', eventName);
        formData.append('date', isEventDate);
        formData.append('category', eventCategory);

        if (uploadedImage) {
            formData.append('images', uploadedImage);
        } else if (eventToEdit && eventToEdit.images) {
            formData.append('images', eventToEdit.images);
        }

        setLoading(true); // Set loading to true before submitting
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }

            let response;
            if (eventToEdit) {
                //response = await fetch(`http://localhost:5000/event/${eventToEdit.id}`, {
                response = await fetch(`${baseUlr}/${eventToEdit.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: eventName,
                        date: isEventDate,
                        category: eventCategory,
                        images: eventToEdit.images,
                    }),
                });
            } else {
                response = await fetch(`${baseUlr}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            if (!response.ok) {
                throw new Error('Failed to create/update event');
            }

            const createdOrUpdatedEvent = await response.json();

            if (eventToEdit) {
                onUpdateEvent(createdOrUpdatedEvent);
            } else {
                onAddEvent(createdOrUpdatedEvent);
            }

            resetForm();
        } catch (error) {
            console.error('Error while adding/updating event:', error);
            alert(`Failed to create/update event. Please try again. ${error}`);
        } finally {
            setLoading(false); // Reset loading after response
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="modal fade" id="newEventModal" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title">{eventToEdit ? 'Edit Event' : 'New Event'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form id="newEventForm" onSubmit={handleSubmit}>
                            {/* Image Upload Section */}
                            <div className="mb-2">
                                <div
                                    className="image-upload-area"
                                    onClick={() => document.getElementById('eventImage')?.click()}
                                    style={{ cursor: 'pointer', textAlign: 'center', border: '1px dashed #ccc', padding: '10px' }}
                                >
                                    <i className="bi bi-cloud-upload fs-3"></i>
                                    <p className="mb-0">
                                        {t('dropAnImage')}{/*Drop an image here or click to upload!*/}
                                    </p>
                                    <input
                                        name="eventImages"
                                        type="file"
                                        className="d-none"
                                        id="eventImage"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    {previewImage && (
                                        <img
                                            id="uploadedImagePreview"
                                            src={previewImage}
                                            alt="Event Preview"
                                            className="img-fluid mt-2"
                                            style={{ maxHeight: '200px', display: 'block', margin: '10px auto' }}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* Event Name */}
                            <div className="mb-2">
                                <label className="form-label">
                                    {t('eventName')}{/*Event Name*/}

                                </label>
                                <input
                                    id="eventName"
                                    name="eventName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex. John's birthday"
                                    required
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>
                            {/* Event Date */}
                            <div className="mb-2">
                                <label className="form-label">
                                    {t('eventDate')}{/*Event Date*/}
                                </label>
                                <input
                                    id="eventDate"
                                    name="eventDate"
                                    type="date"
                                    className="form-control"
                                    required
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                />
                            </div>
                            {/* Event Category */}
                            <div className="mb-2">
                                <label className="form-label">
                                    {t('eventCategory')}{/*Event Category*/}
                                </label>
                                <div className="custom-select-container">
                                    <select
                                        id="eventCategory"
                                        name="eventCategory"
                                        className="form-select custom-select"
                                        required
                                        value={eventCategory}
                                        onChange={(e) => setEventCategory(e.target.value)}
                                    >
                                        <option value="">{t('selectOption')}{/*Select an option...*/}</option>
                                        <option>{t('singingConcert')}{/*Singing Concert*/}</option>
                                        <option>{t('meeting')}{/*Meeting*/}</option>
                                        <option>{t('dancePerformance')}{/*Dance Performance*/} </option>
                                        <option>{t('standupComedy')}{/*Standup Comedy*/}</option>
                                        <option>{t('magicShow')}{/*Magic Show*/}</option>
                                        <option>{t('movieShow')}{/*Movie Show*/}</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Modal Footer */}
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" disabled={loading}>

                            {t('cancel')}{/*Cancel*/}
                        </button>
                        <button
                            type="submit"
                            form="newEventForm"
                            className="btn btn-add-event"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>

                                    {t('saving')}{/*Saving...*/}

                                </>
                            ) : eventToEdit ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
