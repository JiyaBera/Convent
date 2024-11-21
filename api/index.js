const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const Ticket = require("./models/Ticket");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "bsbsfbrnsftentwnnwnwn"; // It's good to use an environment variable

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: "http://localhost:5173",
}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.error("MongoDB connection error:", err));

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage });

app.get("/test", (req, res) => {
   res.json("test ok");
});

app.post("/register", async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const userDoc = await UserModel.create({
         name,
         email,
         password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
   } catch (e) {
      res.status(422).json(e);
   }
});

app.post("/login", async (req, res) => {
   const { email, password } = req.body;

   const userDoc = await UserModel.findOne({ email });

   if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
   }

   const passOk = bcrypt.compareSync(password, userDoc.password);
   if (!passOk) {
      return res.status(401).json({ error: "Invalid password" });
   }

   jwt.sign(
      {
         email: userDoc.email,
         id: userDoc._id,
      },
      jwtSecret,
      {},
      (err, token) => {
         if (err) {
            return res.status(500).json({ error: "Failed to generate token" });
         }
         res.cookie("token", token).json(userDoc);
      }
   );
});

app.get("/profile", (req, res) => {
   const { token } = req.cookies;
   if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
         if (err) throw err;
         const { name, email, _id } = await UserModel.findById(userData.id);
         res.json({ name, email, _id });
      });
   } else {
      res.json(null);
   }
});

app.post("/logout", (req, res) => {
   res.cookie("token", "").json(true);
});

// Define the event schema and model
const eventSchema = new mongoose.Schema({
   owner: String,
   title: String,
   description: String,
   organizedBy: String,
   eventDate: Date,
   eventTime: String,
   location: String,
   Participants: Number,
   Count: Number,
   Income: Number,
   ticketPrice: Number,
   Quantity: Number,
   image: String,
   likes: { type: Number, default: 0 },
   likedBy: { type: [String], default: [] },
   Comment: [String],
});

const Event = mongoose.model("Event", eventSchema);

// Create event
app.post("/createEvent", upload.single("image"), async (req, res) => {
   try {
      const eventData = req.body;
      eventData.image = req.file ? req.file.path : "";
      const newEvent = new Event(eventData);
      await newEvent.save();
      res.status(201).json(newEvent);
   } catch (error) {
      res.status(500).json({ error: "Failed to save the event to MongoDB" });
   }
});

// Get all events
app.get("/createEvent", async (req, res) => {
   try {
      const events = await Event.find();
      res.status(200).json(events);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch events from MongoDB" });
   }
});

// Get event by ID
app.get("/event/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch event from MongoDB" });
   }
});

// Like an event
app.post("/event/:eventId/like", async (req, res) => {
   const eventId = req.params.eventId;
   const userId = req.body.userId; // Ensure to send userId in the request body

   try {
      const event = await Event.findById(eventId);
      if (!event) {
         return res.status(404).json({ message: "Event not found" });
      }

      // Check if the user has already liked the event
      if (event.likedBy.includes(userId)) {
         return res.status(400).json({ message: "You have already liked this event." });
      }

      // Add userId to likedBy array and increment likes
      event.likedBy.push(userId);
      event.likes += 1;
      await event.save();

      res.json(event);
   } catch (error) {
      console.error("Error liking the event:", error);
      res.status(500).json({ message: "Server error" });
   }
});

// Get all events
app.get("/events", async (req, res) => {
   try {
      const events = await Event.find();
      res.json(events);
   } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Server error" });
   }
});

// Delete event route
app.delete("/event/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
         return res.status(404).json({ message: "Event not found" });
      }
      res.status(204).send(); // No content to send back, just indicate success
   } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ error: "Failed to delete event" });
   }
});

// Get event order summary by ID
app.get("/event/:id/ordersummary", async (req, res) => {

   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });

      // Fetch relevant data for order summary
      const orderSummary = {
         title: event.title,
         eventDate: event.eventDate,
         eventTime: event.eventTime,
         location: event.location,
         ticketPrice: event.ticketPrice,
         participants: event.Participants,
      };

      res.json(orderSummary);
   } catch (error) {
      console.error("Error fetching event order summary:", error);
      res.status(500).json({ error: "Failed to fetch order summary" });
   }
});

app.get("/event/:id/ordersummary/paymentsummary", async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });

      // Fetch relevant data for order summary
      const orderSummary = {
         title: event.title,
         eventDate: event.eventDate,
         eventTime: event.eventTime,
         location: event.location,
         ticketPrice: event.ticketPrice,
         participants: event.Participants,
      };

      res.json(orderSummary);
   } catch (error) {
      console.error("Error fetching event order summary:", error);
      res.status(500).json({ error: "Failed to fetch order summary" });
   }
})


// Ticket routes (existing logic)
app.post("/tickets", async (req, res) => {
   try {
      const ticketDetails = req.body;
      
      // TODO change dummy values to dynamic
      const newTicket = new Ticket(ticketDetails);
      
      await newTicket.save();
      return res.status(201).json({ ticket: newTicket });
   } catch (error) {
      console.error("Error creating ticket:", error);
      return res.status(500).json({ error: "Failed to create ticket" });
   }
});

// Get all tickets
app.get("/tickets/:id", async (req, res) => {
   try {
      const tickets = await Ticket.find();
      res.json(tickets);
   } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Failed to fetch tickets" });
   }
});

// Get user tickets
app.get("/tickets/user/:userId", async (req, res) => {
   const userId = req.params.userId;

   try {
      const tickets = await Ticket.find({ userid: userId });
      res.json(tickets);
   } catch (error) {
      console.error("Error fetching user tickets:", error);
      res.status(500).json({ error: "Failed to fetch user tickets" });
   }
});

// Delete ticket route
app.delete("/tickets/:id", async (req, res) => {
   try {
      const ticketId = req.params.id;
      const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
      if (!deletedTicket) {
         return res.status(404).json({ message: "Ticket not found" });
      }
      res.status(204).send();
   } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(500).json({ error: "Failed to delete ticket" });
   }
});
// Serve Terms and Conditions page
// Serve static files from the 'src/pages' directory
app.use(express.static(path.join(__dirname, 'src/pages')));

// Define a route for Terms and Conditions
app.get('/terms-and-conditions', (req, res) => {
   res.sendFile(path.join(__dirname, 'src/pages/terms-and-conditions.jsx')); // Adjust the path if needed
});

app.get('/uploads/:filename', (req, res) => {
   const filename = req.params.filename;
   const filePath = path.join(__dirname, 'uploads', filename);
   res.sendFile(filePath, (err) => {
      if (err) {
         res.status(404).json({ error: "File not found" });
      }
   });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
