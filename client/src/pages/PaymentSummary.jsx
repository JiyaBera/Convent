import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../UserContext";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketForm = () => {  
  const { user } = useContext(UserContext);
  const { id } = useParams();  // Extract event ID from URL

  const [ticketDetails, setTicketDetails] = useState({
    eventName: '',
    name: '',
    email: '',
    phone: '',
    qr: '', // QR code URL
    eventDate: '',
    eventTime: '',
    ticketPrice: null
  });

  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // State to hold the QR code URL

  useEffect(() => {
    if (!id) return;

    // Fetch event details
    axios.get(`/event/${id}/ordersummary/paymentsummary`)
        .then(response => {
            setTicketDetails(prev => ({
              ...prev, 
              ...response.data, 
              eventName: response.data.title
            }));
        })
        .catch(error => {
            setErrorMessage("Failed to load event details. Please try again later.");
        });
  }, [id]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({
      ...ticketDetails,
      [name]: value,
    });
  };

  // Function to generate QR code using the provided UPI link
  const generateQRCode = async () => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=harshsobhashana@okicici`;
      return qrUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  };

  // Function to create the ticket
  const createTicket = async (e) => {
    e.preventDefault(); // prevent form refresh

    try {
      const qrCodeUrl = await generateQRCode();

      if (!qrCodeUrl) {
        setErrorMessage('Failed to generate QR code. Please try again.');
        return;
      }

      setQrCodeUrl(qrCodeUrl); // Save the QR code URL for display

      const updatedTicketDetails = {
        ticketDetails: {
          ...ticketDetails,
          qr: qrCodeUrl,
        },
        eventId: id,
        userId: user._id
      };

      const response = await axios.post(`/tickets`, updatedTicketDetails);

      if (response.status === 201) {
        setSuccessMessage('Ticket Created Successfully!');
      } else {
        setErrorMessage('Failed to create ticket. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          `Error creating ticket: ${error.response.data.error || error.message}`
        );
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className='ticket-container bg-primaryBg'>
      <div className='ticket-form-wrapper bg-ex2'>
        <h2 className='text-fontprimary'>Create Ticket</h2>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {successMessage && <p className='success-message'>{successMessage}</p>}
        {!successMessage && (
          <form onSubmit={createTicket} className='ticket-form'>
            <div>
              <label>Event Name:</label>
              <input
                type="text"
                name="eventName"
                value={ticketDetails.eventName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Your Name:</label>
              <input
                type="text"
                name="name"
                value={ticketDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={ticketDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={ticketDetails.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Make Payment</button>
          </form>
        )}
        {qrCodeUrl && (
          <div className="qr-code-section">
            <h3>Scan this QR Code for Payment</h3>
            <img src={qrCodeUrl} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketForm;
