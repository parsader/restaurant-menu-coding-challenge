import React, { useState } from "react";
import emailjs from "@emailjs/browser";


const ReservationCard: React.FC = () => {
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("5:00 PM");
  const [email, setEmail] = useState<string>("");

  const guestOptions = Array.from({ length: 8 }, (_, i) => i + 1);

  // 30 mins interval time slots between 5:00 PM and 11:00 PM
  const generateTimeSlots = () => {
    const slots: string[] = [];
    let hour = 17;
    const endHour = 23;
    while (hour <= endHour) {
      const h12 = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      slots.push(`${h12}:00 ${ampm}`);
      if (hour !== endHour) slots.push(`${h12}:30 ${ampm}`);
      hour++;
    }
    return slots;
  };

  const timeOptions = generateTimeSlots();

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Select a date";

  // booking has to be for tmr or later
  const isPastDate = date
  ? new Date(date).setHours(0, 0, 0, 0) <
    new Date().setHours(0, 0, 0, 0)
  : true;

  // handle emailJS submission
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!date || !email) {
    alert("Please select a date and enter your email before submitting.");
    return;
  }

  const formattedMessage = `
    Reservation Confirmed!
    Guests: ${guests}
    Date: ${formattedDate}
    Time: ${time}
  `;

  const templateParams = {
    to_email: email,
    message: formattedMessage,
    guests,
    date: formattedDate,
    time,
  };

  emailjs
    .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      alert(`Reservation confirmation sent to ${email}`);
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
      alert("Something went wrong while sending the email.");
    });
};

// alert for checking form data without emailJS

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!date || !email) {
//       alert("Please select a date and enter your email before submitting.");
//       return;
//     }

//     alert(
//       `Reservation Confirmed!\n\nGuests: ${guests}\nDate: ${formattedDate}\nTime: ${time}\nEmail: ${email}`
//     );
//   };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-md p-6 mt-10 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-gray-500 text-sm mb-1">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {guestOptions.map((g) => (
              <option key={g} value={g}>
                {g} Guest{g > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        
        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-gray-500 text-sm mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

       
        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-gray-500 text-sm mb-1">Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        
        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-gray-500 text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      
      <div className="flex flex-col justify-center items-center mt-6">
        <button
          type="submit"
          disabled={isPastDate}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-150 shadow-md w-full md:w-auto ${
            isPastDate
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-black hover:bg-indigo-700"
          }`}
        >
          Book Reservation
        </button>

        
        {isPastDate && date && (
          <p className="text-sm text-red-500 mt-2">
            Please select a future date.
          </p>
        )}
      </div>

      
      <div className="text-center mt-4 text-gray-700">
        <p>
          Reservation for <span className="font-semibold">{guests}</span>{" "}
          guest{guests > 1 ? "s" : ""} at{" "}
          <span className="font-semibold">{time}</span> on{" "}
          <span className="font-semibold">{formattedDate}</span>
        </p>
      </div>
    </form>
  );
};

export default ReservationCard;