import React, { useEffect, useState, useRef } from "react";
import { fetchMenuItems } from "../api/menuApi";
import type { MenuItem } from "../api/menuApi";
import MenuCard from "./MenuCard";
import type { Currency } from "../App";
// import genericFood from "../assets/generic-food.jpg";
import genericFood from "../assets/generic-food-pizza.jpg";

interface MenuListProps {
  currency: Currency;
}

interface GroupedItems {
  [type: string]: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ currency }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      Object.entries(categoryRefs.current).forEach(([type, ref]) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(type);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const scrollToCategory = (type: string) => {
    const ref = categoryRefs.current[type];
    if (ref) {
      const yOffset = -100;
      const y = ref.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-[#2d2d2d]">Loading menu...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  const groupedItems = menuItems.reduce<GroupedItems>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedItems);

  return (
    <div>
      <h1 className="text-[min(4vw,16px)] font-display px-2 text-xl font-bold text-center text-[#2d2d2d] mt-10 mb-2">
        Uncle Willy's Restaurant
      </h1>
      <h3 className="text-md font-bold text-center text-[#2d2d2d] mt-4 mb-6">
        Our Menu
      </h3>
      <div className="sticky top-[72px] bg-[#f5f1e8] z-40 border-b border-[#d4c4a8] shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex gap-8 overflow-x-auto scrollbar-hide py-4">
            {categories.map((type) => (
              <button
                key={type}
                onClick={() => scrollToCategory(type)}
                className={`text-lg font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  activeCategory === type
                    ? "border-[#2d2d2d] text-[#2d2d2d]"
                    : "border-transparent text-[#6b6b6b] hover:text-[#2d2d2d]"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {Object.entries(groupedItems).map(([type, items]) => (
          <div
            key={type}
            ref={(el) => {
              categoryRefs.current[type] = el;
            }}
            className="mb-16"
          >
            <div className="mb-8">
              <img
                src={items[0]?.img || genericFood}
                alt={type}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                onError={(e) => (e.currentTarget.src = genericFood)}
              />
            </div>

            <h2 className="text-4xl font-bold capitalize text-[#2d2d2d] mb-8 border-b-2 border-[#d4c4a8] pb-4">
              {type}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} currency={currency} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
