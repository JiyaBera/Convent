const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
   userId: { type: String, required: true },  // Consistent use of 'required'
   eventId: { type: String, required: true },  // CamelCase for IDs
   ticketDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },  // Fixed typo: require -> required
      eventName: { type: String, required: true },  // CamelCase for event fields
      eventDate: { type: Date, required: true },  // Fixed typo: require -> required
      eventTime: { type: String, required: true },
      ticketPrice: { type: Number, required: true },
      qr: { type: String, required: true },
   },
   count: { type: Number, default: 0, min: 0 },  // Added min validation
});

const TicketModel = mongoose.model('Ticket', ticketSchema);  // Removed backticks, not necessary
module.exports = TicketModel;
