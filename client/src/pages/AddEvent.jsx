import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user._id : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: null,
    likes: 0
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prevState) => ({ ...prevState, image: file }));
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setMessage("Please select a valid image file.");
      setImagePreview(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    axios
      .post("/createEvent", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setMessage("Event posted successfully!");
        alert("Event created successfully!"); // Show alert here
        // Optionally, reset the form data or redirect
        setFormData({
          owner: user ? user._id : "",
          title: "",
          optional: "",
          description: "",
          organizedBy: "",
          eventDate: "",
          eventTime: "",
          location: "",
          ticketPrice: 0,
          image: null,
          likes: 0,
        });
        setImagePreview(null);
      })
      .catch((error) => {
        console.error("Error posting event:", error);
        setMessage("Error creating event. Please try again.");
      });
  };
  
  return (
    <div className='min-h-screen flex justify-center items-center bg-primaryBg p-10'>
      <div className='bg-ex2 p-10 rounded-lg shadow-2xl w-full max-w-3xl'>
        <h1 className='text-[36px] text-white text-center font-extrabold mb-6'>Create an Event</h1>

        {message && (
          <p className={`text-center mb-4 ${message.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <label className='flex flex-col'>
            <span className='label'>Title:</span>
            <input
              type="text"
              name="title"
              className='input-field'
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Optional:</span>
            <input
              type="text"
              name="optional"
              className='input-field'
              value={formData.optional}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Description:</span>
            <textarea
              name="description"
              className='input-field textarea-field h-24'
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Organized By:</span>
            <input
              type="text"
              name="organizedBy"
              className='input-field'
              value={formData.organizedBy}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Event Date:</span>
            <input
              type="date"
              name="eventDate"
              className='input-field'
              value={formData.eventDate}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Event Time:</span>
            <input
              type="time"
              name="eventTime"
              className='input-field'
              value={formData.eventTime}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Location:</span>
            <input
              type="text"
              name="location"
              className='input-field'
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Ticket Price:</span>
            <input
              type="number"
              name="ticketPrice"
              className='input-field'
              value={formData.ticketPrice}
              onChange={handleChange}
            />
          </label>

          <label className='flex flex-col'>
            <span className='label'>Choose Image:</span>
            <input
              type="file"
              id="image" // Add an id here
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image" className="custom-file-upload">
              {formData.image ? formData.image.name : "Choose Image"}
            </label>
          </label>


          <div className='image-preview-wrapper'>
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>

          <button type="submit" className='submit-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}
