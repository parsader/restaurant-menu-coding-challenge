import React, { useState } from "react";
import MenuList from "./components/MenuList";
import Navbar from "./components/Navbar";
import ReservationCard from "./components/ReservationCard";

// maybe use enums instead?
export type Currency = "USD" | "CAD" | "GBP";

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Navbar currency={currency} onCurrencyChange={setCurrency} />
      <main className="pt-24">
        <div>
          <MenuList currency={currency} />
        </div>
        <div
          id="reservation-section"
          className="flex justify-center mt-2 mb-8 px-4"
        >
          <ReservationCard />
        </div>
      </main>
    </div>
  );
};

export default App;
