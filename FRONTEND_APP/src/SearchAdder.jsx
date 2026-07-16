import { useState } from "react";

function SearchAdder() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) return;

    setItems((prevItems) => [...prevItems, trimmedValue]);
    setInputValue("");
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-4 shadow-sm">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAdd();
            }
          }}
          placeholder="Type something to add"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Nothing added yet.</p>
        ) : (
          items.map((item, index) => (
            <div key={`${item}-${index}`} className="rounded-lg bg-gray-100 px-3 py-2 text-gray-700">
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchAdder;
