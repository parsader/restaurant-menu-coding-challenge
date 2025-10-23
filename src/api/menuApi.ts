export interface MenuItem {
  id: string;
  name: string;
  dsc: string;
  price: number;
  rate?: number;
  country: string;
  img: string;
  type: string; 
}

const BASE_URL = "https://free-food-menus-api-two.vercel.app";

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const categories = ["burgers", "pizzas", "sandwiches", "drinks", "desserts"];
  const requests = categories.map((type) =>
    fetch(`${BASE_URL}/${type}`)
      .then((res) => res.json())
      .then((data) =>
        data
          .slice(0, 7)
          .map((item: MenuItem) => ({ ...item, type })) 
      )
      .catch(() => [])
  );

  try {
    const results = await Promise.all(requests);
    return results.flat();
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
};
