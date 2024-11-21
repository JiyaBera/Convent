import axios from "axios";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaChevronDown } from 'react-icons/fa';
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import ButtonOutline from "./ButtonOutline";
import Datepicker from 'react-tailwindcss-datepicker';
import Button from './Button';
import { BsArrowRightShort } from 'react-icons/bs';

import "react-datepicker/dist/react-datepicker.css";

import signupicon from '/icons/things_to_do_signup.svg';
import moneyicon from '/icons/things_to_do_money.svg';
import travelicon from '/icons/things_to_do_travel.svg';
import homepeople from '/peoplehome.svg';

const BACK_ILLUSTRATION = '/back_illustration.svg';
const MAIN_ILLUSTRATION = '/mainpage.svg';

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/createEvent");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events. Please try again.");
      }
    };

    fetchEvents();
  }, []);

  const handleLike = async (eventId) => {
    const userId = "currentUserId"; // Replace this with the actual user ID from your auth context or state

    try {
      const response = await axios.post(`/event/${eventId}/like`, { userId }); // Corrected the syntax
      console.log("Like response:", response.data); // Log the successful response

      // Update the UI after successful like
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, likes: event.likes + 1 } : event
        )
      );
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error liking the event:", JSON.stringify(error.response.data));
        alert(`Failed to like the event. Error: ${error.response.data.message || "Unknown error"}`); // Corrected the syntax
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error liking the event:", error.request);
        alert("Failed to like the event. No response from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error liking the event:", error.message);
        alert(`Failed to like the event. Error: ${error.message}`); // Corrected the syntax
      }
    }
  };


  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/event/${eventId}`);
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        alert("Event deleted successfully");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event");
      }
    }
  };

  const search = (e) => {
    e.preventDefault();
    // navigate(`/campgrounds?location=${location}&date=${date ? date.toISOString().split('T')[0] : ''}&guests=${guests}`);
    navigate(`/event/:id`);
  };

  return (
    <>
      <Helmet>
        <title>Convent | Home</title>
        <meta name="description" content="Explore campus events with Convent." />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <section className='z-10 grid gap-10 py-10 lg:gap-16 lg:py-16 bg-primaryBg'>
        <div className='flex flex-col gap-10 md:flex-row'>
          <div className='flex-1'>
            <h3 className='mb-5 font-volkhov text-4xl font-bold leading-tight lg:text-5xl text-fontprimary lg:leading-snug xl:mb-10 xl:text-6xl ml-20'>
              Stay Connected, <br /> Stay Informed, <br /> Stay Engaged.
            </h3>
            <p className='mb-10 text-paragraph lg:text-lg lg:leading-loose !text-fontsecondary xl:mb-16 xl:text-xl xl:leading-loose ml-20'>
              Discover all the events happening in your college, keep track of the latest happenings, and receive notifications for events tailored to your interests. Convent keeps you in the loop, ensuring you never miss out on campus activities.
            </p>
            <Link to={'/'} className="ml-20">
              <ButtonOutline text='Join Convent' />
            </Link>
          </div>
          <div className='relative flex-1'>
            <img
              src={BACK_ILLUSTRATION}
              className='absolute -top-10 z-[-1] lg:scale-75'
              alt='Background illustration'
            />
            <img
              className='w-sm md:w-full lg:scale-75'
              src={MAIN_ILLUSTRATION}
              alt='Main page illustration'
            />
          </div>
        </div>

        <form
          className='mx-auto flex max-w-screen-md flex-wrap items-center gap-8 rounded-lg bg-white p-6 shadow-lg md:flex-row md:justify-around md:py-8'
          onSubmit={search}
        >
          <div className='flex flex-col items-start gap-1'>
            <div className='flex max-w-[8.75rem] items-center gap-2'>
              <div className='relative'>
                <Datepicker
                  primaryColor='sky'
                  onChange={val => setDate(val.startDate)}
                  asSingle={true}
                  useRange={false}
                  inputClassName='opacity-0 !p-0 cursor-pointer h-full'
                  toggleClassName='opacity-0 pointer-events-none'
                  containerClassName='w-full'
                />
              </div>
              <label className='pointer-events-none absolute'>
                {!!date ? date : 'Date'}
              </label>
              <label htmlFor='date' className='cursor-pointer absolute ml-12'>
                <FaChevronDown className='text-xs text-brand ' />
              </label>
            </div>
            <p className='text-sm text-paragraph'>When will you go</p>
          </div>

          <Button text='Explore Now' />
        </form>
      </section>

      <section className='bg-bleed relative bg-secondaryBg p-7 md:p-12 lg:p-16'>
        <img
          src={homepeople}
          className='absolute right-0 z-[-1] w-36 lg:right-[10%]'
          alt="people at home"
        />
        <h3 className='mb-2 text-center font-volkhov text-2xl font-extrabold md:mb-4 md:text-3xl lg:mb-6 lg:text-4xl'>
          Get Ready for <span className='text-brand'>Unmissable </span>experiences
        </h3>
        <p className='mx-auto mb-5 text-center text-base text-paragraph md:mb-10 md:max-w-lg lg:mb-14'>
          We ensure you discover, attend, and enjoy well-organized,
          secure events without breaking the bank.
        </p>
        <div className='flex flex-wrap justify-center gap-5'>
          <div className='max-w-xs rounded-lg bg-white bg-[url("/illustrations/signup_wave.svg")] bg-cover px-8 py-10 shadow-lg'>
            <img src={signupicon} alt='sign up icon' className='mb-4' />
            <h5 className='mb-2 text-lg font-bold'>Discover, Engage, Enjoy!</h5>
            <p className='text-sm text-paragraph'>
              Sign up, explore exciting events, and connect with like-minded people in your community
            </p>
          </div>
          <div className='max-w-xs rounded-lg bg-white bg-[url("/illustrations/money_wave.svg")] bg-cover px-8 py-10 shadow-lg'>
            <img src={moneyicon} alt='money icon' className='mb-4' />
            <h5 className='mb-2 text-lg font-bold'>Your Event Journey Starts Here</h5>
            <p className='text-sm text-paragraph'>
              Join now to unlock a world of events tailored to your interests and schedule
            </p>
          </div>
          <div className='max-w-xs rounded-lg bg-white bg-[url("/illustrations/travel_wave.svg")] bg-cover px-8 py-10 shadow-lg'>
            <img src={travelicon} alt='travel icon' className='mb-4' />
            <h5 className='mb-2 text-lg font-bold'>Find What Moves You</h5>
            <p className='text-sm text-paragraph'>
              Create an account, browse unique experiences, and make the most of every moment
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-10 lg:gap-16 lg:py-16">
        {/* Section content omitted for brevity */}

        <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5">
          {events.length > 0 && events.map((event) => {
            const eventDate = new Date(event.eventDate);
            const currentDate = new Date();

            // Check if the event date has passed or not
            if (eventDate > currentDate || eventDate.toDateString() === currentDate.toDateString()) {
              return (
                <div className="bg-white rounded-xl relative h-[450px] flex flex-col" key={event._id}>
                  <div className="rounded-tl-[0.75rem] rounded-tr-[0.75rem] object-fill aspect-16:9">
                    {event.image && (
                      <img
                        src={`http://localhost:4000/${event.image}`}
                        alt={event.title}
                        width="350"
                        height="200"
                        className="w-[350px] h-[200px] object-fill"
                      />

                    )}

                  </div>

                  <div className="m-2 grid gap-2 flex-grow">
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-lg mt-2">{event.title.toUpperCase()}</h1>
                      <div className="flex gap-2 items-center mr-4 text-red-600">
                        <BiLike /> {event.likes}
                      </div>
                    </div>

                    <div className="flex text-sm flex-nowrap justify-between text-primarydark font-bold mr-4">
                      <div>{event.eventDate.split("T")[0]}, {event.eventTime}</div>
                      <div>{event.ticketPrice === 0 ? 'Free' : 'Rs. ' + event.ticketPrice}</div>
                    </div>

                    <div className="text-xs flex flex-col flex-wrap truncate-text">
                      {event.description}
                    </div>
                    <div className="flex justify-between items-center my-2 mr-4">
                      <div className="text-sm text-primarydark">
                        Organized By: <br /><span className="font-bold">{event.organizedBy}</span>
                      </div>
                      {/* <div className="text-sm text-primarydark">
                        Created By: <br /><span className="font-semibold">{event.owner.toUpperCase()}</span>
                      </div> */}
                    </div>
                    <div className="absolute flex gap-4 bottom-[240px] right-8 md:bottom-[20px] md:right-3 lg:bottom-[250px] lg:right-4 sm:bottom-[260px] sm:right-3">
                      <button onClick={() => handleLike(event._id)}>
                        <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-primary" />
                      </button>
                      <button onClick={() => handleDelete(event._id)}>
                        <AiFillDelete className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-red-500" />
                      </button>
                    </div>

                    <Link to={`/event/${event._id}`} className="flex justify-center">
                      <button className="primary flex items-center gap-2 h-[40px]">
                        Book Ticket <BsArrowRightShort className="w-6 h-6" />
                      </button>
                    </Link>

                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </section>
    </>
  );
}
