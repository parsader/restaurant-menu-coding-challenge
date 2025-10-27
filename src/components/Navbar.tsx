import React, { useState, useRef, useEffect } from "react";
import type { Currency } from "../App";
import usFlag from "../assets/United-States-Flag.png";
import canadaFlag from "../assets/Canada-Flag.png";
import ukFlag from "../assets/United-Kingdom-Flag.png";

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (value: Currency) => void;
}

const currencyFlags = {
  USD: usFlag,
  CAD: canadaFlag,
  GBP: ukFlag,
};

const Navbar: React.FC<NavbarProps> = ({ currency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: Currency) => {
    onCurrencyChange(value);
    setIsOpen(false);
  };

  const scrollToReservation = () => {
    const reservationSection = document.getElementById("reservation-section");
    if (reservationSection) {
      const yOffset = -80;
      const y =
        reservationSection.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#2d2d2d] text-white z-50 shadow-md">
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <h2 className="text-[min(20vw,24px)] text-xl  pr-2 font-bold tracking-wide">
          Uncle Willy's
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToReservation}
            className="bg-[#f5f1e8] text-[#2d2d2d] px-2 py-2 rounded-md font-medium hover:bg-[#e8dcc8] transition-colors duration-150"
          >
            Reserve
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#f5f1e8] text-[#2d2d2d] px-2 py-2 rounded-md font-medium hover:bg-[#e8dcc8] transition-colors duration-150 flex items-center justify-center gap-2 min-w-[70px]"
            >
              <img
                src={currencyFlags[currency]}
                alt={currency}
                className="w-6 h-4 object-cover rounded"
              />
              <span>{currency}</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#f5f1e8] border border-[#d4c4a8] rounded-md shadow-lg text-[#2d2d2d]">
                {(["USD", "CAD", "GBP"] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => handleSelect(cur)}
                    className={`flex items-center gap-2 w-full text-right pr-8 px-4 py-2 hover:bg-[#e8dcc8] ${
                      cur === currency ? "text-[#8b7355] font-semibold" : ""
                    }`}
                  >
                    <img
                      src={currencyFlags[cur]}
                      alt={cur}
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span>{cur}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
