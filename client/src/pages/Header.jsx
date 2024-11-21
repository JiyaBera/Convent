import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BsFillCaretDownFill } from 'react-icons/bs';
import { AiOutlineBell, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  // Fetch events from the server
  useEffect(() => {
    axios.get("/events").then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  // Search bar functionality
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // Logout Function
  async function logout() {
    await axios.post('/logout');
    setUser(null);
  }

  // Search input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <header className='flex py-2 px-6 sm:px-6 justify-between items-center bg-primaryBg'>
        
        {/* Logo Section */}
        <Link to={'/'} className="flex items-center">
          <img src="../src/assets/logo.jpg" alt="" className='w-26 h-9' />
        </Link>

        {/* Search Bar */}
        <div className='flex bg-white rounded py-2.5 px-4 w-1/3 gap-4 items-center'>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <div ref={searchInputRef}>
            <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchInputChange} className='text-sm text-black outline-none w-full' />
          </div>
        </div>

        {/* Main Icons and Links Section */}
        <div className="hidden lg:flex gap-8 text-sm items-center">
          
          {/* Connections */}
          <Link to={'/connections'} className='flex flex-col items-center text-fontprimary'>
            <FiUsers className="text-xl" />
            <div>Connections</div>
          </Link>

          {/* Messages */}
          <Link to={'/messages'} className='flex flex-col items-center text-fontprimary'>
            <AiOutlineMail className="text-xl" />
            <div>Messages</div>
          </Link>

          {/* Notifications */}
          <Link to={'/notifications'} className='flex flex-col items-center text-fontprimary'>
            <AiOutlineBell className="text-xl" />
            <div>Notifications</div>
          </Link>

          {/* Try for Free */}
          <Link to={'/try'} className='flex flex-col items-center text-fontprimary'>
            <AiOutlineUser className="text-xl" />
            <div>Try for Free</div>
          </Link>
        </div>

        {/* User Account Dropdown or Login Button */}
        {!!user ? (
          <div className="flex items-center gap-2 text-fontprimary">
            <Link to={'/useraccount'}>
              {user.name.toUpperCase()}
            </Link>
            <BsFillCaretDownFill className="h-5 w-5 cursor-pointer hover:rotate-180 transition-all" onClick={() => setisMenuOpen(!isMenuOpen)} />
            {isMenuOpen && (
              <div className="absolute z-20 mt-64 flex flex-col w-48 bg-ex2 right-2 md:right-[10px] rounded-lg shadow-lg">
                <nav className="block">
                  <div className="flex flex-col font-semibold text-[16px]">
                    <Link className="flex hover:bg-background hover:shadow py-2 pt-3 pl-6 pr-8 rounded-lg" to={'/createEvent'}>Create Event</Link>
                    <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg" to={'/wallet'}>Wallet</Link>
                    <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg" to={'/verification'}>Center</Link>
                    <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg" to={'/calendar'}>Calendar</Link>
                    <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pb-3 pr-8 rounded-lg" onClick={logout}>Log out</Link>
                  </div>
                </nav>
              </div>
            )}
          </div>
        ) : (
          <Link to={'/login'}>
            <button className="primary">Sign in</button>
          </Link>
        )}
      </header>
    </div>
  );
}
