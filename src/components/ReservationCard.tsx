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
    ? new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
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
      className="bg-white rounded-lg shadow-lg p-8 mt-2 max-w-4xl w-full"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-secondary">
        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-[#6b6b6b] text-sm mb-1 font-medium">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border border-[#d4c4a8] rounded-md py-2 px-3 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#8b7355] bg-white"
          >
            {guestOptions.map((g) => (
              <option key={g} value={g}>
                {g} Guest{g > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-[#6b6b6b] text-sm mb-1 font-medium">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-[#d4c4a8] rounded-md py-2 px-3 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#8b7355] bg-white"
          />
        </div>

        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-[#6b6b6b] text-sm mb-1 font-medium">
            Time
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-[#d4c4a8] rounded-md py-2 px-3 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#8b7355] bg-white"
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start w-full md:w-1/4">
          <label className="text-[#6b6b6b] text-sm mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-[#d4c4a8] rounded-md py-2 px-3 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#8b7355] bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
        <button
          type="submit"
          disabled={isPastDate}
          className={`px-8 py-3 rounded-md font-semibold transition-colors duration-150 w-full md:w-auto ${
            isPastDate
              ? "bg-[#d4c4a8] text-[#8b8b8b] cursor-not-allowed"
              : "bg-[#2d2d2d] text-black hover:bg-[#3d3d3d]"
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

      <div className="text-center mt-4 text-[#2d2d2d]">
        <p>
          Reservation for <span className="font-semibold">{guests}</span> guest
          {guests > 1 ? "s" : ""} at{" "}
          <span className="font-semibold">{time}</span> on{" "}
          <span className="font-semibold">{formattedDate}</span>
        </p>
      </div>
    </form>
  );
};

export default ReservationCard;
