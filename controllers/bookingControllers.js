import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";
import Room from "../models/room.js";

export function createBooking(req, res) {
  if (!isCustomerValid(req)) {
    return res
      .status(403)
      .json({ message: "You do not have permission to create a booking" });
  }
  const startingId = 1200;
  Booking.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1;
      console.log("Count:", count);
      const newBooking = new Booking({
        bookingId: newId,
        roomId: req.body.roomId,
        email: req.user.email,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
      });
      newBooking
        .save()
        .then((result) => {
          res
            .status(201)
            .json({ message: "Booking Created Successfully", result: result });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error creating booking", error: err.message });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error creating booking", error: err.message });
    });
}
export function getBookings(req, res) {
  if (!isCustomerValid(req)) {
    return res
      .status(403)
      .json({ message: "You do not have permission to view bookings" });
  }
  Booking.find({ email: req.user.email })
    .then((bookingsList) => {
      res.status(200).json(bookingsList);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching bookings", error: err.message });
    });
}
export function retrievBookingByDate(req, res) {
  const startDate = req.body.checkInDate;
  const endDate = req.body.checkOutDate;

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);

  Booking.find({
    checkInDate: { $gte: new Date(startDate) },
    checkOutDate: { $lte: new Date(endDate) },
  })
    .then((bookingsList) => {
      res.status(200).json(bookingsList);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Error fetching bookings by date",
          error: err.message,
        });
    });
}

export async function createBookingUsingCategory(req, res) {
  try {
    // basic auth check
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Please login to create a booking" });
    }

    const { checkInDate, checkOutDate, category } = req.body;
    if (!checkInDate || !checkOutDate || !category) {
      return res.status(400).json({ message: "checkInDate, checkOutDate and category required" });
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    if (isNaN(start) || isNaN(end) || start >= end) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Find bookings that overlap the requested range (ignore cancelled)
    const overlapping = await Booking.find({
      $or: [
        {
          checkInDate: { $gte: start, $lte: end }
        },
        {
          checkOutDate: { $gte: start, $lte: end }
        },
        // this also covers bookings that fully enclose the requested range
        {
          checkInDate: { $lte: start },
          checkOutDate: { $gte: end }
        }
      ],
      status: { $ne: "cancelled" } // optional: ignore cancelled bookings
    }).select("roomId");

    const bookedRoomIds = overlapping.map(b => b.roomId);

    // Find rooms in the requested category that are NOT in the bookedRoomIds
    const availableRooms = await Room.find({
      roomId: { $nin: bookedRoomIds },
      category: category
    });

    if (!availableRooms || availableRooms.length === 0) {
      return res.status(200).json({
        message: "No rooms available for the selected category and date range"
      });
    }

    // Generate bookingId (simple). Keep as string to match schema.
    // NOTE: This is not perfect under concurrency; consider a counter collection or Mongo transaction for production.
    const startingId = 1200;
    const count = await Booking.countDocuments({});
    const newBookingId = String(startingId + count + 1);

    const booking = new Booking({
      bookingId: newBookingId,
      roomId: availableRooms[0].roomId,
      email: req.user.email,
      checkInDate: start,
      checkOutDate: end,
      status: "pending"
    });

    const saved = await booking.save();

    return res.status(201).json({
      message: "Booking Created Successfully",
      result: saved
    });
  } catch (err) {
    console.error("createBookingUsingCategory error:", err);
    return res.status(500).json({ message: "Error creating booking", error: err.message });
  }
}

