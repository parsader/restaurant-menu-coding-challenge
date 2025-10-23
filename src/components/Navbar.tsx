import React, { useState, useRef, useEffect } from "react";
import type { Currency } from "../App";

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (value: Currency) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: Currency) => {
    onCurrencyChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-600 text-white z-50 shadow-md backdrop-blur-sm bg-opacity-95">
      <nav className="flex justify-between items-center px-6 py-4">

        <h1 className="text-l font-semibold tracking-wide">Uncle Willy's Menu</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors duration-150"
          >
            {currency} ▾
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-700">
              {(["USD", "CAD", "GBP"] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => handleSelect(cur)}
                  className={`block w-full text-left px-4 py-2 hover:bg-indigo-50 ${
                    cur === currency ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;