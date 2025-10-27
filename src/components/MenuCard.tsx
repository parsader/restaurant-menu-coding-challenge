import React from "react";
import type { MenuItem } from "../api/menuApi";
import type { Currency } from "../App";

interface MenuCardProps {
  item: MenuItem;
  currency: Currency;
}

const currencyRates = {
  USD: 1,
  CAD: 1.36,
  GBP: 0.78,
};

const currencySymbols = {
  USD: "$",
  CAD: "CA$",
  GBP: "£",
};

const MenuCard: React.FC<MenuCardProps> = ({ item, currency }) => {
  const convertedPrice = item.price * currencyRates[currency];
  const symbol = currencySymbols[currency];

  return (
    <div className="py-6 border-b border-[#e8dcc8]">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#2d2d2d] mb-2">
            {item.name}
          </h3>
          <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.dsc}</p>
        </div>
        <div className="shrink-0">
          <p className="text-lg font-semibold text-[#2d2d2d]">
            {symbol}
            {convertedPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
