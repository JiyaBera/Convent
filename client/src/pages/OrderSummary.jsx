import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';

export default function OrderSummary() {
    const { id } = useParams();  // Extract event ID from URL
    const [event, setEvent] = useState(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        if (!id) return;

        // Fetch event details
        setLoading(true);
        axios.get(`/event/${id}/ordersummary`)
            .then(response => {
                console.log("Event Data:", response.data);  // Log response data for debugging
                setEvent(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching event:", error.response || error.message);  // Log error details
                setError("Failed to load event details. Please try again later.");
                setLoading(false);
            });
    }, [id]);
    
    //! Handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };
  
    // Loading and error handling
    if (loading) return <p>Loading event details...</p>;
    if (error) return <p>{error}</p>;
    if (!event) return <p>No event details available.</p>;

    return (
      <div>
          <Link to={`/event/${event._id}`}>
            <button 
                className='
                  inline-flex 
                  mt-12
                  gap-2
                  p-3 
                  ml-12
                  bg-gray-100
                  justify-center 
                  items-center 
                  text-blue-700
                  font-bold
                  rounded-md'
            >
              <IoMdArrowBack 
                className='
                font-bold
                w-6
                h-6
                gap-2'/> 
              Back
            </button>
          </Link>
          <div className='flex flex-col'>
              <div className= 'inline-flex gap-5 mt-8'> 
                  <div className="
                      p-4
                      ml-12 
                      bg-gray-100
                      w-3/4
                      mb-12">
                      <h2 className='text-left font-bold'> 
                          Terms & Conditions 
                      </h2>
                      <br/>
                      <div>
                        <ul className="custom-list">
                            <li>Refunds will be provided for ticket cancellations made up to 14 days before the event date...</li>
                            {/* Add more terms here */}
                        </ul>
                        <br/>
                      </div>
                  </div>
                    
                  <div className="
                      w-1/4
                      pl-4
                      h-1/4
                      mr-12 
                      bg-blue-100">
                      <h2 className='mt-4 font-bold'>Booking Summary</h2>
                      <div className='text-sm flex justify-between'>
                          <div className='text-left mt-5'>{event.title}</div>
                          <div className='text-right mt-5 mb-6 pr-5'>
                            RS. {event.ticketPrice || 'N/A'}  {/* Fallback if ticketPrice is missing */}
                          </div>
                      </div>
                      
                      <hr className="my-2 pt-2 border-gray-300" />
                      <div className='text-sm font-bold flex justify-between'>
                          <div className='text-left mt-5'>SUB TOTAL</div>
                          <div className='text-right mt-5 mb-6 pr-5'>
                            RS. {event.ticketPrice || 'N/A'}  {/* Fallback if ticketPrice is missing */}
                          </div>
                      </div>
                      <div className='flex justify-between'>
                          <input 
                            className='h-5' 
                            type='checkbox' 
                            onChange={handleCheckboxChange} 
                            checked={isCheckboxChecked}  // Keep the checkbox state synced
                          />
                          <div className='px-2 text-sm'>
                            I have verified the Event name, date, and time before proceeding to payment. I accept terms and conditions.
                          </div>
                      </div>

                      <div className='mb-5'>
                        <Link to={isCheckboxChecked ? `/event/${id}/ordersummary/paymentsummary` : '#'}>
                          <button 
                            className={`mt-5 p-3 ml-2 w-36 text-gray-100 items-center ${
                              isCheckboxChecked ? 'bg-brand' : 'bg-ex2'} gap-2 rounded-md`}
                            disabled={!isCheckboxChecked}>
                            Proceed
                          </button>
                        </Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}
