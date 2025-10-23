import React, { useState } from "react";
import MenuList from "./components/MenuList";
import Navbar from "./components/Navbar";
import ReservationCard from "./components/ReservationCard";

// maybe use enums instead?
export type Currency = "USD" | "CAD" | "GBP";

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currency={currency} onCurrencyChange={setCurrency} />
      <main className="p-4 pt-24">
        <MenuList currency={currency} />
        <ReservationCard /> 
      </main>
    </div>
  );
};

export default App;