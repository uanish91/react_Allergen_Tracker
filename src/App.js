// Ingredient Allergen Tracker App - Basic Version

import React, { useState } from "react";

const ALLERGENS = ["Nuts", "Dairy", "Gluten", "Soy"];

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", allergen: "" }]);
  const [filter, setFilter] = useState([]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: "", allergen: "" }]);
  };

  const handleAddMenuItem = () => {
    if (!name.trim()) return;
    setMenuItems([...menuItems, { name, ingredients }]);
    setName("");
    setIngredients([{ name: "", allergen: "" }]);
  };

  const handleFilterToggle = (allergen) => {
    setFilter((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (filter.length === 0) return true;
    return !item.ingredients.some((ing) => filter.includes(ing.allergen));
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        🧾 Ingredient Allergen Tracker
      </h1>

      <div className="bg-white shadow-md p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Menu Item</h2>
        <input
          type="text"
          placeholder="Menu Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Ingredient"
              value={ing.name}
              onChange={(e) =>
                handleIngredientChange(idx, "name", e.target.value)
              }
              className="border p-2 rounded w-1/2"
            />
            <select
              value={ing.allergen}
              onChange={(e) =>
                handleIngredientChange(idx, "allergen", e.target.value)
              }
              className="border p-2 rounded w-1/2"
            >
              <option value="">No Allergen</option>
              {ALLERGENS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button onClick={addIngredientField} className="text-blue-600 mb-2">
          + Add Ingredient
        </button>
        <button
          onClick={handleAddMenuItem}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Menu Item
        </button>
      </div>

      <div className="bg-white shadow-md p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter by Allergen</h2>
        <div className="flex space-x-4">
          {ALLERGENS.map((a) => (
            <label key={a} className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={filter.includes(a)}
                onChange={() => handleFilterToggle(a)}
              />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
        {filteredMenuItems.length === 0 ? (
          <p>No menu items match the current filter.</p>
        ) : (
          <ul className="space-y-4">
            {filteredMenuItems.map((item, idx) => (
              <li key={idx} className="border p-3 rounded">
                <h3 className="font-bold text-lg">🍽️ {item.name}</h3>
                <ul className="list-disc ml-6">
                  {item.ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.name}
                      {ing.allergen && (
                        <span className="text-red-600 font-semibold">
                          {" "}
                          ({ing.allergen})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
