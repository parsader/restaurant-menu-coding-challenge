import React from "react";
import type { MenuItem } from "../api/menuApi";
import genericFood from "../assets/generic-food.jpg";

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="w-64 flex-shrink-0 rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img
        src={item.img || genericFood}
        alt={item.name}
        className="w-full h-40 object-cover"
        onError={(e) => (e.currentTarget.src = genericFood)}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.dsc}</p>
        <p className="mt-2 text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-1">{item.country}</p>
      </div>
    </div>
  );
};

export default MenuCard;