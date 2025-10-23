import React from "react";
import MenuList from "./components/MenuList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white text-left px-8 py-4 text-xl font-semibold shadow-md">
        Restaurant Menu
      </header>
      <main className="p-4">
        <MenuList />
      </main>
    </div>
  );
};

export default App;