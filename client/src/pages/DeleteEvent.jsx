import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteEvent() {
    const { id } = useParams();  // Get the event ID from the URL
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/event/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 204) {
                alert("Event deleted successfully");
                navigate('/events'); // Redirect to the events list after deletion
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event");
        }
    };

    return (
        <div>
            <h1>Delete Event</h1>
            <p>Are you sure you want to delete this event?</p>
            <button onClick={handleDelete}>Delete Event</button>
        </div>
    );
}

export default DeleteEvent;
