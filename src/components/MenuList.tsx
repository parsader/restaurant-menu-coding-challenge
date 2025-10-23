import React, { useEffect, useState } from "react";
import { fetchMenuItems } from "../api/menuApi";
import type { MenuItem } from "../api/menuApi";
import MenuCard from "./MenuCard";

interface GroupedItems {
  [type: string]: MenuItem[];
}

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
      } catch {
        setError("Failed to load menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading menu...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  // Group by category type
  const groupedItems = menuItems.reduce<GroupedItems>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-10 p-4">
      {Object.entries(groupedItems).map(([type, items]) => (
        <div key={type}>
          <h2 className="text-2xl font-bold capitalize text-gray-800 mb-4">{type}</h2>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;